import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, ChevronDown } from 'lucide-react';

// Reusable component for scroll reveal effects
const RevealItem = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const ScrollReveal = () => {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pb-12">
      {/* Parallax Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden" ref={heroRef}>
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{ opacity, scale, y }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-800 mb-6">
            Scroll Reveal Animations
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl">
            Smooth entrance animations that trigger as content enters the viewport.
            Scroll down to see various animation styles.
          </p>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-600"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ opacity }}
        >
          <ChevronDown size={36} />
        </motion.div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-24">
        {/* Staggered List */}
        <section>
          <h2 className="text-2xl font-semibold mb-8 text-center">Staggered List Items</h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <StaggeredList />
          </div>
        </section>
        
        {/* Direction-based animations */}
        <section>
          <h2 className="text-2xl font-semibold mb-12 text-center">Direction-Based Entrances</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RevealItem>
              <div className="card border border-slate-200">
                <h3 className="text-xl font-semibold mb-3">Fade In From Below</h3>
                <p className="text-slate-600">
                  This element fades in while moving upward as it enters the viewport,
                  creating a subtle entrance effect.
                </p>
              </div>
            </RevealItem>
            
            <RevealItem delay={0.2}>
              <DirectionalReveal direction="right">
                <div className="card border border-slate-200">
                  <h3 className="text-xl font-semibold mb-3">Slide In From Right</h3>
                  <p className="text-slate-600">
                    This element slides in from the right side of the screen when
                    it enters the viewport.
                  </p>
                </div>
              </DirectionalReveal>
            </RevealItem>
            
            <RevealItem delay={0.4}>
              <DirectionalReveal direction="left">
                <div className="card border border-slate-200">
                  <h3 className="text-xl font-semibold mb-3">Slide In From Left</h3>
                  <p className="text-slate-600">
                    This element slides in from the left side of the screen when
                    it enters the viewport.
                  </p>
                </div>
              </DirectionalReveal>
            </RevealItem>
            
            <RevealItem delay={0.6}>
              <DirectionalReveal direction="top">
                <div className="card border border-slate-200">
                  <h3 className="text-xl font-semibold mb-3">Drop In From Top</h3>
                  <p className="text-slate-600">
                    This element drops in from the top of the screen when
                    it enters the viewport.
                  </p>
                </div>
              </DirectionalReveal>
            </RevealItem>
          </div>
        </section>
        
        {/* Scroll-linked progress */}
        <section>
          <h2 className="text-2xl font-semibold mb-8 text-center">Scroll-Linked Animations</h2>
          <ScrollProgress />
        </section>
        
        {/* Fade in with scale */}
        <section>
          <h2 className="text-2xl font-semibold mb-12 text-center">Fade In With Scale</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <RevealItem key={item} delay={index * 0.2}>
                <FadeInScale>
                  <div className="card h-64 flex items-center justify-center border border-slate-200">
                    <span className="text-6xl font-bold text-primary-300">{item}</span>
                  </div>
                </FadeInScale>
              </RevealItem>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const DirectionalReveal = ({ 
  children, 
  direction = "bottom" 
}: { 
  children: React.ReactNode; 
  direction?: "top" | "right" | "bottom" | "left" 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const getInitialPosition = () => {
    switch(direction) {
      case "top": return { opacity: 0, y: -50 };
      case "right": return { opacity: 0, x: 50 };
      case "bottom": return { opacity: 0, y: 50 };
      case "left": return { opacity: 0, x: -50 };
      default: return { opacity: 0, y: 50 };
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : getInitialPosition()}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const FadeInScale = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const StaggeredList = () => {
  const items = [
    "Create a new account",
    "Verify your email address",
    "Complete your profile",
    "Set up payment options",
    "Start using the platform"
  ];
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };
  
  return (
    <motion.ul
      ref={ref}
      variants={container}
      initial="hidden"
      animate={controls}
      className="p-6 divide-y divide-slate-100"
    >
      {items.map((text, index) => (
        <motion.li
          key={index}
          variants={item}
          className="py-4 flex items-center"
        >
          <CheckCircle2 className="mr-3 text-green-500" size={20} />
          <span>{text}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
};

const ScrollProgress = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  
  return (
    <div 
      ref={ref}
      className="relative bg-white rounded-xl overflow-hidden shadow-md h-64 flex items-center justify-center"
    >
      <motion.div 
        className="absolute left-0 top-0 h-1 bg-primary-500 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      <motion.div
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 360])
        }}
        className="text-primary-500"
      >
        <svg width="80" height="80" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            stroke="#8B5CF6" 
            strokeWidth="8" 
            fill="none" 
            strokeDasharray="251.2" 
            strokeDashoffset={useTransform(scrollYProgress, [0, 1], [251.2, 0])}
          />
        </svg>
      </motion.div>
      
      <motion.p
        className="absolute text-sm text-slate-500"
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
        }}
      >
        Scroll progress linked to viewport
      </motion.p>
    </div>
  );
};

export default ScrollReveal;