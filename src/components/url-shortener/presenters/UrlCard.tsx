import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { ShortenedUrl } from "@/types/url.types";
import { copyToClipboard } from "@/utils/urlUtils";
import { toast } from "sonner";
import {
  BarChart3,
  Calendar,
  Copy,
  ExternalLink,
  Globe,
  Link,
  Trash2,
} from "lucide-react";
import { memo, useState } from "react";

const UrlCard = memo<{
  url: ShortenedUrl;
  onDelete: (id: string) => void;
  onVisit: (id: string) => void;
}>(({ url, onDelete, onVisit }) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(url.shortUrl);
    if (success) {
      toast.success("Short URL copied to clipboard", {
        description: url.shortUrl,
      });
    } else {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleVisit = () => {
    onVisit(url.id);
    window.open(url.originalUrl, "_blank");
  };

  const handleDelete = () => {
    setOpenConfirm(true);
  };
  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">Original URL</span>
            </div>
            <p className="text-sm text-muted-foreground break-all">
              {url.originalUrl}
            </p>
          </div>
          <Button onClick={handleDelete} variant="destructive" size="icon">
            <Trash2 className="size-4" />
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Link className="size-4 text-primary" />
            <span className="test-sm font-medium">Short URL</span>
          </div>
          <div className="flex items-center gap-2 pb-2 bg-muted rounded-md">
            <code className="flex-1 text-sm font-mono">{url.shortUrl}</code>
            <Button onClick={handleCopy} variant="outline" size="icon">
              <Copy className="w-4 h-4" />
            </Button>
            <Button onClick={handleVisit} variant="outline" size="icon">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            {new Date(url.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="size-4" />
            {url.clickCount} {url.clickCount === 1 ? "click" : "clicks"}
          </div>
        </div>
        <ConfirmDialog
          open={openConfirm}
          onOpenChange={setOpenConfirm}
          title="Delete short URL?"
          description={`This will remove ${url.shortUrl}. This action cannot be undone.`}
          confirmText="Delete"
          confirmVariant="destructive"
          onConfirm={() => {
            onDelete(url.id);
            toast.success("Short URL deleted");
          }}
        />
      </div>
    </Card>
  );
});

export default UrlCard;
