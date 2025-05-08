import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import HoverEffects from './pages/HoverEffects';
import ScrollReveal from './pages/ScrollReveal';
import Gestures from './pages/Gestures';
import SVGAnimations from './pages/SVGAnimations';
import PageTransitions from './pages/PageTransitions';
import ThreeDEffects from './pages/ThreeDEffects';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="hover-effects" element={<HoverEffects />} />
          <Route path="scroll-reveal" element={<ScrollReveal />} />
          <Route path="gestures" element={<Gestures />} />
          <Route path="svg-animations" element={<SVGAnimations />} />
          <Route path="page-transitions" element={<PageTransitions />} />
          <Route path="3d-effects" element={<ThreeDEffects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;