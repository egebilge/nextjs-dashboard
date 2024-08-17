"use client";

import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

function SignInForm() {
  const { t } = useTranslation("auth");
  const [error, setError] = React.useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      router.replace("/dashboard");
    }
  };

  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{t("login")}</h1>
            <p className="text-balance text-muted-foreground">
              {t("description")}
            </p>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                name="email"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">{t("password")}</Label>
              </div>
              <Input id="password" type="password" required name="password" />
            </div>
            <Button type="submit" className="w-full">
              {t("login")}
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://images.unsplash.com/photo-1576940769468-696956ae420f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdvb2dsZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Sign in"
          width="1920"
          height="1080"
          className="h-screen w-screen object-cover dark:brightness-[0.7] dark:grayscale"
        />
      </div>
    </div>
  );
}

export { SignInForm };
