import fs from "fs/promises";
import path from "path";

export const del = async (filePath: string): Promise<void> => {
  try {
    const fullPath = path.join(process.cwd(), "public", filePath); // Sesuaikan path ini dengan lokasi file
    await fs.unlink(fullPath);
    console.log(`File ${filePath} berhasil dihapus`);
  } catch (error) {
    console.error(`Gagal menghapus file: ${filePath}`, error);
    throw new Error("Gagal menghapus file.");
  }
};
