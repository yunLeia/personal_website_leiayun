import Nav from './components/sections/Nav';
import Hero from './components/sections/Hero';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

function App() {
  return (
    <>
      <Nav />
      <div className="max-w-[1100px] mx-auto px-6 max-sm:px-5">
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </>
  );
}

export default App;
