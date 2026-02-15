import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Megaphone,
  Search,
  BarChart3,
  TrendingUp,
  Palette,
  FolderKanban,
  Bot,
  ShoppingCart,
  Globe,
  Mail,
  Microscope,
  Magnet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const tools: { name: string; icon: LucideIcon }[] = [
  { name: "Meta Ads", icon: Megaphone },
  { name: "Google Ads", icon: Search },
  { name: "GA4", icon: BarChart3 },
  { name: "Data Studio", icon: TrendingUp },
  { name: "Canva", icon: Palette },
  { name: "Zoho CRM", icon: FolderKanban },
  { name: "AI Tools", icon: Bot },
  { name: "Shopify", icon: ShoppingCart },
  { name: "WordPress", icon: Globe },
  { name: "Mailchimp", icon: Mail },
  { name: "SEMrush", icon: Microscope },
  { name: "HubSpot", icon: Magnet },
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
              <tool.icon className="w-7 h-7 mx-auto mb-3 text-primary group-hover:text-orange-400 transition-colors duration-300" strokeWidth={1.5} />
              <p className="text-sm font-heading font-medium text-foreground">{tool.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
