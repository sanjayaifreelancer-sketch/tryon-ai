import { supabase } from "../lib/supabase";

import { Platform } from "react-native";

const API_BASE =
  Platform.OS === "web"
    ? "/api/tryon"
    : "https://qluwvjfzkyicbxbwumgx.supabase.co/functions/v1/api-tryon";
const SUPABASE_ANON_KEY =
  "sb_publishable_mh6WzISPQb6X87Xfiz2j_g_q8CyEG65";

export interface TryOnRequest {
  userImage: string;
  clothingImage: string;
}

export interface TryOnResponse {
  id: string;
  resultImage: string;
  userImageUrl?: string;
  clothingImageUrl?: string;
  label?: string;
  favorited?: boolean;
  created_at?: string;
}

export const tryOnApi = {
  async generateTryOn(data: TryOnRequest): Promise<TryOnResponse> {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error("Not authenticated");
    }

    const formData = new FormData();
    formData.append("user_image", {
      uri: data.userImage,
      type: "image/jpeg",
      name: "user.jpg",
    } as any);
    formData.append("clothing_image", {
      uri: data.clothingImage,
      type: "image/jpeg",
      name: "clothing.jpg",
    } as any);

    const response = await fetch(`${API_BASE}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        apikey: SUPABASE_ANON_KEY,
      },
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || "Try-on generation failed");
    }

    return response.json();
  },

  async getRecentTryOns(): Promise<TryOnResponse[]> {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error("Not authenticated");
    }

    const response = await fetch(`${API_BASE}/recent`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        apikey: SUPABASE_ANON_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recent try-ons");
    }

    return response.json();
  },

  async getWardrobeItems(): Promise<any[]> {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error("Not authenticated");
    }

    const response = await fetch(`${API_BASE}/wardrobe`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        apikey: SUPABASE_ANON_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch wardrobe");
    }

    return response.json();
  },

  async signInAnonymously() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) return session;
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
    return data;
  },

  async ensureSession() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      await supabase.auth.signInAnonymously();
    }
    return session;
  },

  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  },
};
