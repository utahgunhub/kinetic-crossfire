import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Videos = () => {
  const thompsonVideos = [
    {
      id: "IlFFwhKGK2g",
      title: "Thompson Troubleshooting",
      description: "There is a lot to talk about with these guns, this has been condensed and contains only the most important information. To show the replacement of pawl springs, and answer questions like why aluminum receivers are to be avoided, and why one of the bolts has an extended groove cut, more videos will be made.",
      embedUrl: "https://www.youtube.com/embed/IlFFwhKGK2g?si=gkaLUUI_-LjP_tIi",
      link: "https://www.youtube.com/watch?v=IlFFwhKGK2g",
    },
    {
      id: "7VWUIwBz-4o",
      title: "Thompson Blow-Back Trigger Demo",
      description: "See the Thompson Blow-Back Trigger running live and get a feel for the platform in action.",
      embedUrl: "https://www.youtube.com/embed/7VWUIwBz-4o?si=Wg_EWjsqsfOb_7MO",
      link: "https://www.youtube.com/watch?v=7VWUIwBz-4o",
    },
    {
      id: "YPdIYC9JDAo",
      title: "Thompson Blow-Back Trigger Install",
      description: "Walk through the installation process before starting your Thompson build.",
      embedUrl: "https://www.youtube.com/embed/YPdIYC9JDAo?si=heETHq9WWsuwzee7",
      link: "https://www.youtube.com/watch?v=YPdIYC9JDAo",
    }
  ];

  const arVideos = [
    {
      thumbnail: "/video-demo.png",
      title: "Slide Stock Assist - Main Demo",
      description: "Watch the Slide Stock Assist deliver rapid, consistent follow-up shots with precision control.",
      link: "https://www.youtube.com/watch?v=QNSrcbG65AE"
    },
    {
      thumbnail: "/video-frt.png",
      title: "Field Range Testing",
      description: "Comprehensive field testing of the Slide Stock Assist in real-world conditions.",
      link: "https://www.youtube.com/watch?v=p990usZwfbk"
    },
    {
      thumbnail: "/video-intro.png", 
      title: "Introduction Video",
      description: "Learn about the Slide Stock Assist and its key features and benefits.",
      link: "https://www.youtube.com/watch?v=gAF4w6rUJsI"
    },
    {
      thumbnail: "/video-demo.png",
      title: "Product Demo",
      description: "Detailed demonstration of the Slide Stock Assist in action.",
      link: "https://www.youtube.com/watch?v=Am5li4Rnk7k"
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
                      Watch on YouTube
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {arVideos.map((video, index) => (
            <a 
              key={index} 
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-tactical-surface rounded-lg overflow-hidden border border-tactical-green-dim/30 hover:border-tactical-green/60 transition-all group cursor-pointer"
            >
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-tactical-green/90 text-tactical-dark px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Watch on YouTube
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{video.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{video.description}</p>
              </div>
            </a>
          ))}
        </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Videos;
