import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Smile, Coffee, Music, Camera, Book } from 'lucide-react';

const PageTransitions = () => {
  return (
    <div className="pb-12">
      <h1 className="section-title">Page Transitions</h1>
      <p className="section-subtitle">
        Smooth transitions between different pages and views that enhance the user experience.
        These animations create a sense of continuity and flow as users navigate through content.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Page Slider */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Slide Transitions</h2>
          <div className="card border border-slate-200 overflow-hidden">
            <PageSlider />
          </div>
        </section>
        
        {/* Modal Transitions */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Modal Transitions</h2>
          <div className="card border border-slate-200">
            <ModalDemo />
          </div>
        </section>
      </div>
      
      {/* Shared Element Transitions */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Shared Element Transitions</h2>
        <div className="card border border-slate-200">
          <SharedElementDemo />
        </div>
      </section>
      
      {/* Tab Transitions */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Tab Transitions</h2>
        <div className="card border border-slate-200">
          <TabTransitions />
        </div>
      </section>
    </div>
  );
};

const PageSlider = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const pages = [
    {
      title: "Welcome",
      subtitle: "Swipe through pages with smooth transitions",
      color: "bg-primary-50 text-primary-800",
      icon: <Star size={48} className="text-primary-500" />,
    },
    {
      title: "Features",
      subtitle: "Each page smoothly slides in and out",
      color: "bg-secondary-50 text-secondary-800",
      icon: <Smile size={48} className="text-secondary-500" />,
    },
    {
      title: "Benefits",
      subtitle: "Creating a fluid and connected experience",
      color: "bg-accent-50 text-accent-800",
      icon: <Coffee size={48} className="text-accent-500" />,
    }
  ];
  
  const paginate = (newDirection: number) => {
    const nextPage = currentPage + newDirection;
    
    if (nextPage >= 0 && nextPage < pages.length) {
      setDirection(newDirection);
      setCurrentPage(nextPage);
    }
  };
  
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 300 : -300,
        opacity: 0
      };
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 300 : -300,
        opacity: 0
      };
    }
  };
  
  return (
    <div className="p-6">
      <div className="relative h-64 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`absolute inset-0 ${pages[currentPage].color} rounded-lg p-6 flex flex-col items-center justify-center text-center`}
          >
            <div className="mb-4">
              {pages[currentPage].icon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{pages[currentPage].title}</h3>
            <p className="text-sm opacity-80">{pages[currentPage].subtitle}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          onClick={() => paginate(-1)}
          disabled={currentPage === 0}
          className={`btn btn-outline ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ChevronLeft size={18} className="mr-1" />
          Previous
        </button>
        
        <div className="flex space-x-2">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentPage ? 1 : -1);
                setCurrentPage(index);
              }}
              className={`w-3 h-3 rounded-full ${index === currentPage ? 'bg-primary-500' : 'bg-slate-300'}`}
            />
          ))}
        </div>
        
        <button
          onClick={() => paginate(1)}
          disabled={currentPage === pages.length - 1}
          className={`btn btn-outline ${currentPage === pages.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
          <ChevronRight size={18} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

const ModalDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="p-6 flex flex-col items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-primary"
      >
        Open Modal
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold mb-4">Modal Title</h3>
                <p className="text-slate-600 mb-6">
                  This modal smoothly animates in and out with a spring animation,
                  creating a natural and satisfying transition.
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="btn btn-outline"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <p className="mt-6 text-slate-600 text-center">
        The modal uses a combination of fade and scale animations.
      </p>
    </div>
  );
};

const SharedElementDemo = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  
  const items = [
    { id: 1, title: "Photography", icon: <Camera size={24} />, color: "bg-primary-100 text-primary-800" },
    { id: 2, title: "Music", icon: <Music size={24} />, color: "bg-secondary-100 text-secondary-800" },
    { id: 3, title: "Reading", icon: <Book size={24} />, color: "bg-accent-100 text-accent-800" },
  ];
  
  const selectedItem = selectedId ? items.find(item => item.id === selectedId) : null;
  
  return (
    <div className="p-6 relative">
      <h3 className="text-lg font-medium mb-4">Shared Element Example</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`card-container-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            className={`${item.color} p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow`}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div layoutId={`card-icon-${item.id}`} className="mb-2">
              {item.icon}
            </motion.div>
            <motion.h4 layoutId={`card-title-${item.id}`} className="font-medium">
              {item.title}
            </motion.h4>
          </motion.div>
        ))}
      </div>
      
      <p className="text-slate-600">
        Click on an item to see the shared element transition in action.
      </p>
      
      <AnimatePresence>
        {selectedId && selectedItem && (
          <>
            <motion.div
              className="fixed inset-0 bg-black z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
            />
            
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedId(null)}
            >
              <motion.div
                layoutId={`card-container-${selectedId}`}
                className={`${selectedItem.color} p-6 rounded-xl max-w-md w-full`}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div layoutId={`card-icon-${selectedId}`} className="mb-3">
                  {selectedItem.icon}
                </motion.div>
                
                <motion.h3 layoutId={`card-title-${selectedId}`} className="text-xl font-semibold mb-3">
                  {selectedItem.title}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  className="text-sm"
                >
                  This example demonstrates a shared element transition where parts of the UI
                  appear to transform and move between different states.
                </motion.p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const TabTransitions = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = [
    { id: 0, label: "Tab 1", content: "This is the content for Tab 1." },
    { id: 1, label: "Tab 2", content: "Here's some different content for Tab 2." },
    { id: 2, label: "Tab 3", content: "And finally, the content for Tab 3." },
  ];
  
  return (
    <div className="p-6">
      <div className="relative mb-6">
        <div className="flex border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 font-medium text-sm relative ${
                activeTab === tab.id ? 'text-primary-700' : 'text-slate-600 hover:text-slate-800'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-primary-500"
          initial={false}
          animate={{
            x: activeTab * 70, // Approximate width of each tab
            width: 70,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
      
      <div className="relative overflow-hidden min-h-[100px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="py-2"
          >
            <p className="text-slate-700">{tabs[activeTab].content}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <p className="mt-6 text-slate-600 text-sm text-center">
        The tab indicator smoothly transitions between tabs, while the content fades in and out.
      </p>
    </div>
  );
};

export default PageTransitions;