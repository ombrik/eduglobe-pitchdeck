import {useRef, useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

import { TbWorld, TbCertificate, TbUsers, TbRocket, TbTarget, TbMessage2, TbChartInfographic, TbLanguage, TbDeviceLaptop } from "react-icons/tb";
import { FiUser, FiTrendingUp, FiShield, FiBookOpen, FiGlobe, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiOutlineAcademicCap, HiOutlineUserGroup, HiOutlineUser, HiOutlineDocumentText,HiOutlineGlobeAlt } from "react-icons/hi2";

import "../styles/PitchDeckStyles.css";

const imgHero = "/assets/online_education.svg";

const sections = [
  { id: "mission",    label: "Mission & Project Essence",   icon: <TbWorld /> },
  { id: "founder",    label: "Founder Story",               icon: <FiUser /> },
  { id: "problem",    label: "Problem",                     icon: <TbTarget /> },
  { id: "potential",  label: "Hidden Talents",              icon: <TbRocket /> },
  { id: "effect",     label: "Global Effect",               icon: <TbWorld /> },
  { id: "how",        label: "How EduGlobe Works",          icon: <TbDeviceLaptop /> },
  { id: "network",    label: "Social Network",              icon: <TbMessage2 /> },
  { id: "diploma",    label: "Hard-Copy Diploma",           icon: <TbCertificate /> },
  { id: "stories",    label: "Success Stories",             icon: <TbUsers /> },
  { id: "benefits",   label: "Who Benefits",                icon: <HiOutlineUserGroup /> },
  { id: "pricing",    label: "Financial Model & Pricing",   icon: <TbChartInfographic /> },
  { id: "forecast",   label: "Country Forecast",            icon: <FiTrendingUp /> },
  { id: "growth",     label: "Growth Scenario",             icon: <FiTrendingUp /> },
  { id: "budget",     label: "Budget Scenarios",            icon: <FiBookOpen /> },
  { id: "projections",label: "Profit Projections",          icon: <FiTrendingUp /> },
  { id: "roadmap",    label: "Development Roadmap",         icon: <TbRocket /> },
  { id: "mvp",        label: "MVP & Vision",                icon: <HiOutlineAcademicCap /> },
  { id: "security",   label: "Security & Fairness",         icon: <FiShield /> },
  { id: "languages",  label: "Languages",                   icon: <TbLanguage /> },
  { id: "why",        label: "Why the World Needs EduGlobe",icon: <FiGlobe /> },
  { id: "contact",    label: "Contact",                     icon: <FiUser /> },
];
export function AnimatedImpactWaves() {
  const [step, setStep] = useState(0);

  // Вместо лимита — зацикливаем
  useEffect(() => {
    const maxStep = 4; // всего 3 кольца + финальный шаг для задержки перед сбросом
    const t = setTimeout(() => {
      setStep(s => (s < maxStep ? s + 1 : 0));
    }, 1300); // чуть быстрее чтобы был динамичней, или ставь своё
    return () => clearTimeout(t);
  }, [step]);

  // Центр SVG, компактный размер
  const centerX = 170, centerY = 85;
  const ringRadii = [32, 48, 62]; // радиусы для колец

  // 3 кольца, по 2 кружка на каждом (лево/право)
  // vShift — вертикальный сдвиг для равномерности (px, обычно -15/0/+15)
  const impactNodes = [
    // rIdx, side, vShift, label, color
    { ring: 0, side: "left",  vShift: -12, label: "Medicines", color: "#60a5fa" },
    { ring: 0, side: "right", vShift: -12, label: "Tech",      color: "#4ade80" },
    { ring: 1, side: "left",  vShift: 0,   label: "Green",     color: "#2fd9c0" },
    { ring: 1, side: "right", vShift: 0,   label: "Jobs",      color: "#2563eb" },
    { ring: 2, side: "left",  vShift: 14,  label: "Talent",    color: "#93c5fd" },
    { ring: 2, side: "right", vShift: 14,  label: "Education", color: "#facc15" },
  ];

  function ringNodes(idx) {
    return impactNodes.filter(n => n.ring === idx);
  }

  return (
    <div style={{ width: "100%" }}>
      <svg
        viewBox="0 0 340 170"
        fill="none"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {/* Кольца — плавно по очереди */}
        {ringRadii.map((r, idx) => (
          <AnimatePresence key={r}>
            {step > idx && (
              <motion.circle
                cx={centerX}
                cy={centerY}
                r={r}
                fill="none"
                stroke={["#2fd9c0", "#93c5fd", "#f59e42"][idx]}
                strokeWidth="1.4"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.15 + idx*0.29 }}
              />
            )}
          </AnimatePresence>
        ))}
        {/* Центр — EG */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={13}
          fill="#2563eb"
          stroke="#2fd9c0"
          strokeWidth="1.7"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9 }}
        />
        <motion.text
          x={centerX}
          y={centerY + 5}
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="#fff"
          letterSpacing="1.5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          style={{ fontFamily: "inherit" }}
        >EG</motion.text>
        {/* Кружки и линии, текст только справа/слева, всегда строго по кольцу */}
        {ringRadii.map((r, ringIdx) =>
          ringNodes(ringIdx).map((node, i) => {
            if (step <= ringIdx) return null;
            // На кольце:
            const sideK = node.side === "left" ? -1 : 1;
            const x = centerX + sideK * r;
            const y = centerY + node.vShift;
            // Линия вправо/влево
            const lineLen = 38;
            const tx = x + sideK * lineLen;
            const ty = y;
            const anchor = node.side === "left" ? "end" : "start";
            const textX = tx + sideK * 8;

            return (
              <motion.g
                key={node.label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.07, delay: 0.09 * ringIdx }}
              >
                <line x1={x} y1={y} x2={tx} y2={ty} stroke={node.color} strokeWidth="1.1" />
                <circle cx={x} cy={y} r={5} fill={node.color} />
                <text
                  x={textX}
                  y={ty + 4}
                  textAnchor={anchor}
                  fontSize="10"
                  fontWeight={600}
                  fill="#2563eb"
                  style={{ fontFamily: "inherit", userSelect: "none" }}
                >
                  {node.label}
                </text>
              </motion.g>
            );
          })
        )}
      </svg>
      <div className="pitchdeck-card" style={{ marginTop: 18, textAlign: "center" }}>
        The more talents are unlocked worldwide, the faster we get new medicines, effective technologies,
        and solutions for environmental and poverty challenges.<br />
        <span className="pitchdeck-highlight" style={{ color: "#f59e42", fontWeight: 700 }}>
          EduGlobe accelerates the development of all humanity, not just one country.
        </span>
      </div>
    </div>
  );
}




