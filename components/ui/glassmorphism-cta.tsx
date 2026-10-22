import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Keyframes rotate-gradient / borderBeamRotation : app/globals.css

export type GlassmorphismCtaProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  icon?: ReactNode;
  size?: "sm" | "md";
  spread?: string;
  shimmerColor?: string;
  speed?: string;
};

export default function GlassmorphismCta({
  label = "Generate My Site",
  avatarSrc,
  avatarAlt = "",
  icon,
  size = "md",
  spread = "90deg",
  shimmerColor = "rgba(255,255,255,0.6)",
  speed = "4s",
  className,
  href = "#",
  ...props
}: GlassmorphismCtaProps) {
  const style = {
    "--spread": spread,
    "--shimmer-color": shimmerColor,
    "--radius": "9999px",
    "--speed": speed,
    "--cut": "1px",
    "--bg": "rgba(255, 255, 255, 0.05)",
  } as CSSProperties;

  const classes = cn(
    "group isolate inline-flex cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(74,222,128,0.3)] rounded-full relative shadow-[0_8px_40px_rgba(74,222,128,0.18)] motion-reduce:hover:scale-100",
    className,
  );

  const content = (
    <>
      <div className="absolute inset-0">
        <div className="absolute inset-[-200%] w-[400%] h-[400%] [animation:rotate-gradient_var(--speed)_linear_infinite] motion-reduce:[animation:none]">
          <div className="absolute inset-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
        </div>
      </div>
      <div className="absolute rounded-full [background:var(--bg)] [inset:var(--cut)] backdrop-blur" />
      <div
        className={cn(
          "z-10 flex w-full items-center gap-3 overflow-hidden font-medium text-white relative sm:w-auto",
          size === "sm" ? "gap-2 px-3.5 py-1.5 text-sm" : "px-5 py-3 text-base",
        )}
        style={{ borderRadius: "9999px" }}
      >
        <div
          className="absolute motion-reduce:hidden"
          style={{
            width: "200%",
            height: "200%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), rgba(255,255,255,0.2), rgba(255,255,255,0.2), rgba(255,255,255,0.2), transparent)",
            animation: "borderBeamRotation 4s infinite linear",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute"
          style={{
            inset: "1px",
            background: "rgba(10, 11, 20, 0.8)",
            borderRadius: "9999px",
            backdropFilter: "blur(8px)",
          }}
        />
        {avatarSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarSrc}
            alt={avatarAlt}
            className="ring-2 ring-white/10 z-10 w-8 h-8 object-cover rounded-full relative"
          />
        )}
        <span className="whitespace-nowrap relative z-10 font-sans">{label}</span>
        {icon && (
          <span
            className={cn(
              "inline-flex items-center justify-center z-10 bg-white/10 rounded-full relative",
              size === "sm" ? "size-6" : "size-7 ml-1",
            )}
          >
            {icon}
          </span>
        )}
      </div>
    </>
  );

  // Liens internes : navigation Next.js sans rechargement
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} style={style} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} style={style} {...props}>
      {content}
    </a>
  );
}
