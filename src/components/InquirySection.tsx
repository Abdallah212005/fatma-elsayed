import React, { useState } from 'react';
import {
  Archive,
  Camera,
  Check,
  Compass,
  DollarSign,
  Image,
  Instagram,
  Lightbulb,
  Mail,
  MessageSquareText,
  PenTool,
  RotateCcw,
  Send,
  UserRound,
  Video,
} from 'lucide-react';

const SCOPES = [
  { label: 'Marketing Strategy', icon: Lightbulb },
  { label: 'Creative Direction', icon: PenTool },
  { label: 'Media Buying', icon: DollarSign },
  { label: 'Graphic Design', icon: Image },
  { label: 'Video Editing', icon: Video },
] as const;

export const InquirySection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [scope, setScope] = useState<string>(SCOPES[0].label);
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
    setScope(SCOPES[0].label);
    setBrief('');
    setError(null);
    setSubmitted(false);
  };

  return (
    <footer
      id="contact"
      aria-label="Contact"
      className="border-t border-border bg-surface/60 pt-20 pb-12"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 md:px-12">
        <div className="mx-auto w-full max-w-3xl">
          <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
            {submitted ? (
              <div className="flex items-center justify-between gap-4 py-6">
                <Check className="h-8 w-8 text-[#F2B705]" aria-label="Inquiry received" />
                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Send another inquiry"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Project inquiry form"
                className="space-y-5"
              >
                <div
                  role="group"
                  aria-label="Service"
                  className="flex flex-wrap gap-3"
                >
                  {SCOPES.map(({ label, icon: Icon }) => {
                    const active = scope === label;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setScope(label)}
                        aria-label={label}
                        aria-pressed={active}
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                          active
                            ? 'border-foreground bg-foreground'
                            : 'border-border bg-background hover:bg-surface'
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 ${
                            active ? 'text-background' : 'text-foreground/60'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="inquiry-name" className="sr-only">
                      Name
                    </label>
                    <div className="relative">
                      <UserRound
                        className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-foreground/45"
                        aria-hidden="true"
                      />
                      <input
                        id="inquiry-name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete="name"
                        aria-label="Name"
                        className="w-full rounded-lg border border-border bg-background py-2.5 pr-3.5 pl-10 text-sm text-foreground focus:border-foreground focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="inquiry-email" className="sr-only">
                      Email
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-foreground/45"
                        aria-hidden="true"
                      />
                      <input
                        id="inquiry-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        aria-label="Email"
                        className="w-full rounded-lg border border-border bg-background py-2.5 pr-3.5 pl-10 text-sm text-foreground focus:border-foreground focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiry-brief" className="sr-only">
                    Project brief and timeline
                  </label>
                  <div className="relative">
                    <MessageSquareText
                      className="absolute top-3.5 left-3.5 h-4 w-4 text-foreground/45"
                      aria-hidden="true"
                    />
                    <textarea
                      id="inquiry-brief"
                      rows={3}
                      value={brief}
                      onChange={(event) => setBrief(event.target.value)}
                      aria-label="Project brief and timeline"
                      className="w-full resize-none rounded-lg border border-border bg-background py-2.5 pr-3.5 pl-10 text-sm text-foreground focus:border-foreground focus:outline-none"
                    />
                  </div>
                </div>

                {error && (
                  <p
                    role="alert"
                    aria-label={error}
                    className="text-sm font-medium text-[#B91C1C]"
                  >
                    <span aria-hidden="true">!</span>
                  </p>
                )}

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    aria-label="Submit inquiry"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#F2B705] text-[#0E0E10] transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 flex justify-center border-t border-border pt-6">
          <nav aria-label="Footer navigation" className="flex items-center gap-6">
            <a
              href="#catalog"
              aria-label="Selected works"
              className="transition-colors hover:text-foreground"
            >
              <Camera className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#approach"
              aria-label="Approach"
              className="transition-colors hover:text-foreground"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#archive"
              aria-label="Archive"
              className="transition-colors hover:text-foreground"
            >
              <Archive className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-foreground"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
