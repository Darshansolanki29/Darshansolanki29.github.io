import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const tools = [
  { name: "Meta Ads", icon: "📱" },
  { name: "Google Ads", icon: "🔍" },
  { name: "GA4", icon: "📊" },
  { name: "Data Studio", icon: "📈" },
  { name: "Canva", icon: "🎨" },
  { name: "Zoho CRM", icon: "🗂️" },
  { name: "AI Tools", icon: "🤖" },
  { name: "Shopify", icon: "🛒" },
  { name: "WordPress", icon: "🌐" },
  { name: "Mailchimp", icon: "📧" },
  { name: "SEMrush", icon: "🔬" },
  { name: "HubSpot", icon: "🧲" },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">
            Tools & Skills
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            The stack behind the results.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group bg-glass rounded-xl p-5 text-center cursor-default
                         hover:-translate-y-2 hover:border-primary/60 hover:shadow-[0_20px_40px_hsl(var(--glow-orange))]
                         transition-all duration-400"
            >
              <div className="text-3xl mb-3">{tool.icon}</div>
              <p className="text-sm font-heading font-medium text-foreground">{tool.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
