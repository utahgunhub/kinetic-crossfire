const SpecsCompatibility = () => {
  return (
    <section className="py-24 bg-tactical-darker relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-foreground tracking-wider">Requirements & Compatibility</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-tactical-green mb-2">Required Base Stock:</h3>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3"><span className="mt-1 w-2 h-2 bg-tactical-green rounded-full" /><span>Slide Fire Solutions SSAR‑15 SBS Stock</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-tactical-green mb-2">Platform Compatibility:</h3>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3"><span className="mt-1 w-2 h-2 bg-tactical-green rounded-full" /><span>AR‑15 rifle platform</span></li>
                  <li className="flex items-start gap-3"><span className="mt-1 w-2 h-2 bg-tactical-green rounded-full" /><span>Mil‑spec triggers and parts</span></li>
                  <li className="flex items-start gap-3"><span className="mt-1 w-2 h-2 bg-tactical-green rounded-full" /><span>.556 ammunition recommended</span></li>
                </ul>
              </div>
            </div>
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

        {/* Purchase CTA */}
        <div className="mt-16 text-center">
          <div className="bg-tactical-surface rounded-lg p-8 border border-tactical-green-dim/30 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">Get Everything You Need</h3>
            <p className="text-muted-foreground mb-6">
              Don't have the SSAR-15 SBS stock yet? We've got you covered with the complete setup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/purchase" className="inline-block">
                <button className="bg-tactical-green text-tactical-dark px-8 py-4 rounded font-semibold hover:bg-tactical-green/90 transition-colors">
                  View Complete Setup
                </button>
              </a>
            </div>
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


