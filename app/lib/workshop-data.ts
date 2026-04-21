export interface WorkflowStep {
  title: string;
  duration?: string;
  note?: string;
  highlight?: boolean;
}

export interface Workflow {
  steps: WorkflowStep[];
  total: string;
}

export interface CodeBlock {
  label?: string;
  lang?: string;
  code: string;
  tone?: "bad" | "good";
}

export interface BulletWithExample {
  text: string;
  example: string;
}

export interface Slide {
  kicker?: string;
  title: string;
  body?: string;
  bullets?: string[];
  bulletsDetailed?: BulletWithExample[];
  quote?: string;
  quoteAuthor?: string;
  stats?: { value: string; label: string }[];
  image?: string;
  imageCaption?: string;
  imageLegend?: string[];
  embed?: string;
  workflow?: Workflow;
  screenshots?: { src: string; caption: string }[];
  screenshotsStack?: boolean;
  screenshotsSide?: boolean;
  trifecta?: boolean;
  codeCompare?: { bad: CodeBlock; good: CodeBlock };
}

export interface TopicPath {
  id: string;
  kicker: string;
  title: string;
  description?: string;
  slides: Slide[];
}

export interface Topic {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
  slides?: Slide[];
  paths?: TopicPath[];
}

const ACCENTS = {
  red: "#D42E4D",
  mint: "#1B9174",
  yellow: "#B8820F",
  purple: "#57155B",
  blue: "#0038FF",
};

// ─────────────── AI JAKO CEO ───────────────

const aiCeoMindset: Slide[] = [
  {
    kicker: "Základní teze",
    title: "Já nevibecoduju. Já deleguju.",
    body: "Rozdíl není v nástroji, ale v mindsetu. AI je další kolega, kterýmu zadávám výsledek, ne postup.",
  },
  {
    kicker: "Pravidla delegování",
    title: "Platí pro lidi i pro AI",
    bullets: [
      "Neříkám JAK. Říkám CO chci za výsledek.",
      "Začínám malým úkolem, ne tím nejdůležitějším.",
      "Když to nedopadne, nekončím. Řeknu to líp.",
      "Kontroluju výsledky, ne proces.",
    ],
  },
  {
    kicker: "OHIO princip",
    title: "Only Handle It Once",
    body: "Co dělám opakovaně, co mě otravuje, co stojí peníze pokaždý, když se opakuje, to deleguju. Na člověka nebo na AI. Nejdřív si napíšu seznam, pak teprve přemýšlím komu to dát.",
    quoteAuthor: "Filip Dřímalka",
  },
  {
    kicker: "Rozdíl AI vs člověk",
    title: "Proč to není náhrada, ale uschopnění",
    bullets: [
      "AI nestojí 50k měsíčně.",
      "AI neodejde ke konkurenci.",
      "AI pracuje ve 3 ráno, když mě napadne nápad v posteli.",
      "Lidi uvolním na práci, kde je potřeba empatie a úsudek.",
    ],
  },
  {
    kicker: "Hard truth",
    title: "Zodpovědnost neoddeleguju. Nikdy.",
    body: "Můžu na Máňu přehodit sales. Na Tondu IT. Na AI texty. Ale výsledky jsou moje. Ne proto, že jsem to měla dělat sama, ale proto, že moje práce je teď řídit, kontrolovat a dávat zpětnou vazbu.",
  },
];

