import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-primary opacity-[0.04] blur-[120px]" />

      <div className="max-w-3xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">
            Let's Scale Your Brand
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            Ready to turn ad spend into revenue? Let's talk.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="bg-glass rounded-2xl p-8 md:p-12 space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label className="text-sm font-heading text-muted-foreground mb-2 block">Name</label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground font-body
                         focus:outline-none focus:border-primary/60 focus:shadow-[0_0_20px_hsl(var(--glow-orange))]
                         transition-all duration-300 placeholder:text-muted-foreground/50"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-sm font-heading text-muted-foreground mb-2 block">Email</label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground font-body
                         focus:outline-none focus:border-primary/60 focus:shadow-[0_0_20px_hsl(var(--glow-orange))]
                         transition-all duration-300 placeholder:text-muted-foreground/50"
              placeholder="you@brand.com"
            />
          </div>
          <div>
            <label className="text-sm font-heading text-muted-foreground mb-2 block">Message</label>
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              rows={5}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground font-body
                         focus:outline-none focus:border-primary/60 focus:shadow-[0_0_20px_hsl(var(--glow-orange))]
                         transition-all duration-300 placeholder:text-muted-foreground/50 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-gradient-primary text-primary-foreground font-heading font-semibold text-lg
                       hover:opacity-90 transition-opacity tracking-wide"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
