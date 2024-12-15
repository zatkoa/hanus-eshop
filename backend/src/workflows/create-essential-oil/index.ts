import { createWorkflow, WorkflowResponse } from "@medusajs/workflows-sdk";
import { EssentialOilDto } from "modules/essential-oils/types/essential-oil-dto";
import { createEssentialOilStep } from "./steps/create-essential-oil";

export type CreateEssentialOilInput = {
  essentialOil: Pick<EssentialOilDto, "name">;
};

export const createEssentialOilWorkflow = createWorkflow(
  "create-essential-oil",
  (input: CreateEssentialOilInput) => {
    const essentialOil: EssentialOilDto = createEssentialOilStep(
      input.essentialOil
    );

    return new WorkflowResponse({ essentialOil });
  }
);
