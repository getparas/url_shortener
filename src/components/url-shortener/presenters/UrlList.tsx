import { Card } from "@/components/ui/card";
import type { ShortenedUrl } from "@/types/url.types";
import { Link } from "lucide-react";
import { memo } from "react";
import UrlCard from "./UrlCard";

const UrlList = memo<{
  urls: ShortenedUrl[];
  onDelete: (id: string) => void;
  onVisit: (id: string) => void;
}>(({ urls, onDelete, onVisit }) => {
  if (urls.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="space-y-3">
          <Link className="w-12 h-12 text-muted-foreground mx-auto" />
          <h3 className="text-lg font-medium">No URLs shortened yet</h3>
          <p className="text-muted-foreground">
            Enter a URL above to get started with shortening links
          </p>
        </div>
      </Card>
    );
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Shortened URLs</h2>
        <div className="text-sm text-muted-foreground">
          {urls.length} {urls.length === 1 ? "URL" : "URLs"}
        </div>
      </div>
      <div className="space-y-3">
        {urls.map((url) => (
          <UrlCard
            key={url.id}
            url={url}
            onDelete={onDelete}
            onVisit={onVisit}
          />
        ))}
      </div>
    </div>
  );
});

export default UrlList;
