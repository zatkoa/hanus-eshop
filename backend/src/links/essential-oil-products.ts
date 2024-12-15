import { defineLink } from "@medusajs/utils";
import EssentialOilsModule from "../modules/essential-oils";
import ProductModule from "@medusajs/medusa/product"

export default defineLink(EssentialOilsModule.linkable.essentialOil, {
  linkable: ProductModule.linkable.product,
  deleteCascade: true,
  isList: true,
});
