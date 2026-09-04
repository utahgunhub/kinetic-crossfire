const OrderProcessingBanner = () => {
  return (
    <div className="bg-[hsl(195_45%_16%)] border-b border-tactical-green-dim/40">
      <div className="container mx-auto px-6 py-2.5">
        <p className="text-center text-sm md:text-base text-foreground/90">
          <span className="font-bold uppercase tracking-wider text-tactical-green mr-2">
            Notice
          </span>
          Due to high order volume, please allow an extra week for processing. Thank
          you for your patience.
        </p>
      </div>
    </div>
  );
};

export default OrderProcessingBanner;
