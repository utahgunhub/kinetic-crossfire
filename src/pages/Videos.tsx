import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Videos = () => {
  const thompsonVideos = [
    {
      id: "1190162061",
      title: "Thompson Troubleshooting Video",
      description: "There is a lot to talk about with these guns, this has been condensed and contains only the most important information. To show the replacement of pawl springs, and answer questions like why aluminum receivers are to be avoided, and why one of the bolts has an extended groove cut, more videos will be made.",
      embedUrl: "https://player.vimeo.com/video/1190162061?h=325485e304",
      link: "https://vimeo.com/1190162061?h=325485e304",
      linkLabel: "Watch on Vimeo",
    },
    {
      id: "1194096597",
      title: "Out of Battery Troubleshooting",
      description: "Troubleshooting guide for out-of-battery issues and how to safely deal with them on the Thompson platform.",
      embedUrl: "https://player.vimeo.com/video/1194096597?badge=0&autopause=0&player_id=0&app_id=58479",
      link: "https://vimeo.com/1194096597",
      linkLabel: "Watch on Vimeo",
    },
    {
      id: "1190161997",
      title: "Thompson Blow-Back Trigger Demo",
      description: "See the Thompson Blow-Back Trigger running live and get a feel for the platform in action.",
      embedUrl: "https://player.vimeo.com/video/1190161997?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
      link: "https://vimeo.com/1190161997",
      linkLabel: "Watch on Vimeo",
    },
    {
      id: "1190161863",
      title: "Thompson Blow-Back Trigger Install",
      description: "Walk through the installation process before starting your Thompson build.",
      embedUrl: "https://player.vimeo.com/video/1190161863?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
      link: "https://vimeo.com/1190161863",
      linkLabel: "Watch on Vimeo",
    }
  ];

  const arVideos = [
    {
      title: "Slide Stock Assist - Main Demo",
      description: "Watch the Slide Stock Assist deliver rapid, consistent follow-up shots with precision control.",
      embedUrl: "https://player.vimeo.com/video/1190162058?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
      link: "https://vimeo.com/1190162058",
      linkLabel: "Watch on Vimeo"
    },
    {
      title: "Field Range Testing",
      description: "Comprehensive field testing of the Slide Stock Assist in real-world conditions.",
      embedUrl: "https://player.vimeo.com/video/1190162013?h=325b94a27f",
      link: "https://vimeo.com/1190162013?h=325b94a27f",
      linkLabel: "Watch on Vimeo"
    },
    {
      title: "Introduction Video",
      description: "Learn about the Slide Stock Assist and its key features and benefits.",
      embedUrl: "https://player.vimeo.com/video/1190165650?h=3a64dcdae6",
      link: "https://vimeo.com/1190165650?h=3a64dcdae6",
      linkLabel: "Watch on Vimeo"
    },
    {
      title: "Product Demo",
      description: "Detailed demonstration of the Slide Stock Assist in action.",
      embedUrl: "https://player.vimeo.com/video/1190161998?h=30e4213d6a",
      link: "https://vimeo.com/1190161998?h=30e4213d6a",
      linkLabel: "Watch on Vimeo"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-tactical-dark">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-wider mb-6">
              Video Library
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Watch Thompson and AR videos, including installs, demos, and range footage.
            </p>
          </div>
        </div>
      </section>

      {/* Thompson Videos */}
      <section className="py-16 bg-tactical-surface">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-tactical-green mb-8 text-center tracking-wider">
              Thompson Videos
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {thompsonVideos.map((video) => (
                <div key={video.id} className="bg-tactical-dark rounded-lg p-6 border border-tactical-green-dim/30">
                  <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-tactical-green-dim/30 shadow-2xl">
                    <iframe
                      width="100%"
                      height="100%"
                      src={video.embedUrl}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="absolute inset-0"
                    />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-2xl font-semibold text-foreground mb-2">{video.title}</h3>
                    <p className="text-muted-foreground mb-4">{video.description}</p>
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-tactical-green hover:text-tactical-green-glow transition-colors font-semibold"
                    >
                      {video.linkLabel ?? "Watch on YouTube"}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AR Video Grid */}
      <section className="py-16 bg-tactical-dark">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center tracking-wider">
            AR Videos
          </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {arVideos.map((video, index) => (
            <div
              key={index}
              className="bg-tactical-surface rounded-lg p-6 border border-tactical-green-dim/30"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-tactical-green-dim/30 shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src={video.embedUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0"
                />
              </div>
              <div className="mt-6">
                <h3 className="text-2xl font-semibold text-foreground mb-2">{video.title}</h3>
                <p className="text-muted-foreground mb-4">{video.description}</p>
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-tactical-green hover:text-tactical-green-glow transition-colors font-semibold"
                >
                  {video.linkLabel ?? "Watch on YouTube"}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Videos;
