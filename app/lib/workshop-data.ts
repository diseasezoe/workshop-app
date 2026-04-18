export interface Topic {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  subtopics?: Topic[];
}

export const workshopTopics: Topic[] = [
  {
    id: "ai-ceo",
    title: "AI jako CEO",
    subtitle: "Jak AI mění rozhodování, delegování a řízení firmy",
    icon: "🎯",
    color: "#2BB5F0",
    subtopics: [
      {
        id: "ai-ceo-mindset",
        title: "AI-First mindset",
        subtitle: "Proč AI First není volba, ale nutnost",
        icon: "🧠",
        color: "#2BB5F0",
      },
      {
        id: "ai-ceo-delegovani",
        title: "Delegování na AI",
        subtitle: "Co delegovat lidem a co AI — a jak správně zadat",
        icon: "🤝",
        color: "#50D4D3",
      },
      {
        id: "ai-ceo-rozhodovani",
        title: "Data za minuty, ne měsíce",
        subtitle: "Dashboard za 7 minut místo měsíce práce analytika",
        icon: "📊",
        color: "#F8A54D",
      },
    ],
  },
  {
    id: "projekty",
    title: "Příklady projektů",
    subtitle: "Reálné projekty postavené za víkend místo měsíců vývoje",
    icon: "🚀",
    color: "#50D4D3",
    subtopics: [
      {
        id: "projekty-appka",
        title: "Appka za víkend",
        subtitle: "Aplikace, na kterou byste potřebovali 6 měsíců a 2M Kč",
        icon: "📱",
        color: "#50D4D3",
      },
      {
        id: "projekty-automatizace",
        title: "Automatizace",
        subtitle: "Email, fakturace, reporting — 30 projektů za 1.5 měsíce",
        icon: "⚡",
        color: "#2BB5F0",
      },
      {
        id: "projekty-prototyp",
        title: "Prototyp místo specifikace",
        subtitle: "Proč posílat fungující kód místo Figma a dokumentů",
        icon: "🛠️",
        color: "#F8A54D",
      },
    ],
  },
  {
    id: "bezpecnost",
    title: "Let's talk bezpečnost",
    subtitle: "Co si ohlídat, když necháte AI psát kód za vás",
    icon: "🔒",
    color: "#F45A6D",
    subtopics: [
      {
        id: "bezpecnost-rizika",
        title: "Hlavní rizika",
        subtitle: "API klíče, data uživatelů, hallucinations v kódu",
        icon: "⚠️",
        color: "#F45A6D",
      },
      {
        id: "bezpecnost-pravidla",
        title: "Pravidla hry",
        subtitle: "Testuj v safe prostředí, konzultuj s IT, reviewuj",
        icon: "✅",
        color: "#50D4D3",
      },
      {
        id: "bezpecnost-realita",
        title: "Naše realita",
        subtitle: "Jak to děláme ve Forendors — David jako pojistka",
        icon: "🛡️",
        color: "#2BB5F0",
      },
    ],
  },
];
