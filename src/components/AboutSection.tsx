import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[200px_1fr] gap-12" ref={ref}>
        {/* Left label */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-gradient font-heading text-6xl lg:text-8xl font-bold lg:[writing-mode:vertical-lr] lg:rotate-180">
            About
          </h2>
        </motion.div>

        {/* Right content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-glass rounded-2xl p-8 md:p-12"
        >
          <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6">
            A results-obsessed performance marketer with a passion for turning ad spend into measurable revenue.
            I specialize in building scalable acquisition systems across Meta, Google, and programmatic platforms.
          </p>
          <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6">
            With experience across B2B SaaS, D2C, real estate, solar energy, and e-commerce, I've driven campaigns
            that delivered up to <span className="text-foreground font-semibold">41.7x ROAS</span> and generated
            thousands of qualified leads at industry-beating CPLs.
          </p>
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            My approach combines deep data analysis with creative strategy — every campaign is a system designed
            to compound growth, not just generate clicks.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
