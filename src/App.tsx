import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
  AnimatePresence,
  useMotionValueEvent,
} from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  Globe,
  Phone,
  ExternalLink,
  Hammer,
  Users,
  Zap,
  MapPin,
  Briefcase,
  Tag,
  ArrowRight,
} from "lucide-react";

// --- Data ---
const experiences = [
  {
    company: "Carsu",
    role: "Full Stack Developer",
    date: "March 2024 - Present",
    location: "Italy (Remote)",
    industry: "SaaS / Automotive",
    type: "Freelance",
    link: "https://carsu.com/",
    description: [
      "Driving the development of a comprehensive SaaS platform for auto repair and tire shop management.",
      "Architected and developed a full-stack solution using Next.js, Typescript, tRPC, Drizzle ORM and Supabase.",
      "Integrated the WhatsApp Business API to build an automated communication system.",
      "Led the refactoring of the platform to a microservices architecture using Next.js, NestJS and Prisma.",
    ],
  },
  {
    company: "Transbridge",
    role: "Mobile App Developer",
    date: "Oct 2025 - Feb 2026",
    location: "United States (Remote)",
    industry: "FinTech",
    type: "Freelance",
    link: "",
    description: [
      "Led the architecture and development of FlashPay Mobile, a production-ready, cross-platform banking app built with React Native and Expo.",
      "Implemented advanced state management using Legend State and TanStack Query.",
      "Developed comprehensive banking features including user authentication, virtual and external account management.",
    ],
  },
  {
    company: "Ascendion x Cebu Pacific",
    role: "Full Stack Developer",
    date: "June 2024 - Aug 2025",
    location: "Philippines (Remote)",
    industry: "Aviation Tech",
    type: "Full-time",
    link: "https://ascendion.com/",
    description: [
      "Contributing to enterprise Sharepoint 2010-2016 to Online migration project.",
      "Built a custom proxy server using APIGEE to streamline Power Automate workflows.",
      "Designed a robust URL management system using a Business Rules Engine (BRE) as a CMS.",
      "Developed PowerShell automation scripts to perform data extraction and migration validation.",
    ],
  },
  {
    company: "AR Data Tech",
    role: "Backend Developer",
    date: "Nov 2024 - Jan 2025",
    location: "Canada (Remote)",
    industry: "FinTech / Web3",
    type: "Freelance",
    link: "https://www.ardata.tech/",
    description: [
      "Architected and developed a core Web3 platform for institutional clients, managing digital asset and cryptocurrency operations.",
      "Built robust Solana blockchain integration using NestJS, TypeScript, and PostgreSQL.",
      "Implemented critical monitoring APIs, which provided real-time blockchain synchronization status.",
    ],
  },
  {
    company: "Delta Storage",
    role: "Full Stack Developer",
    date: "July 2024 - Jan 2025",
    location: "Philippines (Remote)",
    industry: "Web3 / Storage",
    type: "Freelance",
    link: "https://www.delta.storage/",
    description: [
      "Developed decentralized file storage platform utilizing IPFS networks, TypeScript, Express.js, and Prisma ORM.",
      "Built and published developer SDK to npm, enabling seamless integration.",
      "Integrated the Stripe payment gateway to manage storage subscriptions.",
    ],
  },
  {
    company: "Betterteem",
    role: "Full Stack Software Engineer",
    date: "Aug 2021 - Sept 2023",
    location: "Philippines (Remote)",
    industry: "HRTech",
    type: "Full-time",
    link: "https://www.betterteem.com/",
    description: [
      "Developed an AI-powered HR analytics web application using TypeScript, React, and Express.js.",
      "Built React Native mobile app 'Perks and Play' for employee engagement gamification.",
      "Engineered a customer Stripe payment UI to manage transactions and product catalogs.",
    ],
  },
];

