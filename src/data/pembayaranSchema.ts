import { z } from "zod";

export const createPembayaranSchema = z.object({
  userId: z.string(),
  adminId: z.string(),
  periode: z.date().optional(), // DateTime as ISO string
  ppn: z.number().optional(),
  metode: z
    .enum(["Cash", "Transfer BRI", "Transfer BNI"])
    .optional()
    .default("Cash"),
  totalBayar: z.number().positive("Total bayar harus lebih dari 0"),
});

export type createPembayaranSchema = z.infer<typeof createPembayaranSchema>;

export const updatPembayaranSchema = z.object({
  id: z.string(),
  userId: z.string(),
});

export type updatPembayaranSchema = z.infer<typeof updatPembayaranSchema>;
