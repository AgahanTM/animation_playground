import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/hover-effects', label: 'Hover Effects' },
  { path: '/scroll-reveal', label: 'Scroll Reveal' },
  { path: '/gestures', label: 'Gestures' },
  { path: '/svg-animations', label: 'SVG Animations' },
  { path: '/page-transitions', label: 'Page Transitions' },
  { path: '/3d-effects', label: '3D Effects' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <NavLink 
            to="/" 
            className="flex items-center gap-2 text-primary-700 font-semibold text-xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={24} />
            </motion.div>
            <span>Animation Playground</span>
          </NavLink>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              item.path === '/' ? null : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 
                    ${isActive ? 'text-primary-700 bg-primary-50' : 'text-slate-600 hover:text-primary-600 hover:bg-slate-100'}`
                  }
                >
                  {item.label}
                </NavLink>
              )
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden text-slate-600 hover:text-primary-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-2 py-2 space-y-1"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium 
                  ${isActive ? 'text-primary-700 bg-primary-50' : 'text-slate-600 hover:text-primary-600 hover:bg-slate-100'}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;