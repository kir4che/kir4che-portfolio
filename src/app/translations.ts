export const t = {
  nav: {
    about:      { zh: "ABOUT",      en: "ABOUT" },
    skills:     { zh: "SKILLS",     en: "SKILLS" },
    experience: { zh: "EXPERIENCE", en: "EXPERIENCE" },
    works:      { zh: "WORKS",      en: "WORKS" },
    contact:    { zh: "CONTACT",    en: "CONTACT" },
  },
  hero: {
    role: { zh: "前端工程師", en: "Frontend Engineer" },
    desc: {
      zh: "享受把想法變成畫面的過程\n對新技術保持好奇。",
      en: "Enjoy turning ideas into interfaces\nand staying curious about new tech.",
    },
  },
  about: {
    heading: "Molly Su",
    p1: {
      zh: "從切版做到獨立負責產品功能開發，一年半的實習讓我習慣把問題拆開來解——壓力下先讓事情動起來，再持續把它做好。",
      en: "From slicing PSDs to owning features end-to-end, 1.5 years of internships taught me to break problems down — ship under pressure, then keep improving.",
    },
    p2: {
      zh: "實習結束後給自己一段沉澱的時間，但沒有停止開發，持續自學並跟上生態系的變化。接下來想在真實的團隊環境中累積大型專案的經驗，長期朝能規劃架構的資深工程師方向走。",
      en: "After my internships, I took time to reflect — but kept building and keeping up with the ecosystem. Next, I want real-team experience on larger projects and to grow toward a senior role where I can contribute to architecture decisions.",
    },
    hashtags: {
      zh: ["ISTJ", "低調務實", "有責任感", "可獨立作業", "持續學習"],
      en: ["ISTJ", "Low-Key & Pragmatic", "Accountable", "Self-Directed", "Always Learning"],
    },
  },
  works: {
    heading: { zh: "精選作品.", en: "My Works." },
    items: [
      {
        title: { zh: "MERN 電商平台", en: "MERN E-Commerce Platform" },
        tags: "React · Express · TypeScript · MongoDB · Tailwind CSS",
        year: "2025",
        image: "/images/works/mernEcWebsite.webp",
        desc: {
          zh: "支援商品瀏覽、購物車、優惠券、ECPay 金流與後台管理的全端電商平台",
          en: "Full-stack e-commerce platform with cart, coupons, ECPay payment, and admin dashboard",
        },
        highlight: {
          zh: [
            "以 async-mutex 實作 JWT silent refresh，多個並發請求 token 過期時只觸發一次 refresh，其餘等待解鎖後重試。",
            "RTK Query 統一管理 API，購物車操作含 Optimistic Update 與 rollback。",
            "訪客購物車登入後透過 Listener Middleware 自動同步至後端。",
            "RTK Query infiniteQuery + IntersectionObserver 實作無限捲動，含 skeleton 與圖片淡入顯示。",
            "Vitest 撰寫 100+ 個測試 case（41 檔案），涵蓋 utils、Redux slices 與 UI 元件。",
          ],
          en: [
            "Implemented JWT silent refresh with async-mutex to ensure only one refresh request is made during concurrent API calls when the token expires.",
            "RTK Query with optimistic updates and rollback on cart operations.",
            "Guest cart synced to server on login via Listener Middleware.",
            "Infinite scrolling with RTK Query's infiniteQuery and IntersectionObserver, including skeleton loading and fade-in images.",
            "100+ Vitest test cases across 41 files covering utils, Redux slices, and UI components.",
          ],
        },
        links: {
          github: "https://github.com/kir4che/mern-ecommerce-website",
          live: "https://mern-ecommerce-website-puce.vercel.app",
        },
      },
      {
        title: { zh: "PicQuads", en: "PicQuads" },
        tags: "React · Express · TypeScript · Canvas · Tailwind CSS",
        year: "2025",
        image: "/images/works/picquads.webp",
        desc: {
          zh: "線上拍貼機，支援相機拍攝、濾鏡、貼紙與相框，可下載照片並以連結或 QR code 分享。",
          en: "Online photo booth with camera capture, filters, stickers, and frame layouts.",
        },
        highlight: {
          zh: [
            "照片、文字、貼紙各自獨立 Canvas，下載時合成為單一高解析度圖片。",
            "相機流程與貼紙系統各自以 useReducer + discriminated union 集中管理狀態轉換。",
            "整合 react-moveable 並自訂刪除 plugin，支援拖曳、縮放、旋轉，邊界計算含旋轉角度。",
            "Canvas 轉 Blob 上傳 Supabase Storage，後端生成 QR Code 並在 30 分鐘後自動刪除。",
          ],
          en: [
            "Separate canvas layers for photo, text, and stickers composited into a single high-res image on download.",
            "Camera flow and sticker system each managed with useReducer + discriminated union actions.",
            "Custom react-moveable delete plugin with drag, scale, rotate support; boundary detection accounts for rotation angle.",
            "Canvas-to-Blob upload to Supabase Storage; server returns a QR code and auto-deletes the file after 30 minutes.",
          ],
        },
        links: {
          github: "https://github.com/kir4che/picquads",
          live: "https://picquads.vercel.app",
        },
      },
      {
        title: { zh: "個人部落格", en: "Personal Blog" },
        tags: "Astro · React · TypeScript · Tailwind CSS · MDX",
        year: "2025",
        image: "/images/works/kir4cheBlog.webp",
        desc: {
          zh: "支援多語系的個人部落格，含 Admin CMS 與全文搜尋。",
          en: "Multilingual personal tech blog with Admin CMS, full-text search, and MDX support",
        },
        highlight: {
          zh: [
            "Admin 編輯器透過 GitHub REST API 直接讀寫 MDX，不需額外資料庫。",
            "Session 以簽署 cookie 驗證身份，middleware 保護 admin 路由。",
            "SSR 路由即時生成 OG 圖片，加 Cache-Control: immutable。",
            "MDX 無法 client-side 渲染，以 marked 即時預覽 + 停輸入後觸發 SSR API 的雙層策略實現即時預覽。",
          ],
          en: [
            "Admin editor reads/writes MDX directly via GitHub REST API; no separate database needed.",
            "Signed cookie session for identity verification; middleware protects admin routes.",
            "SSR route generates OG images on demand with Cache-Control: immutable.",
            "MDX can't render client-side; two-layer strategy: marked for instant preview + SSR API triggered after idle input for full render.",
          ],
        },
        links: {
          github: "https://github.com/kir4che/kir4che-blog",
          live: "https://kir4che.com",
        },
      },
      {
        title: { zh: "股市光明燈", en: "Stock Light" },
        tags: "Next.js · ECharts · Tailwind CSS · OpenAI Assistants API",
        year: "2024",
        image: "/images/works/stocklight.webp",
        desc: {
          zh: "台股選股與分析平台，整合 K 線圖、財報視覺化與 AI 股票問答。",
          en: "Taiwan stock screening platform with candlestick charts, financials, and AI Q&A",
        },
        highlight: {
          zh: [
            "使用 ECharts 實作多種圖表，包含日K線 + 成交量雙 panel 同步 dataZoom、技術指標（MACD、RSI、KD 等）、基本面圖表、情緒雷達圖與天氣散佈圖。",
            "NextAuth.js 整合 Google / Facebook OAuth，自訂 jwt callback 將後端 token 帶進 session。",
          ],
          en: [
            "Built ECharts financial dashboards with sync'd K-line/Vol panels, technical indicators (MACD/RSI/KD), and sentiment radar charts.",
            "NextAuth.js with Google / Facebook OAuth; custom jwt callback injects backend token into session.",
          ],
        },
        links: {
          github: "https://github.com/kir4che/stock-light-website",
          demo: "https://www.youtube.com/watch?v=bPptTi9uR-0",
        },
      },
    ],
  },
  experience: {
    label: { zh: "EXPERIENCE", en: "EXPERIENCE" },
    companies: [
      {
        id: "sprout",
        companyName: "25sprout",
        role: { zh: "前端開發實習生", en: "Frontend Development Intern" },
        date: "2024.03 － 2024.11",
        duration: { zh: "9 個月", en: "9 months" },
        location: { zh: "臺北市松山區（混合型）", en: "Songshan District, Taipei (Hybrid)" },
        link: "https://www.25sprout.com/",
        content: [
          {
            task: {
              zh: "維護 SurveyCake 官網及開發新頁面",
              en: "SurveyCake Website Maintenance & Page Development",
              href: "https://www.surveycake.com/zh-tw/",
            },
            details: [
              {
                zh: "依設計稿維護官網，含文案更新、樣式調整、RWD 優化及埋設 GA／GTM 事件追蹤。",
                en: "Maintained the website per design specs — copy updates, style refinements, RWD optimization, and GA/GTM event tracking.",
              },
              {
                zh: "獨立開發「問卷範本」頁面，含路由架構、API 串接、搜尋功能與 Modal 互動。",
                en: "Independently built the survey template page — routing, API integration, search and modal interactions.",
                href: "https://www.surveycake.com/zh-tw/templates",
              },
              {
                zh: "建立 XM 產品一頁式頁面。",
                en: "Built the XM product landing page.",
                href: "https://www.surveycake.com/zh-tw/why-surveycake/xm",
              },
              {
                zh: "與 PM、設計師、行銷團隊討論需求，提供技術可行性評估並負責執行。",
                en: "Collaborated with PM, Design, and Marketing to evaluate technical feasibility and implement solutions.",
              },
              {
                zh: "依設計稿重新調整 WordPress 部落格樣式，維持品牌視覺一致性。",
                en: "Updated WordPress blog styles per design specs to maintain brand visual consistency.",
              },
            ],
          },
          {
            task: {
              zh: "SurveyCake 企業後台功能開發與維護",
              en: "SurveyCake Admin Panel Feature Development & Maintenance",
            },
            details: [
              {
                zh: "維護使用者管理、企業帳號管理與群組管理等模組，修復功能與樣式問題。",
                en: "Maintained user management, enterprise account management, and group management modules, resolving functional and styling issues.",
              },
              {
                zh: "獨立開發企業用戶匯出功能，完成 File API 串接，並排查流程中的 API 回應與狀態更新問題。",
                en: "Built the enterprise user export feature from end-to-end, integrating the File API and troubleshooting API response and state update issues in the flow.",
              },
              {
                zh: "協助修補 XSS 漏洞，於 73 個檔案導入 sanitize-url，解決 DAST 高風險項目；並升級 Bootstrap／jQuery，修復 CSS specificity 衝突。",
                en: "Assisted in patching XSS vulnerabilities by migrating 73 files to sanitize-url, resolving DAST high-risk findings; upgraded Bootstrap/jQuery and fixed CSS specificity conflicts.",
              },
            ],
          },
          {
            task: {
              zh: "協助開發 SurveyCake XM 產品",
              en: "Contributed to SurveyCake XM Product Development",
            },
            details: [
              {
                zh: "實作 Sentiment Analysis 完整模組，含趨勢圖、Topic Ranking Table、Sentiment Expressions Table 及 Topic Detail 頁面。",
                en: "Built the full Sentiment Analysis module from scratch, including a trend chart, Topic Ranking Table, Sentiment Expressions Table, and Topic Detail page.",
              },
              {
                zh: "串接後端 Sentiment Themes API，完成 Topic Detail 頁面的完整資料流。",
                en: "Integrated the Sentiment Themes API to complete the end-to-end data flow for the Topic Detail page.",
              },
              {
                zh: "排查並修復 filter query routing 問題，解決跨頁面篩選狀態不一致的錯誤。",
                en: "Diagnosed and fixed a filter query routing bug that caused inconsistent filter state across pages.",
              },
            ],
          },
          {
            task: {
              zh: "多專案協作維護與敏捷開發流程",
              en: "Multi-Project Maintenance & Agile Collaboration",
            },
            details: [
              {
                zh: "參與 Git 協作流程，執行進版、code review 與版本管理。",
                en: "Participated in Git-based collaboration including branching, code review, and release management.",
              },
              {
                zh: "維護多個舊有專案，包含多語系文案更新、PUG、PHP 跨語言調整。",
                en: "Maintained multiple legacy projects, including multilingual copy updates and adjustments across PUG and PHP.",
              },
            ],
          },
        ],
        skills: ["React", "Redux", "TypeScript", "MUI", "Nivo", "Git", "Scrum"],
      },
      {
        id: "mrhost",
        companyName: "mrhost",
        role: { zh: "前端工程實習生", en: "Frontend Engineering Intern" },
        date: "2022.11 － 2023.05",
        duration: { zh: "7 個月", en: "7 months" },
        location: { zh: "臺北市信義區", en: "Xinyi District, Taipei" },
        link: "https://www.mrhost.com.tw/",
        content: [
          {
            task: {
              zh: "撰寫 Apps Script 自動化內部 Google 試算表工作流程，減少人工重複操作。",
              en: "Wrote Apps Script automation to streamline internal Google Sheets workflows and reduce manual operations",
            },
            details: [],
          },
          {
            task: {
              zh: "建立一頁式招募網站。",
              en: "Built a one-page recruitment website.",
            },
            details: [],
          },
          {
            task: {
              zh: "制定 SOP 文件，確保跨人員作業流程的一致性與正確性。",
              en: "Established SOP documentation to ensure consistency and accuracy across team operations",
            },
            details: [],
          },
        ],
        skills: ["Apps Script", "Google Sheet", "HTML/CSS", "Bootstrap 5", "SiteMinder"],
      },
    ],
  },
  credentials: {
    label: { zh: "CREDENTIALS", en: "CREDENTIALS" },
    techStackLabel: { zh: "TECH STACK", en: "TECH STACK" },
    techStackHint: { zh: "滑鼠移至標籤上查看程度說明", en: "hover over the tags to see details" },
    learningLabel: { zh: "待學習", en: "To Learn" },
    techGroups: [
      {
        label: { zh: "前端技術", en: "Frontend" },
        items: [
          {
            id: "html",
            name: "HTML / CSS（RWD）",
          },
          {
            id: "javascript",
            name: "JavaScript",
            desc: {
              zh: ["熟悉 ES6+ 語法與常用特性", "熟悉非同步處理（Promise、async/await）", "具備 DOM 操作與第三方 API 串接經驗"],
              en: ["Familiar with ES6+ syntax", "Async patterns (Promise, async/await)", "DOM manipulation & third-party API integration"],
            },
          },
          {
            id: "typescript",
            name: "TypeScript",
            desc: {
              zh: ["熟悉基本型別系統（type / interface / union / generic）", "能進行 API 回傳資料與前端狀態的型別設計"],
              en: ["Basic type system (type / interface / union / generic)", "Designing types for API responses and frontend state"],
            },
          },
          {
            id: "react",
            name: "React",
            desc: {
              zh: ["熟悉 React Functional Component、常用 Hooks 及元件拆分。", "具備 React Router 路由管理經驗", "使用 Custom Hook 封裝 API 請求等可複用邏輯", "了解 RTK 基本概念", "使用 React Hook Form + Zod 進行表單狀態與驗證處理"],
              en: ["Proficient in Functional Components, common Hooks, and component composition.", "Managed routing with React Router.", "Extracted reusable logic (e.g., API requests) into Custom Hooks.", "Used RTK Query for API management, optimistic updates, and cache control.", "Handled form state and validation with React Hook Form + Zod."],
            },
          },
          {
            id: "nextjs",
            name: "Next.js",
            desc: {
              zh: ["了解 App Router 架構與 Server / Client Component 元件分離設計", "依頁面需求選擇 SSG / ISR / SSR 渲染策略", "整合 NextAuth.js 實作 OAuth 登入、next-intl 處理多語系路由"],
              en: ["Understand App Router architecture and Server/Client Component separation.", "Selected SSG / ISR / SSR per page based on data requirements", "Integrated NextAuth.js for OAuth and next-intl for i18n routing"],
            },
          },
          {
            id: "astro",
            name: "Astro",
            desc: {
              zh: ["實際以 Astro 建構部落格，深入應用 Island Architecture 渲染機制。", "使用 Content Collections 建立文章 Schema", "動態生成 OG 圖片"],
              en: ["Built the blog from scratch with Astro, applying Island Architecture for selective component hydration.", "Defined article schemas using Content Collections.", "Generated dynamic OG images."],
            },
          },
          {
            id: "tailwind",
            name: "Tailwind CSS",
            desc: {
              zh: ["自訂與擴充主題", "使用 breakpoint 實現 RWD", "使用 tailwind-merge 或 clsx 處理條件式 class 組合"],
              en: ["Customized and extended themes.", "Implemented RWD with breakpoints.", "Used tailwind-merge or clsx for conditional class composition."],
            },
          },
          {
            id: "sass",
            name: "Sass / SCSS",
            desc: {
              zh: ["熟悉基本語法與功能（變數、mixin、繼承）", "使用 media queries 建立 responsive layout，提升跨裝置相容性"],
              en: ["Familiar with basic syntax and features (variables, mixin, inheritance).", "Used media queries to build responsive layouts."],
            },
          },
          {
            id: "mui",
            name: "MUI",
            level: "basic",
          },
          {
            id: "gsap",
            name: "GSAP / Motion",
            level: "basic",
          },
        ],
      },
      {
        label: { zh: "後端技術", en: "Backend" },
        items: [
          {
            id: "nodejs",
            name: "Node.js / Express",
            desc: {
              zh: ["採用分層設計（routes / controllers / services）建立 RESTful API", "設計 middleware system（authentication、authorization、error handling）", "實作 JWT 認證與 refresh token 機制"],
              en: ["Layered architecture (routes / controllers / services) for RESTful APIs.", "Middleware for authentication, authorization, and centralized error handling.", "JWT-based authentication with access and refresh token flow."],
            },
          },
          {
            id: "mysql",
            name: "MySQL / MongoDB",
            level: "basic",
            desc: {
              zh: ["了解基本 CRUD 查詢、排序、JOIN 操作"],
              en: ["Understand basic CRUD queries, sorting, and JOIN operations."],
            },
          },
          {
            id: "java",
            name: "Java",
            level: "basic",
            desc: {
              zh: ["了解基本語法", "使用過 Swing 開發桌面應用程式", "了解 Spring Boot 基本使用，並實作過簡單的 RESTful API。"],
              en: ["Understand basic syntax.", "Experience with Swing for desktop application development.", "Understanding of Spring Boot basics and implementation of simple RESTful APIs."],
            },
          },
          {
            id: "python",
            name: "Python",
            level: "basic",
            desc: {
              zh: ["了解基本語法", "使用 requests / BeautifulSoup 爬取 YouTube、Dcard 等網站資料"],
              en: ["Understand basic syntax.", "Scraped data from YouTube and Dcard using requests / BeautifulSoup."],
            },
          },
        ],
      },
      {
        label: { zh: "測試與工具", en: "Testing & Tools" },
        items: [
          {
            id: "vitest",
            name: "Vitest",
            level: "basic",
          },
          {
            id: "git",
            name: "Git",
            desc: {
              zh: ["實習期間在團隊中參與 PR 流程與 code review", "熟悉 feature branch 工作流與版本控制"],
              en: ["Participated in PR workflows and code reviews within the team during internships.", "Familiar with feature branch workflow and version control."],
            },
          },
          {
            id: "figma",
            name: "Figma",
            desc: {
              zh: ["具備依照 Figma 設計稿精準還原介面的實務經驗"],
              en: ["Experience translating Figma designs into pixel-perfect UIs."],
            },
          },
        ],
      },
    ],
    education: {
      sectionLabel: { zh: "學歷", en: "EDUCATION" },
      items: [
        {
          name: { zh: "國立臺北科技大學", en: "National Taipei University of Technology" },
          dept: { zh: "資訊與財金管理系 · 學士", en: "Dept. of Information and Finance Management · B.S." },
          period: "2020 – 2024",
          logo: "https://upload.wikimedia.org/wikipedia/zh/7/7e/National_Taipei_University_of_Technology_seal.svg",
          award: {
            title: { zh: "畢業專題：股市光明燈", en: "Capstone Project: Stock Light" },
            linkLabel: { zh: "Demo", en: "Demo" },
            desc: { zh: ["負責「前端開發 + UI/UX 設計」", "榮獲資財之星專題成果發表會精誠金獎 1st"], en: ["Responsible for frontend development and UI/UX design.", "Awarded 1st place at the NTUT IFM Capstone Project Exhibition."] },
            highlight: { zh: "資財之星專題成果發表會精誠金獎 1st", en: "1st place at NTUT IFM Capstone Exhibition" },
            href: "https://www.youtube.com/watch?v=bPptTi9uR-0",
          },
        },
      ],
    },
    certifications: {
      sectionLabel: { zh: "進修課程", en: "CERTIFICATIONS & COURSES" },
      linkLabel: { zh: "證書", en: "Cert." },
      items: [
        {
          name: { zh: "Back End Development and APIs", en: "Back End Development and APIs" },
          issuer: "freeCodeCamp",
          date: { zh: "2023 年 10 月", en: "Oct 2023" },
          logo: "https://design-style-guide.freecodecamp.org/img/fcc_secondary_small.svg",
          href: "https://www.freecodecamp.org/certification/kir4che/back-end-development-and-apis",
        },
        {
          name: { zh: "Responsive Web Design", en: "Responsive Web Design" },
          issuer: "freeCodeCamp",
          date: { zh: "2021 年 07 月", en: "Jul 2021" },
          logo: "https://design-style-guide.freecodecamp.org/img/fcc_secondary_small.svg",
          href: "https://www.freecodecamp.org/certification/kir4che/responsive-web-design",
        },
      ],
    },
  },
  otherProjects: {
    label: { zh: "其他作品.", en: "More Works." },
    items: [
      {
        title: { zh: "顏文字實驗室", en: "Kaomoji Lab" },
        tags: "Next.js · TypeScript · Gemini API",
        year: "2025",
        image: "/images/works/kaomojiLab.webp",
        links: { live: "https://www.kaomojilab.com" },
      },
    ] as OtherProjectItem[],
  },
  contact: {
    cubeHint: { zh: "拖曳旋轉 · 點擊開啟連結", en: "drag to rotate · click to open" },
  },
} as const;

export type Lang = "zh" | "en";

export type Links = {
  github?: string;
  live?: string;
  demo?: string;
};

export type OtherProjectItem = {
  title: { zh: string; en: string };
  tags: string;
  year: string;
  image: string;
  desc?: { zh: string; en: string };
  highlight?: { zh: readonly string[]; en: readonly string[] };
  links: Links;
};

export const tx = <T extends { zh: string; en: string }>(entry: T, lang: Lang): string => entry[lang];
