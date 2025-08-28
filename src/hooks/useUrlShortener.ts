import type { ShortenedUrl, UrlShortenerState } from "@/types/url.types";
import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { formatUrl, generateShortCode, validateUrl } from "@/utils/urlUtils";

const useUrlShortener = () => {
  const [state, setState] = useState<UrlShortenerState>({
    urls: [],
    isLoading: false,
    error: null,
  });

  const [storedUrls, setStoredUrls] = useLocalStorage<ShortenedUrl[]>(
    "shortened-urls",
    []
  );

  useEffect(() => {
    setState((prev) => ({ ...prev, urls: storedUrls }));
  }, [storedUrls]);

  const shortenUrl = useCallback(
    async (originalUrl: string): Promise<void> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const formattedUrl = formatUrl(originalUrl);

        if (!validateUrl(formattedUrl)) {
          throw new Error("Please enter a valid URL");
        }

        const existingUrl = storedUrls.find(
          (url) => url.originalUrl === formattedUrl
        );

        if (existingUrl) {
          throw new Error("This URL has already been shortened");
        }

        const shortCode = generateShortCode();
        const shortUrl = `https://short.ly/${shortCode}`;

        const newUrl: ShortenedUrl = {
          id: Date.now().toString(),
          originalUrl: formattedUrl,
          shortUrl,
          shortCode,
          createdAt: new Date(),
          clickCount: 0,
          isActive: true,
        };

        const updatedUrls = [newUrl, ...storedUrls];
        setStoredUrls(updatedUrls);
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        }));
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [storedUrls, setStoredUrls]
  );

  const deleteUrl = useCallback(
    (id: string) => {
      const updatedUrls = storedUrls.filter((url) => url.id !== id);
      setStoredUrls(updatedUrls);
    },
    [storedUrls, setStoredUrls]
  );

  const incrementClickCount = useCallback(
    (id: string) => {
      const updatedUrls = storedUrls.map((url) =>
        url.id === id ? { ...url, clickCount: url.clickCount + 1 } : url
      );
      setStoredUrls(updatedUrls);
    },
    [storedUrls, setStoredUrls]
  );

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    state,
    shortenUrl,
    deleteUrl,
    incrementClickCount,
    clearError,
  };
};

export default useUrlShortener;