const aiCeoPraxe: Slide[] = [
  {
    kicker: "Jak to fungovalo dřív",
    title: "Od nápadu k vývoji? Měsíc, někdy víc.",
    workflow: {
      steps: [
        { title: "Měla jsem v hlavě nápad", duration: "0" },
        { title: "Session s Davidem, aby mi to z hlavy vytáhnul", duration: "1–2 dny" },
        { title: "David to sepsal do Jira ticketu", duration: "den" },
        { title: "Grafik podle zadání zpracoval návrh", duration: "týden" },
        { title: "Podívám se: Tohle není přesně ono.", duration: "½ dne", highlight: true },
        { title: "Popsali jsme to znova, druhá iterace grafika", duration: "týden" },
        { title: "Teprve teď to šlo na vývoj", duration: "–" },
      ],
      total: "≈ 3–5 týdnů jenom na specifikaci",
    },
  },
  {
    kicker: "Jak to funguje teď",
    title: "Vyprototypuju si to sama. Za 3–10 minut.",
    workflow: {
      steps: [
        { title: "Mám nápad", duration: "0" },
        { title: "Vyprototypuju si to s AI", duration: "3–10 min" },
        { title: "Předám rovnou na vývoj", duration: "–" },
      ],
      total: "≈ 10 minut. Ušetřený měsíc času a nesrozumitelnosti v zadání.",
    },
  },
  {
    kicker: "Reálný prototyp",
    title: "Follow flow, postavený v Claude Code",
    body: "Místo Figma wireframu posílám grafičce i vývojářům funkční prototyp. Vidí přesně, jak se chová ve všech stavech, bez dlouhého briefu.",
    screenshots: [
      { src: "/slides/follow-prototyp-full.png", caption: "1. Článek s tlačítkem Sledovat" },
      { src: "/slides/follow-02-modal.png", caption: "2. Modál s výběrem předplatného" },
      { src: "/slides/follow-03-done.png", caption: "3. Stav po potvrzení" },
    ],
  },
  {
    kicker: "A jdeme dál",
    title: "Libuše staví nad tím malou Jiru",
    body: "Druhá appka, kterou teď staví Libuše. U každého prototypu komentáře, záznam kdo co navrhl, návrhy změn textací a workflow: předáno na grafika, na schválení, na vývoj. Malá Jira pro prototypy, celá postavená ve vibecodingu.",
    screenshots: [
      { src: "/slides/dashboard-libuse.png", caption: "Detail prototypu: komentáře, role, fáze workflow" },
    ],
  },
];

// ─────────────── PROJEKTY ───────────────

