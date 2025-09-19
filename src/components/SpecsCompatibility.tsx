const SpecsCompatibility = () => {
  return (
    <section className="py-24 bg-tactical-darker relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-foreground tracking-wider">Compatibility</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3"><span className="mt-1 w-2 h-2 bg-tactical-green rounded-full" /><span>Slide Fire Solutions SSAR‑15 SBS Stock</span></li>
              <li className="flex items-start gap-3"><span className="mt-1 w-2 h-2 bg-tactical-green rounded-full" /><span>AR‑15 rifle platform</span></li>
              <li className="flex items-start gap-3"><span className="mt-1 w-2 h-2 bg-tactical-green rounded-full" /><span>.556 ammunition recommended</span></li>
              <li className="flex items-start gap-3"><span className="mt-1 w-2 h-2 bg-tactical-green rounded-full" /><span>Works with mil‑spec triggers and parts</span></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-foreground tracking-wider">Usage Notes</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li>Run with more oil than usual and clean frequently under high rates of fire.</li>
              <li>Trigger retaining pins may begin to work out; inspect and maintain.</li>
              <li>Gas block adjustment may be necessary; .223 may not function optimally.</li>
              <li>Best with clean, lubricated gun, lighter triggers, and higher‑pressure .556 loads.</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-xs text-muted-foreground border-t border-tactical-green-dim/30 pt-6">
          <p>
            Disclaimer: The user assumes all responsibility for safe use and operation of the firearm and accessories, including the Slide Stock Assist. Kinetic Crossfire assumes no responsibility for misuse. Ensure compliance with all applicable laws.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SpecsCompatibility;


