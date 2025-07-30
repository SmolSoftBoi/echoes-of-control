export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      game: {
        Row: {
          id: string;
          inserted_at: string;
          updated_at: string;
          name: string;
          state: Json;
          user_id: string;
        };
        Insert: {
          id?: string;
          inserted_at?: string;
          updated_at?: string;
          name: string;
          state?: Json;
          user_id?: string;
        };
        Update: {
          id?: string;
          inserted_at?: string;
          updated_at?: string;
          name?: string;
          state?: Json;
          user_id?: string;
        };
      };
    };
  };
}
