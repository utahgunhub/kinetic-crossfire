import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { thompsonFrtDemoVideos, thompsonFrtInstallVideo, thompsonTriggerLifterVideo } from "@/data/thompsonVideos";
import VimeoEmbed from "@/components/VimeoEmbed";

const Videos = () => {
  const thompsonVideos = [
    {
      id: "1222715929",
      title: "Thompson Troubleshooting Video",
      description:
        "There is a lot to talk about with these guns, this has been condensed and contains only the most important information. To show the replacement of pawl springs, and answer questions like why aluminum receivers are to be avoided, and why one of the bolts has an extended groove cut, more videos will be made.",
      embedUrl:
        "https://player.vimeo.com/video/1222715929?badge=0&autopause=0&player_id=0&app_id=58479",
      link: "https://vimeo.com/1222715929",
      linkLabel: "Watch on Vimeo",
    },
    {
      id: "1212401002",
      title: "Firing Pin Fitment Video",
      description: "Guide to firing pin fitment on the Thompson platform.",
      embedUrl: "https://player.vimeo.com/video/1212401002?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
      link: "https://vimeo.com/1212401002",
      linkLabel: "Watch on Vimeo",
    },
    {
      id: "1190161997",
      title: "Thompson Blow-Back Trigger Demo",
      description: "See the Thompson Blow-Back Trigger running live and get a feel for the platform in action.",
      embedUrl: thompsonFrtDemoVideos[0].embedUrl,
      link: thompsonFrtDemoVideos[0].link,
      linkLabel: "Watch on Vimeo",
    },
    {
      id: "1200813203",
      title: "Thompson FRT Demo 2",
      description: "Another live look at the Thompson FRT in action.",
      embedUrl: thompsonFrtDemoVideos[1].embedUrl,
      link: thompsonFrtDemoVideos[1].link,
      linkLabel: "Watch on Vimeo",
    },
    {
      id: thompsonFrtInstallVideo.id,
      title: "Thompson Blow-Back Trigger Install",
      description: "Walk through the installation process before starting your Thompson build.",
      embedUrl: thompsonFrtInstallVideo.embedUrl,
      link: thompsonFrtInstallVideo.link,
      linkLabel: "Watch on Vimeo",
    },
    {
      id: thompsonTriggerLifterVideo.id,
      title: "Trigger Lifter",
      description: "How to solve semi-auto fire on the Thompson platform.",
      embedUrl: thompsonTriggerLifterVideo.embedUrl,
      link: thompsonTriggerLifterVideo.link,
      linkLabel: "Watch on Vimeo",
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative py-24 bg-tactical-dark">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-wider mb-6">
              Video Library
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Watch Thompson installs, demos, troubleshooting, and range footage.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-tactical-surface">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-tactical-green mb-8 text-center tracking-wider">
              Thompson Videos
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {thompsonVideos.map((video) => (
                <div key={video.id} className="bg-tactical-dark rounded-lg p-6 border border-tactical-green-dim/30 flex flex-col h-full">
                  <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-tactical-green-dim/30 shadow-2xl">
                    <VimeoEmbed src={video.embedUrl} title={video.title} />
                  </div>
                  <div className="mt-6 flex flex-col flex-1">
                    <h3 className="text-2xl font-semibold text-foreground mb-2">{video.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-1">{video.description}</p>
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-tactical-green hover:text-tactical-green-glow transition-colors font-semibold mt-auto"
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

      <Footer />
    </div>
  );
};

export default Videos;
