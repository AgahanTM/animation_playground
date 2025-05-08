import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MousePointer, ScrollText, Hand, PenTool, Captions as Transition, Cuboid as Cube } from 'lucide-react';

const categories = [
  {
    path: '/hover-effects',
    title: 'Hover Effects',
    description: 'Buttons, cards, and icons with interactive hover animations.',
    icon: <MousePointer size={24} />,
    color: 'bg-primary-100 text-primary-700',
  },
  {
    path: '/scroll-reveal',
    title: 'Scroll Reveal',
    description: 'Elements that animate when they enter the viewport.',
    icon: <ScrollText size={24} />,
    color: 'bg-secondary-100 text-secondary-700',
  },
  {
    path: '/gestures',
    title: 'Gestures',
    description: 'Drag-to-reorder, press/hold, swipe animations and more.',
    icon: <Hand size={24} />,
    color: 'bg-accent-100 text-accent-700',
  },
  {
    path: '/svg-animations',
    title: 'SVG Animations',
    description: 'Stroke path drawings, morphing shapes, and animated icons.',
    icon: <PenTool size={24} />,
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    path: '/page-transitions',
    title: 'Page Transitions',
    description: 'Animate between pages using shared element transitions.',
    icon: <Transition size={24} />,
    color: 'bg-amber-100 text-amber-700',
  },
  {
    path: '/3d-effects',
    title: '3D Effects',
    description: 'Tilt-on-hover, depth-based layering, and perspective transformations.',
    icon: <Cube size={24} />,
    color: 'bg-rose-100 text-rose-700',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const Home = () => {
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-primary-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Animation Playground
        </motion.h1>
        <motion.p 
          className="text-xl text-slate-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          A showcase of modern UI animations and interactions built with React and Framer Motion.
          Explore the different categories to see various animation techniques in action.
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {categories.map((category) => (
          <motion.div key={category.path} variants={item}>
            <Link to={category.path}>
              <motion.div 
                className="card h-full hover:shadow-lg transition-shadow"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 ${category.color}`}>
                  {category.icon}
                </div>
                <h2 className="text-xl font-semibold mb-2 text-slate-800">{category.title}</h2>
                <p className="text-slate-600">{category.description}</p>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;