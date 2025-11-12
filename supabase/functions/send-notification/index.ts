import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { userId, complaintId, type, title, message, email }: NotificationRequest = await req.json();

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

    // Send email notification
    if (userEmail) {
      const emailResponse = await resend.emails.send({
        from: "BroCare <onboarding@resend.dev>",
        to: [userEmail],
        subject: title,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626;">${title}</h2>
            <p style="color: #374151; font-size: 16px;">${message}</p>
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
