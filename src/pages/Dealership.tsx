import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { toast } from "sonner";
import { sendDealerApplicationEmail } from "@/lib/emailService";
import { Link } from "react-router-dom";

const AGREEMENT_TEXT = `Dealer Agreement — Effective July 21, 2026

Manufacturer: Kinetic Crossfire LLC

1. Appointment
Manufacturer appoints Dealer as a non-exclusive authorized dealer of the products listed in Exhibit A ("Products"). The Manufacturer website functions as Exhibit A for current products and pricing. Dealer accepts such appointment and agrees to market and sell Products in accordance with this Agreement.

2. Dealer Pricing, MSRP, and MAP
Manufacturer establishes MSRP and dealer pricing for the FRT by order volume: Qty 30+ / 32% off; Qty 20–29 / 26% off; Qty 10–19 / 20% off; less than Qty 10 / 16% off current MSRP for the FRT unless otherwise agreed in writing. All other listed products receive a fixed dealer discount through the dealer portal. Manufacturer may revise MSRP and dealer pricing upon written notice.

MAP Policy: Dealer agrees not to advertise any Product below current MSRP on websites, marketplaces, social media, email, print, catalogs, or flyers. MAP applies to advertised prices only. Violations may result in suspension, withheld shipments, loss of authorized status, or termination.

3. Orders and Payment
Orders are subject to acceptance. Quantity orders over 50 through the dealer portal may require shipping longer than one week. Dealer pays at time of order through the dealer portal unless otherwise agreed in writing.

4. Dealer Responsibilities
Dealer will market professionally, maintain customer service standards, provide accurate product information, comply with laws, and refrain from unauthorized warranties.

5. Warranty
Kinetic Crossfire does not warranty FRT kits or products as consumable parts. Replacement may occur at Manufacturer discretion when a defect is identified.

6. Trademarks
Dealer may use Manufacturer trademarks and materials solely to promote and sell Products.

7. Term and Termination
Either party may terminate with ten (10) days written notice. Manufacturer may terminate immediately for material breach, repeated MAP violations, or misrepresentation.

8. Independent Contractor
Dealer is an independent contractor, not an employee or partner.

9. Limitation of Liability
Neither party is liable for indirect, incidental, special, punitive, or consequential damages.

10. Governing Law
State of New Mexico.

11. Entire Agreement
This Agreement supersedes prior discussions on this subject.`;

const Dealership = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [form, setForm] = useState({
    dealerName: "",
    gunsmithingServices: "no" as "yes" | "no",
    agentName: "",
    title: "",
    businessPhone: "",
    contactPhone: "",
    email: "",
    website: "",
    address: "",
    cityStateZip: "",
    signatureDate: "",
  });

  const updateField = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!agreementAccepted) {
      toast.error("Please accept the Dealer Agreement to apply.");
      return;
    }

    const required = [
      form.dealerName,
      form.agentName,
      form.email,
      form.businessPhone,
      form.contactPhone,
      form.address,
      form.cityStateZip,
      form.signatureDate,
    ];

    if (required.some((value) => !value.trim())) {
      toast.error("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await sendDealerApplicationEmail({
        ...form,
        agreementAccepted: true,
        applicationBody: AGREEMENT_TEXT,
      });
      toast.success(
        "Application submitted. Kinetic Crossfire will contact you after review."
      );
      setForm({
        dealerName: "",
        gunsmithingServices: "no",
        agentName: "",
        title: "",
        businessPhone: "",
        contactPhone: "",
        email: "",
        website: "",
        address: "",
        cityStateZip: "",
        signatureDate: "",
      });
      setAgreementAccepted(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="relative py-16 bg-tactical-dark">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wider mb-4">
            Become a Dealer
          </h1>
          <p className="text-muted-foreground text-lg">
            Apply for authorized dealer pricing on the Thompson Blow Back Trigger
            and eligible Kinetic Crossfire products.
          </p>
        </div>
      </section>

      <section className="py-12 bg-tactical-surface">
        <div className="container mx-auto px-6 max-w-3xl space-y-8">
          <div className="bg-tactical-dark rounded-lg border border-tactical-green-dim/30 p-6">
            <h2 className="text-xl font-bold mb-4 tracking-wide">Dealer Agreement</h2>
            <ScrollArea className="h-64 rounded border border-tactical-green-dim/20 p-4 text-sm text-muted-foreground whitespace-pre-wrap">
              {AGREEMENT_TEXT}
            </ScrollArea>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-tactical-dark rounded-lg border border-tactical-green-dim/30 p-8 space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="dealerName">Dealer name (business) *</Label>
              <Input
                id="dealerName"
                value={form.dealerName}
                onChange={(e) => updateField("dealerName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Does the dealer currently offer gunsmithing services? *</Label>
              <RadioGroup
                value={form.gunsmithingServices}
                onValueChange={(value) =>
                  updateField("gunsmithingServices", value as "yes" | "no")
                }
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="gunsmith-yes" />
                  <Label htmlFor="gunsmith-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="gunsmith-no" />
                  <Label htmlFor="gunsmith-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="agentName">Dealer agent name *</Label>
                <Input
                  id="agentName"
                  value={form.agentName}
                  onChange={(e) => updateField("agentName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessPhone">Business phone *</Label>
                <Input
                  id="businessPhone"
                  value={form.businessPhone}
                  onChange={(e) => updateField("businessPhone", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Primary contact phone *</Label>
                <Input
                  id="contactPhone"
                  value={form.contactPhone}
                  onChange={(e) => updateField("contactPhone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={form.website}
                onChange={(e) => updateField("website", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cityStateZip">City / State / Zip *</Label>
              <Input
                id="cityStateZip"
                value={form.cityStateZip}
                onChange={(e) => updateField("cityStateZip", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signatureDate">Date *</Label>
              <Input
                id="signatureDate"
                type="date"
                value={form.signatureDate}
                onChange={(e) => updateField("signatureDate", e.target.value)}
                required
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="agreement"
                checked={agreementAccepted}
                onCheckedChange={(checked) =>
                  setAgreementAccepted(checked === true)
                }
              />
              <Label htmlFor="agreement" className="text-sm leading-relaxed">
                I have read and agree to the Dealer Agreement on behalf of the
                dealership named above.
              </Label>
            </div>

            <TacticalButton type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </TacticalButton>

            <p className="text-sm text-muted-foreground text-center">
              After approval, you will receive access to create an account at{" "}
              <Link to="/dealer/signup" className="text-tactical-green hover:underline">
                dealer signup
              </Link>
              .
            </p>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dealership;