const projects = [
  { name: "Suiki", role: "Full Stack Developer", date: "Present", link: "#" },
  { name: "Kaching", role: "Full Stack Developer", date: "2025", link: "#" },
  {
    name: "IPFSR Website",
    role: "Frontend Developer",
    date: "2024",
    link: "https://ipfsr-website.vercel.app/",
  },
  {
    name: "Delta Storage",
    role: "Full Stack Developer",
    date: "2023 - 2024",
    link: "https://www.delta.storage/",
  },
  {
    name: "Efti",
    role: "Full Stack Developer",
    date: "2023",
    link: "https://efti.vercel.app/",
  },
  {
    name: "DeezJobs",
    role: "Full Stack Developer",
    date: "2022",
    link: "https://www.deezjobs.xyz/",
  },
  {
    name: "Ain't Board",
    role: "Full Stack Developer",
    date: "2021",
    link: "https://aintboard.com/",
  },
];

const skills = {
  languages: ["Typescript/Javascript", "Python", "Go", "Rust", "Move"],
  technologies: [
    "React/Next.js",
    "React Native",
    "Vue",
    "Angular",
    "Redux",
    "Zustand",
    "Tanstack Query",
    "Tailwind",
    "Node.js",
    "Express",
    "NestJS",
    "FastAPI",
    "MySQL",
    "Postgres",
    "MongoDB",
    "Prisma",
    "Stripe",
    "Solana",
    "Web3.js",
  ],
};

// --- Advanced Animation Components ---

const Magnetic = ({
  children,
  strength = 0.5,
}: {
  children: React.ReactElement;
  strength?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * strength);
    y.set(middleY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return React.cloneElement(children, {
    ref,
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    style: { x: springX, y: springY, ...children.props.style },
  });
};

const TextReveal = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden mr-[0.25em] pb-2">
          <motion.div
            initial={{ y: "100%", rotate: 5 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.05,
            }}
            className="origin-bottom-left"
          >
            {word}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const VelocityMarquee = ({
  children,
  baseVelocity = 2,
}: {
  children: React.ReactNode;
  baseVelocity?: number;
}) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex whitespace-nowrap gap-8 w-max" style={{ x }}>
        <div className="flex gap-8">{children}</div>
        <div className="flex gap-8">{children}</div>
        <div className="flex gap-8">{children}</div>
        <div className="flex gap-8">{children}</div>
      </motion.div>
    </div>
  );
};

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("a") || !!target.closest("button"));
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 bg-orange-500 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 8),
        y: mousePosition.y - (isHovering ? 24 : 8),
        width: isHovering ? 48 : 16,
        height: isHovering ? 48 : 16,
      }}
      transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.2 }}
    />
  );
};

