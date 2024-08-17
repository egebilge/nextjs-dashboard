import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-4">
            404 - Not Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl mb-4">
            The page you are looking for does not exist.
          </p>
          <Link href="/">
            <Button variant="default" className="w-full">
              Go back to home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
