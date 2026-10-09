import { Contact } from "./contact";
import { Education } from "./education";
import { Experience } from "./experience";
import { Hero } from "./hero";
import { Projects } from "./projects";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { Skills } from "./skills";
import "./landing.css";

/** Landing (`/`). Server Component; solo el botón de tema y el grafo del hero son de cliente. */
export function LandingPage() {
  return (
    <div className="landing">
      <SiteHeader />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
