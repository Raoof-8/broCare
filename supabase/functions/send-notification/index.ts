import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// HTML escape function to prevent XSS
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Input validation
function validateInput(userId: string, complaintId: string, title: string, message: string) {
  if (!userId || typeof userId !== 'string' || userId.length > 100) {
    throw new Error('Invalid userId');
  }
  if (!complaintId || typeof complaintId !== 'string' || complaintId.length > 100) {
    throw new Error('Invalid complaintId');
  }
  if (!title || typeof title !== 'string' || title.length > 500) {
    throw new Error('Invalid title');
  }
  if (!message || typeof message !== 'string' || message.length > 2000) {
    throw new Error('Invalid message');
  }
}

interface NotificationRequest {
  userId: string;
  complaintId: string;
  type: string;
  title: string;
  message: string;
  email?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify JWT token from Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    // Verify user authentication
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { userId, complaintId, type, title, message, email }: NotificationRequest = await req.json();
    
    // Validate all inputs
    validateInput(userId, complaintId, title, message);

    // Verify user has permission to send notifications for this complaint
    const { data: complaint } = await supabaseClient
      .from('complaints')
      .select('user_id')
      .eq('id', complaintId)
      .single();

    const { data: userRole } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .in('role', ['admin', 'staff', 'hod', 'grc'])
      .maybeSingle();

    const isAuthorized = userRole || (complaint && complaint.user_id === user.id);
    if (!isAuthorized) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: insufficient permissions' }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Sending notification:", { userId, complaintId, type, title });

    // Get user email if not provided
    let userEmail = email;
    if (!userEmail) {
      const { data: profile } = await supabaseClient
        .from("profiles")
        .select("email")
        .eq("id", userId)
        .single();
      
      userEmail = profile?.email;
    }

    // Validate email
    if (userEmail && (typeof userEmail !== 'string' || !userEmail.includes('@') || userEmail.length > 255)) {
      throw new Error('Invalid email address');
    }

    // Send email notification with sanitized content
    if (userEmail) {
      const emailResponse = await resend.emails.send({
        from: "BroCare <onboarding@resend.dev>",
        to: [userEmail],
        subject: escapeHtml(title),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626;">${escapeHtml(title)}</h2>
            <p style="color: #374151; font-size: 16px;">${escapeHtml(message)}</p>
            <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">
              Log in to BroCare to view your complaint details and track its progress.
            </p>
          </div>
        `,
      });

      console.log("Email sent successfully:", emailResponse);
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
