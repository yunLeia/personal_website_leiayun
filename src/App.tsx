import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CaseStudyLayout from './components/CaseStudyLayout';
import PlanfitDetail from './pages/PlanfitDetail';
import TikTokDetail from './pages/TikTokDetail';
import ParachuteDetail from './pages/ParachuteDetail';
import IndigoDetail from './pages/IndigoDetail';
import CabineDetail from './pages/CabineDetail';
import CulineAIDetail from './pages/CulineAIDetail';
import Nav from './components/Nav';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<CaseStudyLayout />}>
        <Route path="/work/tiktok" element={<TikTokDetail />} />
        <Route path="/work/planfit" element={<PlanfitDetail />} />
        <Route path="/work/parachute" element={<ParachuteDetail />} />
        <Route path="/work/indigo" element={<IndigoDetail />} />
        <Route path="/work/cabine" element={<CabineDetail />} />
        <Route path="/work/culinai" element={<CulineAIDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
