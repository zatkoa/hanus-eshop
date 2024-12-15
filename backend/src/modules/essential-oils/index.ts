import { Module } from "@medusajs/utils";
import EssentialOilModuleService from "./services/service";

export const ESSENTIAL_OILS_MODULE = "essential_oils";

export default Module(ESSENTIAL_OILS_MODULE, {
  service: EssentialOilModuleService,
});
