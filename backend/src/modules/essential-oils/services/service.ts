import { MedusaService } from "@medusajs/utils";
import EssentialOil from "../models/essential-oil";

class EssentialOilModuleService extends MedusaService({
  EssentialOil,
}) {}

export default EssentialOilModuleService;
