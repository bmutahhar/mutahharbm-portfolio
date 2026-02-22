import { motion } from "motion/react";
import { User, TrendingUp, Briefcase, Sparkles, Code2, GraduationCap, Mail } from "lucide-react";

interface PortfolioNavbarProps {
  onNavigate: (nodeId: string) => void;
}

export function PortfolioNavbar({ onNavigate }: PortfolioNavbarProps) {
  const navItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "impact", label: "Impact", icon: TrendingUp },
    { id: "work", label: "Work", icon: Briefcase },
    { id: "experience", label: "Experience", icon: Sparkles },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute top-0 left-0 right-0 z-10 bg-background/60 backdrop-blur-xl border-b border-primary/10 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/40 flex items-center justify-center shadow-lg">
              <span className="text-sm font-bold bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                MB
              </span>
            </div>
            <div>
              <h1 className="font-semibold text-sm bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Mutahhar Bin Muzaffar
              </h1>
              <p className="text-xs text-muted-foreground">Frontend Engineer</p>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  onClick={() => onNavigate(item.id)}
                  className="group relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors overflow-hidden"
                >
                  {/* Magnetic hover effect background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                  
                  <Icon className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform" />
                  <span className="hidden md:inline relative z-10 group-hover:translate-x-0.5 transition-transform">
                    {item.label}
                  </span>
                  
                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
