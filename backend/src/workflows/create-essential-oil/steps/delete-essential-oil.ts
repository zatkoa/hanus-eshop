import {
  createStep,
  StepResponse,
} from "@medusajs/workflows-sdk";
import EssentialOilModuleService from "modules/essential-oils/services/service";
import { ESSENTIAL_OILS_MODULE } from "modules/essential-oils";
import { InferTypeOf } from "@medusajs/types";
import EssentialOil from "modules/essential-oils/models/essential-oil";

type DeleteEssentialOilStepInput = {
  essentialOil: InferTypeOf<typeof EssentialOil>;
};

export const deleteEssentialOilStep = createStep(
  "delete-essential-oil",
  async ({ essentialOil }: DeleteEssentialOilStepInput, { container }) => {
    const essentialOilModuleService: EssentialOilModuleService =
      container.resolve(ESSENTIAL_OILS_MODULE);

    await essentialOilModuleService.deleteEssentialOils(essentialOil.id);

    return new StepResponse(essentialOil, essentialOil);
  },
  async (oil, { container }) => {
    const essentialOilModuleService: EssentialOilModuleService =
      container.resolve(ESSENTIAL_OILS_MODULE);

    await essentialOilModuleService.createEssentialOils(oil);
  }
);
