import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import { Layers, Globe, Box } from 'lucide-react';

const ThreeDEffects = () => {
  return (
    <div className="pb-12">
      <h1 className="section-title">3D Effects</h1>
      <p className="section-subtitle">
        Create depth and dimension in your UI with 3D transforms and perspective effects.
        These animations add a touch of realism and interactivity to flat interfaces.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 3D Card Flip */}
        <section>
          <h2 className="text-xl font-semibold mb-6">3D Card Flip</h2>
          <div className="flex justify-center">
            <CardFlip />
          </div>
        </section>
        
        {/* 3D Hover Effect */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Tilt Effect</h2>
          <div className="flex justify-center">
            <TiltCard />
          </div>
        </section>
      </div>
      
      {/* Parallax Layers */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Parallax Depth Effect</h2>
        <div className="card">
          <ParallaxLayers />
        </div>
      </section>
      
      {/* 3D Cube */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-6">3D Cube Animation</h2>
        <div className="card flex justify-center items-center p-8">
          <CubeAnimation />
        </div>
      </section>
    </div>
  );
};

const CardFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div className="cursor-pointer perspective w-80 h-96">
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of Card */}
        <motion.div 
          className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-6 border-2 border-primary-200"
        >
          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Globe size={32} className="text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-slate-800">3D Card Front</h3>
          <p className="text-center text-slate-600 mb-6">
            Click this card to see it flip in 3D space!
          </p>
          <button className="btn btn-primary mt-auto">Click to Flip</button>
        </motion.div>
        
        {/* Back of Card */}
        <motion.div 
          className="absolute inset-0 backface-hidden bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 text-white"
          style={{ rotateY: 180 }}
        >
          <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Layers size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">3D Card Back</h3>
          <p className="text-center mb-6">
            This is the back side of the 3D flipping card.
          </p>
          <button className="btn border-2 border-white bg-transparent hover:bg-white hover:text-primary-500 mt-auto">
            Click to Flip Back
          </button>
        </motion.div>
      </motion.div>
      
      <style jsx>{`
        .perspective {
          perspective: 1200px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

const TiltCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = -(e.clientY - centerY) / (rect.height / 2);
      
      setPosition({ x, y });
    }
  };
  
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const scale = useSpring(1, { stiffness: 300, damping: 30 });
  
  useEffect(() => {
    if (isHovered) {
      rotateX.set(position.y * 10);
      rotateY.set(position.x * 10);
      scale.set(1.05);
    } else {
      rotateX.set(0);
      rotateY.set(0);
      scale.set(1);
    }
  }, [position, isHovered, rotateX, rotateY, scale]);
  
  return (
    <motion.div
      ref={cardRef}
      className="w-80 h-96 bg-white rounded-xl shadow-lg overflow-hidden perspective"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        rotateX,
        rotateY,
        scale,
        backgroundImage: "url('https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-6 text-white">
        <motion.h3 
          className="text-2xl font-bold mb-2"
          style={{
            translateY: useTransform(rotateX, [0, 10], [0, -10]),
            translateX: useTransform(rotateY, [0, 10], [0, -10]),
          }}
        >
          3D Tilt Effect
        </motion.h3>
        <motion.p
          className="text-sm opacity-90"
          style={{
            translateY: useTransform(rotateX, [0, 10], [0, -5]),
            translateX: useTransform(rotateY, [0, 10], [0, -5]),
          }}
        >
          Move your mouse over this card to see the 3D tilt effect in action.
        </motion.p>
      </div>
      
      <style jsx>{`
        .perspective {
          perspective: 1200px;
        }
      `}</style>
    </motion.div>
  );
};

const ParallaxLayers = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  return (
    <div className="relative h-[50vh] overflow-hidden" ref={ref}>
      {/* Background Layer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary-700 to-primary-900"
        style={{ y: backgroundY }}
      />
      
      {/* Stars Layer */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY, backgroundImage: "radial-gradient(white, rgba(255, 255, 255, 0.2) 2px, transparent 0)", backgroundSize: "50px 50px", backgroundPosition: "0 0" }}
      />
      
      {/* Middle Text Layer */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-white"
        style={{ y: textY }}
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center px-4">Parallax Scrolling Effect</h3>
        <p className="text-center max-w-md px-4">
          Scroll to see how different layers move at different speeds, creating a sense of depth.
        </p>
      </motion.div>
      
      {/* Foreground Mountains */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 bg-primary-950"
        style={{ 
          y: foregroundY,
          clipPath: "polygon(0% 100%, 10% 60%, 20% 100%, 30% 40%, 40% 80%, 50% 20%, 60% 70%, 70% 35%, 80% 90%, 90% 30%, 100% 100%)" 
        }}
      />
    </div>
  );
};

const CubeAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  
  return (
    <div className="w-60 h-60 perspective">
      <div 
        className="relative w-full h-full preserve-3d"
        onClick={() => setIsAnimating(!isAnimating)}
      >
        <motion.div
          className="preserve-3d"
          animate={{ 
            rotateY: isAnimating ? 360 : 0, 
            rotateX: isAnimating ? 360 : 0 
          }}
          transition={{ 
            duration: 10, 
            repeat: isAnimating ? Infinity : 0, 
            ease: "linear" 
          }}
        >
          {/* Front */}
          <div className="cube-face absolute w-40 h-40 bg-primary-500 opacity-80 border-2 border-white" style={{ transform: "translateZ(20px)" }}>
            <div className="inset-0 flex items-center justify-center text-white">Front</div>
          </div>
          
          {/* Back */}
          <div className="cube-face absolute w-40 h-40 bg-secondary-500 opacity-80 border-2 border-white" style={{ transform: "rotateY(180deg) translateZ(20px)" }}>
            <div className="inset-0 flex items-center justify-center text-white">Back</div>
          </div>
          
          {/* Right */}
          <div className="cube-face absolute w-40 h-40 bg-accent-500 opacity-80 border-2 border-white" style={{ transform: "rotateY(90deg) translateZ(20px)" }}>
            <div className="inset-0 flex items-center justify-center text-white">Right</div>
          </div>
          
          {/* Left */}
          <div className="cube-face absolute w-40 h-40 bg-emerald-500 opacity-80 border-2 border-white" style={{ transform: "rotateY(-90deg) translateZ(20px)" }}>
            <div className="inset-0 flex items-center justify-center text-white">Left</div>
          </div>
          
          {/* Top */}
          <div className="cube-face absolute w-40 h-40 bg-amber-500 opacity-80 border-2 border-white" style={{ transform: "rotateX(90deg) translateZ(20px)" }}>
            <div className="inset-0 flex items-center justify-center text-white">Top</div>
          </div>
          
          {/* Bottom */}
          <div className="cube-face absolute w-40 h-40 bg-rose-500 opacity-80 border-2 border-white" style={{ transform: "rotateX(-90deg) translateZ(20px)" }}>
            <div className="inset-0 flex items-center justify-center text-white">Bottom</div>
          </div>
        </motion.div>
      </div>
      
      <p className="text-center mt-8 text-slate-600">
        Click the cube to {isAnimating ? "stop" : "start"} the animation
      </p>
      
      <style jsx>{`
        .perspective {
          perspective: 800px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .cube-face {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -20px;
          margin-top: -20px;
        }
      `}</style>
    </div>
  );
};

export default ThreeDEffects;