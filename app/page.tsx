import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import SkillGlobe from "@/components/SkillGlobe";
import Work from "@/components/Work";
import Path from "@/components/Path";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Cursor />
      <Nav />
      <main className="relative z-[2]">
        <Hero />
        <Marquee />
        <About />
        <SkillGlobe />
        <Work />
        <Path />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
