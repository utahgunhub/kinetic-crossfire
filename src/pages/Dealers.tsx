import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import { formatDealerAddress } from "@/lib/geocode";
import type { MapDealer } from "@/pages/admin/AdminMapDealers";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const FitBounds = ({ dealers }: { dealers: MapDealer[] }) => {
  const map = useMap();
  useEffect(() => {
    const withCoords = dealers.filter((dealer) => dealer.lat != null && dealer.lng != null);
    if (!withCoords.length) {
      map.setView([39.5, -98.35], 4);
      return;
    }
    if (withCoords.length === 1) {
      map.setView([withCoords[0].lat as number, withCoords[0].lng as number], 8);
      return;
    }
    const bounds = L.latLngBounds(
      withCoords.map((dealer) => [dealer.lat as number, dealer.lng as number])
    );
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [dealers, map]);
  return null;
};

const Dealers = () => {
  const [dealers, setDealers] = useState<MapDealer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        const query = supabase
          .from("map_dealers")
          .select("*")
          .eq("is_published", true)
          .order("sort_order", { ascending: true });
        const timeout = new Promise<never>((_, reject) => {
          window.setTimeout(() => reject(new Error("Dealer map timed out")), 8000);
        });
        const { data, error } = await Promise.race([query, timeout]);
        if (error) {
          console.error(error);
          setDealers([]);
        } else {
          setDealers((data as MapDealer[]) ?? []);
        }
      } catch (error) {
        console.error(error);
        setDealers([]);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const plotted = useMemo(
    () => dealers.filter((dealer) => dealer.lat != null && dealer.lng != null),
    [dealers]
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="py-16 bg-tactical-dark">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="text-sm uppercase tracking-[0.35em] text-tactical-green mb-3">Dealers</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Locate a Dealer</h1>
          <p className="text-muted-foreground max-w-2xl mb-8">
            Find Kinetic Crossfire retailers near you. Want to carry the lineup?{" "}
            <Link to="/dealership" className="text-tactical-green hover:underline">
              Apply to become a dealer
            </Link>
            .
          </p>

          {loading ? (
            <p className="text-muted-foreground">Loading map…</p>
          ) : plotted.length === 0 ? (
            <div className="p-8 bg-tactical-surface rounded-lg border border-tactical-green-dim/30 text-muted-foreground">
              No dealer locations have been published yet. Check back soon, or apply to become a dealer.
            </div>
          ) : (
            <div className="h-[520px] rounded-xl overflow-hidden border border-tactical-green-dim/30">
              <MapContainer center={[39.5, -98.35]} zoom={4} className="h-full w-full" scrollWheelZoom>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FitBounds dealers={plotted} />
                {plotted.map((dealer) => (
                  <Marker key={dealer.id} position={[dealer.lat as number, dealer.lng as number]}>
                    <Popup>
                      <div className="text-sm">
                        <p className="font-semibold">{dealer.name}</p>
                        <p>{formatDealerAddress(dealer)}</p>
                        {dealer.phone && <p>{dealer.phone}</p>}
                        {dealer.website && (
                          <a href={dealer.website} target="_blank" rel="noreferrer">
                            Website
                          </a>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          )}

          {dealers.length > 0 && (
            <ul className="mt-10 grid md:grid-cols-2 gap-4">
              {dealers.map((dealer) => (
                <li key={dealer.id} className="p-5 bg-tactical-surface rounded-lg border border-tactical-green-dim/30">
                  <h2 className="font-semibold text-lg mb-1">{dealer.name}</h2>
                  <p className="text-sm text-muted-foreground">{formatDealerAddress(dealer) || "Address on request"}</p>
                  {dealer.phone && <p className="text-sm mt-2">{dealer.phone}</p>}
                  {dealer.website && (
                    <a className="text-sm text-tactical-green hover:underline" href={dealer.website} target="_blank" rel="noreferrer">
                      Visit website
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dealers;
