import React, { useState } from 'react';
import { Check, Instagram } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const SCOPES = [
  'Marketing Strategy',
  'Creative Direction',
  'Media Buying',
  'Graphic Design',
  'Video Editing',
] as const;

export const InquirySection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [scope, setScope] = useState<string>(SCOPES[0]);
  const [brief, setBrief] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !brief.trim()) {
      setError('Please complete your name, email, and project summary.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setScope(SCOPES[0]);
    setBrief('');
    setError(null);
    setSubmitted(false);
  };

  return (
    <footer
      id="contact"
      className="border-t border-border bg-surface/60 pt-20 pb-12"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Studio Contact Info */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-wide text-foreground/60">Get in touch</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
              Let's bring your next idea to life.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-foreground/75">
              For marketing strategy, creative direction, media buying, graphic design, or video
              editing, share your goals in the form below.
            </p>

            <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-foreground/80">
              <div className="flex items-center gap-3">
                <span className="font-medium">Fatma Elsayed</span>
              </div>
              <span className="block text-foreground/60">Marketing &amp; Creative Services</span>
            </div>
          </div>

          {/* Interactive Commission Brief Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-start justify-between gap-4 py-6">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#F2B705] text-[#0E0E10]">
                    <Check className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">
                      Inquiry received
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground/75">
                      Thank you, {name}. Your {scope.toLowerCase()} inquiry has been received.
                      I'll be in touch soon.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-surface"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <span className="block text-xs font-medium text-foreground/70">
                      Service
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {SCOPES.map((item) => {
                        const active = scope === item;
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setScope(item)}
                            className={cn(
                              'whitespace-nowrap shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition-colors',
                              active
                                ? 'bg-foreground text-background'
                                : 'border border-border bg-background text-foreground/75 hover:bg-surface'
                            )}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="inquiry-name" className="block text-xs font-medium text-foreground/70">
                        Name
                      </label>
                      <input
                        id="inquiry-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="inquiry-email" className="block text-xs font-medium text-foreground/70">
                        Email
                      </label>
                      <input
                        id="inquiry-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiry-brief" className="block text-xs font-medium text-foreground/70">
                      Project Brief &amp; Timeline
                    </label>
                    <textarea
                      id="inquiry-brief"
                      rows={3}
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      placeholder="Location, deliverables, and target production window..."
                      className="mt-1.5 w-full resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground focus:outline-none"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-xs font-medium text-[#B91C1C]">
                      {error}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-foreground/55">
                      Thanks for sharing your project
                    </span>
                    <button
                      type="submit"
                      className="rounded-full bg-[#F2B705] px-6 py-2.5 text-xs font-semibold text-[#0E0E10] transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Submit Brief
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Minimal Footer Bottom */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-foreground/60 sm:flex-row sm:items-center">
          <span>© 2026 Fatma Elsayed</span>
          <div className="flex items-center gap-6">
            <a href="#catalog" className="transition-colors hover:text-foreground">
              Selected Works
            </a>
            <a href="#approach" className="transition-colors hover:text-foreground">
              Approach
            </a>
            <a href="#archive" className="transition-colors hover:text-foreground">
              Archive
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
