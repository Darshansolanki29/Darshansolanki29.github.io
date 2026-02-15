import { motion } from "framer-motion";
import GlobeScene from "./GlobeScene";

const metrics = [
  { value: "9x", label: "ROAS" },
  { value: "41.7x", label: "ROAS" },
  { value: "₹1.78", label: "CPC" },
  { value: "AED 6", label: "CPL" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <GlobeScene />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-primary opacity-[0.06] blur-[120px]" />

      <div className="relative z-10 w-full section-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-sm uppercase tracking-[0.3em] mb-4 font-body"
            >
              Performance Marketing
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-5xl md:text-7xl font-bold font-heading leading-tight mb-6"
            >
              <span className="text-gradient glow-text">Darshan</span>
              <br />
              <span className="text-gradient glow-text">Solanki</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 font-body leading-relaxed"
            >
              I help brands scale profitably with
              <span className="text-foreground font-medium"> data-driven ads </span>
              &amp; growth systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="px-8 py-3.5 rounded-lg bg-gradient-primary text-primary-foreground font-heading font-semibold tracking-wide hover:opacity-90 transition-opacity"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 rounded-lg border border-border text-foreground font-heading font-semibold tracking-wide hover:border-primary/60 hover:bg-primary/5 transition-all"
              >
                Book Strategy Call
              </a>
            </motion.div>
          </div>

          {/* Right — floating metric cards */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.6 }}
                className="bg-glass rounded-xl p-6 animate-pulse-glow"
                style={{ animationDelay: `${i * 0.8}s` }}
              >
                <p className="text-3xl font-heading font-bold text-gradient">{m.value}</p>
                <p className="text-muted-foreground text-sm mt-1 font-body">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
