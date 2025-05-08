import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Heart, Mail, Home, Send } from 'lucide-react';

const SVGAnimations = () => {
  return (
    <div className="pb-12">
      <h1 className="section-title">SVG Animations</h1>
      <p className="section-subtitle">
        Explore the power of SVG animations for engaging UI effects.
        From smooth path animations to morphing shapes and interactive icons.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Path Drawing Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Path Drawing</h2>
          <div className="card p-8">
            <h3 className="text-lg font-medium mb-4">Line Drawing Animation</h3>
            <p className="text-slate-600 mb-6">SVG paths that draw themselves using stroke animations.</p>
            
            <div className="flex flex-col items-center justify-center">
              <DrawingDemo />
              <button
                onClick={() => window.location.reload()}
                className="mt-6 btn btn-outline"
              >
                Replay Animation
              </button>
            </div>
          </div>
        </section>
        
        {/* Morphing SVG Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Shape Morphing</h2>
          <div className="card p-8">
            <h3 className="text-lg font-medium mb-4">Toggle Shape</h3>
            <p className="text-slate-600 mb-6">SVG shapes that smoothly morph between states.</p>
            
            <div className="flex flex-col items-center justify-center">
              <ThemeSwitcher />
            </div>
          </div>
        </section>
      </div>
      
      {/* Interactive Icons Section */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Interactive Icons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-8 flex flex-col items-center">
            <h3 className="text-lg font-medium mb-4">Animated Like Button</h3>
            <LikeButton />
          </div>
          
          <div className="card p-8 flex flex-col items-center">
            <h3 className="text-lg font-medium mb-4">Mail Animation</h3>
            <MailIcon />
          </div>
          
          <div className="card p-8 flex flex-col items-center">
            <h3 className="text-lg font-medium mb-4">Home Icon</h3>
            <HomeIcon />
          </div>
        </div>
      </section>
      
      {/* Loader Animations Section */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Loader Animations</h2>
        <div className="card p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-medium mb-4">Spinner</h3>
              <Spinner />
            </div>
            
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-medium mb-4">Pulse Loader</h3>
              <PulseLoader />
            </div>
            
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-medium mb-4">Progress Bar</h3>
              <ProgressLoader />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const DrawingDemo = () => {
  return (
    <div className="w-64 h-64 flex items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200">
        {/* Circle with dash animation */}
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          stroke="#8B5CF6"
          strokeWidth="6"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Star shape */}
        <motion.path
          d="M100 20 L108 76 L164 76 L119 109 L134 164 L100 134 L66 164 L81 109 L36 76 L92 76 Z"
          stroke="#EC4899"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
        />
        
        {/* Path fills in after drawing */}
        <motion.path
          d="M100 20 L108 76 L164 76 L119 109 L134 164 L100 134 L66 164 L81 109 L36 76 L92 76 Z"
          fill="#EC4899"
          initial={{ fillOpacity: 0 }}
          animate={{ fillOpacity: 0.2 }}
          transition={{ duration: 1, delay: 3.5 }}
        />
      </svg>
    </div>
  );
};

const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`w-64 h-32 rounded-full p-4 flex items-center transition-colors duration-500 ${isDark ? 'bg-slate-800' : 'bg-blue-100'}`}
      >
        <motion.div 
          className={`w-24 h-24 rounded-full flex items-center justify-center ${isDark ? 'bg-slate-700' : 'bg-blue-50'}`}
          animate={{ x: isDark ? 96 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isDark ? 'moon' : 'sun'}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.5 }}
              className={isDark ? 'text-slate-200' : 'text-yellow-500'}
            >
              {isDark ? <Moon size={36} /> : <Sun size={36} />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
      
      <button 
        onClick={() => setIsDark(!isDark)}
        className="mt-6 btn btn-primary"
      >
        Toggle Theme
      </button>
      
      <p className="mt-4 text-slate-600">
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </p>
    </div>
  );
};

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <div className="flex flex-col items-center">
      <motion.button
        className={`p-4 rounded-full ${isLiked ? 'text-red-500' : 'text-slate-400'}`}
        onClick={() => setIsLiked(!isLiked)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={isLiked ? {
            scale: [1, 1.5, 1],
            transition: { duration: 0.5 }
          } : {}}
        >
          <Heart size={48} fill={isLiked ? "currentColor" : "none"} />
        </motion.div>
      </motion.button>
      
      <p className="mt-4 text-slate-600 text-center">
        Click to {isLiked ? 'unlike' : 'like'}
      </p>
    </div>
  );
};

const MailIcon = () => {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div className="flex flex-col items-center">
      <motion.button
        className="p-4 rounded-full text-primary-600"
        onClick={() => setIsActive(!isActive)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.div
              key="send"
              initial={{ rotate: -30, x: -10, opacity: 0 }}
              animate={{ rotate: 0, x: 0, opacity: 1 }}
              exit={{ rotate: 30, x: 10, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Send size={48} />
            </motion.div>
          ) : (
            <motion.div
              key="mail"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Mail size={48} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      
      <p className="mt-4 text-slate-600 text-center">
        Click to toggle
      </p>
    </div>
  );
};

const HomeIcon = () => {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="p-4 rounded-full text-secondary-600"
        whileHover="hover"
      >
        <div className="relative">
          <Home size={48} />
          
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            variants={{
              hover: {
                y: [0, -5, 0],
                transition: { 
                  repeat: Infinity, 
                  duration: 1,
                  repeatType: "loop" 
                }
              }
            }}
          >
            <Home size={48} fill="rgba(0, 0, 0, 0.2)" />
          </motion.div>
        </div>
      </motion.div>
      
      <p className="mt-4 text-slate-600 text-center">
        Hover to animate
      </p>
    </div>
  );
};

const Spinner = () => {
  return (
    <div className="w-16 h-16 relative">
      <motion.div
        className="absolute inset-0 border-4 border-t-primary-500 border-r-primary-400 border-b-primary-300 border-l-primary-200 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

const PulseLoader = () => {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-4 h-4 bg-secondary-500 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const ProgressLoader = () => {
  const [progress, setProgress] = useState(0);
  
  useState(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
    
    return () => clearInterval(timer);
  });
  
  return (
    <div className="w-64">
      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent-500 origin-left"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p className="text-center mt-2 text-sm">{progress}%</p>
    </div>
  );
};

export default SVGAnimations;