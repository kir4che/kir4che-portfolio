const JOB_STATUS = {
  active: { zh: "積極求職中", en: "Open to work" },
  open: { zh: "開放機會", en: "Open to offers" },
  off: null,
} as const;

const statusKey = process.env.NEXT_PUBLIC_JOB_STATUS ?? "active";

export const jobStatus: { zh: string; en: string } | null =
  statusKey in JOB_STATUS
    ? JOB_STATUS[statusKey as keyof typeof JOB_STATUS]
    : JOB_STATUS.active;

export const t = {
  nav: {
    about: { zh: "ABOUT", en: "ABOUT" },
    skills: { zh: "SKILLS", en: "SKILLS" },
    experience: { zh: "EXPERIENCE", en: "EXPERIENCE" },
    works: { zh: "WORKS", en: "WORKS" },
    contact: { zh: "CONTACT", en: "CONTACT" },
  },
  hero: {
    role: { zh: "前端工程師", en: "Frontend Developer" },
    status: jobStatus,
    desc: {
      zh: "享受把想法變成畫面的過程\n對新技術保持好奇。",
      en: "Enjoy turning ideas into interfaces\nand staying curious about new tech.",
    },
  },
  about: {
    heading: "Molly Su",
    p1: {
      zh: "從切版做到獨立負責產品功能開發，1 年多的實習經歷讓我習慣把問題拆開來解。壓力下先讓事情動起來，再持續把它做好。",
      en: "From slicing PSDs to owning features end-to-end, 19 months of internships taught me to break problems down — ship under pressure, then keep improving.",
    },
    p2: {
      zh: "實習結束後，雖然生活發生一些變故，但我不會因此停止成長。我仍持續開發與自學，也持續跟上生態系以及 AI 的變化。接下來想回歸到團隊環境中累積大型專案的經驗，長期朝能規劃架構的資深工程師方向走。",
      en: "After my internships, although my life has undergone some changes, I won't stop growing. I continue to build and learn, and keep up with changes in the ecosystem and AI. Next, I want to return to a team environment to accumulate experience on larger projects, and grow toward a senior role where I can contribute to architecture decisions.",
    },
    hashtags: {
      zh: ["ISTJ", "低調務實", "有責任感", "可獨立作業", "持續學習"],
      en: [
        "ISTJ",
        "Low-Key & Pragmatic",
        "Accountable",
        "Self-Directed",
        "Always Learning",
      ],
    },
  },
  works: {
    heading: { zh: "精選作品.", en: "My Works." },
    items: [
      {
        title: { zh: "MERN 電商平台", en: "MERN E-Commerce Platform" },
        tags: "React 19 · TypeScript · Redux Toolkit · RTK Query · React Router 7 · Tailwind CSS v4 · Express 5 · MongoDB · Chart.js · ECPay",
        image: "/images/works/mernEcWebsite.webp",
        desc: {
          zh: "支援商品瀏覽、訪客與會員購物車、優惠券、結帳與綠界金流，並提供權限控管後台的全端電商平台。",
          en: "Full-stack e-commerce platform with product browsing, guest and member carts, coupons, checkout, ECPay payment, and a role-protected admin dashboard.",
        },
        highlight: {
          zh: [
            "結帳以 MongoDB transaction + idempotency key 防止重複付款請求，確保金流一致性。",
            "Redux Toolkit 管理登入狀態與訪客購物車，RTK Query 處理會員購物車與伺服器資料。",
            "以 routes / controllers / services / models 分層建立 Express / Mongoose API",
            "Express Session + httpOnly cookie 實作登入驗證",
            "以 Vitest / Testing Library / MSW 撰寫 143 個測試案例，涵蓋 API 與 UI 流程。",
          ],
          en: [
            "MongoDB transactions and idempotency keys prevent duplicate payment requests and ensure payment consistency.",
            "Redux Toolkit for auth state and guest cart; RTK Query for member cart and server data.",
            "Layered Express/Mongoose API (routes / controllers / services / models).",
            "Authentication with Express Session + httpOnly cookies.",
            "143 test cases with Vitest, Testing Library, and MSW covering API and UI flows.",
          ],
        },
        links: {
          github: "https://github.com/kir4che/mern-ecommerce-frontend",
          live: "https://sunshine-bakery.vercel.app",
        },
      },
      {
        title: { zh: "PicQuads", en: "PicQuads" },
        tags: "React 19 · Express 4 · TypeScript · Canvas API · Tailwind CSS v4 · Supabase",
        image: "/images/works/picquads.webp",
        desc: {
          zh: "線上拍貼機，支援多種相框、相機拍攝、濾鏡、貼紙與自訂文字，可下載成品並以連結或 QR code 分享。",
          en: "Online photo booth with multiple frame layouts, camera capture, filters, stickers, custom text, and shareable links or QR codes.",
        },
        highlight: {
          zh: [
            "自訂 react-moveable 刪除 plugin，實作拖曳 / 縮放 / 旋轉，並處理旋轉後的邊界計算與碰撞限制。",
            "照片與貼紙分層繪製，文字以 HTML Overlay 編輯，下載時再合成單一高解析度 JPEG。",
            "相機與貼紙操作各以 useReducer + discriminated union 集中管理狀態。",
            "Canvas 轉 Blob 上傳 Supabase Storage，後端產生 QR Code 分享連結並定時清理過期檔案。",
          ],
          en: [
            "Custom react-moveable delete plugin for drag/scale/rotate, with boundary calculations and collision constraints after rotation.",
            "Photo and sticker layers rendered separately; text edited via HTML overlay, then merged into a single high-res JPEG for download.",
            "Camera and sticker operations each managed with useReducer + discriminated union.",
            "Canvas-to-Blob upload to Supabase Storage; backend generates QR code share links and periodically cleans up expired files.",
          ],
        },
        links: {
          github: "https://github.com/kir4che/picquads",
          live: "https://picquads.vercel.app",
        },
      },
      {
        title: { zh: "個人部落格", en: "Personal Blog" },
        tags: "Astro 7 · React 19 · TypeScript · Tailwind CSS v4 · MDX · Keystatic",
        image: "/images/works/kir4cheBlog.webp",
        desc: {
          zh: "支援多語系的個人部落格，使用 Keystatic CMS 管理 MDX。",
          en: "Bilingual personal tech blog using Keystatic CMS to manage MDX.",
        },
        highlight: {
          zh: [
            "以 routing: 'manual' 統一實作路徑前綴、多語系內容、UI 翻譯與 hreflang sitemap。",
            "文章密碼保護以 cookie 驗證 + Upstash Redis 限流 + 前端鎖定三層防護，防止暴力猜解。",
            "Server 端動態生成 OG 圖並設 Cache-Control: immutable，避免重複渲染。",
          ],
          en: [
            "Astro routing: 'manual' unifies path prefixes, bilingual content, UI translations, and hreflang sitemaps.",
            "Post password protection with three-layer brute-force defense: cookie auth, Upstash Redis rate limiting, and frontend lockout.",
            "Server-side dynamic OG image generation with Cache-Control: immutable to avoid re-rendering.",
          ],
        },
        links: {
          github: "https://github.com/kir4che/kir4che-blog",
          live: "https://kir4che.com",
        },
      },
      {
        title: { zh: "股市光明燈", en: "Stock Light" },
        tags: "Next.js · ECharts · Tailwind CSS · NextAuth.js · OpenAI Assistants API",
        image: "/images/works/stocklight.webp",
        desc: {
          zh: "台股選股與個股分析平台，提供股價走勢、技術指標、財務報表、公司基本資料、新聞與 AI 股票問答。",
          en: "Taiwan stock-screening and company-analysis platform with price charts, technical indicators, financial statements, company profiles, news, and AI stock Q&A.",
        },
        highlight: {
          zh: [
            "以 ECharts 實作 K 線、MA / EMA / 布林通道與 6 種副圖指標，並視覺化四大財報等 20+ 項財務數據。",
            "NextAuth.js 整合 Google / Facebook OAuth，於 JWT callback 將後端 token 寫入 session。",
            "以 OpenAI Assistants API 實作以財報文本為 context 的個股 RAG 問答",
            "產業燈籠 → 財務因子 → 香油錢 的多步驟選股流程，導向個股分析儀表板。",
            "以線性迴歸量化天氣與股價相關性，並用 DataGrid 呈現。",
          ],
          en: [
            "ECharts charts: candlesticks, MA/EMA/Bollinger Bands, 6 sub-indicators, and 20+ financial metrics across the four core statements.",
            "NextAuth.js with Google/Facebook OAuth; backend token written to the session via the JWT callback.",
            "Stock RAG Q&A on the OpenAI Assistants API, grounded in earnings-call transcripts.",
            "Multi-step stock-screening flow (industry lanterns → financial factors → donation) leading to a per-stock dashboard.",
            "Quantified weather–stock correlation with simple linear regression, presented in a DataGrid.",
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
        companyName: "新芽網路股份有限公司",
        role: { zh: "前端開發實習生", en: "Frontend Development Intern" },
        date: "2024.03 － 2025.02",
        duration: { zh: "12 個月", en: "12 mo" },
        location: {
          zh: "臺北市松山區（混合型）",
          en: "Songshan District, Taipei (Hybrid)",
        },
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
                zh: "依設計稿維護官網，含文案更新、樣式調整、RWD 優化及埋設 GA / GTM 事件追蹤。",
                en: "Maintained the website according to design specifications, handling copy updates, style refinements, responsive design optimization, and GA/GTM event tracking.",
                highlight: {
                  zh: ["RWD 優化", "GA / GTM 事件追蹤"],
                  en: [
                    "Responsive design optimization",
                    "GA/GTM event tracking",
                  ],
                },
              },
              {
                zh: "開發「問卷範本」頁面，含路由架構、API 串接、搜尋功能與 Modal 互動。",
                en: "Built the Survey Templates page, implementing routing, API integration, search, and modal interactions.",
                href: "https://www.surveycake.com/zh-tw/templates",
              },
              {
                zh: "建立 XM 產品一頁式頁面。",
                en: "Built the XM product landing page.",
                href: "https://www.surveycake.com/zh-tw/why-surveycake/xm",
              },
              {
                zh: "與 PM、設計師、行銷團隊討論需求，提供技術可行性評估並負責執行。",
                en: "Collaborated with PMs, designers, and the marketing team to evaluate technical feasibility and implement solutions.",
                highlight: {
                  zh: ["技術可行性評估"],
                  en: ["technical feasibility"],
                },
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
                zh: "修復企業用戶匯出功能，處理 File API 串接，並排查流程中的 API 回應與狀態更新問題。",
                en: "Fixed the enterprise user export feature end to end by integrating the File API and troubleshooting API responses and state updates throughout the workflow.",
              },
              {
                zh: "於 73 個檔案導入 sanitize-url，修補 XSS 風險並通過 DAST 高風險項目檢查，並升級 Bootstrap / jQuery，修復 CSS specificity 衝突。",
                en: "Implemented sanitize-url across 73 files to mitigate XSS vulnerabilities and pass DAST high-risk checks, while upgrading Bootstrap/jQuery to resolve CSS specificity conflicts.",
                highlight: {
                  zh: ["XSS 漏洞", "73 個檔案"],
                  en: ["XSS vulnerabilities", "73 files"],
                },
              },
            ],
          },
          {
            task: {
              zh: "參與 SurveyCake XM 產品開發",
              en: "Contributed to SurveyCake XM product development",
            },
            details: [
              {
                zh: "前期協助 UI、文案調整、圖表優化與 bug 修復；後期獨立負責情緒分析功能的前端開發，涵蓋頁面實作、API 串接與完整資料流整合，並使用 Nivo 製作自定義圖表。",
                en: "Initially supported UI and copy updates, chart improvements, and bug fixes; later independently led frontend development of the Sentiment Analysis feature, including page development, API integration, end-to-end data flow, and custom Nivo charts.",
                highlight: {
                  zh: ["API 串接", "Nivo 製作自定義圖表"],
                  en: ["API integration", "custom Nivo charts"],
                },
              },
              {
                zh: "排查並修復 filter query routing 問題，解決跨頁面篩選狀態不一致的錯誤。",
                en: "Diagnosed and fixed a filter query routing bug that caused inconsistent filter states across pages.",
              },
            ],
          },
          {
            task: {
              zh: "多專案協作與 Scrum 敏捷開發流程",
              en: "Multi-Project Collaboration & Scrum Development",
            },
            details: [
              {
                zh: "參與每日站會，使用 Jira 追蹤工作項目並記錄工時，配合團隊 Scrum 開發流程。",
                en: "Joined daily stand-ups, tracked work items in Jira, and logged time as part of the team's Scrum workflow.",
              },
              {
                zh: "參與 Git 協作流程，依循 feature branch 工作流進行開發與進版，並參與 code review。",
                en: "Collaborated using Git and a feature branch workflow for development and releases, and participated in code reviews.",
                highlight: {
                  zh: ["Git 協作流程"],
                  en: ["Collaborated using Git"],
                },
              },
              {
                zh: "維護多個舊有專案，包含多語系文案更新、Pug、PHP 跨語言調整。",
                en: "Maintained multiple legacy projects, including multilingual copy updates and changes across Pug templates and PHP code.",
              },
            ],
          },
        ],
        skills: ["React", "Redux", "TypeScript", "MUI", "Nivo", "Git", "Scrum"],
      },
      {
        id: "mrhost",
        companyName: "猴思特股份有限公司",
        role: { zh: "前端工程實習生", en: "Frontend Engineering Intern" },
        date: "2022.11 － 2023.05",
        duration: { zh: "7 個月", en: "7 mo" },
        location: { zh: "臺北市信義區", en: "Xinyi District, Taipei" },
        link: "https://www.mrhost.com.tw/",
        content: [
          {
            task: {
              zh: "撰寫 Apps Script 自動化內部 Google 試算表工作流程，減少人工重複操作。",
              en: "Wrote Apps Script automation to streamline internal Google Sheets workflows and reduce repetitive manual work.",
              highlight: {
                zh: ["Apps Script 自動化", "減少人工重複操作"],
                en: ["Apps Script automation", "repetitive manual work"],
              },
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
              zh: "協助撰寫 SOP 文件，確保跨人員作業流程的一致性與正確性。",
              en: "Assisted in writing SOPs to ensure consistency and accuracy across team operations.",
            },
            details: [],
          },
        ],
        skills: [
          "Apps Script",
          "Google Sheet",
          "HTML/CSS",
          "Bootstrap 5",
          "SiteMinder",
        ],
      },
    ],
  },
  credentials: {
    label: { zh: "CREDENTIALS", en: "CREDENTIALS" },
    techStackLabel: { zh: "TECH STACK", en: "TECH STACK" },
    techStackHint: {
      zh: "部分標籤可滑鼠移入查看程度說明",
      en: "Hover over some tags to see details.",
    },
    learningLabel: { zh: "待學習", en: "To Learn" },
    techGroups: [
      {
        label: { zh: "程式語言", en: "Programming Languages" },
        items: [
          {
            id: "javascript",
            name: "JavaScript",
            desc: {
              zh: [
                "熟悉 ES6+ 語法與常用特性",
                "熟悉非同步處理（Promise、async/await）",
                "具備 DOM 操作與第三方 API 串接經驗",
              ],
              en: [
                "Familiar with ES6+ syntax.",
                "Async patterns (Promise, async/await).",
                "DOM manipulation & third-party API integration.",
              ],
            },
          },
          {
            id: "typescript",
            name: "TypeScript",
            desc: {
              zh: [
                "熟悉型別系統與常用型別工具（Partial／Pick／Omit 等）",
                "具備 API 回應與前端狀態的型別設計經驗",
              ],
              en: [
                "Familiar with TypeScript type system and utility types (Partial, Pick, Omit, etc.).",
                "Experience designing types for API responses and frontend state.",
              ],
            },
          },
          {
            id: "java",
            name: "Java",
            level: "basic",
            desc: {
              zh: ["了解基本語法", "使用過 Swing 開發桌面應用程式"],
              en: [
                "Understand basic syntax.",
                "Experience with Swing for desktop application development.",
              ],
            },
          },
          {
            id: "python",
            name: "Python",
            level: "basic",
          },
        ],
      },
      {
        label: { zh: "前端技術", en: "Frontend" },
        items: [
          {
            id: "html",
            name: "HTML5 / CSS3",
          },
          {
            id: "react",
            name: "React",
            desc: {
              zh: [
                "熟悉 React 元件設計、Hooks 與路由管理",
                "具備 Custom Hook 與 Redux Toolkit 狀態管理經驗",
                "使用 RTK Query、React Hook Form 與 Zod 開發互動功能",
              ],
              en: [
                "Familiar with React components, Hooks, and routing.",
                "Experience with Custom Hooks and state management using Redux Toolkit.",
                "Used RTK Query, React Hook Form, and Zod for interactive features.",
              ],
            },
          },
          {
            id: "nextjs",
            name: "Next.js",
            desc: {
              zh: [
                "了解 App Router 架構與 Server / Client Component 元件分離設計",
                "依頁面需求選擇 SSG / ISR / SSR 渲染策略",
                "整合 NextAuth.js 實作 OAuth 登入、next-intl 處理多語系路由",
              ],
              en: [
                "Understand App Router architecture and Server/Client Component separation.",
                "Select SSG / ISR / SSR rendering strategy per page based on data requirements.",
                "Integrate NextAuth.js for OAuth and next-intl for i18n routing.",
              ],
            },
          },
          {
            id: "tailwind",
            name: "Tailwind CSS",
          },
          {
            id: "sass",
            name: "Sass / SCSS",
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
              zh: ["使用 Express.js v5 進行 RESTful API 開發"],
              en: ["Used Express.js v5 for RESTful API development."],
            },
          },
          {
            id: "mysql",
            name: "MySQL",
            desc: {
              zh: ["了解 MySQL 基本 CRUD、排序與 JOIN 操作"],
              en: ["Understand basic MySQL CRUD queries, sorting, and JOINs."],
            },
          },
          {
            id: "mongodb",
            name: "MongoDB",
            desc: {
              zh: [
                "使用 Mongoose 進行 Schema 設計與關聯建模，完成 CRUD、查詢與資料一致性處理。",
              ],
              en: [
                "Design schemas and relations with Mongoose, covering CRUD, queries, and data consistency.",
              ],
            },
          },
          {
            id: "springboot",
            name: "Spring Boot",
            level: "basic",
            desc: {
              zh: [
                "了解 Spring MVC、RESTful API、DTO、Validation 與分層架構",
                "使用 Spring Data JPA 完成基本 CRUD API 練習",
              ],
              en: [
                "Familiar with Spring MVC, RESTful API, DTO, Validation, and layered architecture.",
                "Practiced basic CRUD APIs with Spring Data JPA.",
              ],
            },
          },
        ],
      },
      {
        label: { zh: "測試工具", en: "Testing Tools" },
        items: [
          {
            id: "vitest",
            name: "Vitest",
            desc: {
              zh: [
                "使用 Vitest 撰寫元件與工具測試，驗證渲染結果、使用者互動，以及 loading、錯誤與空資料狀態。",
              ],
              en: [
                "Write component and utility tests with Vitest to verify rendering, user interactions, and loading, error, and empty-data states.",
              ],
            },
          },
          {
            id: "testingLibrary",
            name: "Testing Library",
            desc: {
              zh: ["以使用者視角驗證元件的可見內容與互動行為"],
              en: [
                "Verify visible content and component interactions from a user perspective.",
              ],
            },
          },
          {
            id: "msw",
            name: "MSW",
            level: "basic",
          },
        ],
      },
      {
        label: { zh: "其他", en: "Other" },
        items: [
          {
            id: "aiWorkflow",
            name: "AI 協作開發",
            desc: {
              zh: ["使用 Claude Code、Codex 等 AI 工具協助開發"],
              en: ["Used Claude Code and Codex to assist in development."],
            },
          },
          {
            id: "git",
            name: "Git",
            desc: {
              zh: [
                "Git Flow 工作流",
                "版本控制",
                "CI/CD",
                "自動部署 GitHub Pages",
              ],
              en: [
                "Git Flow",
                "Version control",
                "CI/CD",
                "Automated deployment to GitHub Pages.",
              ],
            },
          },
          {
            id: "figma",
            name: "Figma",
            desc: {
              zh: ["具備依照 Figma 設計稿精準還原介面的實務經驗"],
              en: [
                "Experience translating Figma designs into accurate, production-ready UIs.",
              ],
            },
          },
          {
            id: "docker",
            name: "Docker",
            level: "basic",
          },
          {
            id: "wordpress",
            name: "WordPress",
            level: "basic",
            desc: {
              zh: ["具備 WordPress 內容、樣式與自定義 JavaScript 維護經驗"],
              en: [
                "Experience maintaining WordPress content, styles, and custom JavaScript.",
              ],
            },
          },
        ],
      },
    ],
    education: {
      sectionLabel: { zh: "學歷", en: "EDUCATION" },
      items: [
        {
          name: {
            zh: "國立臺北科技大學",
            en: "National Taipei University of Technology",
          },
          dept: {
            zh: "資訊與財金管理系 · 學士",
            en: "Dept. of Information and Finance Management · B.S.",
          },
          period: "2020 – 2024",
          logo: "https://upload.wikimedia.org/wikipedia/zh/7/7e/National_Taipei_University_of_Technology_seal.svg",
          award: {
            title: {
              zh: "畢業專題：股市光明燈",
              en: "Capstone Project: Stock Light",
            },
            linkLabel: { zh: "Demo", en: "Demo" },
            desc: {
              zh: [
                "負責「前端開發 + UI/UX 設計」",
                "榮獲資財之星專題成果發表會精誠金獎 1st",
              ],
              en: [
                "Responsible for frontend development and UI/UX design.",
                "Awarded the Jingcheng Gold Award for 1st place at the NTUT IFM Capstone Project Exhibition.",
              ],
            },
            highlight: {
              zh: "精誠金獎 1st",
              en: "Jingcheng Gold Award for 1st place",
            },
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
          name: {
            zh: "CS50's Introduction to Computer Science",
            en: "CS50's Introduction to Computer Science",
          },
          issuer: "Harvard / edX",
          date: { zh: "進行中", en: "In progress" },
        },
        {
          name: {
            zh: "Back End Development and APIs",
            en: "Back End Development and APIs",
          },
          issuer: "freeCodeCamp",
          date: { zh: "2023 年 10 月", en: "Oct 2023" },
          logo: "https://design-style-guide.freecodecamp.org/img/fcc_secondary_small.svg",
          href: "https://www.freecodecamp.org/certification/kir4che/back-end-development-and-apis",
        },
        {
          name: {
            zh: "布魯斯的 TypeScript + React 全攻略｜快速上手仿 Instagram UI",
            en: "Bruce's TypeScript + React Guide: Build an Instagram-Style UI",
          },
          issuer: "HISKIO",
          date: { zh: "2023 年 10 月", en: "Oct 2023" },
          href: "https://hiskio.com/certificates/HI42774629JlRe",
        },
        {
          name: {
            zh: "Java 工程師必備！Spring Boot 零基礎入門",
            en: "Essential Spring Boot for Java Engineers",
          },
          issuer: "Hahow",
          date: { zh: "2022 年 12 月", en: "Dec 2022" },
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
        title: { zh: "ListExport", en: "ListExport" },
        tags: "AI-first · Next.js · TypeScript · Google Maps",
        links: {
          live: "https://listexport.vercel.app",
          github: "https://github.com/kir4che/listexport",
        },
      },
      {
        title: { zh: "Nape Pro Viewer", en: "Nape Pro Viewer" },
        tags: "AI-first · Tauri · React · Rust · HIDAPI · macOS",
        links: {
          github: "https://github.com/kir4che/nape-pro-viewer",
        },
      },
      {
        title: { zh: "顏文字實驗室", en: "Kaomoji Lab" },
        tags: "Next.js · TypeScript · Gemini API",
        links: { live: "https://www.kaomojilab.com" },
      },
    ] as WorkItem[],
  },
  contact: {
    cubeHint: {
      zh: "拖曳旋轉 · 點擊開啟連結",
      en: "drag to rotate · click to open",
    },
  },
} as const;

export type Lang = "zh" | "en";

export type Links = {
  github?: string;
  live?: string;
  demo?: string;
};

export type WorkItem = {
  title: { zh: string; en: string };
  tags: string;
  desc?: { zh: string; en: string };
  highlight?: { zh: readonly string[]; en: readonly string[] };
  links: Links;
};

export const tx = <T extends { zh: string; en: string }>(
  entry: T,
  lang: Lang,
): string => entry[lang];
