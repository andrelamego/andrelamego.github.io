import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Download, ExternalLink, GraduationCap, ArrowDown, ChevronRight, Code2, Terminal } from 'lucide-react';
import Lenis from 'lenis';
import { UniverseBackground } from './UniverseBackground';
import { getPortfolioData } from '../../data/portfolio';
import { useLanguage } from '../../contexts/language';

const TextReveal = ({ children, className = "" }: { children: string, className?: string }) => {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.02 } }
      }}
      className={className}
    >
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export function PortfolioContent() {
  const { language } = useLanguage();
  const portfolioData = getPortfolioData(language);
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current || !contentRef.current) return;
    
    const lenis = new Lenis({
      wrapper: scrollRef.current,
      content: contentRef.current,
      lerp: 0.12,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);
  
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const springScroll = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.005 });
  
  const y = useTransform(springScroll, [0, 1], [0, 200]);
  const heroOpacity = useTransform(springScroll, [0, 0.15], [1, 0]);
  const spaceOpacity = useTransform(springScroll, [0, 0.3], [1, 0.2]);

  // Evolução visual: Cores mudando conforme o scroll avança na história
  const blob1Color = useTransform(
    springScroll, 
    [0, 0.3, 0.6, 0.9], 
    ["rgba(147, 51, 234, 0.1)", portfolioData.trajectory[0].color, portfolioData.trajectory[1].color, portfolioData.trajectory[2].color]
  );
  
  const blob2Color = useTransform(
    springScroll, 
    [0, 0.3, 0.6, 0.9], 
    ["rgba(37, 99, 235, 0.1)", "rgba(107, 114, 128, 0.1)", portfolioData.trajectory[0].color, portfolioData.trajectory[1].color]
  );

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#030303]">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
        >
          <motion.div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] blur-[150px] rounded-full" style={{ backgroundColor: blob1Color }} />
          <motion.div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] blur-[150px] rounded-full" style={{ backgroundColor: blob2Color }} />
        </div>
        
        {/* Animated Grid lines for tech feel */}
        <div className="absolute inset-0 opacity-[0.05]" 
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
        />
        
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      {/* 3D Space Background - Stays subtle throughout the journey */}
      <motion.div style={{ opacity: spaceOpacity }} className="absolute inset-0 z-0 pointer-events-none">
        <UniverseBackground />
      </motion.div>

      {/* Main Scroll Container */}
      <div 
        ref={scrollRef}
        className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden custom-scrollbar"
      >
        <div ref={contentRef} className="relative">
          
          {/* 1. CINEMATIC HERO */}
          <section className="h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
            <motion.div 
              style={{ y, opacity: heroOpacity }}
              className="text-center z-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-4 select-none">
                  LAMEGO
                </h1>
              </motion.div>
              
              <TextReveal className="text-xl md:text-3xl text-white/60 font-light tracking-widest uppercase mb-12">
                {portfolioData.hero.kicker}
              </TextReveal>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mx-auto mb-8 max-w-2xl text-sm md:text-base text-white/50 leading-relaxed"
              >
                {portfolioData.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mx-auto mb-10 inline-flex max-w-3xl items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-5 py-2 text-xs md:text-sm text-emerald-100"
              >
                {portfolioData.hero.availability}
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <a href={portfolioData.hero.links.cv} download className="group flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-all border border-white/20 backdrop-blur-xl">
                  {portfolioData.hero.ctas.cv} <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                </a>
                <a href={portfolioData.hero.links.github} target="_blank" rel="noreferrer" className="group flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 text-white backdrop-blur-xl">
                  {portfolioData.hero.ctas.github} <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
                <a href={portfolioData.hero.links.linkedin} target="_blank" rel="noreferrer" className="group flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 text-white backdrop-blur-xl">
                  {portfolioData.hero.ctas.linkedin} <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </motion.div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-12 flex flex-col items-center gap-2 text-white/30"
            >
              <span className="text-xs uppercase tracking-[0.3em]">{portfolioData.labels.explore}</span>
              <ArrowDown size={20} />
            </motion.div>
          </section>

          {/* 2. TRAJECTORY (SCROLLYTELLING) */}
          <section className="px-8 max-w-5xl mx-auto py-32 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
            
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center text-4xl md:text-6xl font-bold mb-32 text-white tracking-tight"
            >
              {portfolioData.labels.trajectory}
            </motion.h2>

            <div className="space-y-48">
              {portfolioData.trajectory.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-20%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="grid grid-cols-1 md:grid-cols-[1fr_48px_1fr] gap-8 md:gap-12 items-center w-full"
                >
                  {/* TEXT COLUMN */}
                  <div className={`flex w-full ${index % 2 === 0 ? 'md:col-start-1 md:justify-end md:text-right' : 'md:col-start-3 md:justify-start md:text-left'} md:row-start-1 order-2 md:order-none text-center`}>
                    <div className="max-w-md w-full px-4 md:px-0">
                      <span className="text-5xl md:text-7xl font-black text-white/5 mb-4 block leading-none break-words">
                        {item.year}
                      </span>
                      <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-white/50 text-lg leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* CENTER NODE */}
                  <div className="relative flex items-center justify-center shrink-0 w-12 mx-auto order-1 md:order-none md:col-start-2 md:row-start-1">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl z-10 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                    </div>
                    {/* Glowing pulse effect */}
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="absolute w-24 h-24 rounded-full bg-white/5 border border-white/10"
                    />
                  </div>

                  {/* CODE SNIPPET COLUMN */}
                  <div className={`hidden md:flex w-full ${index % 2 === 0 ? 'md:col-start-3 md:justify-start' : 'md:col-start-1 md:justify-end'} md:row-start-1`}>
                    <motion.div 
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50, rotateX: 10 }}
                      whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                      viewport={{ once: false, margin: "-20%" }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      className="glass p-6 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 shadow-2xl max-w-md w-full"
                    >
                      {/* Ambient glow inside snippet */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Mac OS Window Controls */}
                      <div className="flex gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                      </div>
                      
                      {/* Snippet Code */}
                      <pre className="text-[13px] text-white/70 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        <code className="text-white/80">{item.codeSnippet}</code>
                      </pre>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 3. PROJECTS (BENTO GRID REFINED) */}
          <section className="py-32 px-8 max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4">{portfolioData.labels.projects}</h2>
                <p className="text-white/40 text-lg">{portfolioData.labels.projectsSubtitle}</p>
              </div>
              <div className="flex gap-4">
                <div className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-xs uppercase tracking-widest">{portfolioData.labels.selectedWorks}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {portfolioData.projects.map((project, index) => (
                <motion.a 
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-[2rem] flex flex-col group overflow-hidden relative cursor-pointer border-white/5 hover:border-white/20 transition-all duration-500 md:col-span-6"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5 group-hover:opacity-20 transition-opacity duration-700`} />
                  
                  {/* Screenshot gallery for projects that have them */}
                  {project.screenshots?.length > 0 && (
                    <div className="relative z-10 px-6 pt-6">
                      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory" onClick={(e) => e.stopPropagation()}>
                        {project.screenshots.map((img, i) => (
                          <div key={i} className="flex-shrink-0 snap-start rounded-xl overflow-hidden border border-white/10 bg-black/30 w-[260px] h-[160px] relative group/img">
                            <img 
                              src={img} 
                              alt={`${project.title} screenshot ${i+1}`} 
                              loading="lazy" 
                              decoding="async" 
                              className="w-full h-full object-cover opacity-70 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-500" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="relative z-10 flex-1 flex flex-col p-8 md:p-12">
                    <div className="flex justify-between items-start mb-auto">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        {project.id === 'br-validator' ? <Code2 className="text-emerald-400" /> : <Terminal className="text-purple-400" />}
                      </div>
                      <ExternalLink size={24} className="text-white/20 group-hover:text-white transition-colors" />
                    </div>

                    <div className="mt-12">
                      <h3 className={`${index === 0 ? 'text-4xl md:text-6xl' : 'text-3xl'} font-bold text-white mb-6 tracking-tight`}>
                        {project.title}
                      </h3>
                      <p className={`${index === 0 ? 'text-xl text-white/60 max-w-2xl' : 'text-base text-white/40 max-w-md'} mb-8 leading-relaxed`}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-xs font-semibold px-4 py-2 rounded-full bg-white/5 border border-white/5 text-white/40 group-hover:text-white/80 group-hover:border-white/20 transition-all">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </section>

          {/* 4. ACADEMIC & SKILLS */}
          <section className="py-32 px-8 max-w-5xl mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass rounded-[3rem] p-12 md:p-20 overflow-hidden relative"
            >
              {/* Decorative Background Blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] -mr-32 -mt-32" />
              
              <div className="relative z-10">
                <div className="flex flex-col items-center mb-20 text-center">
                  <motion.div 
                    whileHover={{ rotate: 15 }}
                    className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-2xl"
                  >
                    <GraduationCap className="text-white" size={40} />
                  </motion.div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{portfolioData.education.degree}</h3>
                  <p className="text-white/40 text-lg uppercase tracking-widest">{portfolioData.education.institution}</p>
                  <p className="text-white/30 text-sm mt-3">{portfolioData.education.period}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {portfolioData.skills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-white/60 text-center hover:bg-white/5 hover:text-white hover:border-white/20 transition-all cursor-default flex items-center justify-center gap-2 group"
                    >
                      <ChevronRight size={14} className="text-white/20 group-hover:text-white transition-colors" />
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>
          
          <footer className="py-20 text-center relative z-10">
            <div className="w-12 h-px bg-white/10 mx-auto mb-8" />
            <p className="text-white/20 text-sm tracking-[0.2em] uppercase">© {new Date().getFullYear()} André Lamego</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
