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
      ai_chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "ai_chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_chat_sessions: {
        Row: {
          created_at: string
          id: string
          material_id: string | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          material_id?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          material_id?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_chat_sessions_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_chat_sessions_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "trending_materials"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          requirement_type: string
          requirement_value: number
        }
        Insert: {
          created_at?: string
          description: string
          icon: string
          id?: string
          name: string
          requirement_type: string
          requirement_value: number
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          requirement_type?: string
          requirement_value?: number
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          created_at: string
          id: string
          material_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          material_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          material_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "trending_materials"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          material_id: string
          parent_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          material_id: string
          parent_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          material_id?: string
          parent_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "trending_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_topics: {
        Row: {
          course: string
          created_at: string
          department: string
          id: string
          status: string
          topic_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          course: string
          created_at?: string
          department: string
          id?: string
          status?: string
          topic_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          course?: string
          created_at?: string
          department?: string
          id?: string
          status?: string
          topic_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      forum_answers: {
        Row: {
          content: string
          created_at: string
          id: string
          is_accepted: boolean
          question_id: string
          updated_at: string
          upvotes: number
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_accepted?: boolean
          question_id: string
          updated_at?: string
          upvotes?: number
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_accepted?: boolean
          question_id?: string
          updated_at?: string
          upvotes?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "forum_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_questions: {
        Row: {
          content: string
          course: string
          created_at: string
          department: string
          id: string
          title: string
          updated_at: string
          upvotes: number
          user_id: string
          views: number
        }
        Insert: {
          content: string
          course: string
          created_at?: string
          department: string
          id?: string
          title: string
          updated_at?: string
          upvotes?: number
          user_id: string
          views?: number
        }
        Update: {
          content?: string
          course?: string
          created_at?: string
          department?: string
          id?: string
          title?: string
          updated_at?: string
          upvotes?: number
          user_id?: string
          views?: number
        }
        Relationships: []
      }
      forum_upvotes: {
        Row: {
          answer_id: string | null
          created_at: string
          id: string
          question_id: string | null
          user_id: string
        }
        Insert: {
          answer_id?: string | null
          created_at?: string
          id?: string
          question_id?: string | null
          user_id: string
        }
        Update: {
          answer_id?: string | null
          created_at?: string
          id?: string
          question_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_upvotes_answer_id_fkey"
            columns: ["answer_id"]
            isOneToOne: false
            referencedRelation: "forum_answers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_upvotes_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "forum_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      material_downloads: {
        Row: {
          downloaded_at: string
          downloader_user_id: string | null
          id: string
          material_id: string
        }
        Insert: {
          downloaded_at?: string
          downloader_user_id?: string | null
          id?: string
          material_id: string
        }
        Update: {
          downloaded_at?: string
          downloader_user_id?: string | null
          id?: string
          material_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "material_downloads_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_downloads_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "trending_materials"
            referencedColumns: ["id"]
          },
        ]
      }
      material_reports: {
        Row: {
          created_at: string
          description: string | null
          id: string
          material_id: string
          reason: string
          reporter_user_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          material_id: string
          reason: string
          reporter_user_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          material_id?: string
          reason?: string
          reporter_user_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "material_reports_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_reports_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "trending_materials"
            referencedColumns: ["id"]
          },
        ]
      }
      material_requests: {
        Row: {
          course: string
          created_at: string
          department: string
          description: string | null
          id: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          course: string
          created_at?: string
          department: string
          description?: string | null
          id?: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          course?: string
          created_at?: string
          department?: string
          description?: string | null
          id?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      material_tags: {
        Row: {
          created_at: string
          id: string
          material_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          material_id: string
          tag_id: string
        }
        Update: {
          created_at?: string
          id?: string
          material_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "material_tags_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_tags_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "trending_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      material_views: {
        Row: {
          id: string
          ip_address: string | null
          material_id: string
          viewed_at: string
          viewer_user_id: string | null
        }
        Insert: {
          id?: string
          ip_address?: string | null
          material_id: string
          viewed_at?: string
          viewer_user_id?: string | null
        }
        Update: {
          id?: string
          ip_address?: string | null
          material_id?: string
          viewed_at?: string
          viewer_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "material_views_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_views_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "trending_materials"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          course: string
          created_at: string | null
          department: string
          description: string | null
          download_count: number
          exam_semester: string | null
          exam_year: string | null
          file_path: string
          file_size: string
          file_type: string
          id: string
          material_type: string
          title: string
          uploaded_by: string
          uploaded_by_user_id: string
          view_count: number
        }
        Insert: {
          course: string
          created_at?: string | null
          department: string
          description?: string | null
          download_count?: number
          exam_semester?: string | null
          exam_year?: string | null
          file_path: string
          file_size: string
          file_type: string
          id?: string
          material_type?: string
          title: string
          uploaded_by: string
          uploaded_by_user_id: string
          view_count?: number
        }
        Update: {
          course?: string
          created_at?: string | null
          department?: string
          description?: string | null
          download_count?: number
          exam_semester?: string | null
          exam_year?: string | null
          file_path?: string
          file_size?: string
          file_type?: string
          id?: string
          material_type?: string
          title?: string
          uploaded_by?: string
          uploaded_by_user_id?: string
          view_count?: number
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean
          reference_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          reference_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          reference_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      point_transactions: {
        Row: {
          action_type: string
          created_at: string
          id: string
          points: number
          reference_id: string | null
          user_id: string
        }
        Insert: {
          action_type: string
          created_at?: string
          id?: string
          points: number
          reference_id?: string | null
          user_id: string
        }
        Update: {
          action_type?: string
          created_at?: string
          id?: string
          points?: number
          reference_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          email: string | null
          full_name: string | null
          id: string
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      ratings: {
        Row: {
          created_at: string
          id: string
          material_id: string
          rating: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          material_id: string
          rating: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          material_id?: string
          rating?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ratings_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "trending_materials"
            referencedColumns: ["id"]
          },
        ]
      }
      recently_viewed: {
        Row: {
          id: string
          material_id: string
          user_id: string
          viewed_at: string
        }
        Insert: {
          id?: string
          material_id: string
          user_id: string
          viewed_at?: string
        }
        Update: {
          id?: string
          material_id?: string
          user_id?: string
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recently_viewed_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recently_viewed_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "trending_materials"
            referencedColumns: ["id"]
          },
        ]
      }
      study_group_members: {
        Row: {
          group_id: string
          id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string
          role?: string
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      study_groups: {
        Row: {
          course: string | null
          created_at: string
          created_by: string
          department: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          course?: string | null
          created_at?: string
          created_by: string
          department: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          course?: string | null
          created_at?: string
          created_by?: string
          department?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      study_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          material_id: string | null
          title: string
          updated_at: string
          user_id: string
          visibility: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          material_id?: string | null
          title: string
          updated_at?: string
          user_id: string
          visibility?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          material_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_notes_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_notes_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "trending_materials"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_activity_log: {
        Row: {
          activity_date: string
          activity_type: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          activity_date?: string
          activity_type: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          activity_date?: string
          activity_type?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_points: {
        Row: {
          created_at: string
          total_points: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          total_points?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          total_points?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      trending_materials: {
        Row: {
          course: string | null
          created_at: string | null
          department: string | null
          description: string | null
          download_count: number | null
          exam_semester: string | null
          exam_year: string | null
          file_path: string | null
          file_size: string | null
          file_type: string | null
          id: string | null
          material_type: string | null
          title: string | null
          trending_score: number | null
          uploaded_by: string | null
          uploaded_by_user_id: string | null
          view_count: number | null
        }
        Insert: {
          course?: string | null
          created_at?: string | null
          department?: string | null
          description?: string | null
          download_count?: number | null
          exam_semester?: string | null
          exam_year?: string | null
          file_path?: string | null
          file_size?: string | null
          file_type?: string | null
          id?: string | null
          material_type?: string | null
          title?: string | null
          trending_score?: never
          uploaded_by?: string | null
          uploaded_by_user_id?: string | null
          view_count?: number | null
        }
        Update: {
          course?: string | null
          created_at?: string | null
          department?: string | null
          description?: string | null
          download_count?: number | null
          exam_semester?: string | null
          exam_year?: string | null
          file_path?: string | null
          file_size?: string | null
          file_type?: string | null
          id?: string | null
          material_type?: string | null
          title?: string | null
          trending_score?: never
          uploaded_by?: string | null
          uploaded_by_user_id?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      award_points: {
        Args: {
          p_action_type: string
          p_points: number
          p_reference_id?: string
          p_user_id: string
        }
        Returns: undefined
      }
      check_and_award_badges: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      get_user_streak: { Args: { p_user_id: string }; Returns: number }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_download_count: {
        Args: { p_material_id: string }
        Returns: undefined
      }
      is_admin_email:
        | { Args: { email: string }; Returns: boolean }
        | { Args: { p_user_id: string }; Returns: boolean }
      track_material_view: {
        Args: {
          p_ip_address?: string
          p_material_id: string
          p_viewer_user_id?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
