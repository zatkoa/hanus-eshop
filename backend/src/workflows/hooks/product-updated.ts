import { updateProductsWorkflow } from "@medusajs/core-flows";
import {
  linkEssentialOilsWithProductWorkflow,
  LinkEssentialOilsWithProductWorkflowInput,
} from "workflows/link-essential-oils-with-product";

updateProductsWorkflow.hooks.productsUpdated(
  async ({ products, additional_data }, { container }) => {
    const workflow = linkEssentialOilsWithProductWorkflow(container);

    for (const product of products) {
      const input: LinkEssentialOilsWithProductWorkflowInput = {
        product,
        additional_data,
      };
      await workflow.run({
        input,
      });
    }
  }
);
