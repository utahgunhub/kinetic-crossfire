const VideoDemo = () => {
  return (
    <section className="py-24 bg-tactical-surface relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-tactical-green tracking-wider mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch the Slide Stock Assist deliver rapid, consistent follow-up shots with precision control.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-tactical-green-dim/30 shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/QNSrcbG65AE?si=xBvDXYz2b6fK-n9T"
              title="Slide Stock Assist Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0"
            />
            {/* Subtle overlay for better integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
          </div>
          
          {/* Video description */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-lg mb-4">
              Experience the difference that precision engineering makes in rapid-fire performance.
            </p>
            <a 
              href="/videos" 
              className="inline-flex items-center text-tactical-green hover:text-tactical-green-glow transition-colors font-semibold"
            >
              See More Videos
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;
