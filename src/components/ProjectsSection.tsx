import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';

interface ProjectData {
  number: string;
  category: string;
  name: string;
  liveUrl: string;
  image: string;
  overview: string;
  details: string[];
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'SaaS · Compliance',
    name: 'CSync',
    liveUrl: 'https://csync.co/',
    image: '/csync-home.png',
    overview:
      'A compliance management platform for Company Secretaries that simplifies recurring legal and regulatory operations.',
    details: [
      'Automates statutory filings and recurring compliance timelines to reduce manual follow-ups.',
      'Centralizes company documents with structured storage and faster retrieval for audit readiness.',
      'Supports workflow-based task tracking so teams can assign, review, and complete compliance actions.',
      'Improves visibility across due dates, pending obligations, and filing progress for stakeholders.',
    ],
  },
  {
    number: '02',
    category: 'Corporate · Web',
    name: 'Intellosoft Infotech',
    liveUrl: 'https://www.intellosoft.io/',
    image: '/intellosoft-home.png',
    overview:
      'A corporate website and digital presence platform designed to communicate services clearly and drive inbound leads.',
    details: [
      'Presents services, expertise, and company messaging with a clean conversion-focused structure.',
      'Optimized responsive experience across desktop, tablet, and mobile for consistent brand perception.',
      'Improves user flow from discovery to contact actions with clear information hierarchy and CTAs.',
      'Acts as a scalable foundation for long-term marketing, SEO visibility, and client trust building.',
    ],
  },
  {
    number: '03',
    category: 'AI · LLM',
    name: 'Febi AI',
    liveUrl: 'https://febi.ai/',
    image: '/febi-home.png',
    overview:
      'An AI assistant platform powered by LLMs to automate customer communication and internal business workflows.',
    details: [
      'Handles customer queries instantly with context-aware AI responses for faster support operations.',
      'Automates repetitive conversation paths to reduce manual load on customer-facing teams.',
      'Integrates with business processes to streamline tasks, improve response consistency, and save time.',
      'Enables teams to scale support quality without proportionally increasing human intervention.',
    ],
  },
  {
    number: '04',
    category: 'AI · Chatbot',
    name: 'Machine Avatars',
    liveUrl: 'https://machineavatars.com/',
    image: '/machineavatars-home.png',
    overview:
      'An AI chatbot solution embedded into websites to engage visitors continuously and capture business opportunities.',
    details: [
      'Provides 24/7 visitor engagement and instant responses without requiring live agent availability.',
      'Automates conversation flows for FAQs, qualification, and early-stage discovery.',
      'Captures and qualifies leads directly from chat interactions to support sales pipelines.',
      'Improves conversion potential by combining support, engagement, and lead generation in one layer.',
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
          {/* Top row: number + meta + button */}
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

                    <div className="shrink-0 self-start sm:self-auto pt-1 sm:pt-2 md:pt-3 w-full sm:w-auto">
                      <LiveProjectButton href={project.liveUrl} className="w-full sm:w-auto" />
                    </div>
                  </div>

        {/* One image + detailed content */}
        <div className="grid grid-cols-1 md:grid-cols-[46%_54%] gap-4 sm:gap-5 md:gap-6 flex-1 min-h-0">
          <div className="overflow-hidden rounded-[30px] sm:rounded-[36px] md:rounded-[42px] border border-[#D7E2EA]/20 min-h-[200px] md:min-h-0">
            <img
              src={project.image}
              alt={`${project.name} homepage screenshot`}
              className="h-full w-full object-cover object-top"
              loading="lazy"
              draggable={false}
            />
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

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
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

export default ProjectsSection;
