"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { FormInput } from "@/components/form/form-input";
import FormSubmitButton from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAction } from "@/hooks/useActions";

import toast from "react-hot-toast";
import { signInUser } from "@/actions/signin-user";
import { useRouter } from "next/navigation";

type Props = {};

const SignInPage = (props: Props) => {
  const router = useRouter();
  const { execute } = useAction(signInUser, {
    onComplete: () => {
      router.push("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error signing in");
    },
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const onSignInHandler = (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) return;

    execute({ email, password });
  };
  return (
    <div className="mt-20">
      <Dialog open={true}>
        <DialogContent className="w-full ">
          <DialogHeader>
            <DialogTitle className="text-2xl">Welcome to Appointy</DialogTitle>
            <DialogDescription>Login to your account</DialogDescription>
          </DialogHeader>
          <div>
            <form action={onSignInHandler} className="space-y-4">
              <FormInput
                id="email"
                placeholder="example@gmail.com"
                // errors={fieldErrors}
              />
              <FormInput
                id="password"
                type="password"
                placeholder="*********"
                // errors={fieldErrors}
              />
              <div className="w-full flex flex-col pt-4 space-y-3">
                <div className="flex items-center gap-4 w-full flex-col sm:flex-row">
                  <FormSubmitButton innerText="Login" customClasses="w-full" />
                  <Button
                    // disabled={isLoading}
                    type="button"
                    className="flex gap-2 items-center w-full"
                    size={"sm"}
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
                  <Link href="/auth/sign-up">Create new account ?</Link>
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignInPage;
