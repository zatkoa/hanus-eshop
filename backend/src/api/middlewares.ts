import { validateAndTransformBody } from "@medusajs/framework";
import { defineMiddlewares } from "@medusajs/framework";
import { z } from "zod";
import { PostEssentialOilsSchema } from "./admin/essential-oils/validators";

export default defineMiddlewares({
  routes: [
    {
      method: "POST",
      matcher: "/admin/products",
      additionalDataValidator: {
        essential_oils_ids: z.array(z.string()).nullish(),
      },
    },
    {
      method: "POST",
      matcher: "/admin/products/:id",
      additionalDataValidator: {
        essential_oils_ids: z.array(z.string()).nullish(),
      },
    },
    {
      matcher: "/admin/essential-oils",
      method: "POST",
      middlewares: [validateAndTransformBody(PostEssentialOilsSchema)],
    },
  ],
});
