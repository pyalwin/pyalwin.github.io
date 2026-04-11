import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text selection:bg-lavender selection:text-background">
      <Hero />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}
