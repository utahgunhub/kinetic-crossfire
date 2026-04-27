import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { useState } from "react";
import { toast } from "sonner";
import { sendContactEmail } from "@/lib/emailService";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      await sendContactEmail(formData);
      toast.success("Message sent successfully. We'll get back to you soon.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (error) {
      console.error("Failed to send contact form email:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-tactical-dark">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-wider mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions about the Slide Stock Assist? Need technical support or compatibility information? 
              We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-tactical-surface">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-tactical-dark rounded-lg p-8 border border-tactical-green-dim/30">
                <h2 className="text-2xl font-bold text-foreground mb-6 tracking-wider">
                  Send Us a Message
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-tactical-surface border border-tactical-green-dim/30 rounded-lg text-foreground placeholder-muted-foreground focus:border-tactical-green focus:outline-none"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-tactical-surface border border-tactical-green-dim/30 rounded-lg text-foreground placeholder-muted-foreground focus:border-tactical-green focus:outline-none"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-tactical-surface border border-tactical-green-dim/30 rounded-lg text-foreground placeholder-muted-foreground focus:border-tactical-green focus:outline-none"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-tactical-surface border border-tactical-green-dim/30 rounded-lg text-foreground focus:border-tactical-green focus:outline-none"
                    >
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Compatibility Question</option>
                      <option>Order Support</option>
                      <option>Warranty</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-tactical-surface border border-tactical-green-dim/30 rounded-lg text-foreground placeholder-muted-foreground focus:border-tactical-green focus:outline-none resize-none"
                      placeholder="Tell us how we can help..."
                      required
                    />
                  </div>
                  
                  <TacticalButton
                    variant="primary"
                    size="lg"
                    className="w-full text-lg py-4"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </TacticalButton>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-tactical-dark rounded-lg p-8 border border-tactical-green-dim/30">
                  <h2 className="text-2xl font-bold text-foreground mb-6 tracking-wider">
                    Get in Touch
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-tactical-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-tactical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Email</h3>
                        <a 
                          href="mailto:dallansilver@proton.me" 
                          className="text-tactical-green hover:text-tactical-green/80 transition-colors"
                        >
                          dallansilver@proton.me
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-tactical-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-tactical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Response Time</h3>
                        <p className="text-muted-foreground">Within 24 hours</p>
                        <p className="text-muted-foreground">Monday - Friday</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-tactical-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-tactical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Location</h3>
                        <p className="text-muted-foreground">Made in USA</p>
                        <p className="text-muted-foreground">Ships nationwide</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-tactical-dark rounded-lg p-8 border border-tactical-green-dim/30">
                  <h2 className="text-2xl font-bold text-foreground mb-6 tracking-wider">
                    Quick Answers
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Is installation difficult?</h3>
                      <p className="text-sm text-muted-foreground">Simple Install. Simple attachment in minutes.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">What's the return policy?</h3>
                      <p className="text-sm text-muted-foreground">All sales are final—we do not accept returns.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Is it legal in my state?</h3>
                      <p className="text-sm text-muted-foreground">Check local laws. NFA compliant design.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
