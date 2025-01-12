import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4 lg:p-6 max-w-5xl">
        <Card className="mb-6">
          <div className="aspect-video">
            <Skeleton className="w-full h-full" />
          </div>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <Skeleton className="h-6 w-1/4 mb-4" />
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Skeleton className="h-12 w-40" />
        </div>
      </main>
    </div>
  );
}
