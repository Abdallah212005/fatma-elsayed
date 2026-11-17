"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/src/lib/utils";
import { ResilientImage } from "@/src/components/ResilientImage";

export interface WorksWheelItem {
  /** Project name. Shown beside the front card and in the index. */
  title: string;
  /** Cover art. Any src an <img> takes. */
  image: string;
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string;
}

export interface WorksWheelProps
  extends Omit<React.ComponentPropsWithoutRef<"section">, "children"> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring. @default "Works '26" */
  label?: string;
  /** Label on the card's hover affordance. Omit to drop it. @default "View" */
  action?: string;
  /** Optional click handler for opening a modal/lightbox instead of navigating. */
  onItemClick?: (item: WorksWheelItem, index: number) => void;
}

const CARD_H = 0.36;
const CARD_MAX_W = 0.32;
const CARD_RATIO = 1.45;
const STEP = 40;
const DRUM = 2.22;
const LENS = 2.7;
const RING_R = 0.98;
const BOW = 1.82;
const TITLE = 0.124;
const INDEX = 0.04;
const CULL = 1.6;

const DRAG_UNITS = 420;
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "Works '26",
  action = "View",
  onItemClick,
  className,
  ...props
}: WorksWheelProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  const turn = React.useRef(0);
  const target = React.useRef(0);
  const idleDeg = React.useRef(0);
  const centeredRef = React.useRef(false);
  const [active, setActive] = React.useState(0);
  const [mode, setMode] = React.useState<"ring" | "drum">("ring");
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const updateCentered = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      centeredRef.current =
        Math.abs(sectionCenter - window.innerHeight / 2) <= 40;
    };

    updateCentered();
    window.addEventListener("scroll", updateCentered, { passive: true });
    window.addEventListener("resize", updateCentered);
    return () => {
      window.removeEventListener("scroll", updateCentered);
      window.removeEventListener("resize", updateCentered);
    };
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.8) / (cardW || 1), 0.16, 1)
      : 1;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
    };
  }, [stage, count]);

  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    let prevTime = performance.now();
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      const dt = Math.min((now - prevTime) / 1000, 0.05);
      prevTime = now;

      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      if (!reduced && centeredRef.current && m < 0.99) {
        idleDeg.current = (idleDeg.current + dt * 7.5) % 360;
      }

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const ringDeg = d * (360 / count) + (1 - m) * idleDeg.current;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            ringDeg,
            drumDeg,
            ringR,
            drumR,
            bow,
            m,
          );
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);

      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
      setMode((prev) => {
        const nextMode = m > 0.35 ? "drum" : "ring";
        return prev === nextMode ? prev : nextMode;
      });
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const to = React.useCallback(
    (next: number) => {
      if (!centeredRef.current) return;
      target.current = clamp(next, 0, last + 1);
    },
    [last],
  );

  const drag = React.useRef<{ startY: number; lastY: number; moved: boolean } | null>(null);

  return (
    <motion.section
      aria-label={label}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      ref={sectionRef}
      className={cn(
        "bg-background text-foreground relative h-full min-h-[24rem] w-full overflow-hidden select-none",
        className,
      )}
      {...(props as Record<string, unknown>)}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-foreground absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = { startY: event.clientY, lastY: event.clientY, moved: false };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          const delta = drag.current.lastY - event.clientY;
          if (Math.abs(event.clientY - drag.current.startY) > 6) {
            drag.current.moved = true;
          }
          to(target.current + delta / DRAG_UNITS);
          drag.current.lastY = event.clientY;
        }}
        onPointerUp={() => {
          drag.current = null;
          if (target.current > 1) to(Math.round(target.current));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") to(Math.round(target.current) + 1);
          else if (event.key === "ArrowUp") to(Math.round(target.current) - 1);
          else return;
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const isInteractive = Boolean(item.href || onItemClick);
            const Tag = (item.href ? "a" : isInteractive ? "button" : "div") as "a";
            return (
              <React.Fragment key={item.title}>
                <Tag
                  id={`works-wheel-${i}`}
                  role="option"
                  aria-selected={i === active}
                  href={item.href}
                  type={!item.href && isInteractive ? "button" : undefined}
                  onClick={(e: React.MouseEvent) => {
                    if (drag.current?.moved) {
                      e.preventDefault();
                      return;
                    }
                    if (onItemClick) {
                      e.preventDefault();
                      if (Math.round(target.current) !== i + 1) {
                        to(i + 1);
                      } else {
                        onItemClick(item, i);
                      }
                    }
                  }}
                  ref={(node: HTMLElement | null) => {
                    cardRefs.current[i] = node;
                  }}
                  className="group absolute [backface-visibility:hidden] text-left"
                  style={{
                    width: metrics.cardW,
                    height: metrics.cardH,
                    marginLeft: -metrics.cardW / 2,
                    marginTop: -metrics.cardH / 2,
                  }}
                >
                  <span className="bg-muted shadow-foreground/12 relative block size-full overflow-hidden rounded-lg shadow-[0_18px_40px_-18px_var(--tw-shadow-color)]">
                    <ResilientImage
                      src={item.image}
                      alt={item.title}
                      fallbackTitle={item.title}
                      draggable={false}
                      className="size-full object-cover"
                    />
                    {action && isInteractive ? (
                      <span className="bg-background/85 text-foreground pointer-events-none absolute right-3 bottom-3 flex translate-y-1 items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] font-medium opacity-0 backdrop-blur-sm transition group-hover:translate-y-0 group-hover:opacity-100">
                        <svg
                          viewBox="0 0 12 12"
                          className="size-2.5"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 9 9 3M4 3h5v5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {action}
                      </span>
                    ) : null}
                  </span>
                </Tag>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Ring title and front-card title trade places across the transition. */}
      <div
        ref={labelRef}
        className="pointer-events-none absolute inset-0 grid place-items-center font-display font-bold tracking-tight"
        style={{ fontSize: metrics.title }}
      >
        {label}
      </div>
      <div
        ref={titleRef}
        className="pointer-events-none absolute top-1/2 left-[6%] max-w-[26vw] -translate-y-1/2 font-display font-bold leading-[1.05] tracking-tight opacity-0"
        style={{ fontSize: metrics.title }}
      >
        {items[active]?.title}
      </div>

      {/* Right-hand project index */}
      <ol
        className="text-muted-foreground absolute top-[7.5%] right-[2.5%] z-20 text-right leading-[1.75]"
        style={{ fontSize: Math.max(metrics.index, 12) }}
      >
        {items.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => to(i + 1)}
              className={cn(
                "focus-visible:outline-foreground cursor-pointer transition-colors outline-none focus-visible:outline-1",
                i === active && mode === "drum" && "text-foreground font-medium",
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ol>

      {/* Interactive Mode & Step Controls */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 sm:left-10 md:left-12">
        <div className="flex items-center gap-1 rounded-lg bg-surface p-1">
          <button
            type="button"
            onClick={() => to(0)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
              mode === "ring"
                ? "bg-background text-foreground shadow-sm"
                : "text-foreground/65 hover:text-foreground",
            )}
          >
            Ring
          </button>
          <button
            type="button"
            onClick={() => to(mode === "ring" ? 1 : Math.round(target.current))}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
              mode === "drum"
                ? "bg-background text-foreground shadow-sm"
                : "text-foreground/65 hover:text-foreground",
            )}
          >
            Drum
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => to(Math.round(target.current) - 1)}
            aria-label="Previous item on wheel"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/90 text-foreground transition-colors hover:bg-surface"
          >
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => to(Math.round(target.current) + 1)}
            aria-label="Next item on wheel"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/90 text-foreground transition-colors hover:bg-surface"
          >
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}

export default WorksWheel;
