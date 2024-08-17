"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { status, data: session } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-4">Home</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl mb-4">Welcome, {session?.user?.email}</p>
          <Button
            onClick={() => signOut()}
            variant="default"
            className="w-full"
          >
            Logout
          </Button>
          <Button
            onClick={() => router.back()}
            variant="default"
            className="w-full mt-4"
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
