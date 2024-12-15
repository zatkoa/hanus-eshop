import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { MedusaError } from "@medusajs/utils";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const query = req.scope.resolve("query");

  if (!req.params?.id) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "No essential oil id provided"
    );
  }

  const { data: essentialOils } = await query.graph({
    entity: "essential_oil",
    fields: ["*"],
    filters: {
      id: req.params.id,
    },
    pagination: {
      take: 1,
      skip: 0,
    },
  });

  if (!essentialOils || essentialOils.length === 0) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      "Essential oil with given id not found"
    );
  }

  res.json(essentialOils[0]);
}
