import React from 'react';
import { motion } from 'motion/react';
import { StudioDiscipline } from '@/src/data/portfolio';

interface ApproachSectionProps {
  disciplines: StudioDiscipline[];
  metrics: { value: string; label: string; detail: string }[];
}

export const ApproachSection: React.FC<ApproachSectionProps> = ({ disciplines, metrics }) => {
  return (
    <section
      id="approach"
      className="border-t border-border bg-background py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 md:px-12">
        {/* Two-Column Editorial Lead */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-medium tracking-wide text-foreground/60">
              Fatma Elsayed
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
              Clear strategy. Creative that connects.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-foreground/75">
              Fatma Elsayed brings marketing strategy, creative direction, media buying, graphic
              design, and video editing together to help brands connect with the right audience.
            </p>
            <blockquote className="mt-8 border-t border-border pt-6 font-serif text-lg italic leading-relaxed text-foreground/85">
              “Thoughtful strategy and strong creative make every brand message count.”
            </blockquote>
          </motion.div>

          {/* Numbered Services */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-7">
            {disciplines.map((item, idx) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col justify-between border-t border-border pt-5"
              >
                <div>
                  <span className="font-mono text-xs font-medium tabular-nums text-foreground/55">
                    {item.number}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-foreground/75">
                    {item.description}
                  </p>
                </div>
                <p className="mt-5 text-xs text-foreground/55">{item.deliverables}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Full-Width 4-Column Studio Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid grid-cols-2 gap-6 border-y border-border py-10 md:grid-cols-4 md:gap-8"
        >
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col">
              <span className="font-display text-4xl font-extrabold tracking-tight tabular-nums text-foreground sm:text-5xl">
                {metric.value}
              </span>
              <span className="mt-2 text-sm font-medium text-foreground">{metric.label}</span>
              <span className="mt-0.5 text-xs text-foreground/55">{metric.detail}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
