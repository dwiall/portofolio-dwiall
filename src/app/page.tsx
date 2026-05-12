import { db } from "@/lib/db";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { GithubContribution } from "@/components/github/github-contribution";

export default async function Home() {
  // Fetch all data from database
  const heroData = await db.hero.findFirst();
  const experiences = await db.experience.findMany({ orderBy: { startDate: "desc" } });
  const education = await db.education.findMany({ orderBy: { startDate: "desc" } });
  const projects = await db.project.findMany({ orderBy: { createdAt: "desc" } });
  const skills = await db.skill.findMany({ orderBy: { category: "asc" } });
  const certificates = await db.certificate.findMany({ orderBy: { year: "desc" } });

  const fallbackHero = {
    name: "Adam",
    role: "Fullstack Web Developer | UI/UX Explorer",
    description: "I build high-performance, responsive web applications with a focus on modern user experience and clean code. Passionate about transforming complex ideas into elegant digital solutions.",
    cv: "#"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar name={heroData?.name} image={heroData?.image} />
      
      <main className="flex-grow pt-16">
        <Hero heroData={heroData || fallbackHero} />
        
        <GithubContribution />
        
        {(experiences.length > 0 || education.length > 0) && (
          <ExperienceSection 
            experiences={experiences} 
            education={education} 
          />
        )}
        
        {projects.length > 0 && <ProjectsSection projects={projects} />}
        
        {skills.length > 0 && <SkillsSection skills={skills} />}
        
        {certificates.length > 0 && <CertificatesSection certificates={certificates} />}
        
        <ContactSection />
      </main>

      <Footer name={heroData?.name} image={heroData?.image} />
    </div>
  );
}
