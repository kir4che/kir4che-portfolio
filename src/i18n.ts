import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const languageMap: Record<string, string> = {
  tw: "zh-TW",
  en: "en",
};

const pathLang = window.location.pathname.split("/")[1];
const resolvedLang = languageMap[pathLang] || pathLang || "zh-TW";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        nav: {
          about: "About",
          experience: "Experience",
          skill: "Skills",
          projects: "Projects",
          contact: "Contact",
        },
        banner: {
          heading: "Hi, I'm",
          name: "Molly Su",
          description:
            "A front-end developer who enjoys solving problems and is passionate about learning new technologies.",
        },
        about: {
          title: "About Me",
          mbti: "ISTJ",
          description: `I'm Molly Su. I graduated with a bachelor's degree in information and financial management from National Taipei University of Technology.
      In high school, I discovered my passion for programming through Visual Basic. During university, I began learning front-end development and was captivated by how quickly ideas could be turned into visual results. Since then, I've been deeply interested in front-end development and am committed to continually improving my skills and striving to become an outstanding front-end engineer.`,
          hobby: {
            title: "Hobbies:",
            content: [
              "Crocheting",
              "Gaming",
              "Watching Twitch",
              "Watching LoL tournaments",
              "Traveling",
              "Enjoying food",
            ],
          },
        },
        experience: {
          title: "Experience",
          sprout: {
            title: "25sprout",
            position: "Frontend Development Intern @ 25sprout",
            date: "Mar. 2024 – Nov. 2024 (9 months)",
            location: "Songshan Dist., Taipei (Hybrid)",
            link: "https://www.25sprout.com/",
            content: [
              "Maintain and develop SurveyCake official website",
              {
                0: "Implement new page「Templates」and integrate APIs.",
                1: "Adjust page styles and multi-language content.",
                2: "Adjust GA and GTM events.",
                3: "Collaborate with PMs, designers and marketers to define and implement requirements.",
              },
              "Fix bugs in SurveyCake backend",
              {
                0: "Covered modules such as account management, group list and survey overview to improve user experience and system stability."
              },
              "Assist in developing SurveyCake XM",
              {
                0: "Implement new pages and integrate APIs.",
                1: "Learn and use Nivo to create custom charts.",
                2: "Adjust page styles.",
                3: "Maintain public and enterprise versions.",
              },
              "Learned to use Git for collaborative development and version control, and assisted in SurveyCake deployment.",
              "Adjusted all page styles of SurveyCake WordPress blog based on Figma",
              "Maintain legacy projects",
              {
                0: "Adjust multi-language content.",
                1: "Understand basic implementation of GTM and GA",
                2: "Acquire basic knowledge of PUG and PHP",
                3: "Familiar with project development workflows."
                }
            ],
            skills: ["React", "Redux", "TypeScript", "MUI", "Nivo", "Git", "Wordpress"],
          },
          mrhost: {
            title: "mrhost",
            position: "Frontend Engineering Intern @ mrhost",
            date: "Nov. 2022 – May 2023 (7 months)",
            location: "Xinyi Dist., Taipei",
            link: "https://www.mrhost.com.tw/",
            content: [
              "Automate Google Sheets workflows using Apps Script.",
              "Use SiteMinder to manage hotel listings, room types, and pricing.",
              "Build a one-page website using Bootstrap 5.",
              "Create SOPs to ensure workflow accuracy and consistency.",
              "Write SEO articles in WordPress.",
            ],
            skills: [
              "Apps Script",
              "Google Sheet",
              "HTML/CSS",
              "Bootstrap 5",
              "SiteMinder",
            ],
          },
        },
        projects: {
          title: "Side Projects",
          maintain: {
            y: "Maintained",
            n: "Archived",
          },
          links: {
            website: "Website",
            demoVideo: "Demo Video",
            code: "Code",
          },
          projectsList: {
            mernEcWebsite: {
              title: "E-commerce Website 🛒",
              subtitle: "MERN Stack Project",
              maintain: "n",
              hasVideo: true,
              techStack: [
                "React",
                "TypeScript",
                "Tailwind CSS + daisyUI",
                "Swiper",
                "Jest + React Testing Library",
                "Express",
                "MongoDB",
                "ECPay SDK",
              ],
              description:
                "A full-stack bakery e-commerce website (for portfolio only, not for commercial use). It provides essential shopping and admin management functions, along with ECPay test payment integration to simulate the full experience of an e-commerce system.\nKey features include:",
              features: [
                "Complete user registration and login system, with role-based access control distinguishing frontend (user) and backend (admin) permissions.",
                "Frontend can browse products, manage cart, place orders with simulated payments, and view personal order history.",
                "Backend can manage products, announcements and orders, including create, edit, delete operations and order status updates.",
                "Integrated with ECPay test payment gateway to simulate payment methods.",
              ],
              website: "https://mern-ecommerce-client-seven.vercel.app/",
              code: "https://github.com/kir4che/mern-ecommerce-website",
            },
            kir4cheBlog: {
              title: "Personal Blog 🍒",
              subtitle: "Next.js Blog",
              maintain: "y",
              hasVideo: true,
              techStack: [
                "Next.js",
                "React",
                "TypeScript",
                "Tailwind CSS + daisyUI",
                "Next-Intl",
                "next-mdx-remote + remark/rehype plugins",
              ],
              description:
                "Built with Next.js and TypeScript for sharing tech articles and life updates.\nKey features and technical highlights include:",
              features: [
                "Supports multi-language and dark mode for better user experience.",
                "Utilizes Static Site Generation (SSG) to improve page load speed.",
                "Manages SEO metadata and creates dynamic OG image for optimized search visibility.",
                "Supports MDX format, allowing React components to be embedded directly in articles for more flexible content.",
                "Articles can be drafted or password-protected for content control and privacy.",
              ],
              website: "https://kir4che.com/en",
              code: "https://gitlab.com/kir4che/kir4che-blog",
            },
            stocklight: {
              title: "Stock Light ✨",
              subtitle: "Senior Project",
              maintain: "n",
              suspended: "Service paused",
              hasVideo: false,
              techStack: [
                "Next.js",
                "JavaScript",
                "Tailwind CSS + MUI",
                "ECharts",
                "AOS",
                "NextAuth",
                "OpenAI API",
              ],
              description:
                "A one-stop stock information platform that uses historical data and statistical analysis, designed as a blessing-themed system. It integrates deep learning to provide users with real-time and intuitive analysis. I was mainly responsible for frontend development and partial UI/UX design, collaborating with the backend team to define API formats and handle integration.\nKey features include:",
              features: [
                "Fundamental and technical analysis of individual stocks, along with unique weather correlation analysis.",
                "God of Stock Market AI Chatbot: Interacts with users to address various stock market-related questions and issues.",
                "Lighting system: Users select an industry and filter to find promising stocks.",
                "Stock dashboard: Includes financial ratios, sentiment radar charts, key charts, news, and a GPT-4 chatbot using RAG.",
                "Watchlist: Users can group and monitor favorite stocks with real-time prices and insights.",
              ],
              website: "https://stocklight.co/",
              demoVideo: "https://www.youtube.com/watch?v=s92-9di9qa4&t=1s",
              code: "https://github.com/kir4che/stock-light-website",
            },
            picquads: {
              title: "PicQuads 📷",
              subtitle: "Online Photo Booth",
              maintain: "y",
              hasVideo: true,
              techStack: [
                "React",
                "TypeScript",
                "Tailwind CSS",
                "react-camera-pro",
                "file-saver",
                "Express",
              ],
              description:
                "Inspired by Korea's popular photo booths, an online web app lets users capture photos on mobile or desktop, choose from various frame layouts, customize frame colors, and apply filter effects to create a personalized photo strip.\nKey features include:",
              features: [
                "Supports various frame layouts such as single, double, and triple, etc.",
                "Captures photos on mobile or desktop, adapting to various devices and scenarios.",
                "Allows users to customize frame colors and apply various filter effects.",
                "Supports downloading the photo strip for easy saving and printing.",
                "Supports sharing photos via link or QR Code for easy sharing with friends or on social media (completed but not yet released).",
              ],
              website: "https://picquads.vercel.app/",
              code: "https://github.com/kir4che/picquads",
            },
          },
        },
        skill: {
          title: "Skills",
          subtitle:
            "These are the skills I have acquired so far, and I am continually working to improve them.",
          tip: "(Hover over or click icon to see my skill level)",
          frontend: {
            react: {
              name: "React",
              level:
                "Proficient in developing with Functional Components\nFamiliar with using Hooks\nExperienced with React Router v6 for route management",
            },
            redux: {
              name: "Redux",
              level:
                "Understand basic concepts\nSome knowledge of RTK (Redux Toolkit) usage",
            },
            javascript: {
              name: "JavaScript",
              level:
                "Familiar with basic syntax (ES5, ES6+)\nExperienced in API integration and data processing",
            },
            typescript: {
              name: "TypeScript",
              level:
                "Understand basic syntax\nFamiliar with using type aliases and interfaces",
            },
            sass: {
              name: "Sass",
              level: "",
            },
            tailwindcss: {
              name: "Tailwind CSS",
              level: "",
            },
          },
          backend: {
            nodejs: {
              name: "Node.js",
              level:
                "Understand basic syntax\nFamiliar with RESTful API design",
            },
            express: {
              name: "Express",
              level:
                "Know how to set up routes\nExperience creating simple RESTful APIs",
            },
            mysql: {
              name: "MySQL",
              level:
                "Familiar with basic query commands\nUnderstand database design",
            },
          },
          languages: {
            java: {
              name: "Java",
              level:
                "Understand basic syntax\nExperience developing simple GUI applications (Java Swing)",
            },
            python: {
              name: "Python",
              level:
                "Understand basic syntax\nBasic experience with web scraping\nUsed BeautifulSoup and Selenium libraries",
            },
          },
          others: {
            git: {
              name: "Git",
              level:
                "Understand basic commands\nExperience with collaboration and version control",
            },
            figma: {
              name: "Figma",
              level:
                "Familiar with basic operations\nExperience in converting design mockups into code",
            },
            wordpress: {
              name: "WordPress",
              level:
                "Experience creating websites\nUsed Elementor for writing posts and editing styles\nUnderstand how to customize website styles",
            },
          },
        },
        contact: {
          title: "Get In Touch",
          subtitle:
            "Whether you have an idea, a question, or an opportunity to collaborate,\nfeel free to reach out to me!",
          button: "Send Email",
        },
      },
    },
    "zh-TW": {
      translation: {
        nav: {
          about: "關於我",
          experience: "工作經歷",
          skill: "專業技能",
          projects: "作品集",
          contact: "與我聯繫",
        },
        banner: {
          heading: "嗨，我是",
          name: "Molly Su",
          description:
            "一位熱愛前端開發的工程師，享受解決問題的過程，同時熱衷於學習新技術。",
        },
        about: {
          title: "關於我",
          mbti: "ISTJ",
          description:
            "我是蘇昶諭 (Molly)，畢業於臺北科技大學資訊與財金管理系。\n高中時接觸了 Visual Basic，發現了對程式設計的熱忱，從而開啟了我的程式之路；在大學時期，我開始接觸前端，能夠快速地將自己的想法實現在畫面上，讓我對前端產生了濃厚的興趣，並且希望能夠在該領域中不斷精進自己，也期許自己成為一名優秀的前端工程師。",
          hobby: {
            title: "小小興趣：",
            content: [
              "鉤織",
              "打電動",
              "看實況",
              "看 LOL 比賽",
              "旅行",
              "美食",
            ],
          },
        },
        experience: {
          title: "工作經歷",
          sprout: {
            title: "25sprout",
            position: "前端開發實習生 @ 25sprout",
            date: "2024.03 － 2024.11 (9 個月)",
            location: "臺北市松山區（混合型）",
            link: "https://www.25sprout.com/",
            content: [
              "維護 SurveyCake 官方網站",
              {
                "0": "切版新頁面「問卷範本」並串接 API",
                "1": "調整頁面樣式及文案",
                "2": "調整 GA 與 GTM 事件",
                "3": "參與會議與 PM、設計師及行銷團隊討論需求並進行協作",
              },
              "修復 SurveyCake 企業後台功能與介面 bug",
              {
                "0": "涵蓋帳號管理、群組清單、問卷總覽等模組，提升使用體驗與系統穩定性。",
              },
              "協助開發 SurveyCake XM",
              {
                "0": "切版新頁面並串接 API",
                "1": "學習並使用 nivo 製作自定義圖表",
                "2": "調整頁面樣式",
                "3": "維護與調整公版、企業版等不同版本"
              },
              "學習使用 Git 協同開發並進行版控，並協助執行 SurveyCake 進版。",
              "依照 Figma 調整 SurveyCake Wordpress 部落格所有頁面樣式",
              "維護舊有專案",
              {
                "0": "負責多語系文案調整",
                "1": "了解 GTM、GA 基本埋設方式",
                "2": "了解基礎的 PUG 與 PHP",
                "3": "熟悉各個專案的開發流程"
              }
            ],
            skills: ["React", "Redux", "TypeScript", "MUI", "Nivo", "Git", "Wordpress"],
          },
          mrhost: {
            title: "mrhost",
            position: "前端工程實習生 @ mrhost",
            date: "2022.11 － 2023.05 (7 個月)",
            location: "臺北市信義區",
            link: "https://www.mrhost.com.tw/",
            content: [
              "利用 Apps Script 自動化 Google 試算表的工作流程",
              "透過 SiteMinder 協助旅館上架資訊、房型，以及調整價格。",
              "使用 Bootstrap 5 構建一頁式網站",
              "建立 SOP 確保日常工作流程的正確及一致性",
              "於 Wordpress 撰寫 SEO 文章",
            ],
            skills: [
              "Apps Script",
              "Google Sheet",
              "HTML/CSS",
              "Bootstrap 5",
              "SiteMinder",
            ],
          },
        },
        projects: {
          title: "作品集",
          maintain: {
            y: "持續優化中",
            n: "已暫停維護",
          },
          links: {
            website: "網站連結",
            demoVideo: "Demo 影片",
            code: "程式碼",
          },
          projectsList: {
            mernEcWebsite: {
              title: "線上購物網站 🛒",
              subtitle: "MERN Stack 專案",
              maintain: "n",
              hasVideo: true,
              techStack: [
                "React",
                "TypeScript",
                "Tailwind CSS + daisyUI",
                "Swiper",
                "Jest + React Testing Library",
                "Express",
                "MongoDB",
                "ECPay SDK",
              ],
              description:
                "具備前後台的麵包店網購平台 (僅用於作品展示，非商業用途)。提供基本的購物與後台管理功能，並透過綠界測試金流模擬付款體驗，完整呈現電商平台的前後端。\n網站主要功能如下：",
              features: [
                "提供完整的會員註冊、登入，並根據使用者角色（user / admin）區分前後台權限。",
                "前台可瀏覽商品、操作購物車、進行下單與模擬付款，並查詢個人訂單紀錄。",
                "後台提供商品、活動訊息與訂單管理，支援新增、編輯、刪除操作與更新出貨狀態。",
                "整合綠界 ECPay 測試金流，模擬信用卡、ATM、網路 ATM 等付款方式。",
              ],
              website: "https://mern-ecommerce-client-seven.vercel.app/",
              code: "https://github.com/kir4che/mern-ecommerce-website",
            },
            kir4cheBlog: {
              title: "個人部落格 🍒",
              subtitle: "Next.js Blog",
              maintain: "y",
              hasVideo: true,
              techStack: [
                "Next.js",
                "React",
                "TypeScript",
                "Tailwind CSS + daisyUI",
                "Next-Intl",
                "next-mdx-remote + remark/rehype plugins",
              ],
              description:
                "使用 Next.js + TypeScript 架設的個人部落格，用於分享技術文章與生活點滴。\n主要功能與技術特色如下：",
              features: [
                "支援中英文語系切換與深色模式，提升使用者體驗。",
                "採用靜態生成（SSG）提升網站載入速度。",
                "整合 SEO Metadata 與動態 OG 圖片生成，實現 SEO 優化。",
                "支援 MDX 格式，允許在文章中嵌入 React 元件，讓文章內容更具靈活度。",
                "文章可設定為草稿或加密保護，便於內容控管與隱私維護。",
              ],
              website: "https://kir4che.com/tw",
              code: "https://gitlab.com/kir4che/kir4che-blog",
            },
            stocklight: {
              title: "股市光明燈 ✨",
              subtitle: "大學畢業專題",
              maintain: "n",
              // suspended: "暫停服務",
              hasVideo: false,
              techStack: [
                "Next.js",
                "JavaScript",
                "Tailwind CSS + MUI",
                "ECharts",
                "AOS",
                "NextAuth",
                "OpenAI API",
              ],
              description:
                "運用歷史資料與統計分析，打造一站式股票資訊平台並包裝成光明燈祈福，且結合深度學習分析，給予使用者最即時最簡易的個股分析資訊報表。而我主要負責的是前端開發與 UI / UX 設計，以及與後端團隊討論 API 格式並協助串接。\n網站主要功能如下：",
              features: [
                "提供個股的基本面、技術分析，以及獨特的天氣相關性分析。",
                "股市神明 AI 聊天機器人：與使用者互動，解決在股市上的疑難雜症。",
                "點燈系統：讓使用者選定產業類別，並通過條件篩選出該產業中最具潛力的個股。",
                "個股儀表板：包含財務比率、根據文本做分析輸出的情緒分數雷達圖、重要圖表資訊、相關新聞，以及透過 GPT-4 模型和資料萃取技術 (RAG) 技術的 AI 聊天機器人。",
                "自選股清單：使用者可建立群組並加入欲關注的個股，隨時追蹤個股的即時價格、變動幅度及相關分析。",
              ],
              website: "https://stock-light-website.vercel.app/",
              demoVideo: "https://www.youtube.com/watch?v=s92-9di9qa4&t=1s",
              code: "https://github.com/kir4che/stock-light-website",
            },
            picquads: {
              title: "PicQuads 📷",
              subtitle: "線上拍貼機",
              maintain: "y",
              hasVideo: true,
              techStack: [
                "React",
                "TypeScript",
                "Tailwind CSS",
                "react-camera-pro",
                "file-saver",
                "Express",
              ],
              description:
                "參考韓國人生四格拍貼機所開發的線上拍貼機網站，使用者可以透過手機或電腦進行拍照，並選擇不同的相框樣式、顏色與濾鏡效果，製作一張專屬的拍貼照片。\n網站主要功能如下：",
              features: [
                "支援多種相框版型選擇，如單格、雙格、三格等。",
                "可於手機或桌面裝置上拍照，適應不同使用場景與裝置需求。",
                "提供相框配色自定義與多種濾鏡套用效果。",
                "支援下載拍貼照片，方便保存與列印。",
                "可透過連結或 QR Code 分享照片，輕鬆傳給朋友或分享到社群 (已完成，尚未上線)。",
              ],
              website: "https://picquads.vercel.app/",
              code: "https://github.com/kir4che/picquads",
            },
          },
        },
        skill: {
          title: "專業技能",
          subtitle: "以下為我目前所學習的技能，並且持續學習中。",
          tip: "(懸停或點擊圖示可查看我於該技能的程度說明)",
          frontend: {
            react: {
              name: "React",
              level:
                "多用 Functional Component 開發\n熟悉使用 Hooks\nReact Router v6 管理路由",
            },
            redux: {
              name: "Redux",
              level: "了解基本概念\n略懂 RTK 基本使用",
            },
            javascript: {
              name: "JavaScript",
              level: "熟悉基本語法 (ES5, ES6+)\n熟悉 API 串接與資料處理",
            },
            typescript: {
              name: "TypeScript",
              level: "了解基本語法\n了解如何運用型別化名、介面",
            },
            sass: {
              name: "Sass",
              level: "",
            },
            tailwindcss: {
              name: "Tailwind CSS",
              level: "",
            },
          },
          backend: {
            nodejs: {
              name: "Node.js",
              level: "了解基本語法\n了解 RESTful API 設計",
            },
            express: {
              name: "Express",
              level: "了解如何建立路由\n有建立過簡單的 RESTful API",
            },
            mysql: {
              name: "MySQL",
              level: "了解基本查詢指令\n了解資料庫設計",
            },
          },
          languages: {
            java: {
              name: "Java",
              level: "了解基本語法\n具有簡單視窗程式的開發經驗（Java Swing）",
            },
            python: {
              name: "Python",
              level:
                "了解基本語法\n具有基礎的爬蟲經驗\n使用過 BeautifulSoup、Selenium 套件",
            },
          },
          others: {
            git: {
              name: "Git",
              level: "了解基本指令\n具有多人協作、版本控制的經驗",
            },
            figma: {
              name: "Figma",
              level: "了解基本操作\n具有依照設計稿切版的經驗",
            },
            wordpress: {
              name: "Wordpress",
              level:
                "具有建立網站的經驗\n使用 Elementor 撰寫文章及編輯樣式\n了解如何自定義網站樣式",
            },
          },
        },
        contact: {
          title: "與我聯繫",
          subtitle:
            "無論你有什麼想法、問題，或是有任何合作機會\n歡迎隨時聯繫我！",
          button: "發送信件",
        },
      },
    },
  },
  lng: resolvedLang,
  fallbackLng: "zh-TW",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
