import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';

interface ProjectData {
  number: string;
  category: string;
  name: string;
  playStoreUrl: string;
  appStoreUrl: string;
  image: string;
  overview: string;
  details: string[];
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'Business · Platform',
    name: 'DTPS Tech',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=mw.dtps.app',
    appStoreUrl: 'https://apps.apple.com/in/app/dtps-nutrition/id6759550995',
    image: '/DTPSTechMobile.png',
    overview:
      'A technology platform focused on customer engagement, business growth, and intuitive digital experiences.',
    details: [
      'Builds user-centric product journeys that improve interaction quality and retention.',
      'Supports business growth goals through high-clarity interfaces and strong usability.',
      'Balances modern UI with practical product flows for faster user adoption.',
      'Includes Flutter-powered components for polished, cross-platform mobile experiences.',
      'Enables organizations to present digital capabilities in a scalable and accessible way.',
    ],
  },
  {
    number: '02',
    category: 'HRTech · Recruitment',
    name: 'Talio',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=sbs.zenova.twa',
    appStoreUrl: 'https://apps.apple.com/in/app/talio-productivity/id6758448703',
    image: '/TalioMobile.png',
    overview:
      'A recruitment and talent management platform that streamlines hiring operations from job posting to pipeline management.',
    details: [
      'Manages job postings, candidate applications, and hiring workflows in a unified system.',
      'Improves recruiter efficiency through organized candidate tracking and status movement.',
      'Supports end-to-end hiring coordination for teams across sourcing, screening, and selection.',
      'Helps organizations build structured talent pipelines for ongoing workforce planning.',
    ],
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ProjectCard = ({ project, index, total, containerRef }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll progress for THIS card relative to the whole projects scroll range.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  // Cards further down the stack stay full-size; earlier cards scale DOWN
  // as later cards stack on top of them.
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky top-24 md:top-32 h-[85vh] w-full"
      style={{ top: `${96 + index * 28}px` }}
    >
      <motion.article
        style={{ scale }}
        className="origin-top mx-auto h-full w-full flex flex-col gap-4 sm:gap-6 md:gap-8 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
      >
        {/* Top row: number + meta + buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex flex-row items-start gap-3 sm:gap-6 md:gap-10 min-w-0 w-full">
            <div
              className="shrink-0 font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 140px)' }}
            >
              {project.number}
            </div>

            <div className="flex flex-col gap-1 sm:gap-3 pt-1 sm:pt-3 md:pt-4 min-w-0 flex-1">
              <span
                className="font-light uppercase tracking-widest text-[#D7E2EA]/60"
                style={{ fontSize: 'clamp(0.65rem, 1.2vw, 1rem)' }}
              >
                {project.category}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA] leading-tight"
                style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <div className="shrink-0 self-start sm:self-auto pt-1 sm:pt-2 md:pt-3 flex flex-wrap gap-3">
            {project.playStoreUrl && (
              <a
                href={project.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] w-[170px] sm:w-[210px] py-3 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] whitespace-nowrap transition-colors duration-200 hover:bg-[#D7E2EA]/10 gap-2.5"
              >
                <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0,0h40v40H0V0z" />
                  <g>
                    <path d="M19.7,19.2L4.3,35.3c0,0,0,0,0,0c0.5,1.7,2.1,3,4,3c0.8,0,1.5-0.2,2.1-0.6l0,0l17.4-9.9L19.7,19.2z" fill="#EA4335" />
                    <path d="M35.3,16.4L35.3,16.4l-7.5-4.3l-8.4,7.4l8.5,8.3l7.5-4.2c1.3-0.7,2.2-2.1,2.2-3.6C37.5,18.5,36.6,17.1,35.3,16.4z" fill="#FBBC04" />
                    <path d="M4.3,4.7C4.2,5,4.2,5.4,4.2,5.8v28.5c0,0.4,0,0.7,0.1,1.1l16-15.7L4.3,4.7z" fill="#4285F4" />
                    <path d="M19.8,20l8-7.9L10.5,2.3C9.9,1.9,9.1,1.7,8.3,1.7c-1.9,0-3.6,1.3-4,3c0,0,0,0,0,0L19.8,20z" fill="#34A853" />
                  </g>
                </svg>
                Play Store
              </a>
            )}
            {project.appStoreUrl && (
              <a
                href={project.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] w-[170px] sm:w-[210px] py-3 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] whitespace-nowrap transition-colors duration-200 hover:bg-[#D7E2EA]/10 gap-2.5"
              >
                <svg className="w-[18px] h-[18px] fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.1,16.67C20.08,16.74 19.67,18.11 18.71,19.5M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.68,3.04 13.19,4.14 13.34,5.39C14.39,5.47 15.4,4.88 15.97,4.17Z" />
                </svg>
                App Store
              </a>
            )}
          </div>
        </div>

        {/* Mobile Mockup + detailed content */}
        <div className="grid grid-cols-1 md:grid-cols-[46%_54%] gap-4 sm:gap-5 md:gap-6 flex-1 min-h-0">
          {/* Phone Device Mockup Container - borderless and backgroundless */}
          <div className="relative flex items-center justify-center min-h-[350px] md:min-h-0 py-2">
            
            {/* Phone Body Wrapper for shadow/glow - matches the height of the right column */}
            <div className="group relative w-auto h-full max-h-[100%] aspect-[9/19] rounded-[36px] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(215,226,234,0.15)]">
              {/* Subtle Shadow Below Phone */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-black/80 blur-md rounded-full pointer-events-none" />

              {/* Phone Body */}
              <div 
                className="relative w-full h-full rounded-[36px] border-[6px] border-[#1e1e1e] bg-[#0c0c0c] shadow-2xl overflow-hidden ring-1 ring-white/10 flex flex-col"
                style={{ transform: 'translateZ(0)' }}
              >
                {/* Dynamic Island / Notch */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black rounded-full z-30 flex items-center justify-end px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#111] border border-white/5" />
                </div>
                
                {/* Speaker Ear Piece */}

                {/* Status Bar Mock */}
                <div className="h-6 w-full bg-black/40 backdrop-blur-sm z-20 absolute top-0 left-0 flex items-center justify-between px-4 text-[8px] font-medium text-white/80 select-none">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="3" y="17" width="3.5" height="4" rx="1.2" />
                      <rect x="8" y="13" width="3.5" height="8" rx="1.2" />
                      <rect x="13" y="9" width="3.5" height="12" rx="1.2" />
                      <rect x="18" y="5" width="3.5" height="16" rx="1.2" />
                    </svg>
                    {/* Realistic curvy Battery with terminal cap bulge */}
                    <svg className="w-3.5 h-2 shrink-0" viewBox="0 0 24 14" fill="none">
                      {/* Curvy Outer Shell */}
                      <rect x="1" y="2.5" width="18.5" height="9" rx="2.8" stroke="currentColor" strokeWidth="1.5" />
                      {/* Curvy Terminal Cap Bulge */}
                      <rect x="21" y="5" width="1.5" height="4" rx="0.8" fill="currentColor" />
                      {/* Curvy Inner Charge level */}
                      <rect x="3" y="4.5" width="14.5" height="5" rx="1.2" fill="currentColor" />
                    </svg>
                  </div>
                </div>

                {/* Phone Screen / App Content with Hover Zoom */}
                <div 
                  className="flex-1 w-full h-full relative overflow-hidden bg-[#0c0c0c] pt-6 group rounded-[30px]"
                  style={{ transform: 'translateZ(0)' }}
                >
                  <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[30px]">
                    <img
                      src={project.image}
                      alt={`${project.name} mobile screenshot`}
                      className="w-full h-full absolute inset-0 object-cover object-top transition-transform duration-[6s] ease-in-out group-hover:scale-105"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>

                  {/* Realistic Screen Glass Reflection Shine (now inside the clipped container) */}
                  <div className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none rounded-[30px]" />
                  <div className="absolute -inset-full z-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] ease-out pointer-events-none rounded-[30px]" />
                </div>

                {/* Bottom Home Indicator Bar */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/60 rounded-full z-30" />
              </div>
            </div>
          </div>

          <div className="min-h-0 rounded-[30px] sm:rounded-[36px] md:rounded-[42px] border border-[#D7E2EA]/20 bg-[#121212] p-4 sm:p-6 md:p-7 overflow-y-auto">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#D7E2EA]/90">
              {project.overview}
            </p>
            <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 text-xs sm:text-sm md:text-base text-[#D7E2EA]/80 leading-relaxed">
              {project.details.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#D7E2EA]/70 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

const MobileProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="mobile-projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Mobile Apps
        </h2>
      </FadeIn>

      <div ref={containerRef} className="mx-auto max-w-7xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={PROJECTS.length}
            containerRef={containerRef}
          />
        ))}
      </div>
    </section>
  );
};

export default MobileProjectsSection;