// Возрастные точки (по оси X), для дуги Y можно менять, чтобы была легкая волна
const stops = [
  { age: 17, x: 40,  y: 100, found: false },
  { age: 25, x: 130, y: 65,  found: true },
  { age: 30, x: 220, y: 110, found: false },
  { age: 40, x: 320, y: 80,  found: true }
];

// SVG ракета: горизонтальная, современная, с “пламенем”
function SvgRocket() {
  return (
    <g style={{ transform: "rotate(-18deg)", transformBox: "fill-box", transformOrigin: "center" }}>
      {/* Корпус */}
      <ellipse cx={0} cy={10} rx={11} ry={5.5} fill="#f8fafc" />
      <rect x={-13} y={-7} width={26} height={14} rx={7} fill="#dbeafe" stroke="#2fd9c0" strokeWidth="2" />
      <rect x={-8} y={-3} width={16} height={6} rx={3} fill="#60a5fa" />
      {/* Окно */}
      <circle cx={7} cy={0} r={3} fill="#fff" stroke="#2563eb" strokeWidth="1.3" />
      {/* Нос */}
      <polygon points="13,-7 17,0 13,7" fill="#2563eb" />
      {/* Пламя */}
      <polygon points="-13,0 -19,-4 -16,0 -19,4" fill="#f59e42" opacity="0.85" />
    </g>
  );
}

