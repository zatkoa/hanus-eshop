import * as zod from "zod";
import { FocusModal, Heading, Label, Input, Button } from "@medusajs/ui";
import { FormProvider, Controller, useForm } from "react-hook-form";
import { sdk } from "../libs/sdk";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type CreateEssentialOil = {
  name: string;
};

type CreateEssentialOilFormProps = {
  onClose: () => void;
};

const schema = zod.object({
  name: zod.string(),
});

export const CreateEssentialOilForm = ({
  onClose,
}: CreateEssentialOilFormProps) => {
  const [open, setOpen] = useState(false);

  let navigate = useNavigate();
  const form = useForm<zod.infer<typeof schema>>({
    defaultValues: {
      name: "",
    },
  });
  const { mutateAsync } = useMutation({
    mutationFn: (payload: CreateEssentialOil) =>
      sdk.client.fetch("/admin/essential-oils", {
        body: payload,
        method: "POST",
      }),
    onSuccess: () => {
      console.log("Essential Oil created!");
      onClose();
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error creating essential oil:", error);
    },
  });

  const handleSubmit = form.handleSubmit(({ name }) => {
    mutateAsync({
      name,
    });
  });

  return (
    <FocusModal open={open} onOpenChange={setOpen}>
      <FocusModal.Trigger asChild>
        <Button>Create</Button>
      </FocusModal.Trigger>
      <FocusModal.Content>
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit}
            className="flex h-full flex-col overflow-hidden"
          >
            <FocusModal.Header>
              <div className="flex items-center justify-end gap-x-2">
                <FocusModal.Close asChild>
                  <Button size="small" variant="secondary">
                    Cancel
                  </Button>
                </FocusModal.Close>
                <Button type="submit" size="small">
                  Save
                </Button>
              </div>
            </FocusModal.Header>
            <FocusModal.Body>
              <div className="flex flex-1 flex-col items-center overflow-y-auto">
                <div className="mx-auto flex w-full max-w-[720px] flex-col gap-y-8 px-2 py-16">
                  <div>
                    <Heading className="capitalize">
                      Create Essential Oil
                    </Heading>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      control={form.control}
                      name="name"
                      render={({ field }) => {
                        return (
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center gap-x-1">
                              <Label size="small" weight="plus">
                                Name
                              </Label>
                            </div>
                            <Input {...field} />
                          </div>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </FocusModal.Body>
          </form>
        </FormProvider>
      </FocusModal.Content>
    </FocusModal>
  );
};
