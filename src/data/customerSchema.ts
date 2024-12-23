import { z } from "zod";

export const createCustomerSchema = z.object({
  // Done
  username: z
    .string()
    .min(4, { message: "Minimal 4 karakter." })
    .max(30, { message: "Maximal 100 karakter." }),

  // Done
  fullname: z
    .string()
    .min(4, { message: "Minimal 10 karakter." })
    .max(100, { message: "Maximal 1500 karakter." })
    .regex(/^[a-zA-Z -]+$/, {
      message: "Hanya boleh huruf (a-z), spasi dan strip (-)",
    }),

  // Done
  ontName: z.string().optional(),

  redamanOlt: z.string().optional(),

  // Done
  address: z.string().optional(),

  // Done
  phoneNumber: z.string().optional(),

  // Done
  paketId: z.string().min(1, { message: "Paket harus dipilih" }),

  // Done
  diskon: z.number().optional().default(0),
  // Done
  areaId: z.string().optional(),
  // Done
  odpId: z.string().optional(),

  // Done
  modem: z.string().trim().min(1, { message: "Modem harus dipilih" }),
});

export type createCustomerSchema = z.infer<typeof createCustomerSchema>;

export const updatCustomerSchema = z.object({
  // Done
  username: z.string(),
  fullname: z.string().optional(),
  ontName: z.string().optional() || "",
  redamanOlt: z.string().optional() || "",
  address: z.string().optional() || "",
  phoneNumber: z.string().optional(),
  diskon: z.number(),
  paketId: z.string(),
  areaId: z.string().optional() || "",
  odpId: z.string().optional() || "",
  modemId: z.string().optional() || "",
});

export type UpdateCustomerSchema = z.infer<typeof updatCustomerSchema>;
