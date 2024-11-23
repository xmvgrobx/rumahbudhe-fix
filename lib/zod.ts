
import { z } from 'zod';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const MenuSchema = z.object({
  nama: z
    .string()
    .min(1, { message: "Nama menu wajib diisi" })
    .max(100, { message: "Nama menu terlalu panjang" }),

  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `Ukuran file maksimal 5MB`,
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Format file harus berupa .jpg, .jpeg, .png atau .webp",
    }),

  harga: z
    .string()
    .min(1, { message: "Harga wajib diisi" })
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "Harga harus berupa angka"
    })
    .refine((val) => val >= 0, {
      message: "Harga tidak boleh negatif"
    }),

  keterangan: z
    .string()
    .min(1, { message: "Keterangan wajib diisi" })
    .max(500, { message: "Keterangan terlalu panjang" }),
});

// This type can be used for TypeScript type safety
export type MenuSchemaType = z.infer<typeof MenuSchema>;