import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import React, { memo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

const UrlShortenerForm = memo<{
  onSubmit: (url: string) => void;
  isLoading: boolean;
  error: string | null;
  onClearError: () => void;
}>(({ onSubmit, isLoading, error, onClearError }) => {
  const [inputUrl, setInputUrl] = useState("");

  const handleSubmit = () => {
    if (inputUrl.trim()) {
      onSubmit(inputUrl.trim());
      setInputUrl("");
    }
  };

  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(onClearError, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, onClearError]);
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-right">URL Shortener</h1>
          <p className="text-muted-foreground mt-2">
            Transform your long URLs into short, shareable links
          </p>
        </div>
        {error && (
          <Alert variant="destructive">
            <div className="flex items-center gap-2">
              <div className="text-sm">{error}</div>
            </div>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="url"
              value={inputUrl}
              placeholder="Enter your long URL here..."
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputUrl.trim() && !isLoading) {
                  handleSubmit();
                }
              }}
            />
            <Button
              onClick={handleSubmit}
              disabled={!inputUrl.trim() || isLoading}
              variant="default"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Shortening...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link className="w-4 h-4" />
                  Shorten
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
});

export default UrlShortenerForm;
