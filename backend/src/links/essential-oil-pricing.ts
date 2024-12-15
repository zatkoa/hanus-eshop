import { defineLink } from "@medusajs/utils";
import EssentialOilsModule from "../modules/essential-oils";
import PricingModule from "@medusajs/medusa/pricing";

export default defineLink(EssentialOilsModule.linkable.essentialOil, {
  linkable: PricingModule.linkable.priceSet,
  deleteCascade: true,
});
