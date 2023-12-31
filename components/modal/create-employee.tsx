"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Role } from "@prisma/client";

import { createUser } from "@/actions/create-user";

import { useAction } from "@/hooks/useActions";
import { useCreateUserModal } from "@/hooks/useCreateUser";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormInput } from "@/components/form/form-input";
import FormSubmitButton from "@/components/form/form-submit";
import FormRadioInput from "@/components/form/form-radio-input";

type Props = {};

const CreateUserModal = (props: Props) => {
  const router = useRouter();

  const [role, setRole] = useState<Role>(Role.EMPLOYEE);
  const isOpen = useCreateUserModal((state) => state.isOpen);
  const onClose = useCreateUserModal((state) => state.onClose);

  const { execute, fieldErrors } = useAction(createUser, {
    onSuccess: (data) => {
      toast.success(`User ${data.name} created`);
      router.refresh();
      onClose();
    },
    onError: (error) => toast.error(error),
  });

  const onCreateUserHandler = (formData: FormData) => {
    // Access values from formData
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    execute({ name, email, password, role });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" py-2 px-4">
        <DialogHeader className="w-full text-neutral-700">
          <DialogTitle className="text-2xl dark:text-white text-neutral-700">
            Create a new employee
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-10 my-2" action={onCreateUserHandler}>
          <div className="space-y-4">
            <FormInput id="name" placeholder="Fullname" />
            <FormInput id="email" placeholder="Email" />
            <FormInput id="password" placeholder="Password" />
            <FormRadioInput
              errors={fieldErrors}
              onChange={(e) => {
                setRole(e);
              }}
              value={role}
              groupItems={[
                { id: "emp", value: Role.EMPLOYEE },
                { id: "user", value: Role.USER },
              ]}
              label="Role"
            />
          </div>
          <FormSubmitButton innerText="Create" customClasses="w-full " />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
