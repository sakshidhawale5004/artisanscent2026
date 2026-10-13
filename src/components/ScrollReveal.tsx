import React, { type ReactNode, type HTMLAttributes } from "react";

export type RevealVariant = "fade-up" | "fade" | "scale" | "slide-left" | "slide-right";

export interface ScrollRevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: 0 | 50 | 100 | 150 | 200 | 250 | 300 | 350 | 400 | 450 | 500 | 600;
  speed?: "normal" | "slow" | "fast";
  className?: string;
  as?: React.ElementType;
}

const variantClassMap: Record<RevealVariant, string> = {
  "fade-up": "reveal-on-scroll",
  fade: "reveal-fade",
  scale: "reveal-scale",
  "slide-left": "reveal-left",
  "slide-right": "reveal-right",
};

export const ScrollReveal = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  (
    {
      children,
      variant = "fade-up",
      delay = 0,
      speed = "normal",
      className = "",
      as: Component = "div",
      ...props
    },
    ref,
  ) => {
    const variantClass = variantClassMap[variant] || "reveal-on-scroll";
    const delayClass = delay > 0 ? `reveal-delay-${delay}` : "";
    const speedClass = speed === "slow" ? "reveal-slow" : speed === "fast" ? "reveal-fast" : "";

    const combinedClasses = [variantClass, delayClass, speedClass, className]
      .filter(Boolean)
      .join(" ");

    const Tag = Component as React.ComponentType<
      HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    >;

    return (
      <Tag ref={ref} className={combinedClasses} {...props}>
        {children}
      </Tag>
    );
  },
);

ScrollReveal.displayName = "ScrollReveal";

export default ScrollReveal;

