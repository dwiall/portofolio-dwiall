import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Image from "next/image";

interface FooterProps {
  name?: string;
  image?: string | null;
}

export function Footer({ name = "ADAM", image }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-16 mt-20 relative overflow-hidden border-t border-white/5">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[150px] pointer-events-none" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            
            <p className="text-blue-100/70 max-w-sm leading-relaxed text-lg">
              Information Systems student at Harkat State University with experience as a Web Developer. By combining skills in design and development, I strive to create digital solutions that are functional, visually appealing, and user-friendly, ensuring a smooth and engaging user experience.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href="https://github.com/dwiall" className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300">
                <FaGithub size={20} />
              </Link>
              <Link href="https://www.linkedin.com/in/adam-8107ba307/" className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300">
                <FaLinkedin size={20} />
              </Link>
              <Link href="https://www.instagram.com/_adam.dev/" className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300">
                <FaInstagram size={20} />
              </Link>
              <Link href="https://wa.me/6285640600585" className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300">
                <Mail size={20} />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-xl mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4 text-blue-100/60">
              <li><Link href="#" className="hover:text-primary transition-colors hover:pl-2 transition-all">Home</Link></li>
              <li><Link href="#experience" className="hover:text-primary transition-colors hover:pl-2 transition-all">Experience</Link></li>
              <li><Link href="#projects" className="hover:text-primary transition-colors hover:pl-2 transition-all">Projects</Link></li>
              <li><Link href="#skills" className="hover:text-primary transition-colors hover:pl-2 transition-all">Skills</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-6 text-white">Services</h4>
            <ul className="space-y-4 text-blue-100/60">
              <li className="hover:text-primary-foreground/80 cursor-default">Web Development</li>
              <li className="hover:text-primary-foreground/80 cursor-default">UI/UX Design</li>
              <li className="hover:text-primary-foreground/80 cursor-default">Mobile Apps</li>
              <li className="hover:text-primary-foreground/80 cursor-default">SEO Optimization</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-blue-100/40">
          <p>© {new Date().getFullYear()} {name} Portfolio. Crafted with Me.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:underline hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
