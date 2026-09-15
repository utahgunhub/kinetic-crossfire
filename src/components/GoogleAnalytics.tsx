import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const DEFAULT_MEASUREMENT_ID = "G-C881TN39BC";

const GoogleAnalytics = () => {
  const location = useLocation();
  const measurementId =
    (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || DEFAULT_MEASUREMENT_ID;

  useEffect(() => {
    if (!measurementId) return;

    if (!window.gtag) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => {
        window.dataLayer.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", measurementId, { send_page_view: false });
    }

    window.gtag?.("event", "page_view", {
      page_title: document.title,
      page_path: location.pathname + location.search,
      page_location: window.location.href,
    });
  }, [location.pathname, location.search, measurementId]);

  return null;
};

export default GoogleAnalytics;
