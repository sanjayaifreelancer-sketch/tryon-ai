import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function uploadImage(base64: string, bucket: string, filename: string) {
  const buffer = Buffer.from(base64, "base64");
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filename, buffer, {
      contentType: "image/jpeg",
      upsert: true,
    });
  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filename);
  return urlData.publicUrl;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const path = new URL(req.url || "/", `http://${req.headers.host}`).pathname;

  try {
    if (req.method === "POST") {
      const { userImage, clothingImage } = req.body;
      if (!userImage || !clothingImage) {
        return res.status(400).json({ error: "userImage and clothingImage are required" });
      }

      const userId = token || "anonymous";
      const timestamp = Date.now();

      const userImageUrl = await uploadImage(
        userImage.split(",")[1] || userImage,
        "user-photos",
        `${userId}/${timestamp}-user.jpg`
      );
      const clothingImageUrl = await uploadImage(
        clothingImage.split(",")[1] || clothingImage,
        "clothing-images",
        `${userId}/${timestamp}-clothing.jpg`
      );

      // Mock result - replace with actual AI model
      const { data: result, error: dbError } = await supabase
        .from("try_ons")
        .insert({
          user_id: userId,
          user_image_url: userImageUrl,
          clothing_image_url: clothingImageUrl,
          result_image_url: clothingImageUrl,
          label: "Try-On Result",
        })
        .select()
        .single();

      if (dbError) throw dbError;

      return res.status(200).json(result);
    }

    if (req.method === "GET") {
      if (path.includes("/recent")) {
        const { data, error } = await supabase
          .from("try_ons")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(20);

        if (error) throw error;
        return res.status(200).json(data);
      }

      if (path.includes("/wardrobe")) {
        const { data, error } = await supabase
          .from("wardrobe_items")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        return res.status(200).json(data);
      }

      return res.status(200).json({ status: "ok" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
