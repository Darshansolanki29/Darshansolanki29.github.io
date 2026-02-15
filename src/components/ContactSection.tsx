import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-primary opacity-[0.04] blur-[120px]" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-heading font-bold text-gradient mb-6"
        >
          Let's Grow Your Brand Together
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-muted-foreground"
        >
          <a
            href="mailto:sdevsolanki352@gmail.com"
            className="flex items-center gap-2 hover:text-primary transition-colors font-body"
          >
            <Mail size={18} />
            sdevsolanki352@gmail.com
          </a>
          <a
            href="tel:+918469837265"
            className="flex items-center gap-2 hover:text-primary transition-colors font-body"
          >
            <Phone size={18} />
            +91 84698 37265
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
