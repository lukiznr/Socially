export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Comment: {
        Row: {
          createdAt: string | null
          id: string
          parentId: string | null
          postsId: string
          text: string
          userId: string
        }
        Insert: {
          createdAt?: string | null
          id: string
          parentId?: string | null
          postsId: string
          text: string
          userId: string
        }
        Update: {
          createdAt?: string | null
          id?: string
          parentId?: string | null
          postsId?: string
          text?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Comment_parentId_fkey"
            columns: ["parentId"]
            isOneToOne: false
            referencedRelation: "Comment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Comment_postsId_fkey"
            columns: ["postsId"]
            isOneToOne: false
            referencedRelation: "Post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Comment_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Follows: {
        Row: {
          followerId: string
          followingId: string
        }
        Insert: {
          followerId: string
          followingId: string
        }
        Update: {
          followerId?: string
          followingId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Follows_followerId_fkey"
            columns: ["followerId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Follows_followingId_fkey"
            columns: ["followingId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Like: {
        Row: {
          id: string
          postsId: string
          userId: string
        }
        Insert: {
          id: string
          postsId: string
          userId: string
        }
        Update: {
          id?: string
          postsId?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Like_postsId_fkey"
            columns: ["postsId"]
            isOneToOne: false
            referencedRelation: "Post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Like_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Notification: {
        Row: {
          content: string
          createdAt: string
          id: string
          isRead: boolean
          notifType: Database["public"]["Enums"]["NotificationType"]
          title: string
          userId: string
        }
        Insert: {
          content: string
          createdAt?: string
          id: string
          isRead?: boolean
          notifType: Database["public"]["Enums"]["NotificationType"]
          title: string
          userId: string
        }
        Update: {
          content?: string
          createdAt?: string
          id?: string
          isRead?: boolean
          notifType?: Database["public"]["Enums"]["NotificationType"]
          title?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Notification_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Picture: {
        Row: {
          id: string
          postsId: string
          url: string
        }
        Insert: {
          id: string
          postsId: string
          url: string
        }
        Update: {
          id?: string
          postsId?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "Picture_postsId_fkey"
            columns: ["postsId"]
            isOneToOne: false
            referencedRelation: "Post"
            referencedColumns: ["id"]
          }
        ]
      }
      Post: {
        Row: {
          content: string | null
          createdAt: string
          draft: boolean
          id: string
          markdown: boolean
          updatedAt: string | null
          userId: string
        }
        Insert: {
          content?: string | null
          createdAt?: string
          draft?: boolean
          id: string
          markdown?: boolean
          updatedAt?: string | null
          userId: string
        }
        Update: {
          content?: string | null
          createdAt?: string
          draft?: boolean
          id?: string
          markdown?: boolean
          updatedAt?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Post_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Totp: {
        Row: {
          active: boolean
          attempts: number
          expiresAt: string | null
          hash: string
          id: string
        }
        Insert: {
          active?: boolean
          attempts?: number
          expiresAt?: string | null
          hash: string
          id: string
        }
        Update: {
          active?: boolean
          attempts?: number
          expiresAt?: string | null
          hash?: string
          id?: string
        }
        Relationships: []
      }
      User: {
        Row: {
          bio: string | null
          createdAt: string | null
          email: string
          id: string
          name: string
          picture: string | null
          updatedAt: string | null
          userName: string
        }
        Insert: {
          bio?: string | null
          createdAt?: string | null
          email: string
          id: string
          name: string
          picture?: string | null
          updatedAt?: string | null
          userName: string
        }
        Update: {
          bio?: string | null
          createdAt?: string | null
          email?: string
          id?: string
          name?: string
          picture?: string | null
          updatedAt?: string | null
          userName?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      NotificationType: "Announcement" | "Message" | "Interaction" | "Warning"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
