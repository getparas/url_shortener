import useUrlShortener from "@/hooks/useUrlShortener";
import UrlShortenerForm from "../presenters/UrlShortenerForm";
import UrlList from "../presenters/UrlList";

const UrlShortenerContainer = () => {
  const {
    state: { urls, isLoading, error },
    shortenUrl,
    deleteUrl,
    incrementClickCount,
    clearError,
  } = useUrlShortener();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <UrlShortenerForm
            onSubmit={shortenUrl}
            isLoading={isLoading}
            error={error}
            onClearError={clearError}
          />

          <UrlList
            urls={urls}
            onDelete={deleteUrl}
            onVisit={incrementClickCount}
          />
        </div>
      </div>
    </div>
  );
};

export default UrlShortenerContainer;
