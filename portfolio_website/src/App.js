import About from "./MyComponents/About"
import Achievements from "./MyComponents/Achievements"
import Contact from "./MyComponents/Contact"
import Experience from "./MyComponents/Experience"
import Navbar from "./MyComponents/Navbar"
import Projects from "./MyComponents/Projects"
import Skills from "./MyComponents/Skills"

function App() {
  return (
    <main className="text-gray-400 bg-gray-900 body-font">
      <Navbar/>;
      <About/>;
      <Skills/>;
      <Achievements/>;
      <Projects/>;
      <Experience/>;
      <Contact/>;
    </main>
  );
}

export default App;
