import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Spinner, TagSolid } from "@medusajs/icons";
import { Container } from "@medusajs/ui";
import { useQuery } from "@tanstack/react-query";
import { sdk } from "../../libs/sdk";
import { useMemo, useState } from "react";
import { Table } from "../../components/table";
import { CreateEssentialOilForm } from "../../components/create-essential-oil-form";
import { Header } from "../../components/header";

type EssentialOilsResponse = {
  essentialOils: {
    id: string;
    name: string;
  }[];
  count: number;
  limit: number;
  offset: number;
};

const EssentialOilsPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 15;
  const offset = useMemo(() => {
    return currentPage * limit;
  }, [currentPage]);

  const { data, isLoading, refetch } = useQuery<EssentialOilsResponse>({
    queryFn: () =>
      sdk.client.fetch(`/admin/essential-oils`, {
        query: {
          limit,
          offset,
        },
      }),
    queryKey: [["essentialOils", limit, offset]],
  });

  const handleModalClose = () => {
    refetch(); // Reload the data when the modal is closed
  };

  return (
    <Container className="divide-y p-0">
      <Header
        title="Essential Oils"
        actions={[
          {
            type: "custom",
            children: <CreateEssentialOilForm onClose={handleModalClose} />,
          },
        ]}
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <Spinner className="animate-spin" />
        </div>
      ) : (
        <Table
          columns={[
            {
              key: "id",
              label: "#",
            },
            {
              key: "name",
              label: "Name",
            },
          ]}
          data={data?.essentialOils || []}
          pageSize={data?.limit || limit}
          count={data?.count || 0}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "EssentialOils",
  icon: TagSolid,
});

export default EssentialOilsPage;