const projektySlides: Slide[] = [
  {
    kicker: "Vibecodujeme od 17. února 2026",
    title: "Co vzniklo za 63 dní",
    stats: [
      { value: "48", label: "projektů" },
      { value: "11", label: "automatizací" },
      { value: "63", label: "dní" },
    ],
  },
  {
    kicker: "hidn.cz",
    title: "Tetovací studio za den",
    body: "Web, kterej mě před 3 lety stál 50 000 Kč. Sedla jsem k tomu ráno, večer byl hotovej. Celej. Novej. Funkční.",
    stats: [
      { value: "50 000 Kč", label: "původní náklady" },
      { value: "1 den", label: "nový web" },
    ],
  },
  {
    kicker: "denisahrubesova.cz",
    title: "Moment, kdy to kliklo",
    body: "Původně 87 000 Kč bez DPH + 18 000 za převod + 5 700 Kč/rok za Framer. Přestala jsem replikovat 1:1 a začala přemýšlet: co od toho webu vlastně chci?",
    quote: "Jindra mě nenaučil kódovat. Naučil mě přemejšlet.",
  },
  {
    kicker: "tattooremoval.cz",
    title: "SEO optimalizace",
    body: "Web, na kterej jsem zapomněla. Stál 3 200 Kč ročně, nebyl optimalizovaný, vypadal jako by to dělalo dítě. Po SEO auditu a redesignu přišly 3 poptávky za 10 dní.",
  },
  {
    kicker: "Zákaznický bot",
    title: "Rok a půl vs. 15 minut",
    body: "Přes rok a půl jsme s klukama z ČVUT řešili automatizaci zákaznické podpory. Pak jsem si řekla: jde to i takhle? Bot ve Slacku, kterej navrhuje odpovědi z interních pravidel a učí se.",
    quote: "ty odpovědi jsou super!!!! Jaks to udělala?!!!",
    quoteAuthor: "Týnka z podpory",
  },
  {
    kicker: "Simpleshop -> Slack -> Raynet",
    title: "Automatizace objednávek",
    body: "Každá objednávka masterclass vstupenky kolegyni zabrala 3-5 minut ruční práce. Teď přijde notifikace do Slacku a automaticky vznikne obchodní případ v Raynetu. Běží samo.",
  },
  {
    kicker: "Slack -> fakturační systém",
    title: "Fakturace podcast studií přes Slack",
    bulletsDetailed: [
      { text: "Aplikace přímo ve Slacku", example: "Žádné přihlašování do fakturačky, žádný další tool. Technik je ve Slacku tak jako tak." },
      { text: "Technik vyplní po natáčení formulář", example: "Klient, datum, služba, cena bez DPH + extra položky (harddisk 3 000 Kč, Google Drive 500 Kč)." },
      { text: "Návrh faktury vznikne automaticky", example: "Ve fakturačním systému se objeví koncept se všemi položkami. Bez ručního přepisování." },
      { text: "Týnka na konci měsíce odešle všechny najednou", example: "Zatím to ještě dělá ruka, ale ze 3-5 minut na fakturu je pár sekund kontroly." },
    ],
    screenshots: [
      { src: "/slides/fakturace-slack-modal.png", caption: "Formulář Evidence natáčení přímo ve Slacku" },
    ],
    screenshotsSide: true,
  },
  {
    kicker: "Sušenky",
    title: "Vlastní reusable cookie lišta místo placeného SaaSu",
    bulletsDetailed: [
      { text: "CookieScript & spol. stojí stovky měsíčně", example: "Za každou doménu. Postavili jsme si vlastní." },
      { text: "Nasazení přes GTM, žádný zásah do kódu", example: "Jeden soubor, 4,5 kB gzipped. Custom HTML tag + GTM šablona pro konfiguraci - barvy, texty, policy URL." },
      { text: "Google Consent Mode V2", example: "GA4, Google Ads signály a fbq() queue pro Meta Pixel, která drží volání do udělení souhlasu." },
      { text: "Reuse na všech webech", example: "Jeden projekt, jedna konfigurace v GTM, funguje napříč našimi doménami." },
    ],
    screenshots: [
      { src: "/slides/susenky-banner.png", caption: "Cookie lišta živě na webu" },
    ],
    screenshotsSide: true,
  },
  {
    kicker: "Rybíz production dashboard",
    title: "Agregace a vizualizace dat",
    bulletsDetailed: [
      { text: "Tahání dat přes API", example: "SimpleShop, Ecomail, Meta Ads, Google Analytics a další. Jeden dashboard místo deseti záložek v prohlížeči." },
      { text: "Data v kontextu", example: "Prodeje masterclassu vedle stavu kampaní a newsletterů. Vidím, co kterou vlnu objednávek spustilo." },
      { text: "Hodnocení reklamních kreativ", example: "Score podle CTR, konverzí a revenue. Rovnou vidím, co funguje a co vypnout." },
      { text: "Trendy", example: "Denní Spend vs. Revenue, ROAS, cost per purchase. Trend za období, ne jen čísla v tabulce." },
    ],
    screenshots: [
      { src: "/slides/rybiz-dashboard-overview.png", caption: "Masterclass + prodeje ze SimpleShopu" },
      { src: "/slides/rybiz-dashboard-meta.png", caption: "Meta Ads - Spend vs. Revenue, ROAS" },
      { src: "/slides/rybiz-dashboard-kreativy.png", caption: "Hodnocení kreativ a placement breakdown" },
    ],
  },
  {
    kicker: "Podcast pipeline",
    title: "AI a postprodukce podcastů",
    bulletsDetailed: [
      { text: "Přepis lokálně", example: "MLX Whisper běží přímo na Macu. Žádný upload, žádné API, plný přepis včetně časování." },
      { text: "Kapitoly, názvy, descriptions", example: "Z přepisu AI vygeneruje kapitoly s časy, návrhy titulků a descriptions pro YouTube i Spotify." },
      { text: "Reels: výběr, střih, titulky", example: "AI vybere nejsilnější momenty, ffmpeg seřízne svisle 9:16 a vypálí titulky. Hotový reel bez ruční práce v editoru." },
      { text: "Napojení na postprodukční SW", example: "DaVinci Resolve plugin a EDL timeline markery. Střihač otevře projekt a rovnou vidí kapitoly, střihy, poznámky." },
      { text: "Thumbnaily, social posty, newsletter", example: "Ze stejného přepisu vznikne thumbnail brief, balík tweetů, LinkedIn post a draft newsletteru. Jedno natáčení, deset výstupů." },
    ],
  },
  {
    kicker: "Čtvrt milionu",
    title: "Součet za 14 dní",
    stats: [
      { value: "242 000 Kč", label: "ušetřeno na webech" },
      { value: "1,5 roku", label: "práce týmu hotovo za 15 min" },
      { value: "12-14 h", label: "denně u počítače" },
    ],
  },
];

