import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Heart, Share2, Clock, Download } from 'lucide-react';

const HoverEffects = () => {
  return (
    <div className="pb-12">
      <h1 className="section-title">Hover Effects</h1>
      <p className="section-subtitle">
        Interactive hover animations that provide visual feedback and enhance user experience.
        Hover over the elements below to see the animations in action.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Buttons Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Animated Buttons</h2>
          <div className="space-y-6">
            {/* Arrow Button */}
            <div>
              <h3 className="text-sm font-medium text-slate-600 mb-3">Arrow Button</h3>
              <motion.button
                className="btn btn-primary w-full"
                whileHover={{ 
                  paddingRight: "2.5rem", 
                  transition: { duration: 0.2 } 
                }}
              >
                <span>Learn More</span>
                <motion.div
                  className="absolute right-4 opacity-0"
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ 
                    opacity: 1, 
                    x: 0, 
                    transition: { duration: 0.2 } 
                  }}
                >
                  <ArrowRight size={18} />
                </motion.div>
              </motion.button>
            </div>

            {/* Scale Button */}
            <div>
              <h3 className="text-sm font-medium text-slate-600 mb-3">Scale Button</h3>
              <motion.button
                className="btn btn-secondary w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Download Now
              </motion.button>
            </div>

            {/* Gradient Shift */}
            <div>
              <h3 className="text-sm font-medium text-slate-600 mb-3">Gradient Shift</h3>
              <motion.button
                className="btn w-full text-white"
                style={{ 
                  background: "linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: "0% 0%"
                }}
                whileHover={{ 
                  backgroundPosition: "100% 0%",
                  transition: { duration: 0.8, ease: "easeInOut" }
                }}
              >
                Sign Up Now
              </motion.button>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Card Hover Effects</h2>
          
          {/* Lift Card */}
          <motion.div 
            className="card mb-6 border border-slate-200"
            whileHover={{ 
              y: -8, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { type: "spring", stiffness: 400, damping: 17 }
            }}
          >
            <h3 className="text-lg font-semibold mb-2">Lift Effect</h3>
            <p className="text-slate-600 mb-4">This card lifts up when you hover over it, with a smooth spring animation.</p>
            <div className="text-primary-600 font-medium">Learn more</div>
          </motion.div>
          
          {/* Reveal Card */}
          <div className="relative overflow-hidden rounded-xl">
            <motion.div 
              className="card border border-slate-200"
              whileHover="hover"
            >
              <h3 className="text-lg font-semibold mb-2">Content Reveal</h3>
              <p className="text-slate-600 mb-4">Hover to reveal additional actions with a sliding animation.</p>
              
              <motion.div 
                className="absolute inset-x-0 bottom-0 bg-slate-100 py-3 px-6 flex justify-between"
                initial={{ y: "100%" }}
                variants={{
                  hover: { y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
                }}
              >
                <button className="text-slate-700 hover:text-primary-700 transition-colors">
                  <Heart size={20} />
                </button>
                <button className="text-slate-700 hover:text-primary-700 transition-colors">
                  <MessageCircle size={20} />
                </button>
                <button className="text-slate-700 hover:text-primary-700 transition-colors">
                  <Share2 size={20} />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Icon Animations Section */}
      <section className="mt-16">
        <h2 className="text-xl font-semibold mb-6">Icon Hover Effects</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Rotate Icon */}
          <div className="card flex flex-col items-center text-center">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="text-primary-500 mb-4"
            >
              <Clock size={36} />
            </motion.div>
            <p className="text-sm text-slate-600">Rotation Effect</p>
          </div>
          
          {/* Pulse Icon */}
          <div className="card flex flex-col items-center text-center">
            <motion.div
              whileHover={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-secondary-500 mb-4"
            >
              <Heart size={36} />
            </motion.div>
            <p className="text-sm text-slate-600">Pulse Effect</p>
          </div>
          
          {/* Color Change Icon */}
          <div className="card flex flex-col items-center text-center">
            <motion.div
              initial={{ color: "#cbd5e1" }}
              whileHover={{ color: "#ec4899" }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <MessageCircle size={36} />
            </motion.div>
            <p className="text-sm text-slate-600">Color Change</p>
          </div>
          
          {/* Bounce Icon */}
          <div className="card flex flex-col items-center text-center">
            <motion.div
              whileHover={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="text-accent-500 mb-4"
            >
              <Download size={36} />
            </motion.div>
            <p className="text-sm text-slate-600">Bounce Effect</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HoverEffects;