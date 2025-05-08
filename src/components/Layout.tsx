import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 py-6 md:px-8 lg:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={window.location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="bg-white border-t border-slate-200 py-6 px-4">
        <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
          Animation Playground — Built with React, Framer Motion & Tailwind CSS
        </div>
      </footer>
    </div>
  );
};

export default Layout;