import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Faz upload de imagem para o Cloudinary
 */
export async function uploadImage(
  file: File,
  folder: string = "menu-global"
): Promise<string> {
  try {
    // Converte File para base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload para Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder,
      resource_type: "auto",
      transformation: [
        { width: 800, height: 600, crop: "limit" }, // Limita tamanho
        { quality: "auto:good" }, // Otimiza qualidade
        { fetch_format: "auto" }, // Formato automático (WebP quando possível)
      ],
    });

    return result.secure_url;
  } catch (error) {
    console.error("Erro no upload Cloudinary:", error);
    throw new Error("Falha ao fazer upload da imagem");
  }
}

/**
 * Deleta imagem do Cloudinary
 */
export async function deleteImage(url: string): Promise<boolean> {
  try {
    // Extrai o public_id da URL
    const parts = url.split("/");
    const fileWithExt = parts[parts.length - 1];
    const publicId = fileWithExt.split(".")[0];
    const folder = parts[parts.length - 2];

    await cloudinary.uploader.destroy(`${folder}/${publicId}`);
    return true;
  } catch (error) {
    console.error("Erro ao deletar imagem:", error);
    return false;
  }
}