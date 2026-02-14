import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  inView: boolean;
}

const Counter = ({ end, prefix = "", suffix = "", decimals = 0, inView }: CounterProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = eased * end;
      setValue(start);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [inView, end]);

  return (
    <span className="text-gradient font-heading font-bold">
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  );
};

const projects = [
  {
    title: "Solplanet — Solar Energy",
    description: "Led full-funnel performance campaigns across Meta & Google to generate high-intent leads for solar installations across the Middle East.",
    metrics: [
      { label: "ROAS", end: 9, suffix: "x" },
      { label: "CPC", end: 1.78, prefix: "₹", decimals: 2 },
      { label: "Leads Generated", end: 2400, suffix: "+" },
    ],
  },
  {
    title: "D2C E-commerce Brand",
    description: "Scaled a direct-to-consumer brand from ₹0 to ₹50L/month revenue through strategic Meta Ads funnel optimization and creative testing.",
    metrics: [
      { label: "ROAS", end: 41.7, suffix: "x", decimals: 1 },
      { label: "Revenue Growth", end: 320, suffix: "%" },
      { label: "CAC Reduction", end: 62, suffix: "%" },
    ],
  },
  {
    title: "Real Estate — Dubai",
    description: "Built a lead generation engine for luxury real estate in Dubai with Google & Meta Ads, optimizing for quality leads at low cost.",
    metrics: [
      { label: "CPL", end: 6, prefix: "AED " },
      { label: "Qualified Leads", end: 1800, suffix: "+" },
      { label: "Conversion Rate", end: 18, suffix: "%" },
    ],
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="section-padding text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">
            Case Studies
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            Real campaigns. Real numbers.
          </p>
        </div>

        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="section-padding border-t border-border/50">
      <div className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:direction-rtl" : ""}`}>
        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 gap-6"
          style={{ direction: "ltr" }}
        >
          {project.metrics.map((m, i) => (
            <div key={i} className="bg-glass rounded-xl p-6 flex items-center gap-6">
              <div className="text-4xl md:text-5xl">
                <Counter
                  end={m.end}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals}
                  inView={inView}
                />
              </div>
              <p className="text-muted-foreground font-body text-sm uppercase tracking-wider">{m.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ direction: "ltr" }}
        >
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
            {project.title}
          </h3>
          <p className="text-muted-foreground font-body text-lg leading-relaxed">
            {project.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsSection;
