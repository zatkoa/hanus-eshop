import { z } from "zod";

export const PostEssentialOilsSchema = z.object({
  name: z.string().max(255),
}).strict();
