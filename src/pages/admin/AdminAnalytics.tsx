import { TacticalButton } from "@/components/TacticalButton";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

type AnalyticsSummary = {
  configured: boolean;
  range?: string;
  days?: number;
  activeUsers?: number;
  sessions?: number;
  averageSessionDuration?: number;
  pageViews?: number;
  topPages?: Array<{ path: string; views: number }>;
  error?: string;
};

const formatDuration = (seconds = 0) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  if (mins <= 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
};

const AdminAnalytics = () => {
  const { session } = useAuth();
  const [range, setRange] = useState("7d");
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async (nextRange = range) => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${apiUrl}/api/admin/analytics?range=${nextRange}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token || ""}`,
        },
      });
      const json = await response.json();
      if (!response.ok) {
        setData({ configured: false, error: json.error || "Could not load analytics" });
        return;
      }
      setData(json);
    } catch (error) {
      setData({
        configured: false,
        error: error instanceof Error ? error.message : "Could not load analytics",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.access_token) {
      void load(range);
    }
  }, [session?.access_token, range]);

  const propertyUrl = "https://analytics.google.com/analytics/web/";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {["7d", "28d", "90d"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRange(option)}
              className={`px-3 py-1 rounded text-sm uppercase tracking-wide ${
                range === option
                  ? "bg-tactical-green text-tactical-dark"
                  : "bg-tactical-dark text-muted-foreground"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <a href={propertyUrl} target="_blank" rel="noreferrer">
          <TacticalButton variant="secondary">Open Google Analytics</TacticalButton>
        </a>
      </div>

      {loading && <p className="text-muted-foreground">Loading traffic…</p>}

      {data && !data.configured && (
        <div className="p-6 bg-tactical-dark rounded-lg border border-tactical-green-dim/30 text-muted-foreground space-y-3">
          <p>
            Site tracking uses <code className="text-foreground">VITE_GA_MEASUREMENT_ID</code>.
            Admin charts need <code className="text-foreground">GA_PROPERTY_ID</code> and
            {" "}
            <code className="text-foreground">GOOGLE_SERVICE_ACCOUNT_JSON</code> on the payment
            server.
          </p>
          {data.error && <p className="text-red-400">{data.error}</p>}
          {!import.meta.env.VITE_GA_MEASUREMENT_ID && (
            <p>No measurement ID is set yet, so page views are not being sent to GA4.</p>
          )}
        </div>
      )}

      {data?.configured && (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat label="Visitors" value={String(data.activeUsers ?? 0)} />
            <Stat label="Sessions" value={String(data.sessions ?? 0)} />
            <Stat label="Avg. time on site" value={formatDuration(data.averageSessionDuration)} />
            <Stat label="Page views" value={String(data.pageViews ?? 0)} />
          </div>
          <div className="bg-tactical-dark rounded-lg border border-tactical-green-dim/30 p-6">
            <h2 className="text-lg font-semibold mb-4">Most viewed pages</h2>
            <ul className="space-y-2">
              {(data.topPages ?? []).map((page) => (
                <li key={page.path} className="flex justify-between text-sm">
                  <span className="font-mono text-muted-foreground">{page.path}</span>
                  <span>{page.views}</span>
                </li>
              ))}
              {(data.topPages ?? []).length === 0 && (
                <li className="text-muted-foreground">No page views in this range yet.</li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-tactical-dark rounded-lg border border-tactical-green-dim/30 p-5">
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

export default AdminAnalytics;
