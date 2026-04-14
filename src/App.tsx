import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PlanfitDetail from './pages/PlanfitDetail';
import PlanfitCaseStudy from './pages/PlanfitCaseStudy';
import ParachuteDetail from './pages/ParachuteDetail';
import IndigoDetail from './pages/IndigoDetail';
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
        <Route path="/work/planfit" element={<PlanfitDetail />} />
        <Route path="/work/planfit/:slug" element={<PlanfitCaseStudy />} />
        <Route path="/work/parachute" element={<ParachuteDetail />} />
        <Route path="/work/indigo" element={<IndigoDetail />} />
        <Route path="/work/culinai" element={<CulineAIDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
