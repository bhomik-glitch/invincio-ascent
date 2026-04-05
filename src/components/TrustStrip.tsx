import { motion } from "framer-motion";
import { Shield, Users, Clock, Building2 } from "lucide-react";
import {
  CONTAINER,
  TEXT_PRIMARY_DARK,
  TEXT_SECONDARY_DARK,
  EASE_OUT,
} from "@/lib/design-system";

const trustPoints = [
  { icon: Shield, value: "Ex-SSB Assessors", label: "Faculty Credentials" },
  { icon: Users, value: "500+", label: "Officers Recommended" },
  { icon: Clock, value: "15+ Years", label: "Combined Experience" },
  { icon: Building2, value: "Govt Endorsed", label: "Institutional Collaborations" },
];

const TrustStrip = () => {
  return (
    <section className="bg-[#161A22] border-y border-white/[0.06]">
      <div className={`${CONTAINER} py-10`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/[0.08]">
          {trustPoints.map((point, i) => (
            <motion.div
              key={point.label}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.3, ease: EASE_OUT, delay: i * 0.05 }}
              className="flex flex-col items-center text-center md:px-8"
            >
              <point.icon className="w-4 h-4 text-[#C2A46D] mb-3" />
              <p className={`font-serif text-base font-bold ${TEXT_PRIMARY_DARK} mb-0.5`}>
                {point.value}
              </p>
              <p className={`font-sans text-xs ${TEXT_SECONDARY_DARK} tracking-widest uppercase`}>
                {point.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
