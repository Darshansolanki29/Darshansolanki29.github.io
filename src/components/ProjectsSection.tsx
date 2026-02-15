import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

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

interface MetricProject {
  type: "metrics";
  title: string;
  description: string;
  metrics: { label: string; end: number; prefix?: string; suffix?: string; decimals?: number }[];
}

interface ImageProject {
  type: "images";
  title: string;
  description: string;
  images: string[];
}

type Project = MetricProject | ImageProject;

const projects: Project[] = [
  {
    type: "metrics",
    title: "Solplanet — Solar Energy",
    description: "Led full-funnel performance campaigns across Meta & Google to generate high-intent leads for solar installations across the Middle East.",
    metrics: [
      { label: "ROAS", end: 9, suffix: "x" },
      { label: "CPC", end: 1.78, prefix: "₹", decimals: 2 },
      { label: "Leads Generated", end: 2400, suffix: "+" },
    ],
  },
  {
    type: "metrics",
    title: "D2C E-commerce Brand",
    description: "Scaled a direct-to-consumer brand from ₹0 to ₹50L/month revenue through strategic Meta Ads funnel optimization and creative testing.",
    metrics: [
      { label: "ROAS", end: 41.7, suffix: "x", decimals: 1 },
      { label: "Revenue Growth", end: 320, suffix: "%" },
      { label: "CAC Reduction", end: 62, suffix: "%" },
    ],
  },
  {
    type: "metrics",
    title: "Real Estate — Dubai",
    description: "Built a lead generation engine for luxury real estate in Dubai with Google & Meta Ads, optimizing for quality leads at low cost.",
    metrics: [
      { label: "CPL", end: 6, prefix: "AED " },
      { label: "Qualified Leads", end: 1800, suffix: "+" },
      { label: "Conversion Rate", end: 18, suffix: "%" },
    ],
  },
  {
    type: "images",
    title: "CleanTech Welly",
    description: "Designed and executed Google Ads banner creatives for CleanTech Welly's digital campaigns.",
    images: ["/images/CTW-1.png", "/images/CTW-2.png"],
  },
  {
    type: "images",
    title: "SolarPlanet",
    description: "Created a full suite of ad creatives and campaign visuals for SolarPlanet's performance marketing initiatives.",
    images: ["/images/SolarPlanet-1.png", "/images/SolarPlanet-2.png", "/images/SolarPlane-3.png", "/images/SolarPlanet-4.png"],
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

        {projects.map((project, idx) =>
          project.type === "metrics" ? (
            <MetricProjectCard key={idx} project={project} index={idx} />
          ) : (
            <ImageProjectCard key={idx} project={project} index={idx} />
          )
        )}
      </div>
    </section>
  );
};

const MetricProjectCard = ({ project, index }: { project: MetricProject; index: number }) => {
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

const TiltCard = ({ src, alt }: { src: string; alt: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)");

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(600px) rotateY(${x * 20}deg) rotateX(${y * -20}deg) scale(1.08)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)");
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-glass rounded-xl overflow-hidden border border-border/50
                 hover:border-primary/60 hover:shadow-[0_20px_50px_hsl(var(--glow-orange))]
                 transition-[border,box-shadow] duration-300"
      style={{ transform, transition: "transform 0.15s ease-out" }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover"
        loading="lazy"
      />
    </div>
  );
};

const ImageProjectCard = ({ project, index }: { project: ImageProject; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const cols = project.images.length <= 2 ? "grid-cols-2" : "grid-cols-2";

  return (
    <div ref={ref} className="section-padding border-t border-border/50">
      <div className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:direction-rtl" : ""}`}>
        {/* Images */}
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className={`grid ${cols} gap-4`}
          style={{ direction: "ltr" }}
        >
          {project.images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <TiltCard src={src} alt={`${project.title} — creative ${i + 1}`} />
            </motion.div>
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
