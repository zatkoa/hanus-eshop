import { model } from "@medusajs/utils";

const EssentialOil = model.define("essential_oil", {
  id: model.id().primaryKey(),
  name: model.text(),
});

export default EssentialOil;
