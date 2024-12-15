import {
  createStep,
  StepResponse,
} from "@medusajs/workflows-sdk";
import EssentialOilModuleService from "modules/essential-oils/services/service";
import { ESSENTIAL_OILS_MODULE } from "modules/essential-oils";
import { InferTypeOf } from "@medusajs/types";
import EssentialOil from "modules/essential-oils/models/essential-oil";
import { promiseAll } from "@medusajs/utils";

type DeleteEssentialOilsStepInput = {
  essentialOils: InferTypeOf<typeof EssentialOil>[];
};

export const deleteEssentialOilsStep = createStep(
  "delete-essential-oil",
  async ({ essentialOils }: DeleteEssentialOilsStepInput, { container }) => {
    const essentialOilModuleService: EssentialOilModuleService =
      container.resolve(ESSENTIAL_OILS_MODULE);

    const prevData: InferTypeOf<typeof EssentialOil>[] = [];

    try {
      await promiseAll(
        essentialOils.map(async (essentialOil) => {
          await essentialOilModuleService.deleteEssentialOils(essentialOil);

          prevData.push(essentialOil);
        })
      );
    } catch (error) {
      return StepResponse.permanentFailure(
        `An error occurred: ${error}`,
        prevData
      );
    }

    return new StepResponse(essentialOils, essentialOils);
  },
  async (essentialOils, { container }) => {
    const essentialOilModuleService: EssentialOilModuleService =
      container.resolve(ESSENTIAL_OILS_MODULE);

    await essentialOilModuleService.createEssentialOils(essentialOils);
  }
);
