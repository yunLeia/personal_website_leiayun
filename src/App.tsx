import Hero from './components/sections/Hero';
import Education from './components/sections/Education';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Awards from './components/sections/Awards';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="max-w-[600px] mx-auto px-6 pt-16 pb-20">
      <Hero />
      <Education />
      <Experience />
      <Projects />
      <Skills />
      <Awards />
      <Contact />
    </div>
  );
}

export default App;
