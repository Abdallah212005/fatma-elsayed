import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LucideIcon, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { ResilientImage } from '@/src/components/ResilientImage';

export interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  primaryAction?: { label: string; href: string };
  mainText: string;
  readMoreLink: string;
  readMoreLabel?: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: LucideIcon; label: string; href: string }[];
  locationText: string;
  className?: string;
}

const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <a
    href={href}
    onClick={onClick}
    className="relative whitespace-nowrap shrink-0 text-sm font-medium tracking-wide text-foreground/65 transition-colors duration-150 hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-200 hover:after:w-full"
  >
    {children}
  </a>
);

const SocialIcon = ({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) => (
  <a
    href={href}
    aria-label={label}
    target={href.startsWith('#') ? undefined : '_blank'}
    rel={href.startsWith('#') ? undefined : 'noopener noreferrer'}
    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/60 transition-colors duration-150 hover:bg-surface hover:text-foreground"
  >
    <Icon className="h-4 w-4" aria-hidden="true" />
  </a>
);

export const MinimalistHero = ({
  logoText,
  navLinks,
  primaryAction,
  mainText,
  readMoreLink,
  readMoreLabel = 'Read More',
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section
      aria-label="Hero introduction"
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-between overflow-x-clip bg-background px-6 py-6 font-sans sm:px-10 md:px-12 md:py-9',
        className
      )}
    >
      {/* Top Bar: 3-Zone Contract */}
      <header className="z-30 flex w-full max-w-7xl items-center justify-between gap-8">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-xl font-bold tracking-tight text-foreground whitespace-nowrap shrink-0"
        >
          {logoText}
        </motion.a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {primaryAction && (
            <motion.a
              href={primaryAction.href}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold tracking-wide text-background whitespace-nowrap shrink-0 transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
            >
              {primaryAction.label}
            </motion.a>
          )}

          <motion.button
            type="button"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-11 w-11 flex-col items-end justify-center gap-1.5 rounded-md p-2 md:hidden"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-4 bg-foreground" />
          </motion.button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-background p-6 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl font-bold tracking-tight text-foreground">
                {logoText}
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-3xl font-bold tracking-tight text-foreground transition-colors hover:text-[#D49E00]"
                >
                  {link.label}
                </a>
              ))}
              {primaryAction && (
                <a
                  href={primaryAction.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 inline-flex w-fit items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background"
                >
                  {primaryAction.label}
                </a>
              )}
            </nav>

            <div className="flex items-center justify-between border-t border-border pt-6 text-sm text-foreground/70">
              <span>{locationText}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="relative my-8 grid w-full max-w-7xl flex-grow grid-cols-1 items-center gap-10 md:my-0 md:grid-cols-12 md:gap-6">
        {/* Left Editorial Lead */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="z-20 order-2 text-center md:order-1 md:col-span-3 md:text-left"
        >
          <p className="mx-auto max-w-xs text-[15px] leading-relaxed text-foreground/80 md:mx-0">
            {mainText}
          </p>
          <a
            href={readMoreLink}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-[#F2B705] decoration-2 underline-offset-4 transition-colors hover:text-foreground/75"
          >
            {readMoreLabel}
          </a>
        </motion.div>

        {/* Center Portrait & Signature Mustard Circle */}
        <div className="relative order-1 flex min-h-[340px] items-center justify-center md:order-2 md:col-span-5 md:min-h-[500px]">
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            aria-hidden="true"
            className="absolute z-0 h-[280px] w-[280px] rounded-full bg-[#F2B705]/95 sm:h-[340px] sm:w-[340px] md:h-[390px] md:w-[390px] lg:h-[450px] lg:w-[450px]"
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            className="relative z-10 flex items-end justify-center"
          >
            <ResilientImage
              src={imageSrc}
              alt={imageAlt}
              fallbackTitle={logoText}
              className="h-auto w-80 object-contain mix-blend-multiply sm:w-[22rem] md:w-[26rem] lg:w-[30rem] xl:w-[32rem] select-none"
            />
          </motion.div>
        </div>

        {/* Right Oversized Editorial Statement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="z-20 order-3 flex items-center justify-center text-center md:col-span-4 md:justify-start md:text-left"
        >
          <h1 className="font-display text-6xl font-extrabold leading-[0.92] tracking-tight text-foreground text-balance sm:text-7xl lg:text-8xl xl:text-[6.75rem]">
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>
      </div>

      {/* Hero Footer Bar */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between gap-4 border-t border-border/70 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-1"
        >
          {socialLinks.map((link) => (
            <SocialIcon
              key={link.label}
              href={link.href}
              label={link.label}
              icon={link.icon}
            />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs font-medium tracking-wide text-foreground/70 sm:text-sm"
        >
          {locationText}
        </motion.div>
      </footer>
    </section>
  );
};
