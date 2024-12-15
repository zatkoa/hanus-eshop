import { createStep, StepResponse } from "@medusajs/workflows-sdk";
import EssentialOilModuleService from "modules/essential-oils/services/service";
import { ESSENTIAL_OILS_MODULE } from "modules/essential-oils";
import { EssentialOilDto } from "modules/essential-oils/types/essential-oil-dto";

type CreateCustomStepInput = Pick<EssentialOilDto, 'name'>;

export const createEssentialOilStep = createStep(
  "create-essential-oil",
  async (data: CreateCustomStepInput, { container }) => {

    const essentialOilModuleService: EssentialOilModuleService =
      container.resolve(ESSENTIAL_OILS_MODULE);

    const oil = await essentialOilModuleService.createEssentialOils(data);

    return new StepResponse(oil, oil);
  },
  async (oil, { container }) => {
    const essentialOilModuleService: EssentialOilModuleService =
      container.resolve(ESSENTIAL_OILS_MODULE);

    await essentialOilModuleService.deleteEssentialOils(oil.id);
  }
);
