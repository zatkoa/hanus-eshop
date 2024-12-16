import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Container, Heading } from "@medusajs/ui";
import { useParams } from "react-router-dom"

const EssentialOilsDetailPage = () => {
    const { id } = useParams()

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h2">Essential oils</Heading>
          {/* <Button>Button</Button> */}
        </div>
      </div>
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "EssentialOilsDetail",
  //   icon: TagSolid,
});

export default EssentialOilsDetailPage;
