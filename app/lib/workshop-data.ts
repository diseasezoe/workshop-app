export interface Topic {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  subtopics?: Topic[];
}

export const workshopTopics: Topic[] = [
  {
    id: "ai-ceo",
    title: "AI jako CEO",
    subtitle: "Jak AI mění rozhodování, delegování a řízení firmy",
    icon: "🎯",
    color: "#3b82f6",
    bgColor: "#E8F4FD",
    borderColor: "#B8DCEF",
    subtopics: [
      {
        id: "ai-ceo-mindset",
        title: "AI-First mindset",
        subtitle: "Proč AI First není volba, ale nutnost",
        icon: "🧠",
        color: "#3b82f6",
        bgColor: "#E8F4FD",
        borderColor: "#B8DCEF",
      },
      {
        id: "ai-ceo-delegovani",
        title: "Delegování na AI",
        subtitle: "Co delegovat lidem a co AI — a jak správně zadat",
        icon: "🤝",
        color: "#10b981",
        bgColor: "#E6F7F0",
        borderColor: "#A7E8CC",
      },
      {
        id: "ai-ceo-rozhodovani",
        title: "Data za minuty, ne měsíce",
        subtitle: "Dashboard za 7 minut místo měsíce práce analytika",
        icon: "📊",
        color: "#f59e0b",
        bgColor: "#FFF8E8",
        borderColor: "#F5DFA7",
      },
    ],
  },
  {
    id: "projekty",
    title: "Příklady projektů",
    subtitle: "Reálné projekty postavené za víkend místo měsíců vývoje",
    icon: "🚀",
    color: "#10b981",
    bgColor: "#E6F7F0",
    borderColor: "#A7E8CC",
    subtopics: [
      {
        id: "projekty-appka",
        title: "Appka za víkend",
        subtitle: "Aplikace, na kterou byste potřebovali 6 měsíců a 2M Kč",
        icon: "📱",
        color: "#10b981",
        bgColor: "#E6F7F0",
        borderColor: "#A7E8CC",
      },
      {
        id: "projekty-automatizace",
        title: "Automatizace",
        subtitle: "Email, fakturace, reporting — 30 projektů za 1.5 měsíce",
        icon: "⚡",
        color: "#3b82f6",
        bgColor: "#E8F4FD",
        borderColor: "#B8DCEF",
      },
      {
        id: "projekty-prototyp",
        title: "Prototyp místo specifikace",
        subtitle: "Proč posílat fungující kód místo Figma a dokumentů",
        icon: "🛠️",
        color: "#8b5cf6",
        bgColor: "#F0EAFF",
        borderColor: "#C9B8F5",
      },
    ],
  },
  {
    id: "bezpecnost",
    title: "Let's talk bezpečnost",
    subtitle: "Co si ohlídat, když necháte AI psát kód za vás",
    icon: "🔒",
    color: "#E85B5B",
    bgColor: "#FEF0F0",
    borderColor: "#F5B8B8",
    subtopics: [
      {
        id: "bezpecnost-rizika",
        title: "Hlavní rizika",
        subtitle: "API klíče, data uživatelů, hallucinations v kódu",
        icon: "⚠️",
        color: "#E85B5B",
        bgColor: "#FEF0F0",
        borderColor: "#F5B8B8",
      },
      {
        id: "bezpecnost-pravidla",
        title: "Pravidla hry",
        subtitle: "Testuj v safe prostředí, konzultuj s IT, reviewuj",
        icon: "✅",
        color: "#10b981",
        bgColor: "#E6F7F0",
        borderColor: "#A7E8CC",
      },
      {
        id: "bezpecnost-realita",
        title: "Naše realita",
        subtitle: "Jak to děláme ve Forendors — David jako pojistka",
        icon: "🛡️",
        color: "#3b82f6",
        bgColor: "#E8F4FD",
        borderColor: "#B8DCEF",
      },
    ],
  },
];
