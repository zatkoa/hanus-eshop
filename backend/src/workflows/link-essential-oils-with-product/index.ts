import { ProductDTO } from "@medusajs/types";
import {
  createWorkflow,
  transform,
  when,
  WorkflowResponse,
} from "@medusajs/workflows-sdk";
import { useQueryGraphStep } from "@medusajs/core-flows";
import essentialOilProductsLink from "../../links/essential-oil-products";
import { linkEssentialOilsWithProductStep } from "workflows/link-essential-oils-with-product/steps/link-essential-oils-with-product";
import { unlinkEssentialOilsWithProductStep } from "workflows/link-essential-oils-with-product/steps/unlink-essential-oils-with-product";

export type LinkEssentialOilsWithProductWorkflowInput = {
  product: ProductDTO;
  additional_data?: {
    essential_oils_ids?: string[] | null;
  };
};

export const linkEssentialOilsWithProductWorkflow = createWorkflow(
  "link-essential-oils-with-product",
  (input: LinkEssentialOilsWithProductWorkflowInput) => {
    console.log("Worklow loaded");

    const { data: linkedEssentialOilsProduct } = useQueryGraphStep({
      entity: essentialOilProductsLink.entryPoint,
      fields: ["*", "product.*", "essential_oil.*"],
      filters: {
        product_id: input.product.id,
      },
    });

    when(
      "unlink-old-essential-oils-from-product",
      {
        linkedEssentialOilsProduct,
      },
      (data) => data.linkedEssentialOilsProduct?.length > 0
    ).then(() => {
      const linkedEssentialOilsIds = transform(
        linkedEssentialOilsProduct,
        (data) => {
          console.log("xxx", data);
          return data.map((oil) => oil.essential_oil_id);
        }
      );

      unlinkEssentialOilsWithProductStep({
        productId: input.product.id,
        essentialOilsId: linkedEssentialOilsIds,
      });

      return;
    });

    when(
      "link-essential-oils-with-product",
      {
        input,
      },
      (data) => data.input.additional_data?.essential_oils_ids?.length > 0
    ).then(() => {
      linkEssentialOilsWithProductStep({
        productId: input.product.id,
        essentialOilsId: input.additional_data?.essential_oils_ids,
      });

      return;
    });

    return new WorkflowResponse({});
  }
);
