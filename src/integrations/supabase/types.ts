export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      complaint_evidence: {
        Row: {
          complaint_id: string
          file_type: Database["public"]["Enums"]["file_type"]
          file_url: string
          id: string
          uploaded_at: string | null
        }
        Insert: {
          complaint_id: string
          file_type: Database["public"]["Enums"]["file_type"]
          file_url: string
          id?: string
          uploaded_at?: string | null
        }
        Update: {
          complaint_id?: string
          file_type?: Database["public"]["Enums"]["file_type"]
          file_url?: string
          id?: string
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "complaint_evidence_complaint_id_fkey"
            columns: ["complaint_id"]
            isOneToOne: false
            referencedRelation: "complaints"
            referencedColumns: ["id"]
          },
        ]
      }
      complaint_messages: {
        Row: {
          complaint_id: string
          created_at: string | null
          id: string
          is_staff: boolean | null
          message: string
          user_id: string
        }
        Insert: {
          complaint_id: string
          created_at?: string | null
          id?: string
          is_staff?: boolean | null
          message: string
          user_id: string
        }
        Update: {
          complaint_id?: string
          created_at?: string | null
          id?: string
          is_staff?: boolean | null
          message?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "complaint_messages_complaint_id_fkey"
            columns: ["complaint_id"]
            isOneToOne: false
            referencedRelation: "complaints"
            referencedColumns: ["id"]
          },
        ]
      }
      complaint_status_history: {
        Row: {
          changed_by: string | null
          complaint_id: string
          created_at: string | null
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["complaint_status"]
        }
        Insert: {
          changed_by?: string | null
          complaint_id: string
          created_at?: string | null
          id?: string
          notes?: string | null
          status: Database["public"]["Enums"]["complaint_status"]
        }
        Update: {
          changed_by?: string | null
          complaint_id?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["complaint_status"]
        }
        Relationships: [
          {
            foreignKeyName: "complaint_status_history_complaint_id_fkey"
            columns: ["complaint_id"]
            isOneToOne: false
            referencedRelation: "complaints"
            referencedColumns: ["id"]
          },
        ]
      }
      complaints: {
        Row: {
          assigned_to: string | null
          category: Database["public"]["Enums"]["complaint_category"]
          created_at: string | null
          description: string
          escalated_at: string | null
          id: string
          incident_date: string | null
          is_anonymous: boolean | null
          location: string | null
          priority: Database["public"]["Enums"]["complaint_priority"] | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["complaint_status"] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          category: Database["public"]["Enums"]["complaint_category"]
          created_at?: string | null
          description: string
          escalated_at?: string | null
          id?: string
          incident_date?: string | null
          is_anonymous?: boolean | null
          location?: string | null
          priority?: Database["public"]["Enums"]["complaint_priority"] | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["complaint_status"] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          category?: Database["public"]["Enums"]["complaint_category"]
          created_at?: string | null
          description?: string
          escalated_at?: string | null
          id?: string
          incident_date?: string | null
          is_anonymous?: boolean | null
          location?: string | null
          priority?: Database["public"]["Enums"]["complaint_priority"] | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["complaint_status"] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "complaints_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback_ratings: {
        Row: {
          complaint_id: string
          created_at: string | null
          feedback_text: string | null
          id: string
          rating: number | null
          user_id: string
        }
        Insert: {
          complaint_id: string
          created_at?: string | null
          feedback_text?: string | null
          id?: string
          rating?: number | null
          user_id: string
        }
        Update: {
          complaint_id?: string
          created_at?: string | null
          feedback_text?: string | null
          id?: string
          rating?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_ratings_complaint_id_fkey"
            columns: ["complaint_id"]
            isOneToOne: false
            referencedRelation: "complaints"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          complaint_id: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          complaint_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          complaint_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_complaint_id_fkey"
            columns: ["complaint_id"]
            isOneToOne: false
            referencedRelation: "complaints"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          language_preference:
            | Database["public"]["Enums"]["language_preference"]
            | null
          phone: string | null
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id: string
          language_preference?:
            | Database["public"]["Enums"]["language_preference"]
            | null
          phone?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          language_preference?:
            | Database["public"]["Enums"]["language_preference"]
            | null
          phone?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      suggestions: {
        Row: {
          category: string | null
          created_at: string | null
          description: string
          id: string
          is_anonymous: boolean | null
          title: string
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description: string
          id?: string
          is_anonymous?: boolean | null
          title: string
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string
          id?: string
          is_anonymous?: boolean | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          department: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          department?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff_or_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "student" | "staff" | "hod" | "admin" | "grc"
      complaint_category:
        | "Academic"
        | "Hostel"
        | "Canteen"
        | "Harassment"
        | "Infrastructure"
        | "Other"
      complaint_priority: "Low" | "Medium" | "High" | "Critical"
      complaint_status:
        | "Submitted"
        | "In Review"
        | "In Progress"
        | "Resolved"
        | "Closed"
      file_type: "image" | "document" | "audio" | "video"
      language_preference: "en" | "ml"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["student", "staff", "hod", "admin", "grc"],
      complaint_category: [
        "Academic",
        "Hostel",
        "Canteen",
        "Harassment",
        "Infrastructure",
        "Other",
      ],
      complaint_priority: ["Low", "Medium", "High", "Critical"],
      complaint_status: [
        "Submitted",
        "In Review",
        "In Progress",
        "Resolved",
        "Closed",
      ],
      file_type: ["image", "document", "audio", "video"],
      language_preference: ["en", "ml"],
    },
  },
} as const
