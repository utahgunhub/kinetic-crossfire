import { TacticalButton } from "@/components/TacticalButton";

const ActionSection = () => {
  return (
    <section className="py-24 bg-tactical-darker relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <p className="text-tactical-green text-lg font-semibold tracking-wider uppercase">
              A Crossfire Revolution
            </p>
            <h2 className="text-5xl font-bold text-foreground tracking-wider">
              SEE IT IN ACTION
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Video placeholder - would be actual video in production */}
            <div className="aspect-video bg-tactical-surface rounded-lg border-2 border-tactical-green-dim flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-tactical-green/10 to-transparent"></div>
              <div className="text-center space-y-4 z-10">
                <div className="w-20 h-20 bg-tactical-green/20 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-tactical-green" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-muted-foreground">
                  Watch our tactical systems in action
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <TacticalButton variant="primary" size="lg" className="text-lg">
              ORDER NOW - $299
            </TacticalButton>
            <TacticalButton variant="secondary" size="lg" className="text-lg">
              LEARN MORE
            </TacticalButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionSection;