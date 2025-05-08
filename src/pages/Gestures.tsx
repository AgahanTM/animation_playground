import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useDragControls } from 'framer-motion';
import { Divide, Minus, X } from 'lucide-react';

const Gestures = () => {
  return (
    <div className="pb-12">
      <h1 className="section-title">Gesture Animations</h1>
      <p className="section-subtitle">
        Interactive animations driven by user gestures like dragging, swiping, tapping and more.
        These animations respond to user input for a more engaging experience.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Drag Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Drag Interactions</h2>
          
          {/* Draggable Item */}
          <div className="card p-8 mb-8">
            <h3 className="text-lg font-medium mb-4">Simple Drag</h3>
            <p className="text-slate-600 mb-6">Drag the item anywhere within the container.</p>
            
            <div className="bg-slate-100 h-48 rounded-lg relative flex items-center justify-center">
              <motion.div 
                className="w-16 h-16 bg-primary-500 rounded-lg cursor-grab active:cursor-grabbing flex items-center justify-center text-white font-semibold"
                drag
                dragConstraints={{ left: -120, right: 120, top: -60, bottom: 60 }}
                dragElastic={0.2}
                whileDrag={{ scale: 1.1 }}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              >
                Drag
              </motion.div>
            </div>
          </div>
          
          {/* Drag to Reorder */}
          <div className="card p-8">
            <h3 className="text-lg font-medium mb-4">Drag to Reorder</h3>
            <p className="text-slate-600 mb-6">Drag to reorder the items in the list.</p>
            <DraggableList />
          </div>
        </section>
        
        {/* Tap/Press Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Tap & Press Interactions</h2>
          
          {/* Tap Feedback */}
          <div className="card p-8 mb-8">
            <h3 className="text-lg font-medium mb-4">Tap Feedback</h3>
            <p className="text-slate-600 mb-6">Tap the buttons to see visual feedback.</p>
            
            <div className="flex flex-wrap gap-4">
              <motion.button
                className="btn btn-primary"
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Scale Down
              </motion.button>
              
              <motion.button
                className="btn btn-secondary"
                whileTap={{ backgroundColor: "#075985" }}
              >
                Color Change
              </motion.button>
              
              <motion.button
                className="btn btn-outline relative overflow-hidden"
                whileTap="tap"
              >
                <span>Ripple Effect</span>
                <motion.span
                  className="absolute inset-0 bg-slate-200 rounded-md"
                  variants={{
                    initial: { scale: 0, opacity: 0.5 },
                    tap: { scale: 1.5, opacity: 0, transition: { duration: 0.5 } }
                  }}
                  initial="initial"
                />
              </motion.button>
            </div>
          </div>
          
          {/* Press and Hold */}
          <div className="card p-8">
            <h3 className="text-lg font-medium mb-4">Press and Hold</h3>
            <p className="text-slate-600 mb-6">Press and hold to trigger animations.</p>
            <PressAndHold />
          </div>
        </section>
      </div>
      
      {/* Swipe Section */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Swipe Interactions</h2>
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-medium mb-4">Swipe Cards</h3>
          <p className="text-slate-600 mb-6">Swipe left to dismiss or right to accept.</p>
          <SwipeCards />
        </div>
      </section>
      
      {/* Pan and Pinch Section */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Pan & Zoom</h2>
        <div className="bg-white rounded-xl overflow-hidden shadow-md">
          <h3 className="text-lg font-medium p-6 border-b border-slate-200">Panning & Zooming</h3>
          <p className="px-6 py-4 text-slate-600">Drag to pan and pinch to zoom the image (or use mouse wheel).</p>
          <PanAndZoom />
        </div>
      </section>
    </div>
  );
};

const DraggableList = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Item 1", color: "bg-primary-100 border-primary-300" },
    { id: 2, text: "Item 2", color: "bg-secondary-100 border-secondary-300" },
    { id: 3, text: "Item 3", color: "bg-accent-100 border-accent-300" },
    { id: 4, text: "Item 4", color: "bg-emerald-100 border-emerald-300" }
  ]);
  
  const [draggingId, setDraggingId] = useState<number | null>(null);
  
  const handleDragStart = (itemId: number) => {
    setDraggingId(itemId);
  };
  
  const handleDragEnd = () => {
    setDraggingId(null);
  };
  
  const reorderItems = (sourceIndex: number, destinationIndex: number) => {
    const result = [...items];
    const [removed] = result.splice(sourceIndex, 1);
    result.splice(destinationIndex, 0, removed);
    return result;
  };
  
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          layout
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={1}
          onDragStart={() => handleDragStart(item.id)}
          onDragEnd={handleDragEnd}
          animate={{ 
            scale: draggingId === item.id ? 1.02 : 1,
            boxShadow: draggingId === item.id ? "0 10px 25px -5px rgba(0, 0, 0, 0.1)" : "0 1px 3px rgba(0, 0, 0, 0.1)"
          }}
          onViewportBoxUpdate={(_, delta) => {
            if (draggingId === item.id && delta.y.translate !== 0) {
              const nextIndex = index + (delta.y.translate > 0 ? 1 : -1);
              
              if (nextIndex >= 0 && nextIndex < items.length) {
                setItems(reorderItems(index, nextIndex));
              }
            }
          }}
          className={`p-4 rounded-lg border ${item.color} cursor-grab active:cursor-grabbing`}
        >
          <div className="flex justify-between items-center">
            <span>{item.text}</span>
            <Divide size={18} className="text-slate-400" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const PressAndHold = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const progressControls = useSpring(0, { stiffness: 200, damping: 30 });
  
  const handlePressStart = () => {
    setIsComplete(false);
    progressControls.set(0);
    
    const timer = setInterval(() => {
      progressControls.get() < 1 
        ? progressControls.set(progressControls.get() + 0.1) 
        : clearInterval(timer);
      
      if (progressControls.get() >= 1) {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, 200);
    
    return () => clearInterval(timer);
  };
  
  const handlePressEnd = () => {
    if (progressControls.get() < 1) {
      progressControls.set(0);
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-3 bg-slate-200 rounded-full mb-8 overflow-hidden">
        <motion.div 
          className="h-full bg-primary-500 origin-left"
          style={{ scaleX: progressControls }}
        />
      </div>
      
      <motion.button
        className="w-24 h-24 rounded-full bg-primary-500 text-white font-semibold flex items-center justify-center"
        whileTap={{ scale: 0.95 }}
        onTapStart={handlePressStart}
        onTap={handlePressEnd}
        onTapCancel={handlePressEnd}
      >
        {isComplete ? "Done!" : "Hold"}
      </motion.button>
      
      {isComplete && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-primary-600 font-medium"
        >
          Action completed!
        </motion.p>
      )}
    </div>
  );
};

const SwipeCards = () => {
  const [cards, setCards] = useState([
    { id: 1, content: "Swipe right to accept", color: "border-primary-300" },
    { id: 2, content: "Swipe left to reject", color: "border-secondary-300" },
    { id: 3, content: "Keep swiping!", color: "border-accent-300" }
  ]);
  
  const removeCard = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
  };
  
  return (
    <div className="relative h-80">
      {cards.map((card, index) => (
        <SwipeCard 
          key={card.id} 
          card={card} 
          removeCard={removeCard} 
          index={cards.length - 1 - index} 
        />
      ))}
      
      {cards.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center text-slate-500"
        >
          No more cards!
        </motion.div>
      )}
    </div>
  );
};

const SwipeCard = ({ 
  card, 
  removeCard, 
  index 
}: { 
  card: { id: number; content: string; color: string; }; 
  removeCard: (id: number) => void; 
  index: number; 
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  const dragControls = useDragControls();
  
  function handleDragEnd(event: any, info: any) {
    if (info.offset.x > 100) {
      removeCard(card.id);
    } else if (info.offset.x < -100) {
      removeCard(card.id);
    }
  }
  
  const acceptOpacity = useTransform(x, [0, 100], [0, 1]);
  const rejectOpacity = useTransform(x, [-100, 0], [1, 0]);
  
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ zIndex: index, opacity }}
    >
      <motion.div 
        className={`w-full h-64 bg-white rounded-xl shadow-md border-2 p-6 cursor-grab active:cursor-grabbing flex flex-col ${card.color}`}
        drag="x"
        dragControls={dragControls}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        style={{ x, rotate }}
        whileTap={{ scale: 1.05 }}
      >
        <div className="text-lg mb-2">{card.content}</div>
        
        <div className="mt-auto flex justify-between">
          <motion.div style={{ opacity: rejectOpacity }} className="text-red-500">
            <X size={24} />
          </motion.div>
          
          <motion.div style={{ opacity: acceptOpacity }} className="text-green-500">
            <CheckIcon size={24} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CheckIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const PanAndZoom = () => {
  const constraintsRef = useRef(null);
  const imageScale = useMotionValue(1);
  
  return (
    <div 
      className="relative overflow-hidden bg-slate-900 h-64 md:h-80"
      ref={constraintsRef}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        drag
        dragConstraints={constraintsRef}
        whileTap={{ cursor: "grabbing" }}
        style={{ scale: imageScale }}
        onWheel={(e) => {
          const newScale = Math.max(1, imageScale.get() - e.deltaY * 0.001);
          imageScale.set(newScale);
        }}
      >
        <img 
          src="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg" 
          alt="Landscape" 
          className="object-cover w-full h-full"
        />
      </motion.div>
      
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-80 rounded-full px-3 py-1 text-xs font-medium text-slate-800">
        Drag to pan • Scroll to zoom
      </div>
    </div>
  );
};

export default Gestures;