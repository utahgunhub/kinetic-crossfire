import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";

const tacticalButtonVariants = cva(
  "relative font-semibold tracking-wide uppercase transition-all duration-300 border-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-tactical-green disabled:hover:shadow-none",
  {
    variants: {
      variant: {
        primary: 
          "bg-tactical-green text-tactical-dark border-tactical-green hover:bg-tactical-green-glow hover:shadow-[var(--glow-green)]",
        secondary: 
          "bg-transparent text-tactical-green border-tactical-green hover:bg-tactical-green hover:text-tactical-dark hover:shadow-[var(--glow-green)]",
        ghost: 
          "bg-transparent text-foreground border-transparent hover:bg-tactical-surface hover:text-tactical-green",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-9 px-4 py-2 text-sm",
        lg: "h-16 px-12 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface TacticalButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tacticalButtonVariants> {}

const TacticalButton = ({ className, variant, size, ...props }: TacticalButtonProps) => {
  return (
    <Button
      className={cn(tacticalButtonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { TacticalButton, tacticalButtonVariants };