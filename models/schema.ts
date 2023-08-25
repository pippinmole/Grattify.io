export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      post_likes: {
        Row: {
          created_at: string | null
          id: number
          post_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          post_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          post_id?: number | null
          user_id?: string | null
        }
      }
      posts: {
        Row: {
          author_id: string | null
          content: string | null
          created_at: string | null
          id: number
          images: string[]
          title: string | null
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: number
          images: string[]
          title?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: number
          images?: string[]
          title?: string | null
        }
      }
      preferences: {
        Row: {
          email_can_post: boolean | null
          id: string
        }
        Insert: {
          email_can_post?: boolean | null
          id: string
        }
        Update: {
          email_can_post?: boolean | null
          id?: string
        }
      }
      profiles: {
        Row: {
          bio: string
          created_at: string
          id: string
          profile_picture: string
          username: string
        }
        Insert: {
          bio?: string
          created_at?: string
          id: string
          profile_picture?: string
          username: string
        }
        Update: {
          bio?: string
          created_at?: string
          id?: string
          profile_picture?: string
          username?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