// ─────────────── BEZPEČNOST: Základy ───────────────

const bezpecZakladySlides: Slide[] = [
  {
    kicker: "Magic prompt",
    title: "Říkám AI: najdi bezpečnostní díry",
    body: "Stejně jako u SEO auditu. AI najde věci, o kterých jsem neměla tušení, a většinu rovnou opraví. Pouštím ho po každém větším kroku.",
    quote: "Podívej se na můj projekt a řekni mi, jestli tam nejsou bezpečnostní díry.",
  },
  {
    kicker: "Moje chyba",
    title: "Rychlost před pravidly",
    body: "CLAUDE.md (soubor s pravidly, který AI čte na začátku každé konverzace) jasně říká: žádné natvrdo napsané emaily, ID ani config values. Při rychlém buildování jsem dávala přednost rychlosti. Není to omluva. Uložila jsem si to do paměti, aby se to neopakovalo.",
    image: "/slides/bezpec-claude-opraveno.png",
    imageCaption: "Reálná session: Claude to zaloguje, opraví a shrne, proč k tomu došlo.",
  },
  {
    kicker: "Reálný dopad",
    title: "Stalo se mně. Duben 2026.",
    screenshots: [
      { src: "/slides/vercel-incident-bulletin.png", caption: "Vercel Security Bulletin - duben 2026" },
      { src: "/slides/vercel-incident-my-impact.png", caption: "127 env vars bez 'sensitive' - přesně ty, ke kterým měl útočník přístup" },
    ],
    screenshotsStack: true,
  },
  {
    kicker: "Dobrý kolega",
    title: "Claude se zeptá dřív, než postaví",
    body: "Řeknu: potřebuju formulář na nahrání fotek. A Claude: chceš omezit velikost? Jen obrázky? Limit na počet odeslání?",
    quote: "Dobrý kolega se taky zeptá a myslela jsi na tohle místo aby slepě udělal, co řeknu.",
  },
  {
    kicker: "Pravidla hry",
    title: "Minimum, které si hlídám",
    bullets: [
      "Všechna hesla a klíče v .env, nikdy v kódu.",
      ".env* v .gitignore, ověřuju před každým commitem.",
      "Input validace i na serveru, ne jen v prohlížeči.",
      "Před ostrým nasazením pouštím security-review.",
      "Kdo smí co - to rozeberu za chvíli v Access Control.",
    ],
  },
  {
    title: "/ultrareview",
    bullets: [
      "Flotila agentů v cloudu, ne jeden lokální průchod.",
      "Každý nález nezávisle ověřený, žádné halucinace.",
      "Běží na pozadí 5-10 minut, terminál zůstane volný.",
      "Před mergem větších změn.",
    ],
  },
  {
    kicker: "Závěr",
    title: "Kód je levnej. Dobrej kód ne.",
    body: "AI vygeneruje stovky řádků za minutu. Jestli je to bezpečný, funkční a udržitelný kód? To pořád stojí lidský čas. Když to nereviewuješ, jsi jen poštovní schránka mezi AI a produkcí.",
    quoteAuthor: "Simon Willison",
  },
];

// ─────────────── BEZPEČNOST: 9 kategorií AI rizik ───────────────

