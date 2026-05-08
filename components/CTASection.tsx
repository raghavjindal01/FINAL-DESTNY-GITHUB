import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-10 sm:p-16 text-center max-w-3xl mx-auto glow-primary"
        >
          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">
            Ready to build
            <br />
            <span className="text-gradient-primary">something great?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            Whether it&apos;s an STL print, startup MVP, automation, drone dashboard, campus workshop, or content campaign, Destny can quote it clearly and move fast.
          </p>
          <Button size="lg" className="glow-primary px-10 gap-2 text-base" asChild>
            <a href="mailto:hello@destny.in">
            Start Your Project <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