// --- Sections ---

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <div
      ref={heroRef}
      className="relative h-screen w-full bg-zinc-950 text-zinc-50 flex flex-col justify-between p-8 md:p-16 z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_110%,rgba(234,88,12,0.13),transparent)]" />

      <motion.div
        className="flex justify-between items-start relative z-10"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
      >
        <span className="text-sm font-mono tracking-widest uppercase text-zinc-400">
          PORTFOLIO '26
        </span>
        <span className="text-sm font-mono tracking-widest uppercase text-zinc-400">
          METRO MANILA, PH
        </span>
      </motion.div>

      <motion.div className="flex flex-col relative z-10" style={{ y: contentY }}>
        <TextReveal
          text="GLENDELL"
          className="text-[15vw] font-display font-bold leading-[0.85] tracking-tighter"
        />
        <TextReveal
          text="BRINGINO"
          className="text-[15vw] font-display font-bold leading-[0.85] tracking-tighter text-zinc-500"
        />
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex items-center gap-4"
        >
          <motion.div
            className="h-[2px] bg-orange-600 shrink-0"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="text-xl md:text-3xl font-light tracking-widest uppercase">
            SOFTWARE ENGINEER
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500">
          SCROLL
        </span>
        <motion.div
          className="w-[1px] h-10 origin-top bg-gradient-to-b from-zinc-500 to-transparent"
          animate={{ scaleY: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="relative min-h-screen w-full bg-zinc-50 text-zinc-950 flex flex-col justify-center p-8 md:p-16 z-20 shadow-[0_-2px_20px_rgba(0,0,0,0.06)]">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-sm font-mono tracking-widest uppercase text-zinc-500 mb-12">
          01 — Profile
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <TextReveal
              text="I build websites, apps, and little tools that actually make people's lives easier."
              className="text-3xl md:text-5xl font-medium leading-tight tracking-tight mb-8"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-zinc-500 font-light"
            >
              Fast? <span className="text-orange-600 font-medium">Yep.</span>{" "}
              Clean?{" "}
              <span className="text-orange-600 font-medium">Always.</span>{" "}
              Boring?{" "}
              <span className="text-orange-600 font-medium">Never.</span>
            </motion.p>
          </div>

          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h4 className="text-5xl font-display font-bold text-zinc-900">
                  4+
                </h4>
                <p className="text-sm font-mono text-zinc-500 uppercase mt-2">
                  Years Experience
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h4 className="text-5xl font-display font-bold text-zinc-900">
                  100%
                </h4>
                <p className="text-sm font-mono text-zinc-500 uppercase mt-2">
                  Commitment to Quality
                </p>
              </motion.div>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Hammer,
                  title: "Build",
                  desc: "I bring ideas to life by coding the backend logic and connecting it to the frontend — making apps that actually work and feel alive.",
                },
                {
                  icon: Users,
                  title: "Collaborate",
                  desc: "I'm a team player who loves sprints, daily check-ins, and pairing up to solve problems. Flexible but focused. No micromanaging, just trust.",
                },
                {
                  icon: Zap,
                  title: "Optimize",
                  desc: "I hunt down bugs and fix slow parts, delivering clean, fast, and high-quality code that runs smoothly.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border-t border-zinc-200 pt-6 group"
                >
                  <h4 className="text-lg font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                    <item.icon className="w-5 h-5 text-orange-600 transform group-hover:scale-110 transition-transform" />{" "}
                    {item.title}
                  </h4>
                  <p className="text-zinc-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <div className="relative min-h-screen w-full bg-zinc-100 text-zinc-950 flex flex-col justify-center p-8 md:p-16 z-[25] shadow-[0_-2px_20px_rgba(0,0,0,0.06)]">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-sm font-mono tracking-widest uppercase text-zinc-500 mb-12">
          02 — Projects
        </h2>

        <div className="flex flex-col border-t border-zinc-300">
          {projects.map((project, i) => (
            <Magnetic key={i} strength={0.1}>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-b border-zinc-300 hover:px-8 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] -z-10" />

                <div className="flex items-center gap-8 z-10 group-hover:text-white transition-colors duration-300">
                  <span className="text-sm font-mono text-zinc-400 group-hover:text-orange-200">
                    0{i + 1}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-display font-bold">
                    {project.name}
                  </h3>
                </div>

                <div className="flex items-center gap-8 mt-4 md:mt-0 z-10 group-hover:text-white transition-colors duration-300">
                  <p className="text-zinc-500 group-hover:text-orange-100">
                    {project.role}
                  </p>
                  <span className="text-sm font-mono bg-zinc-200 group-hover:bg-orange-500 px-3 py-1 rounded-full">
                    {project.date}
                  </span>
                  <ArrowRight className="w-6 h-6 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                </div>
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
    </div>
  );
};

const experiencePrompts = [
  "Abstract 3D mechanical gears and data streams, dark background, neon orange accents, high-end 3D render, kinetic motion, cinematic lighting, minimalist",
  "Abstract 3D digital wallet vault, geometric shapes, dark background, neon orange accents, high-end 3D render, kinetic motion, cinematic lighting, minimalist",
  "Abstract 3D aviation turbine engine, dark background, neon orange accents, high-end 3D render, kinetic motion, cinematic lighting, minimalist",
  "Abstract 3D blockchain nodes connecting, dark background, neon orange accents, high-end 3D render, kinetic motion, cinematic lighting, minimalist",
  "Abstract 3D server racks and glowing data cubes, dark background, neon orange accents, high-end 3D render, kinetic motion, cinematic lighting, minimalist",
  "Abstract 3D human brain made of glowing circuits, dark background, neon orange accents, high-end 3D render, kinetic motion, cinematic lighting, minimalist",
];

const KineticExperience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(
      experiences.length - 1,
      Math.floor(latest * experiences.length),
    );
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  const activeExp = experiences[activeIndex];

  return (
    <div
      ref={containerRef}
      className="relative text-zinc-50 z-30"
      style={{ height: `${experiences.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex">
        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col h-full p-8 md:p-16">
          <h2 className="text-sm font-mono tracking-widest uppercase text-zinc-500 shrink-0 mb-8 md:mb-12">
            03 — Experience
          </h2>

          <div className="flex flex-col md:flex-row flex-1 min-h-0 gap-8 md:gap-16">
            {/* Left Scrubber */}
            <div className="w-full md:w-1/3 flex flex-col justify-center gap-8 border-l border-zinc-800 pl-8 relative">
              <motion.div
                className="absolute left-0 w-1 bg-orange-500 top-0 origin-top"
                style={{ height: "100%", scaleY: scrollYProgress }}
              />

              <div className="flex flex-col gap-4 md:gap-6">
                {experiences.map((exp, i) => (
                  <div
                    key={i}
                    className={`transition-all duration-500 ${i === activeIndex ? "opacity-100 translate-x-4" : "opacity-40 hover:opacity-70"}`}
                  >
                    <h3
                      className={`text-lg md:text-2xl font-display font-bold ${i === activeIndex ? "text-orange-500" : "text-zinc-50"}`}
                    >
                      {exp.company}
                    </h3>
                    <p className="text-xs md:text-sm font-mono mt-1">
                      {exp.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Details */}
            <div className="w-full md:w-2/3 flex flex-col justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-6 md:gap-8"
                >
                  <div>
                    {activeExp.link ? (
                      <a
                        href={activeExp.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-3xl md:text-6xl font-display font-bold text-zinc-50 flex items-center gap-4 hover:text-orange-500 transition-colors w-fit group"
                      >
                        {activeExp.company}{" "}
                        <ExternalLink className="w-5 h-5 md:w-8 md:h-8 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    ) : (
                      <h3 className="text-3xl md:text-6xl font-display font-bold text-zinc-50">
                        {activeExp.company}
                      </h3>
                    )}
                    <p className="text-xl md:text-3xl text-orange-500 mt-2 md:mt-4 font-display font-light">
                      {activeExp.role}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 md:gap-6 mt-2">
                    <span className="flex items-center gap-2 text-xs md:text-sm font-mono text-zinc-400 bg-zinc-900/50 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-zinc-800 backdrop-blur-sm">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4 text-orange-500" />{" "}
                      {activeExp.location}
                    </span>
                    <span className="flex items-center gap-2 text-xs md:text-sm font-mono text-zinc-400 bg-zinc-900/50 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-zinc-800 backdrop-blur-sm">
                      <Briefcase className="w-3 h-3 md:w-4 md:h-4 text-orange-500" />{" "}
                      {activeExp.type}
                    </span>
                    <span className="flex items-center gap-2 text-xs md:text-sm font-mono text-zinc-400 bg-zinc-900/50 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-zinc-800 backdrop-blur-sm">
                      <Tag className="w-3 h-3 md:w-4 md:h-4 text-orange-500" />{" "}
                      {activeExp.industry}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-3 md:gap-4 mt-2 md:mt-4">
                    {activeExp.description.map((desc: string, j: number) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + j * 0.1 }}
                        className="text-zinc-300 text-base md:text-xl font-light leading-relaxed flex items-start gap-4"
                      >
                        <span className="text-orange-500 mt-1 md:mt-1.5 text-xs md:text-sm">
                          ▹
                        </span>
                        {desc}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TechStack = () => {
  return (
    <div className="relative h-screen w-full bg-orange-600 text-zinc-950 flex flex-col justify-center overflow-hidden z-40 shadow-[0_-2px_20px_rgba(0,0,0,0.06)]">
      <div className="absolute top-8 md:top-16 left-8 md:left-16 z-10">
        <h2 className="text-sm font-mono tracking-widest uppercase text-zinc-900 font-bold">
          04 — Technologies
        </h2>
      </div>

      <div className="flex flex-col gap-4 md:gap-8 transform -rotate-3 scale-110">
        <VelocityMarquee baseVelocity={-2}>
          {skills.technologies.slice(0, 10).map((tech, i) => (
            <span
              key={i}
              className="text-6xl md:text-8xl font-display font-black uppercase mx-4 md:mx-8"
            >
              {tech}
            </span>
          ))}
        </VelocityMarquee>
        <VelocityMarquee baseVelocity={2}>
          {skills.technologies.slice(10).map((tech, i) => (
            <span
              key={i}
              className="text-6xl md:text-8xl font-display font-black uppercase mx-4 md:mx-8 text-zinc-900/40"
            >
              {tech}
            </span>
          ))}
        </VelocityMarquee>
        <VelocityMarquee baseVelocity={-3}>
          {skills.languages.map((lang, i) => (
            <span
              key={i}
              className="text-6xl md:text-8xl font-display font-black uppercase mx-4 md:mx-8"
            >
              {lang}
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-zinc-50 flex flex-col justify-between p-8 md:p-16 z-50 shadow-[0_-2px_20px_rgba(0,0,0,0.06)]">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center">
        <TextReveal
          text="LET'S TALK."
          className="text-[10vw] font-display font-bold leading-none tracking-tighter mb-8 text-orange-500"
        />

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-xl md:text-2xl font-light">
          <Magnetic strength={0.2}>
            <a
              href="mailto:glendell.bringino.work@gmail.com"
              className="flex items-center gap-4 hover:text-orange-500 transition-colors w-fit"
            >
              <Mail className="w-8 h-8" /> glendell.bringino.work@gmail.com
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              href="tel:+639766276127"
              className="flex items-center gap-4 hover:text-orange-500 transition-colors w-fit"
            >
              <Phone className="w-8 h-8" /> +63 976 627 6127
            </a>
          </Magnetic>
        </div>

        <div className="mt-16 flex flex-wrap gap-6">
          <Magnetic strength={0.3}>
            <a
              href="https://glendell.notion.site/1f9b2d6fda59802aa861ff1e2fd34365"
              target="_blank"
              rel="noreferrer"
              className="block px-8 py-4 bg-orange-600 text-white font-bold tracking-widest uppercase text-sm hover:bg-orange-500 transition-colors"
            >
              Send me a message
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href="https://drive.google.com/file/d/1yWnLOVVqQ1pRgZ-zc4zMX-1lB5Nilg4Z/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="block px-8 py-4 border border-zinc-700 text-zinc-300 font-bold tracking-widest uppercase text-sm hover:bg-zinc-800 transition-colors"
            >
              View Resume
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-zinc-800 pt-8 gap-8 md:gap-0 mt-16">
        <div className="flex flex-wrap gap-8">
          <a
            href="https://github.com/glendell03"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400 hover:text-zinc-50 transition-colors flex items-center gap-2 uppercase font-mono text-sm"
          >
            <Github className="w-4 h-4" /> Github
          </a>
          <a
            href="https://www.linkedin.com/in/glendell03/"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400 hover:text-zinc-50 transition-colors flex items-center gap-2 uppercase font-mono text-sm"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
        </div>
        <div className="text-zinc-600 font-mono text-sm uppercase">
          © 2026 Glendell Bringino
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="bg-zinc-950 min-h-screen md:cursor-none selection:bg-orange-500/30">
      <CustomCursor />
      <Hero />
      <Profile />
      <Projects />
      <KineticExperience />
      <TechStack />
      <Contact />
    </div>
  );
}