const bezpecPaths: TopicPath[] = [
  {
    id: "zaklady",
    kicker: "Základy",
    title: "Jak si to hlídám",
    description: "Magic prompt, moje vlastní chyba a pravidla, která platí pokaždé.",
    slides: bezpecZakladySlides,
  },
  {
    id: "prompt-injection",
    kicker: "Prompt Injection",
    title: "Cizí instrukce, kterou AI poslechne",
    description: "Někdo schová pokyn do mailu nebo webu. AI to přečte jako tvůj příkaz.",
    slides: [
      {
        kicker: "Prompt Injection",
        title: "Cizí instrukce, kterou AI poslechne jako tvoji",
        body: "Útočník schová pokyn do mailu, dokumentu nebo webu. Tvoje AI to přečte a provede. OpenAI přiznává, že se to pravděpodobně nikdy úplně nevyřeší. Obrana: lidský checkpoint všude, kde AI něco posílá ven.",
        bulletsDetailed: [
          { text: "Únos pokynu (instruction hijacking)", example: "AI začne poslouchat cizí příkaz místo tvého, protože si ho přečetla ve vstupu." },
          { text: "Jailbreak prompts", example: "Útočník obejde bezpečnostní pravidla modelu a donutí ho udělat to, co má zakázané." },
          { text: "Skryté pokyny (hidden payloads)", example: "Instrukce schovaná v HTML, PDF nebo obrázku, kterou člověk nevidí, ale AI ji přečte." },
          { text: "Únik system promptu", example: "AI prozradí, jak je nakonfigurovaná, včetně klíčových instrukcí a limitů." },
        ],
      },
    ],
  },
  {
    id: "data-leakage",
    kicker: "Data Leakage",
    title: "Data, která nikdo neměl vidět, se dostala ven",
    description: "API klíče v kódu, logy plné hesel, data user A vidí user B.",
    slides: [
      {
        kicker: "Data Leakage",
        title: "Citlivé informace unikají, kudy neměly",
        body: "Nejčastější fuckup vibecodingu. API klíče v commitu, logy s hesly v plaintextu, endpoint, který ukáže data uživatele B uživateli A. Obrana: .env, ownership checks na každém endpointu, pravidelný audit.",
        bulletsDetailed: [
          { text: "API klíče v kódu místo v .env", example: "Klíč ke Stripe nebo OpenAI se dostane do gitu a zůstane tam, i když ho smažeš v další verzi." },
          { text: "Citlivá data viditelná cizímu uživateli", example: "Endpoint vrátí fakturu user B user A, protože kontroluje jen přihlášení, ne vlastnictví." },
          { text: "Exfiltrace přes prompt injection", example: "AI dostane pokyn v mailu a pošle tvoje interní data na útočníkův web skrz skrytý request." },
          { text: "Hesla v plaintextu v logu", example: "V ladicím logu zůstane, co uživatel poslal, včetně hesla nebo tokenu." },
          { text: "Cross-session leak", example: "AI asistent si pamatuje předchozí konverzaci a prozradí ji jinému uživateli." },
          { text: "Training data recall", example: "Model v odpovědi prozradí kus svých tréninkových dat, třeba kód s credentialy od jiné firmy." },
        ],
      },
    ],
  },
  {
    id: "tool-misuse",
    kicker: "Tool Misuse",
    title: "AI má víc práv, než by měla",
    description: "Agent volá shell, upravuje soubory, posílá maily. Útočník ho navede.",
    slides: [
      {
        kicker: "Tool Misuse",
        title: "Zneužití nástrojů: AI dělá víc, než měla",
        body: "AI agent má přístup k nástrojům (shell, soubory, API, maily). Když je špatně nastavený scope a někdo ho prompt injectem navede, smaže soubory nebo pošle zprávy, které neměla.",
        bulletsDetailed: [
          { text: "Command injection", example: "AI spustí v shellu rm -rf, protože si to přečetla v mailu jako pokyn." },
          { text: "File manipulation", example: "Agent čte nebo maže soubory, ke kterým neměl mít přístup." },
          { text: "Unsafe tool calls", example: "Volání nástroje bez whitelistu: AI zavolá libovolné API nebo endpoint." },
          { text: "API abuse", example: "Pošle 1000 mailů za minutu, vytvoří si fakturu, objedná si službu." },
          { text: "System compromise", example: "Přes špatně nastavený nástroj se dostane k operačnímu systému." },
        ],
      },
    ],
  },
  {
    id: "hallucination",
    kicker: "Model Hallucination",
    title: "AI si vymýšlí a ty tomu věříš",
    description: "Sebevědomé nesmysly, vymyšlené zdroje, chybná rozhodnutí.",
    slides: [
      {
        kicker: "Model Hallucination",
        title: "AI odpoví sebevědomě i na to, co neví",
        body: "Halucinace je klasický AI problém. Vymyšlené zdroje, chybné výstupy, logické chyby. Ve vibecodingu to dává Slopsquatting: AI si vymyslí název balíčku, útočník ho zaregistruje a naplní malwarem.",
        bulletsDetailed: [
          { text: "Vymyšlené výstupy (false outputs)", example: "AI sebevědomě řekne, že v Next.js 16 se používá funkce useServerAction, ale taková funkce neexistuje." },
          { text: "Vymyšlené citace", example: "Odkaz na studii, která neexistuje, nebo citát, který daná osoba nikdy neřekla." },
          { text: "Chybná rozhodnutí", example: "Moonwell DeFi: AI použil špatný exchange rate, firma přišla o 1,78 M USD." },
          { text: "Slopsquatting", example: "AI si vymyslí npm balíček. Útočník ho zaregistruje a naplní malwarem. 30 000 stažení za 3 měsíce." },
          { text: "Trust erosion", example: "Čím častěji AI halucinuje, tím míň věříš i správným výstupům." },
        ],
      },
    ],
  },
  {
    id: "access-control",
    kicker: "Access Control",
    title: "Kdo smí co",
    description: "Endpoint kontroluje jen že je uživatel přihlášený, ne že mu data patří.",
    slides: [
      {
        kicker: "Access Control",
        title: "Každý endpoint musí vědět, kdo smí co",
        body: "Typická díra ve vibecoded appce: kód ověří jen přihlášení, ale při dotazu do databáze nekontroluje, jestli ta data patří zrovna jemu. User A si otevře URL user B a vidí jeho objednávky.",
        bulletsDetailed: [
          { text: "Broken authorization", example: "User A si dá /api/invoice/42, kontrola ověří jen login. Ale faktura 42 patří user B." },
          { text: "Role confusion", example: "Běžný uživatel se dostane na admin endpoint, protože role-check chyběl." },
          { text: "Permission misalignment", example: "Role editor má omylem přístup ke smazání cizích účtů." },
          { text: "Token misuse", example: "JWT = digitální průkaz identity. Starý nebo falešný projde, když server nekontroluje platnost a expiraci." },
          { text: "Session hijacking", example: "Útočník převezme přihlášenou relaci přes ukradený session cookie." },
          { text: "Weak authentication", example: "Žádná dvoufaktorová ochrana, slabé heslo, žádný rate limit na loginu." },
        ],
      },
    ],
  },
  {
    id: "agent",
    kicker: "Autonomous Agent",
    title: "AI dělá věci sama, ne vždy tak, jak má",
    description: "Nekonečné cykly, špatně pochopený cíl, vyčerpané kredity.",
    slides: [
      {
        kicker: "Autonomous Agent",
        title: "Když AI má volnost a ty ji nekontroluješ",
        body: "Agent je AI, která sama vykonává úkoly. Bez mantinelů si vytvoří vlastní podúkoly, zacyklí se, utratí peníze, objedná věci. Obrana: tvrdé limity (kvóty, pauzy, human-in-the-loop).",
        bulletsDetailed: [
          { text: "Nekonečné cykly", example: "Agent se zasekne v loopu zkus znovu - fail - zkus znovu, spaluje tokeny a peníze." },
          { text: "Špatně pochopený cíl", example: "Řekneš zvyš engagement. Agent začne spamovat komentáře a maže negativní zpětnou vazbu." },
          { text: "Eskalace úkolů", example: "Agent rozpitvá jednoduchý task na 100 podúkolů, protože si myslí, že to tak má být." },
          { text: "Resource exhaustion", example: "Vyčerpá kvótu na API, disk, finance, než si toho všimneš." },
          { text: "Finanční škoda", example: "Agent provede neautorizované nákupy, vytvoří objednávky, platby." },
        ],
      },
    ],
  },
  {
    id: "supply-chain",
    kicker: "Supply Chain",
    title: "Cizí kód, kterému věříš",
    description: "MCP server, npm balíček, plugin. Útočník otráví, ty přitáhneš.",
    slides: [
      {
        kicker: "Supply Chain",
        title: "Dodavatelský řetězec: cizí kód v tvém projektu",
        body: "Každý balíček, plugin, MCP server a dataset je cizí kód. Útočník ho otráví a ty si ho stáhneš. Tool Poisoning útoky mají úspěšnost 36-70 %, modely to odmítnou v méně než 3 % případů.",
        bulletsDetailed: [
          { text: "Tool Poisoning na MCP serveru", example: "Útočník změní popis nástroje, AI ho začne slepě poslouchat. Model to odmítne v méně než 3 % případů." },
          { text: "Model poisoning", example: "Stažený AI model má specificky škodlivé chování pro určité prompty." },
          { text: "Library backdoor", example: "Open-source knihovna obsahuje zadní vrátka, která se aktivují po updatu." },
          { text: "Dependency exploit", example: "Zastaralý balíček se známou zranitelností zůstává v projektu i po auditu." },
          { text: "Third-party tool", example: "MCP od solo autora má přístup k tvému Rohlík heslu. Bez review nevíš, co dělá." },
        ],
      },
    ],
  },
  {
    id: "memory",
    kicker: "Memory & Context",
    title: "Otrávený dlouhodobý obsah",
    description: "Vektorová databáze, historie konverzací, RAG. Vše je útočná plocha.",
    slides: [
      {
        kicker: "Memory & Context",
        title: "Paměť a kontext: dlouhodobá data, kterým AI věří",
        body: "AI si pamatuje konverzace, čte dokumenty, tahá data z vektorové databáze (RAG). Útočník do té paměti vstříkne, co chce, a AI tomu věří i po restartu.",
        bulletsDetailed: [
          { text: "Knowledge injection", example: "Útočník přidá do RAG databáze falešná fakta. AI je dál prezentuje jako pravdu." },
          { text: "Retrieval bias", example: "AI tahá nerelevantní nebo zaujaté informace, protože je má v paměti víc." },
          { text: "Context poisoning", example: "V dlouhém kontextu (celý mail, PDF) je schovaná instrukce, kterou AI poslechne." },
          { text: "Persistent exploit", example: "Škodlivý pokyn přežije restart a vrací se v další konverzaci." },
          { text: "Stored prompt attack", example: "Útočník uloží škodlivý prompt do databáze, CMS, komentáře. AI ho pak přečte." },
        ],
      },
    ],
  },
  {
    id: "infra",
    kicker: "Infrastructure",
    title: "Klasika, která platí i pro AI appky",
    description: "AI agenti běží na serverech, v cloudu. Všechny klasické útoky platí.",
    slides: [
      {
        kicker: "Infrastructure Risks",
        title: "AI appky běží v klasické infrastruktuře",
        body: "Agent běží na serveru, volá API, píše do databáze. Všechny klasické útoky (DDoS, MITM, misconfig) platí dál. Rate limiting, šifrování, firewally, zálohy.",
        bulletsDetailed: [
          { text: "DDoS attack", example: "Záplava requestů shodí tvou AI službu. Uživatelé nic nedostanou." },
          { text: "Network interception", example: "Man-in-the-middle na nešifrované komunikaci. Útočník čte vše, co posíláš." },
          { text: "Database exposure", example: "Databáze otevřená do internetu bez autentizace. Klasika Supabase nebo MongoDB." },
          { text: "Cloud misconfig", example: "S3 bucket public, IAM role se zbytečnými právy, otevřený CORS." },
          { text: "Endpoint compromise", example: "Útočník získá přístup k API endpointu a používá ho jako odrazový můstek." },
          { text: "Encryption gaps", example: "Citlivá data v databázi nezašifrovaná, slabé šifry u HTTPS." },
        ],
      },
    ],
  },
];