export function RocketTalentAnimation() {
  const stops = [
    { age: 17, x: 60,   y: 120, found: true },
    { age: 20, x: 230,  y: 55,  found: true },
    { age: 25, x: 390,  y: 90,  found: true },
    { age: 35, x: 600,  y: 155, found: true },
    { age: 40, x: 770,  y: 75,  found: true },
    { age: 45, x: 940,  y: 120, found: true }
  ];

  const [step, setStep] = useState(0);
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setStep((s) => (s + 1) % stops.length);
    }, 1300);
    return () => clearTimeout(timeoutRef.current);
  }, [step, stops.length]);

  const pos = stops[step];

  function SvgRocket() {
    return (
      <g style={{ transform: "rotate(-18deg)", transformBox: "fill-box", transformOrigin: "center" }}>
        <ellipse cx={0} cy={10} rx={11} ry={5.5} fill="#f8fafc" />
        <rect x={-13} y={-7} width={26} height={14} rx={7} fill="#dbeafe" stroke="#2fd9c0" strokeWidth="2" />
        <rect x={-8} y={-3} width={16} height={6} rx={3} fill="#60a5fa" />
        <circle cx={7} cy={0} r={3} fill="#fff" stroke="#2563eb" strokeWidth="1.3" />
        <polygon points="13,-7 17,0 13,7" fill="#2563eb" />
        <polygon points="-13,0 -19,-4 -16,0 -19,4" fill="#f59e42" opacity="0.85" />
      </g>
    );
  }

  return (
    <div style={{
      width: "100%",
      maxWidth: "100vw",
      margin: "0 auto",
      padding: "0 0 10px 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <svg
        width="100%"
        height="170"
        viewBox="0 0 1000 170"
        style={{ maxWidth: "100%", minWidth: 350, display: "block" }}
      >
        <path
          d="
            M60 120 
            Q150 10, 230 55 
            Q320 150, 390 90 
            Q500 175, 600 155 
            Q700 0, 770 75 
            Q880 140, 940 120
          "
          stroke="#93c5fd"
          strokeWidth="2.1"
          fill="none"
          strokeDasharray="7 7"
        />
        {stops.map((stop, i) => (
          <g key={stop.age}>
            <circle
              cx={stop.x}
              cy={stop.y}
              r={17}
              fill={stop.found ? "#facc15" : "#dbeafe"}
              stroke="#2fd9c0"
              strokeWidth={stop.found ? 3 : 2}
            />
            <text
              x={stop.x}
              y={stop.y + 6}
              fontSize={16}
              fontWeight={700}
              textAnchor="middle"
              fill="#2563eb"
              style={{ fontFamily: "inherit" }}
            >
              {stop.age}
            </text>
          </g>
        ))}
        <AnimatePresence>
          <motion.g
            key={step}
            initial={{ x: stops[0].x, y: stops[0].y }}
            animate={{ x: pos.x, y: pos.y }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <SvgRocket />
          </motion.g>
        </AnimatePresence>
        {stops.map((stop, i) => (
          stop.found && step === i &&
          <motion.text
            key={i}
            x={stop.x}
            y={stop.y - 25}
            fontSize={17}
            fontWeight={800}
            fill="#f59e42"
            textAnchor="middle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.19, duration: 0.36 }}
            style={{ fontFamily: "inherit" }}
          >Talent found!</motion.text>
        ))}
      </svg>
    </div>
  );
}






const growthData = [
  { year: "Y1", students: 50000, revenue: 38912500 },
  { year: "Y2", students: 250000, revenue: 194562500 },
  { year: "Y3", students: 1000000, revenue: 778250000 },
  { year: "Y5", students: 3000000, revenue: 2334750000 }
];

const revenueSplit = [
  { name: "Teachers (exams/theses)", value: 75 },
  { name: "Platform (lectures, roadmap, diplomas)", value: 25 }
];
const revenueColors = ["#2868c7", "#2fd9c0"];

const countryForecast = [
  { country: "Russia", income: 3891250 },
  { country: "India", income: 7782500 },
  { country: "Indonesia", income: 2334750 },
  { country: "Brazil", income: 1556500 },
  { country: "Egypt", income: 1167375 },
  { country: "Kazakhstan", income: 778250 },
  { country: "Poland", income: 622600 },
  { country: "Germany", income: 778250 }
];

export default function PitchDeckPage() {
  const refs = useRef({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function scrollToSection(id) {
    refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setSidebarOpen(false); // на мобиле закрывать меню после перехода
  }

  // Проверка мобильного режима (можно заменить на window.innerWidth < 800, если хочешь)
  // const isMobile = window.innerWidth < 900; // Не использовать напрямую в рендере! Лучше через media query.

  return (
    <div className="pitchdeck-root">
      {/* Кнопка-бургер только для мобильной версии */}
      <button
        className="pitchdeck-sidebar-toggle"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <span>☰</span>
      </button>

      {/* Сайдбар: всегда виден на desktop, на mobile — поверх контента, скрывается */}
      <aside
        className={`pitchdeck-sidebar${sidebarOpen ? " open" : ""}`}
        style={{
          overflowY: 'auto',
          maxHeight: '92vh',
          position: 'sticky',
          top: 0,
        }}
      >
        {/* Крестик для закрытия (только на мобиле) */}
        <button
          className="pitchdeck-sidebar-close"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >×</button>

        <div className="pitchdeck-sidebar-title">EduGlobe Pitch Deck</div>
        <nav>
          {sections.map((s) => (
            <button
              key={s.id}
              className="pitchdeck-sidebar-link"
              onClick={() => scrollToSection(s.id)}
            >
              <span style={{marginRight: 8, fontSize: "1.2em", color: "#2868c7"}}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="pitchdeck-main">
        {/* Hero */}
<div className="pitchdeck-hero" style={{
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(135deg,#eaf4ff 60%,#fff 100%)',
  borderRadius: 24,
  padding: "46px 34px",
  marginBottom: 44,
  boxShadow: "0 6px 28px rgba(40,104,199,0.10)",
  gap: 36
}}>
  {/* SVG-логотип слева */}
  <span style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 110, height: 110, minWidth: 110,
    borderRadius: 18,
    background: "linear-gradient(135deg, #2fd9c0 65%, #2563eb 100%)",
    boxShadow: "0 2px 14px #2fd9c018"
  }}>
    <svg width="80" height="80" viewBox="0 0 112 112">
      <circle cx="56" cy="56" r="52" fill="#fff" stroke="#2fd9c0" strokeWidth="4"/>
      <circle cx="56" cy="56" r="40" fill="#e0f7fa" opacity="0.34" />
      <ellipse cx="56" cy="43" rx="28" ry="12" fill="#2fd9c0" opacity="0.11" />
      <text x="56" y="68" textAnchor="middle" fontSize="38" fontWeight="bold" fill="#2563eb" style={{ letterSpacing: 3 }}>EG</text>
    </svg>
  </span>
  {/* Три смысловых блока справа */}
  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: 630
  }}>
    <div style={{
      fontSize: "2.25rem",
      fontWeight: 800,
      color: "#121b37",
      marginBottom: 16,
      lineHeight: 1.17,
      textAlign: "left"
    }}>
      EduGlobe — The <span style={{ color: "#2fd9c0" }}>Global Online University</span> for Everyone
    </div>
    <div style={{
      fontSize: "1.19rem",
      color: "#2868c7",
      fontWeight: 500,
      marginBottom: 13,
      lineHeight: 1.42,
      textAlign: "left"
    }}>
      Education, networking, and new opportunities — worldwide.
    </div>
    <div style={{
      fontSize: "1.05rem",
      color: "#2fd9c0",
      fontWeight: 700,
      letterSpacing: "0.02em",
      marginTop: 4,
      textAlign: "left"
    }}>
      100% online. Truly global. For every dream.
    </div>
  </div>
</div>




        {/* Mission & Vision */}
<section ref={el => refs.current["mission"] = el} id="mission" className="pitchdeck-section">
  <h2 className="pitchdeck-h2" style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <TbWorld style={{ color: "#2fd9c0" }} /> Mission & Project Essence
  </h2>
  <div
    className="pitchdeck-card pitchdeck-wow"
    style={{
      animation: "fadeInUp 0.9s ease forwards",
      display: "flex",
      alignItems: "flex-start",
      gap: 22
    }}
  >
    <span style={{ minWidth: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <TbWorld style={{ fontSize: "2.1rem", color: "#2fd9c0" }} />
    </span>
    <div style={{
      fontWeight: 500,
      fontSize: "1.13rem",
      lineHeight: 1.64,
      textAlign: "left",
      width: "100%"
    }}>
      <b>Mission:</b> To give every person the chance to earn a higher education, regardless of country, income, language, age, or high school grades.<br />
      <b>Vision:</b> EduGlobe is the world’s first truly global educational platform, where anyone can learn, take exams online, and receive a diploma recognized by employers and universities worldwide.
    </div>
  </div>
</section>
{/* Founder Story */}
<section ref={el => refs.current["founder"] = el} id="founder" className="pitchdeck-section">
  <h2 className="pitchdeck-h2" style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <FiUser style={{ color: "#2868c7" }} /> My Story & Why I Do This
  </h2>
  <div
    className="pitchdeck-card"
    style={{
      animation: "fadeInUp 1.1s ease forwards",
      display: "flex",
      alignItems: "flex-start",
      gap: 22
    }}
  >
    <span style={{ minWidth: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <FiUser style={{ fontSize: "2.1rem", color: "#2868c7" }} />
    </span>
    <div style={{
      fontWeight: 500,
      fontSize: "1.13rem",
      lineHeight: 1.64,
      textAlign: "left",
      width: "100%"
    }}>
      I was born in Belarus and graduated from a technical college in electronics. University was out of reach — my family had no money, no connections, and no support. Everything I know — English, programming, business basics — I learned on my own, for free, from online videos and articles.<br /><br />
      But without structure and guidance, I was always “stuck” at the beginner level, unable to see the big picture. I had no diploma, no formal experience — so employers simply overlooked me.<br /><br />
      Even with such limited knowledge, I was able to create a website for my father,{" "}
      <a href="https://deliver.by" target="_blank" rel="noopener noreferrer" className="pitchdeck-link" style={{ color: "#2563eb", textDecoration: "underline" }}>
        deliver.by
      </a>
      {" "}— a service for delivery, moving, loaders, and rigging in Belarus. I built it from scratch, on my own, learning along the way. This small business still supports my family.<br /><br />
      But I always felt: if there was a system, mentors, and a diploma, I could have achieved so much more — and there are millions like me.
      <span className="pitchdeck-highlight" style={{ color: "#2563eb", fontWeight: 700 }}>
        {" "}EduGlobe is my way to help ordinary people escape the “mud,” unlock their potential, and get a real chance.
      </span>
    </div>
  </div>
</section>


        {/* Problem */}
<section ref={el => refs.current["problem"] = el} id="problem" className="pitchdeck-section">
  <h2 className="pitchdeck-h2" style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <TbTarget style={{ color: "#ff755a" }} /> Problem: “Invisible” Students & Untapped Potential
  </h2>
  <div
    className="pitchdeck-card"
    style={{
      animation: "fadeInUp 1.3s ease forwards",
      display: "flex",
      alignItems: "flex-start",
      gap: 22
    }}
  >
    <span style={{ minWidth: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <TbTarget style={{ fontSize: "2.15rem", color: "#ff755a" }} />
    </span>
    <div style={{
      fontWeight: 500,
      fontSize: "1.13rem",
      lineHeight: 1.62,
      textAlign: "left",
      width: "100%"
    }}>
      Millions of school graduates never make it to university because of grades, quotas, or poverty.<br />
      Adults, workers, and immigrants cannot afford to study — often forced to take low-skilled jobs.<br />
      Talents “in the shadows”: in traditional systems, these people are considered “weak,” but if you give them a flexible platform and support, they reveal new sides of themselves.<br />
      <span className="pitchdeck-highlight" style={{ color: "#ff755a", fontWeight: 700 }}>
        How many brilliant engineers, programmers, and doctors do we miss out on — simply because they didn’t get the grades or couldn’t pay for education?
      </span>
    </div>
  </div>
</section>

        {/* Hidden Talents */}
<section ref={el => refs.current["potential"] = el} id="potential" className="pitchdeck-section">
  <h2 className="pitchdeck-h2" style={{display:"flex", alignItems:"center", gap:8}}>
    <TbRocket /> Hidden Talents Are the Foundation of Progress
  </h2>
  <div
    className="pitchdeck-card"
    style={{
      animation: "fadeInUp 1.5s ease forwards",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 24
    }}
  >
    {/* Текст — общий стиль, без лишних украшательств */}
    <div style={{
  fontWeight: 500,
  fontSize: "1.13rem",
  lineHeight: 1.62,
  marginBottom: 8,
  textAlign: "left",        // ЛЕВЫЙ КРАЙ
  width: "100%",            // НА ВСЮ ШИРИНУ
  maxWidth: "100%"          // (если надо, можно убрать вообще maxWidth)
}}>
  Many inventions and startups were created by “ordinary” people who were lucky enough to get a chance.<br />
  EduGlobe is designed to unlock such talents on a massive scale, in any country.<br />
  <span style={{ color: "#2563eb", fontWeight: 700 }}>
    Real ability often shines not at 17, but much later — when there’s support, time, and a second chance.
  </span>
</div>
    {/* Только RocketTalentAnimation без заголовка и внешнего текста */}
    <RocketTalentAnimation pure />
  </div>
</section>
        
{/* Global Effect */}
<section ref={el => refs.current["effect"] = el} id="effect" className="pitchdeck-section">
  <h2 className="pitchdeck-h2" style={{display:"flex", alignItems:"center", gap:8}}>
    <HiOutlineGlobeAlt />  A Global Effect for the World
  </h2>
  <div className="pitchdeck-card" style={{
    animation: "fadeInUp 1.7s ease forwards",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}>
    <AnimatedImpactWaves />
  </div>
</section>


        {/* How EduGlobe Works */}
<section ref={el => refs.current["how"] = el} id="how" className="pitchdeck-section">
  <h2 className="pitchdeck-h2" style={{display:"flex", alignItems:"center", gap:8}}>
    <TbDeviceLaptop /> How EduGlobe Works
  </h2>
  <div className="pitchdeck-card" style={{ animation: "fadeInUp 1.9s ease forwards", display:"flex", alignItems:"center", gap:32 }}>
    {/* SVG Laptop Illustration */}
    <span style={{minWidth:84, display:"flex", alignItems:"center", justifyContent:"center"}}>
      <svg width="84" height="60" viewBox="0 0 84 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="76" height="34" rx="5.5" fill="#dbeafe" stroke="#2868c7" strokeWidth="2.5"/>
        <rect x="15" y="18" width="54" height="14" rx="3" fill="#93c5fd" />
        <rect x="10" y="48" width="64" height="6" rx="3" fill="#2868c7" />
        <ellipse cx="42" cy="45" rx="32" ry="5" fill="#f8fafc" />
        <rect x="35" y="51" width="14" height="3" rx="1.5" fill="#2868c7" opacity="0.3"/>
      </svg>
    </span>
    <ul style={{margin:0, paddingLeft:20, fontWeight:500, fontSize:"1.08rem"}}>
      <li>Registration and choice of major (IT, business, medicine, design, etc.)</li>
      <li>Purchase a “roadmap” ($1–5) — the path to a diploma</li>
      <li>Daily payment ($1–3) — access to 3–5 lessons per day</li>
      <li>Study in your native language, at your own pace</li>
      <li>Exams and assessments online, with proctoring</li>
      <li>Defend your final thesis project</li>
      <li>Receive a digital diploma (optionally, a hard-copy diploma delivered anywhere in the world for an extra fee)</li>
    </ul>
  </div>
</section>

{/* Social Network */}
<section ref={el => refs.current["network"] = el} id="network" className="pitchdeck-section">
  <h2 className="pitchdeck-h2" style={{display:"flex", alignItems:"center", gap:8}}>
    <HiOutlineUserGroup /> EduGlobe: Social Network from Day One
  </h2>
  <div className="pitchdeck-card" style={{
    animation: "fadeInUp 2.1s ease forwards",
    display: "flex",
    alignItems: "center",
    gap: "32px"
  }}>
    {/* SVG: Social/Community Illustration */}
    <span style={{minWidth: 94, display:"flex", alignItems:"center", justifyContent:"center"}}>
      <svg width="94" height="90" viewBox="0 0 94 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="47" cy="84" rx="39" ry="6" fill="#dbeafe"/>
        <circle cx="23" cy="37" r="15" fill="#60a5fa" />
        <circle cx="71" cy="37" r="15" fill="#f59e42" />
        <circle cx="47" cy="23" r="19" fill="#2fd9c0" />
        <ellipse cx="47" cy="60" rx="28" ry="12" fill="#f8fafc" stroke="#60a5fa" strokeWidth="2"/>
        <circle cx="47" cy="40" r="8" fill="#fff"/>
        <rect x="34" y="58" width="26" height="6" rx="3" fill="#93c5fd"/>
        <rect x="53" y="66" width="14" height="4" rx="2" fill="#f59e42" opacity="0.32"/>
        <rect x="27" y="66" width="14" height="4" rx="2" fill="#60a5fa" opacity="0.32"/>
      </svg>
    </span>
    <div>
      <b>From the very first day, EduGlobe is not just an educational platform, but a full-fledged social network for students and teachers.</b>
      <div style={{marginTop:6, marginBottom:2}}>
        Every user can:
      </div>
      <ul style={{marginTop: 8, fontWeight: 500}}>
        <li>Add friends and connect with like-minded people worldwide</li>
        <li>Create or join study and project groups</li>
        <li>Discuss courses, projects, and career plans in a secure online space</li>
        <li>Participate in internal initiatives, competitions, Olympiads, charity events</li>
        <li>Join social programs supporting disadvantaged and motivated students (crowdfunding, grants, scholarships)</li>
      </ul>
    </div>
  </div>
</section>

        {/* Diploma */}
<section ref={el => refs.current["diploma"] = el} id="diploma" className="pitchdeck-section">
  <h2 className="pitchdeck-h2" style={{display:"flex", alignItems:"center", gap:8}}>
    <HiOutlineDocumentText /> Diploma
  </h2>
  <div className="pitchdeck-card" style={{ animation: "fadeInUp 2.3s ease forwards", display:"flex", alignItems: "center", gap: 24 }}>
    <span style={{display:"flex",alignItems:"center",justifyContent:"center",minWidth:96}}>
      {/* SVG diploma illustration */}
      <svg width="96" height="66" viewBox="0 0 96 66" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="88" height="54" rx="8" fill="#f8fafc" stroke="#2563eb" strokeWidth="2.5"/>
        <rect x="16" y="20" width="64" height="24" rx="4" fill="#dbeafe"/>
        <rect x="28" y="28" width="40" height="8" rx="3" fill="#93c5fd"/>
        <circle cx="80" cy="54" r="8" fill="#facc15" stroke="#f59e42" strokeWidth="2"/>
        <path d="M80 50v8M76 54h8" stroke="#f59e42" strokeWidth="1.8" strokeLinecap="round"/>
        <rect x="10" y="14" width="76" height="6" rx="3" fill="#f59e42" opacity="0.13"/>
        <rect x="24" y="40" width="48" height="4" rx="2" fill="#60a5fa" opacity="0.23"/>
      </svg>
    </span>
    <span>
      Every student receives a digital diploma with a digital signature.<br />
      For an extra fee, you can order a beautiful hard-copy diploma, mailed anywhere in the world — for your portfolio, resume, and as a keepsake.
    </span>
  </div>
</section>

{/* Success Stories */}
<section ref={el => refs.current["stories"] = el} id="stories" className="pitchdeck-section">
  <h2 className="pitchdeck-h2" style={{display:"flex", alignItems:"center", gap:8}}>
    <HiOutlineUser /> Success Stories (Examples)
  </h2>
  <div className="pitchdeck-card" style={{
    animation: "fadeInUp 2.5s ease forwards",
    display: "flex",
    flexDirection: "column",
    gap: "28px"
  }}>

    {/* Dasha */}
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{
        width:54, height:54, marginRight:18, display:"inline-flex", alignItems:"center", justifyContent:"center",
        borderRadius:"50%", border:`2.5px solid #2fd9c0`, boxShadow:`0 1px 7px #2fd9c044`, background:"#2fd9c0"
      }}>
        {/* SVG Avatar Dasha */}
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="21" fill="#fff" stroke="#2fd9c0" strokeWidth="2" />
          <ellipse cx="22" cy="27" rx="10" ry="8" fill="#dbeafe" />
          <ellipse cx="22" cy="19" rx="7" ry="7" fill="#93c5fd" />
          <ellipse cx="22" cy="37" rx="7" ry="3" fill="#2fd9c0" opacity="0.33"/>
          {/* simple long hair */}
          <path d="M13 25 Q12 12 22 12 Q32 12 31 25" stroke="#2fd9c0" strokeWidth="2" fill="none"/>
        </svg>
      </span>
      <div>
        <b style={{color:"#2fd9c0"}}>Dasha from Kazakhstan:</b> Didn’t get into university, but in one year on EduGlobe mastered Digital Marketing and joined an international online team.
      </div>
    </div>

    {/* Miguel */}
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{
        width:54, height:54, marginRight:18, display:"inline-flex", alignItems:"center", justifyContent:"center",
        borderRadius:"50%", border:`2.5px solid #2868c7`, boxShadow:`0 1px 7px #2868c744`, background:"#2868c7"
      }}>
        {/* SVG Avatar Miguel */}
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="21" fill="#fff" stroke="#2868c7" strokeWidth="2" />
          <ellipse cx="22" cy="27" rx="10" ry="8" fill="#dbeafe" />
          <ellipse cx="22" cy="19" rx="7" ry="7" fill="#93c5fd" />
          <ellipse cx="22" cy="37" rx="7" ry="3" fill="#2868c7" opacity="0.33"/>
          {/* short hair + hint of beard */}
          <ellipse cx="22" cy="15" rx="7" ry="4" fill="#2868c7" />
          <ellipse cx="22" cy="25.5" rx="3" ry="1.2" fill="#93c5fd" opacity="0.5"/>
        </svg>
      </span>
      <div>
        <b style={{color:"#2868c7"}}>Miguel from Brazil:</b> After high school, worked in a warehouse; through EduGlobe, earned an IT diploma and became a junior developer in a German startup.
      </div>
    </div>

    {/* Layla */}
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{
        width:54, height:54, marginRight:18, display:"inline-flex", alignItems:"center", justifyContent:"center",
        borderRadius:"50%", border:`2.5px solid #ff755a`, boxShadow:`0 1px 7px #ff755a44`, background:"#ff755a"
      }}>
        {/* SVG Avatar Layla */}
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="21" fill="#fff" stroke="#ff755a" strokeWidth="2" />
          <ellipse cx="22" cy="27" rx="10" ry="8" fill="#fed7aa" />
          <ellipse cx="22" cy="19" rx="7" ry="7" fill="#fef3c7" />
          <ellipse cx="22" cy="37" rx="7" ry="3" fill="#ff755a" opacity="0.33"/>
          {/* headscarf or hair */}
          <path d="M13 18 Q10 22 22 29 Q34 22 31 18" fill="#ff755a" />
        </svg>
      </span>
      <div>
        <b style={{color:"#ff755a"}}>Layla from Egypt:</b> After maternity leave, couldn’t return to university — studied online at EduGlobe, got a diploma, and changed her career.
      </div>
    </div>

    <span className="pitchdeck-note" style={{marginTop:6}}>
      Hundreds of thousands of people globally will have stories like these as EduGlobe grows!
    </span>
  </div>
</section>



        {/* Who Benefits */}
        <section ref={el => refs.current["benefits"] = el} id="benefits" className="pitchdeck-section">
          <h2 className="pitchdeck-h2" style={{display:"flex", alignItems:"center", gap:8}}><HiOutlineUserGroup /> Who Benefits from the Project</h2>
          <div className="pitchdeck-card">
            <ul style={{ fontWeight: 500 }}>
              <li><b>Students:</b> A real chance for education, career, and growth</li>
              <li><b>Teachers:</b> Income (up to 75% from exams), remote work</li>
              <li><b>Universities:</b> New markets, global branding</li>
              <li><b>Employers:</b> A database of candidates with verifiable knowledge</li>
              <li><b>Governments:</b> New jobs, prestige, education export</li>
            </ul>
          </div>
        </section>

        {/* Financial Model & Pricing */}
<section ref={el => refs.current["pricing"] = el} id="pricing" className="pitchdeck-section">
  <h2 className="pitchdeck-h2" style={{display:"flex", alignItems:"center", gap:8}}>
    <TbChartInfographic /> Financial Model & Pricing
  </h2>
  <div className="pitchdeck-card">

    <table className="pitchdeck-table">
      <thead>
        <tr>
          <th>Service</th>
          <th>Price (USD/EUR)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Daily lectures</td><td>$1–3 / day</td></tr>
        <tr><td>Roadmap</td><td>$1–5 (one-time)</td></tr>
        <tr><td>Subject exam</td><td>$10–30</td></tr>
        <tr><td>Final exam</td><td>$50–100</td></tr>
        <tr><td>Thesis defense</td><td>$50–100</td></tr>
        <tr><td>Hard-copy diploma</td><td>$40–70</td></tr>
      </tbody>
    </table>

    {/* Diagram 1: Exam/Thesis Fees Only */}
    <div style={{
      width: "100%",
      height: 220,
      margin: "18px auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={[
              { name: "Platform(exams/theses)", value: 25 },
              { name: "Teachers (exams/theses)", value: 75 }
            ]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {revenueSplit.map((entry, idx) => (
              <Cell key={entry.name} fill={revenueColors[idx]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div style={{ marginTop: 10, fontSize: 14 }}>
      <b>Teachers:</b> 75% of exam/thesis fees<br />
      <b>Platform:</b> 25% of exam/thesis fees
    </div>

    {/* Diagram 2: Total Profit Distribution (Styled like the first) */}
    <div style={{
      width: "100%",
      height: 250,
      margin: "32px auto 18px auto", // сверху чуть больше отступ
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={[
              { name: "Platform", value: 52 },
              { name: "Teachers", value: 48 }
            ]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {/* Используем те же цвета что и для revenueSplit (для полной идентичности) */}
            <Cell fill={revenueColors[1]} />
            <Cell fill={revenueColors[0]} />
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div style={{ marginTop: 10, fontSize: 14 }}>
      <b>Platform:</b> 52% of all revenue streams<br />
      <b>Teachers:</b> 48% (mainly from exam/thesis fees)
    </div>

    <div style={{marginTop:16, color:'#666', fontSize:13}}>
      <b>Note:</b> The first chart shows the split for exam and thesis fees only. The second chart reflects the <b>actual overall distribution</b> of all platform revenue, including lectures, roadmaps, diplomas, and exam/thesis fees.
    </div>
  </div>
</section>



        {/* Country Forecast */}
        <section ref={el => refs.current["forecast"] = el} id="forecast" className="pitchdeck-section">
          <h2 className="pitchdeck-h2" style={{display:"flex", alignItems:"center", gap:8}}><FiTrendingUp /> Country Financial Forecast (Year 1, updated)</h2>
          <div className="pitchdeck-card">
            <table className="pitchdeck-table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Min. Students (Y1)</th>
                  <th>Income (Y1, updated)</th>
                  <th>Local Jobs</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Russia</td><td>5,000</td><td>$3,891,250</td><td>100+</td></tr>
                <tr><td>India</td><td>10,000</td><td>$7,782,500</td><td>200+</td></tr>
                <tr><td>Indonesia</td><td>3,000</td><td>$2,334,750</td><td>60+</td></tr>
                <tr><td>Brazil</td><td>2,000</td><td>$1,556,500</td><td>40+</td></tr>
                <tr><td>Egypt</td><td>1,500</td><td>$1,167,375</td><td>30+</td></tr>
                <tr><td>Kazakhstan</td><td>1,000</td><td>$778,250</td><td>20+</td></tr>
                <tr><td>Poland</td><td>800</td><td>$622,600</td><td>15+</td></tr>
                <tr><td>Germany</td><td>1,000</td><td>$778,250</td><td>20+</td></tr>
              </tbody>
            </table>
            <div style={{ width: "100%", height: 250, margin: "20px 0" }}>
              <ResponsiveContainer>
                <BarChart
                  data={countryForecast}
                  margin={{ top: 10, right: 36, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis tickFormatter={v => `$${v / 1e3}K`} />
                  <Tooltip formatter={v => `$${v.toLocaleString()}`} />
                  <Bar dataKey="income" fill="#2868c7" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <span className="pitchdeck-note">
              Launching in any large region is possible even with 1,000 students — enough for a pilot. As marketing and word-of-mouth grow, scale increases rapidly.
            </span>
          </div>
        </section>

        {/* Growth Scenario */}
        <section ref={el => refs.current["growth"] = el} id="growth" className="pitchdeck-section">
          <h2 className="pitchdeck-h2" style={{display:"flex", alignItems:"center", gap:8}}><TbRocket /> Explosive Growth Scenario (Global, Updated)</h2>
          <div className="pitchdeck-card">
            <table className="pitchdeck-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Total Students</th>
                  <th>Revenue ($)</th>
                  <th>Net Profit ($)</th>
                  <th>Jobs</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Y1</td><td>50,000</td><td>$38,912,500</td><td>$18,762,500</td><td>800+</td></tr>
                <tr><td>Y2</td><td>250,000</td><td>$194,562,500</td><td>$94,812,500</td><td>4,000+</td></tr>
                <tr><td>Y3</td><td>1,000,000+</td><td>$778,250,000</td><td>$379,250,000</td><td>20,000+</td></tr>
                <tr><td>Y5</td><td>3,000,000+</td><td>$2,334,750,000</td><td>$1,149,750,000</td><td>60,000+</td></tr>
              </tbody>
            </table>
            <div style={{ width: "100%", height: 250, margin: "24px 0" }}>
              <ResponsiveContainer>
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis
                    yAxisId={0}
                    tickFormatter={v => v >= 1e6 ? `$${v / 1e6}M` : v >= 1e3 ? `$${v / 1e3}K` : v}
                  />
                  <Tooltip formatter={v => `$${v.toLocaleString()}`} />
                  <Legend />
                  <Line yAxisId={0} type="monotone" dataKey="revenue" stroke="#2868c7" strokeWidth={3} name="Revenue" />
                  <Line yAxisId={0} type="monotone" dataKey="students" stroke="#2fd9c0" strokeWidth={3} name="Students" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <span className="pitchdeck-note">The broader the support (from universities, governments, business), the bigger and faster the growth.</span>
          </div>
        </section>

        {/* Budget Scenarios */}
<section ref={el => refs.current["budget"] = el} id="budget" className="pitchdeck-section">
  <h2 className="pitchdeck-h2" style={{display:"flex", alignItems:"center", gap:8}}>
    <FiBookOpen /> Team, Budget & Projected Profit: EduGlobe
  </h2>
  <div className="pitchdeck-card" style={{ fontSize: "0.99rem" }}>
    <b>Three Launch Budget Scenarios</b>
    <ul>
      <li><b>Minimum Start (MVP, 12 months):</b> $220,000–$313,000</li>
      <li><b>Full Launch (12 months):</b> $556,000–$968,000</li>
      <li><b>Maximum Scenario (16 months):</b> $891,000–$1,312,000</li>
    </ul>
    <span className="pitchdeck-note">
      All scenarios include reserve for risks and unforeseen expenses ($10,000–$60,000).
    </span>
    <BudgetDetailsAccordion />
  </div>
</section>

        {/* Profit Projections */}
        <section ref={el => refs.current["projections"] = el} id="projections" className="pitchdeck-section">
          <h2 className="pitchdeck-h2" style={{display:"flex", alignItems:"center", gap:8}}><FiTrendingUp /> Revenue & Net Profit Forecast (3 Scenarios)</h2>
          <div className="pitchdeck-card">
            <table className="pitchdeck-table">
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>Total Income</th>
                  <th>Teachers (75%)</th>
                  <th>Platform</th>
                  <th>Expenses</th>
                  <th>Net Profit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pessimistic (10K students)</td>
                  <td>$7,782,500</td>
                  <td>$3,750,000</td>
                  <td>$4,032,500</td>
                  <td>$1,932,000</td>
                  <td>$2,100,500</td>
                </tr>
                <tr>
                  <td>Realistic (20K students)</td>
                  <td>$15,565,000</td>
                  <td>$7,500,000</td>
                  <td>$8,065,000</td>
                  <td>$2,162,000</td>
                  <td>$5,903,000</td>
                </tr>
                <tr>
                  <td>Optimistic (40K students)</td>
                  <td>$31,130,000</td>
                  <td>$15,000,000</td>
                  <td>$16,130,000</td>
                  <td>$2,412,000</td>
                  <td>$13,718,000</td>
                </tr>
              </tbody>
            </table>
            <div style={{marginTop: 10}}>
              <ul style={{fontWeight: 500, marginBottom: 8}}>
                <li>Risks such as delays, content costs, hiring, marketing, production, and legal issues are considered.</li>
                <li>Even in the pessimistic scenario (10,000 students), the project is fully self-sustaining within the first year and generates substantial profit for scaling.</li>
              </ul>
              <span className="pitchdeck-note">
                All budget scenarios include a reserve for unforeseen expenses ($10,000–$60,000).
              </span>
            </div>
          </div>
        </section>

        {/* Development Roadmap */}
        <section ref={el => refs.current["roadmap"] = el} id="roadmap" className="pitchdeck-section">
          <h2 className="pitchdeck-h2" style={{display:"flex", alignItems:"center", gap:8}}><TbRocket /> EduGlobe Development Roadmap</h2>
          <div className="pitchdeck-card">
            <ul>
              <li>From day one: a fully functional educational social network — profile, friends, groups, discussions, support, events.</li>
              <li>Launch pilot groups in 2–3 countries, onboard the first teachers.</li>
              <li>Gather feedback from students, test the platform.</li>
              <li>Gradually add languages and expand geography.</li>
              <li>Year 1–2: Develop advanced team features, support for startups, competitions, research projects.</li>
              <li>Year 2–3: Launch international teams, business incubators, integration with the labor market and real companies.</li>
            </ul>
          </div>
        </section>

        {/* MVP */}
        <section ref={el => refs.current["mvp"] = el} id="mvp" className="pitchdeck-section">
          <h2 className="pitchdeck-h2" style={{display:"flex", alignItems:"center", gap:8}}><HiOutlineAcademicCap /> MVP: Honest Start and Future Growth</h2>
          <div className="pitchdeck-card">
            I am not a professional programmer or a graduate of prestigious universities. The MVP platform was created with everything I had — to show the idea and the spirit of the project.<br /><br />
            EduGlobe is, from the start, a global university and social network:<br />
            Students and teachers from different countries can not only study but also form teams, work on projects, join crowdfunding initiatives, launch startups, and support those in need.<br /><br />
            Our goal is for the platform to be more than a place to learn — but a real global community of mutual help, growth, and friendship.
          </div>
        </section>

        {/* Security */}
        <section ref={el => refs.current["security"] = el} id="security" className="pitchdeck-section">
          <h2 className="pitchdeck-h2" style={{display:"flex", alignItems:"center", gap:8}}><FiShield /> Security, Fairness & Personalization</h2>
          <div className="pitchdeck-card">
            <ul>
              <li>User verification by official documents — you cannot start learning, take exams, or even write to other users until you complete identity verification. This completely eliminates anonymity and protects all participants from trolling, bullying, fraud, and any "gray schemes."</li>
              <li>Communication only between verified users: to add a friend, create a group, or start a chat — you must be a verified user.</li>
              <li>All exams and thesis defenses are proctored and use AI anti-cheat.</li>
              <li>Progress and grades are fully transparent — everything is easily verifiable.</li>
              <li>Special accommodations and support for students with disabilities.</li>
              <li>EduGlobe diplomas are protected by digital signature: any employer or university can verify authenticity online.</li>
              <li>In case of rules violations or complaints — the platform has access to passport data to resolve situations quickly and fairly, protect victims, and block violators if needed.</li>
              <li>EduGlobe is not just a place to learn — it's a secure environment where every student feels confident, and communication quality is strictly maintained.</li>
            </ul>
          </div>
        </section>

        {/* Languages */}
        <section ref={el => refs.current["languages"] = el} id="languages" className="pitchdeck-section">
          <h2 className="pitchdeck-h2" style={{display:"flex", alignItems:"center", gap:8}}><TbLanguage /> Languages & Opportunities</h2>
          <div className="pitchdeck-card">
            Education in <span style={{fontWeight:"700", color:"#2868c7"}}>10+</span> languages (English, Russian, Chinese, Indonesian, Spanish, German, Portuguese, French, Hindi, etc.)<br />
            Option to take exams and get a diploma in your native or a foreign language.
          </div>
        </section>

        {/* Why the World Needs EduGlobe */}
        <section ref={el => refs.current["why"] = el} id="why" className="pitchdeck-section">
          <h2 className="pitchdeck-h2" style={{display:"flex", alignItems:"center", gap:8}}>
            <FiGlobe /> Why the World Needs EduGlobe
          </h2>
          <div className="pitchdeck-card">
            <ul style={{fontWeight: 500, fontSize: "1.08rem", marginBottom: 12}}>
              <li>Opens doors for "invisible talents" who would otherwise remain undiscovered.</li>
              <li>Accelerates technological progress, creating conditions for global discoveries and startups.</li>
              <li>Tens of thousands of new jobs, especially in regions lacking modern universities.</li>
              <li>Education and knowledge without borders or barriers.</li>
            </ul>
            <span style={{fontWeight:"bold", color:"#2868c7", fontSize:"1.05rem"}}>
              EduGlobe is not just an online university — it is a global community of support, friendship, and new opportunities for all.
            </span>
          </div>
        </section>

        {/* Contact */}
        <section ref={el => refs.current["contact"] = el} id="contact" className="pitchdeck-section">
          <h2 className="pitchdeck-h2" style={{display:"flex", alignItems:"center", gap:8}}><FiUser /> Contact</h2>
          <div className="pitchdeck-card">
            <b>Aliaksandr Bobrikov</b><br />
            ✉️ <a href="mailto:ombrik@gmail.com" className="pitchdeck-link">ombrik@gmail.com</a><br />
            🌍 Location: Online, HQ to be determined
          </div>
        </section>
      </main>
    </div>
  );


  
}
function BudgetDetailsAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginTop: 18 }}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="pitchdeck-link"
        style={{
          background: "#2fd9c0", color: "#fff", border: "none",
          padding: "7px 16px", borderRadius: 8, fontWeight: 600, cursor: "pointer",
          fontSize: "1.01rem", display: "flex", alignItems: "center", gap: 7, boxShadow: "0 1px 7px #2fd9c045"
        }}
      >
        {open ? <FiChevronUp /> : <FiChevronDown />}
        {open ? "Hide Details" : "Show Full Budget"}
      </button>

      {open && (
        <div style={{
          marginTop: 16, border: "1px solid #eaf4ff", borderRadius: 11,
          background: "#f8fbff", padding: 14, animation: "fadeInUp 0.7s"
        }}>
          {/* Minimum Start */}
          <b style={{ color: "#2868c7" }}>1. Minimum Start (MVP, 12 months)</b>
          <table className="pitchdeck-table" style={{ marginBottom: 20 }}>
            <thead>
              <tr><th>Expense</th><th>Amount ($, 12 mo.)</th><th>Notes</th></tr>
            </thead>
            <tbody>
              <tr><td>Team (7–8 people)</td><td>$160,000–$210,000</td><td>Development, design, content</td></tr>
              <tr><td>Servers, hosting, SaaS</td><td>$8,000–$15,000</td><td>Cloud, licenses, test envs</td></tr>
              <tr><td>Legal, docs</td><td>$8,000–$12,000</td><td>Registration, contracts</td></tr>
              <tr><td>Design, licenses, UX</td><td>$7,000–$12,000</td><td>Branding, UI</td></tr>
              <tr><td>Translations</td><td>$6,000–$10,000</td><td>1–2 languages</td></tr>
              <tr><td>Mini content (text/video)</td><td>$10,000–$18,000</td><td>Text + sample videos</td></tr>
              <tr><td>Proctoring/security</td><td>$6,000–$10,000</td><td>Basic modules</td></tr>
              <tr><td>Marketing (landing, SM)</td><td>$5,000–$10,000</td><td>Minimum for pilot</td></tr>
              <tr><td>Reserve, unforeseen</td><td>$10,000–$16,000</td><td>Contingency</td></tr>
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: "bold", color: "#2868c7" }}>
                <td>TOTAL</td><td>$220,000–$313,000</td><td></td>
              </tr>
            </tfoot>
          </table>

          {/* Full Launch */}
          <b style={{ color: "#2fd9c0" }}>2. Full Launch (Product + Student Recruitment, 12 months)</b>
          <table className="pitchdeck-table" style={{ marginBottom: 20 }}>
            <thead>
              <tr><th>Expense</th><th>Amount ($, 12 mo.)</th><th>Notes</th></tr>
            </thead>
            <tbody>
              <tr><td>Team (10–14 people)</td><td>$320,000–$500,000</td><td>Dev, design, EdTech, support</td></tr>
              <tr><td>Servers, hosting, SaaS</td><td>$18,000–$28,000</td><td>For 1,000+ users</td></tr>
              <tr><td>Legal, docs</td><td>$12,000–$20,000</td><td>Intl, licensing</td></tr>
              <tr><td>Design, UX, mobile version</td><td>$14,000–$20,000</td><td>Advanced/mobile UI</td></tr>
              <tr><td>Translations</td><td>$16,000–$30,000</td><td>3–4 languages</td></tr>
              <tr><td>Video content (teachers)</td><td>$80,000–$160,000</td><td>200–400 lessons</td></tr>
              <tr><td>Production/studio</td><td>$10,000–$20,000</td><td>Equipment, rental</td></tr>
              <tr><td>Proctoring/security</td><td>$16,000–$25,000</td><td>Advanced systems</td></tr>
              <tr><td>Marketing, PR, acquisition</td><td>$40,000–$90,000</td><td>Ads, lead gen, partnerships</td></tr>
              <tr><td>Support, moderation</td><td>$10,000–$20,000</td><td>Online chat</td></tr>
              <tr><td>Reserve, unforeseen</td><td>$20,000–$35,000</td><td>Extra contingency</td></tr>
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: "bold", color: "#2fd9c0" }}>
                <td>TOTAL</td><td>$556,000–$968,000</td><td></td>
              </tr>
            </tfoot>
          </table>

          {/* Maximum Scenario */}
          <b style={{ color: "#ff755a" }}>3. Maximum Scenario (Force Majeure, 16 months)</b>
          <table className="pitchdeck-table">
            <thead>
              <tr><th>Expense</th><th>Amount ($, 16 mo.)</th><th>Notes</th></tr>
            </thead>
            <tbody>
              <tr><td>Team (14–16 people)</td><td>$520,000–$680,000</td><td>Staff expansion, extra months</td></tr>
              <tr><td>Servers, hosting, SaaS</td><td>$25,000–$38,000</td><td>More users, longer ops</td></tr>
              <tr><td>Legal, docs</td><td>$16,000–$28,000</td><td>More consulting, licensing</td></tr>
              <tr><td>Design, UX, mobile</td><td>$21,000–$28,000</td><td>Redesigns, upgrades</td></tr>
              <tr><td>Translations</td><td>$24,000–$40,000</td><td>More languages, fixes</td></tr>
              <tr><td>Video content (teachers)</td><td>$130,000–$220,000</td><td>New/updated lessons</td></tr>
              <tr><td>Production/studio</td><td>$15,000–$28,000</td><td>Rental, equipment upgrades</td></tr>
              <tr><td>Proctoring/security</td><td>$24,000–$38,000</td><td>Upgrades, new modules</td></tr>
              <tr><td>Marketing, PR, acquisition</td><td>$60,000–$120,000</td><td>Longer campaign, more channels</td></tr>
              <tr><td>Support, moderation</td><td>$16,000–$32,000</td><td>More students, more support</td></tr>
              <tr><td>Reserve, unforeseen</td><td>$40,000–$60,000</td><td>Emergencies, fixes, inflation</td></tr>
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: "bold", color: "#ff755a" }}>
                <td>TOTAL</td><td>$891,000–$1,312,000</td><td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}


