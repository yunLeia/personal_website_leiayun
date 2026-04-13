import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Work from './pages/Work';
import PlanfitDetail from './pages/PlanfitDetail';
import PlanfitCaseStudy from './pages/PlanfitCaseStudy';
import ParachuteDetail from './pages/ParachuteDetail';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/planfit" element={<PlanfitDetail />} />
        <Route path="/work/planfit/:slug" element={<PlanfitCaseStudy />} />
        <Route path="/work/parachute" element={<ParachuteDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