// ─────────────── TOPIC LIST ───────────────

export const workshopTopics: Topic[] = [
  {
    id: "ai-ceo",
    title: "AI jako CEO",
    subtitle: "Jak AI mění rozhodování, delegování a řízení firmy",
    accent: ACCENTS.red,
    paths: [
      {
        id: "mindset",
        kicker: "Mindset",
        title: "Jak nad tím přemýšlím",
        description: "Pět základních pravidel, která používám pro delegování, na lidi i na AI.",
        slides: aiCeoMindset,
      },
      {
        id: "praxe",
        kicker: "Příklad z praxe",
        title: "Prototypy: dřív vs. teď",
        description: "Konkrétní ukázka, kolik času a lidí zmizí, když si prototyp udělám sama.",
        slides: aiCeoPraxe,
      },
    ],
  },
  {
    id: "projekty",
    title: "Příklady projektů",
    subtitle: "Reálné projekty postavené za víkend místo měsíců vývoje",
    accent: ACCENTS.mint,
    slides: projektySlides,
  },
  {
    id: "bezpecnost",
    title: "Let's talk bezpečnost",
    subtitle: "9 oblastí AI rizik. Klikni na kategorii a rozpadneme ji.",
    accent: ACCENTS.purple,
    paths: bezpecPaths,
  },
];
