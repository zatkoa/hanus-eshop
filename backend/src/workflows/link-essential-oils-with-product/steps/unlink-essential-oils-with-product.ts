import { createStep, StepResponse } from "@medusajs/workflows-sdk";
import { ContainerRegistrationKeys, Modules } from "@medusajs/utils";
import { ESSENTIAL_OILS_MODULE } from "modules/essential-oils";

type UnlinkEssentialOilsWithProductStepInput = {
  productId: string;
  essentialOilsId?: string[] | null;
};

export const unlinkEssentialOilsWithProductStep = createStep(
  "unlink-essential-oils-with-product",
  async (data: UnlinkEssentialOilsWithProductStepInput, { container }) => {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

    logger.info(
      "UnLink essential oils with product step STARTING: " + JSON.stringify(data)
    );
    if (!data.essentialOilsId || data.essentialOilsId.length === 0) {
      logger.info("Essential oils ids are empty");

      return;
    }

    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    const response = await remoteLink.dismiss(
      data.essentialOilsId.map((essential_oil_id) => ({
        [ESSENTIAL_OILS_MODULE]: {
          essential_oil_id,
        },
        [Modules.PRODUCT]: {
          product_id: data.productId,
        },
      }))
    );

    logger.info(
      "UnLink essential oils with product step RESULT: " +
        JSON.stringify(response)
    );

    return new StepResponse(data, data);
  },
  async (data, { container }) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    await remoteLink.create(
      data.essentialOilsId.map((essential_oil_id) => ({
        [ESSENTIAL_OILS_MODULE]: {
          essential_oil_id,
        },
        [Modules.PRODUCT]: {
          product_id: data.productId,
        },
      }))
    );
  }
);
