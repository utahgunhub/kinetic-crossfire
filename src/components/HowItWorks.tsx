const steps = [
  {
    title: "Get Your Base Stock",
    desc: "Start with a Slide Fire Solutions SSAR‑15 SBS stock on your AR‑15 platform.",
    link: "/product/ssar-15-sbs",
  },
  {
    title: "Install the Assist",
    desc: "Attach our Slide Stock Assist accessory. No special tools required.",
    link: "/product/slide-stock-assist",
  },
  {
    title: "Optimize & Enjoy",
    desc: "Oil generously, dial in your setup, and enjoy enhanced rapid-fire performance.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-tactical-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground tracking-wider">Complete Setup Guide</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            From base stock to enhanced performance in three steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, idx) => (
            <div key={s.title} className="relative p-6 rounded-lg border border-tactical-green-dim/30 bg-black/20">
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-tactical-green text-tactical-dark font-extrabold flex items-center justify-center">
                {idx + 1}
              </div>
              {s.link ? (
                <a href={s.link} target="_blank" rel="noopener noreferrer" className="block hover:bg-tactical-green/5 transition-colors rounded -m-6 p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 hover:text-tactical-green transition-colors">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                  <div className="mt-2 text-tactical-green text-sm">
                    Click to view →
                  </div>
                </a>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;


