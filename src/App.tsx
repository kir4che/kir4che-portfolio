import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import About from "@/components/About";
import Experience from "@/components/Experience";
import SkillList from "@/components/SkillList";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const App = () => (
  <>
    <Header />
    <main>
      <Banner />
      <About />
      <Experience />
      <SkillList />
      <Projects />
      <Contact />
    </main>
    <Footer />
  </>
);

export default App;
