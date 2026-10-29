
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Workflow from "./components/Workflow";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Tech from "./components/Tech";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Tech />
        <About />
        <Skills />
        <Projects />
        <Workflow />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
