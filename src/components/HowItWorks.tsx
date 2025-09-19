const steps = [
  {
    title: "Mount",
    desc: "Attach to your Slide Fire SSAR‑15 SBS stock. No special tools required.",
  },
  {
    title: "Dial In",
    desc: "Oil generously, verify fit on mil‑spec parts, and confirm smooth travel.",
  },
  {
    title: "Run",
    desc: "Enjoy rapid, repeatable follow‑up shots with .556 for optimal results.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-tactical-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground tracking-wider">How It Works</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            From install to operation in three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, idx) => (
            <div key={s.title} className="relative p-6 rounded-lg border border-tactical-green-dim/30 bg-black/20">
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-tactical-green text-tactical-dark font-extrabold flex items-center justify-center">
                {idx + 1}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;


