"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { FormInput } from "@/components/form/form-input";
import FormSubmitButton from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAction } from "@/hooks/useActions";
import { registerUser } from "@/actions/register-user";

type Props = {};

const SignUpPage = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  const { execute, fieldErrors, isLoading } = useAction(registerUser, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const onRegisterHandler = (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) return;

    execute({ name, email, password });
  };
  return (
    <div className="mt-20">
      <Dialog open={true}>
        <DialogContent className="w-full ">
          <DialogHeader>
            <DialogTitle className="text-2xl">Welcome to Appointy</DialogTitle>
            <DialogDescription>Create an account</DialogDescription>
          </DialogHeader>
          <div>
            <form action={onRegisterHandler} className="space-y-4">
              <FormInput
                id="name"
                placeholder="First Name & Last Name"
                errors={fieldErrors}
              />
              <FormInput
                id="email"
                placeholder="example@gmail.com"
                errors={fieldErrors}
              />
              <FormInput
                id="password"
                type="password"
                placeholder="*********"
                errors={fieldErrors}
              />
              <div className="w-full flex flex-col pt-4 space-y-3">
                <div className="flex items-center gap-4 w-full flex-col sm:flex-row">
                  <FormSubmitButton
                    innerText="Register"
                    customClasses="w-full"
                  />
                  <Button
                    type="button"
                    className="flex gap-2 items-center w-full"
                    size={"sm"}
                    disabled={isLoading}
                  >
                    <div className="h-6 w-6 relative">
                      <Image
                        src={"/google-icon.svg"}
                        fill
                        alt="logo"
                        sizes="20vw"
                      />
                    </div>
                    <p>
                      Continue with <b>Google</b>
                    </p>
                  </Button>
                </div>
                <Button type="button" variant={"link"} size={"sm"} asChild>
                  <Link href="/auth/sign-in">Already have an account ?</Link>
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUpPage;
