import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { PostEssentialOilsSchema } from "./validators";
import { z } from "zod";
import { createEssentialOilWorkflow } from "workflows/create-essential-oil";

type PostEssentialOilsSchemaType = z.infer<typeof PostEssentialOilsSchema>;

export async function POST(
  req: MedusaRequest<PostEssentialOilsSchemaType>,
  res: MedusaResponse
): Promise<void> {
  const { result } = await createEssentialOilWorkflow(req.scope).run({
    input: { essentialOil: req.validatedBody },
  });

  res.json({ essentialOil: result.essentialOil });
}

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const query = req.scope.resolve("query");

  const { data: essentialOils, metadata } = await query.graph({
    entity: "essential_oil",
    ...req.remoteQueryConfig,
  });

  res.json({
    essentialOils,
    count: metadata?.count,
    limit: metadata?.take,
    offset: metadata?.skip,
  });
}
