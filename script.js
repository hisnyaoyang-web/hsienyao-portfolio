document.addEventListener('DOMContentLoaded', () => {
    // ===== Ink Canvas Background =====
    const canvas = document.getElementById('ink-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const PARTICLE_COUNT = 35;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class InkParticle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 120 + 60;
            this.speedX = (Math.random() - 0.5) * 0.15;
            this.speedY = (Math.random() - 0.5) * 0.15;
            this.opacity = Math.random() * 0.03 + 0.01;
            this.growth = (Math.random() - 0.5) * 0.08;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.size += this.growth;

            if (this.size < 30 || this.size > 200) {
                this.growth *= -1;
            }

            if (this.x < -150 || this.x > width + 150 ||
                this.y < -150 || this.y > height + 150) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size
            );
            gradient.addColorStop(0, `rgba(60, 55, 50, ${this.opacity})`);
            gradient.addColorStop(0.5, `rgba(80, 75, 70, ${this.opacity * 0.5})`);
            gradient.addColorStop(1, 'rgba(100, 95, 90, 0)');
            ctx.fillStyle = gradient;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new InkParticle());
        }
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateCanvas);
    }

    resizeCanvas();
    initParticles();
    animateCanvas();
    window.addEventListener('resize', () => {
        clearTimeout(window._resizeTimer);
        window._resizeTimer = setTimeout(() => {
            resizeCanvas();
            initParticles();
        }, 200);
    });

    // ===== Translations =====
    const translations = {
        en: {
            'nav.about': 'About',
            'nav.projects': 'AI Projects',
            'nav.content': 'Content',
            'nav.events': 'Events',
            'nav.experience': 'Experience',
            'nav.research': 'Research',
            'nav.contact': 'Contact',
            'hero.greeting': 'Welcome',
            'hero.title': 'Literary Foundation · AI Driven · Full-Stack Practice',
            'hero.school': 'Wuhan University | Chinese Language & Literature (Cultural Digitalization Minor)',
            'hero.quote': '"With words as bone and AI as wings, reshaping cultural expression in the digital dimension."',
            'hero.cta_projects': 'View Projects',
            'hero.cta_contact': 'Contact Me',
            'hero.meta1': 'Wuhan University',
            'hero.meta2': 'Class of 2028',
            'about.title': 'About & Education',
            'about.subtitle': '关于我',
            'about.edu.title': '🎓 Education',
            'about.edu.school': 'Wuhan University | Chinese Language & Literature (Bachelor)',
            'about.edu.time': '2024.09 – Present',
            'about.edu.minor': 'Minor: Cultural Digitalization',
            'about.honors.title': '🏅 Honors & Awards',
            'about.honors.h1': 'Wuhan University College of Chinese Merit Scholarship (Second Class)',
            'about.honors.h2': 'University-level Three-Good Student, Social Practice Advanced Individual',
            'about.honors.h3': 'National College Student Digital Trade Competition National First Prize',
            'about.honors.h4': 'China Computer Design Competition Central-South Region First Prize',
            'about.strengths.title': '💡 Core Competencies',
            'about.capability.c1.title': 'Product Thinking',
            'about.capability.c1.summary': 'Complete ability from user research to product delivery.',
            'about.capability.c1.t1': 'User Research',
            'about.capability.c1.t2': 'Data Analysis',
            'about.capability.c1.t3': 'Requirement Breakdown',
            'about.capability.c1.t4': 'Product Design',
            'about.capability.c1.t5': 'Iterative Optimization',
            'about.capability.projects': 'Projects:',
            'about.capability.c1.projects': 'Cyber Ancestor Cultivation, Children\'s Education Platform',
            'about.capability.c2.title': 'AI & Development',
            'about.capability.c2.summary': 'Independent AI product demo and web development.',
            'about.capability.c2.t1': 'Web Development',
            'about.capability.c2.t2': 'LLM API Integration',
            'about.capability.c2.t3': 'AIGC Tools',
            'about.capability.c2.t4': 'Data Processing',
            'about.capability.c2.t5': 'Rapid Prototyping',
            'about.capability.c2.projects': 'Su Shi Sentiment Analysis, Children\'s Education Platform',
            'about.capability.c3.title': 'Content & Growth',
            'about.capability.c3.summary': 'Content strategy and growth operations.',
            'about.capability.c3.t1': 'Content Strategy',
            'about.capability.c3.t2': 'Platform Operations',
            'about.capability.c3.t3': 'Cold-Start Growth',
            'about.capability.c3.t4': 'Data-Driven Optimization',
            'about.capability.c3.t5': 'Multi-Platform Distribution',
            'about.capability.c3.projects': 'WHU Douyin Club, Personal Account Operations',
            'projects.title': 'AI & Product Labs',
            'projects.subtitle': 'AI 项目与产品实验',
            'projects.p1.tag': 'AI Product',
            'projects.p1.title': 'Cyber Ancestor Cultivation',
            'projects.p1.role': 'Project Lead',
            'projects.p1.desc': 'An AI interactive cultivation product. Designed a cultural character growth system from 0→1, exploring the gamified expression of traditional Chinese culture.',
            'projects.p1.highlight': '🏆 ByteDance AI Creator Hackathon 2026 · Central China Direct Qualification',
            'projects.p1.link': 'View Project Docs →',
            'projects.p2.tag': 'NLP',
            'projects.p2.title': 'Sentiment Analysis for Su Shi & Su Zhe',
            'projects.p2.role': 'Independent Full-Stack Developer',
            'projects.p2.desc': 'Utilized large model technology for emotional annotation of classical literature, achieving digital interaction with cultural heritage.',
            'projects.p3.tag': 'Full-Stack',
            'projects.p3.title': "Children's Education Platform",
            'projects.p3.role': 'Independent Developer',
            'projects.p3.desc': 'Completed the full process from requirement analysis to deployment, delivering a practical and valuable demo.',
            'projects.p3.link': 'Visit Website →',
            'content.title': 'Content Strategy',
            'content.subtitle': '内容运营与品牌传播',
            'content.c1.title': 'Wuhan University Douyin Club',
            'content.c1.role': 'Editor-in-Chief & Lead',
            'content.c1.desc': 'Responsible for content strategy and topic planning. Account total views 8M+, monthly interaction rate increased by 30%.',
            'content.c2.title': 'Personal Account Operations',
            'content.c2.role': 'Xiaohongshu / Video Channel',
            'content.c2.desc': 'Achieved account cold start, single video views reached 60K+, Xiaohongshu monthly follower growth 500+.',
            'content.c3.title': 'Mainstream Media Content',
            'content.c3.role': 'Independent Creator',
            'content.c3.desc': 'Works published in China Youth Daily and Changjiang Daily, cumulative readership exceeding 100K+.',
            'events.title': 'Event Planning',
            'events.subtitle': '活动策划与执行',
            'events.e1.title': 'WHU Douyin Club · Editor-in-Chief',
            'events.e1.role': 'Event Planner & Editor-in-Chief',
            'events.e1.desc': 'Planned and executed multiple campus theme events, including "Tracing WHU" cultural exploration, "Luojia Trail" outdoor cross-country, and music festival booths. Managed the full process from proposal design, material coordination to volunteer recruitment.',
            'events.e1.s1': '20K+',
            'events.e1.s1.label': 'Live Stream Views',
            'events.e1.s2': '10K+',
            'events.e1.s2.label': 'On-site Participants',
            'events.e1.s3': '160+',
            'events.e1.s3.label': 'Lottery Participants',
            'events.e2.title': 'WHU Student Affairs · Photography & Video Lead',
            'events.e2.role': 'Photography & Video Department Lead',
            'events.e2.desc': 'Managed on-site photography scheduling and news publicity for the "2024 Top 10 Luojia Outstanding Students" selection and "Lectures at WHU" series. Received official commendation from WHU Party Committee Student Affairs Department.',
            'research.title': 'Research',
            'research.subtitle': '科研实践',
            'research.r1.title': 'AI-Powered Cultural Gene Digitization',
            'research.r1.role': 'Project Lead · Core Algorithm & Content Logic',
            'research.r1.desc': 'Traditional cultural gene extraction and intelligent annotation research based on artifact images. Applied Meta SAM 3, Qwen 3-VL, Gemini 1.5 Pro and other AI tools to implement the full pipeline from image segmentation, semantic annotation, cross-modal fusion to artifact clustering display.',
            'experience.title': 'Experience',
            'experience.subtitle': '实习与社会实践',
            'exp.group_intern': 'Internship',
            'exp.group_campus': 'Campus Experience',
            'exp.e1.company': 'NetEase Hi Acho AI English App',
            'exp.e1.role': 'Core Research Member',
            'exp.e1.desc': 'Designed surveys and interviews. Collected 300+ questionnaires and 50+ in-depth interviews. Delivered data-backed product optimization report.',
            'exp.e2.company': 'Wuhan University Intelligent Computing Laboratory for Cultural Heritage',
            'exp.e2.role': 'Assistant',
            'exp.e2.desc': 'Participating in cultural heritage digitization projects, assisting with research and data processing.',
            'exp.e3.company': 'GoodWe Power Technology',
            'exp.e3.role': 'Campus Ambassador',
            'exp.e3.desc': 'Executed campus promotion campaigns. Reached 2,000+ students through events and digital channels.',
            'exp.e4.company': 'Hubei University Youth Media Association',
            'exp.e4.role': 'Brand Department Lead',
            'exp.e4.desc': 'Designed campus media outreach programs. Connected universities with brand partners, closed 2 collaborations. Covered 8+ universities with 50,000+ impressions.',
            'contact.title': 'Contact',
            'contact.subtitle': '联系与投递',
            'contact.available_label': 'Available',
            'contact.available': '2026.07',
            'contact.email': 'Email',
            'contact.phone': 'Phone',
            'contact.wechat': 'WeChat',
            'contact.wechat_val': '17762558695'
        },
        zh: {
            'nav.about': '关于',
            'nav.projects': 'AI 项目',
            'nav.content': '内容',
            'nav.events': '活动策划',
            'nav.experience': '经历',
            'nav.research': '科研',
            'nav.contact': '联系',
            'hero.greeting': '欢迎',
            'hero.title': '文学底蕴 · AI 驱动 · 全栈实践',
            'hero.school': '武汉大学 汉语言文学（文化数字化微专业）',
            'hero.quote': '“以文字为骨骼，以 AI 为羽翼，在数字维度重塑文化表达。”',
            'hero.cta_projects': '查看项目',
            'hero.cta_contact': '联系我',
            'hero.meta1': '武汉大学',
            'hero.meta2': '2028届本科',
            'about.title': '关于我',
            'about.subtitle': 'About & Education',
            'about.edu.title': '🎓 教育背景',
            'about.edu.school': '武汉大学 | 汉语言文学 (本科)',
            'about.edu.time': '2024.09 – 至今',
            'about.edu.minor': '辅修：文化数字化微专业',
            'about.honors.title': '🏅 荣誉奖励',
            'about.honors.h1': '武汉大学文学院年度优秀学生乙等奖学金',
            'about.honors.h2': '校级三好学生、社会实践先进个人',
            'about.honors.h3': '全国大学生数字贸易大赛 全国一等奖',
            'about.honors.h4': '中国大学生计算机设计大赛 中南赛区一等奖',
            'about.strengths.title': '💡 核心竞争力',
            'about.capability.c1.title': '产品思维',
            'about.capability.c1.summary': '具备从用户需求到产品落地的完整闭环能力。',
            'about.capability.c1.t1': '用户调研',
            'about.capability.c1.t2': '数据分析',
            'about.capability.c1.t3': '需求拆解',
            'about.capability.c1.t4': '产品设计',
            'about.capability.c1.t5': '迭代优化',
            'about.capability.projects': '代表项目：',
            'about.capability.c1.projects': '赛博老祖宗养成计划、儿童公益教学工具网站',
            'about.capability.c2.title': 'AI 与开发',
            'about.capability.c2.summary': '能够独立完成 AI 产品 Demo 与网站开发。',
            'about.capability.c2.t1': 'Web 开发',
            'about.capability.c2.t2': '大模型 API 调用',
            'about.capability.c2.t3': 'AIGC 工具使用',
            'about.capability.c2.t4': '数据处理',
            'about.capability.c2.t5': '快速原型搭建',
            'about.capability.c2.projects': '二苏诗词情感识别、儿童公益教学工具网站',
            'about.capability.c3.title': '内容与增长',
            'about.capability.c3.summary': '具备内容策划与增长操盘能力。',
            'about.capability.c3.t1': '内容策划',
            'about.capability.c3.t2': '平台运营',
            'about.capability.c3.t3': '冷启动增长',
            'about.capability.c3.t4': '数据驱动优化',
            'about.capability.c3.t5': '多平台分发',
            'about.capability.c3.projects': '武大抖音俱乐部、个人账号独立运营',
            'projects.title': 'AI 项目与产品实验',
            'projects.subtitle': 'AI & Product Labs',
            'projects.p1.tag': 'AI 产品',
            'projects.p1.title': '赛博老祖宗养成计划',
            'projects.p1.role': '项目负责人',
            'projects.p1.desc': 'AI 互动养成类产品，从 0→1 设计文化角色成长系统，探索传统文化的游戏化表达。',
            'projects.p1.highlight': '🏆 获抖音 AI 创变者计划 2026 华中区直通资格',
            'projects.p1.link': '查看项目文档 →',
            'projects.p2.tag': '自然语言处理',
            'projects.p2.title': '二苏诗词情感识别工具网站',
            'projects.p2.role': '独立全栈开发者',
            'projects.p2.desc': '利用大模型技术对经典文学进行情感标注，实现文化遗产的数字化交互。',
            'projects.p3.tag': '全栈开发',
            'projects.p3.title': '儿童公益教学工具网站',
            'projects.p3.role': '独立开发者',
            'projects.p3.desc': '完成从需求分析到部署上线的全流程，输出具备实用价值的落地 Demo。',
            'projects.p3.link': '访问网站 →',
            'content.title': '内容运营与品牌传播',
            'content.subtitle': 'Content Strategy',
            'content.c1.title': '武大抖音俱乐部',
            'content.c1.role': '主编及主要负责人',
            'content.c1.desc': '负责内容策略与选题规划。账号累计播放 800万+，单月互动率提升 30%。',
            'content.c2.title': '个人账号独立运营',
            'content.c2.role': '小红书 / 视频号',
            'content.c2.desc': '实现账号冷启动，单条视频播放达 6W+，小红书粉丝月增长 500+。',
            'content.c3.title': '主流媒体内容创作',
            'content.c3.role': '独立创作者',
            'content.c3.desc': '作品发表于《中国青年报》、《长江日报》，累计阅读量超 10W+。',
            'events.title': '活动策划与执行',
            'events.subtitle': 'Event Planning',
            'events.e1.title': '武大抖音俱乐部·主编',
            'events.e1.role': '活动策划与主编',
            'events.e1.desc': '策划并执行多场校园主题活动，包括"寻迹武大·抖见新章"校园文化探索、"珞珈越野·驰骋自然"户外越野、音乐会摊位等。负责从方案设计、物料对接到志愿者招募与分工的全流程。',
            'events.e1.s1': '2W+',
            'events.e1.s1.label': '线上直播观看',
            'events.e1.s2': '1W+',
            'events.e1.s2.label': '线下参与人次',
            'events.e1.s3': '160+',
            'events.e1.s3.label': '互动抽奖参与',
            'events.e2.title': '武大党委学生工作部·摄影视讯部负责人',
            'events.e2.role': '摄影视讯部负责人',
            'events.e2.desc': '负责"2024年度十大珞珈风云学子评选活动"及"我在武大听讲座"系列活动的现场摄影调度与新闻宣发，获武汉大学党委学生工作部工作表彰。',
            'research.title': '科研实践',
            'research.subtitle': 'Research',
            'research.r1.title': 'AI 赋能文化基因数字化',
            'research.r1.role': '项目负责人 · 核心算法与内容逻辑构建',
            'research.r1.desc': '基于文物图像的传统文化基因提取与智能标注研究。运用 Meta SAM 3、Qwen 3-VL、Gemini 1.5 Pro 等 AI 工具，实现图像分割、语义标注、跨模态融合到文物聚类展示的全流程。',
            'experience.title': '实习与社会实践',
            'experience.subtitle': 'Experience',
            'exp.group_intern': '实习经历',
            'exp.group_campus': '校园经历',
            'exp.e1.company': '网易Hi Acho AI口语软件',
            'exp.e1.role': '核心调研成员',
            'exp.e1.desc': '设计访谈提纲，回收有效问卷300+、深度访谈50+用户；整理数据并输出产品优化报告。',
            'exp.e2.company': '武汉大学文化遗产智能计算实验室',
            'exp.e2.role': '助理',
            'exp.e2.desc': '参与文化遗产数字化项目，协助研究与数据处理工作。',
            'exp.e3.company': '江苏固德威电源科技有限公司',
            'exp.e3.role': '校园大使',
            'exp.e3.desc': '负责校园推广、信息触达、学生沟通与宣传执行，覆盖校内2000+学生。',
            'exp.e4.company': '湖北高校青年传媒协会',
            'exp.e4.role': '品牌部负责人',
            'exp.e4.desc': '独立输出校园媒体走访活动全案；联络高校与品牌方推进合作；覆盖高校8+，活动总曝光5万+，落地品牌合作2项。',
            'contact.title': '联系与投递',
            'contact.subtitle': 'Contact',
            'contact.available_label': '到岗时间',
            'contact.available': '2026.07',
            'contact.email': '电子邮箱',
            'contact.phone': '电话',
            'contact.wechat': '微信',
            'contact.wechat_val': '17762558695'
        }
    };

    // ===== Language Switch =====
    let currentLang = 'en';
    const body = document.body;
    const langSwitch = document.getElementById('langSwitch');

    function setLanguage(lang) {
        currentLang = lang;
        body.setAttribute('data-lang', lang);

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                // Preserve child elements for links etc.
                if (el.children.length === 0) {
                    el.textContent = translations[lang][key];
                } else {
                    // For elements with children, only replace text nodes
                    const textNodes = Array.from(el.childNodes).filter(
                        n => n.nodeType === Node.TEXT_NODE && n.textContent.trim()
                    );
                    if (textNodes.length > 0) {
                        textNodes[0].textContent = translations[lang][key];
                    } else {
                        el.textContent = translations[lang][key];
                    }
                }
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    }

    if (langSwitch) {
        langSwitch.addEventListener('click', () => {
            setLanguage(currentLang === 'en' ? 'zh' : 'en');
        });
    }

    // Initialize
    body.setAttribute('data-lang', 'en');

    // ===== Mobile Nav =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ===== Navbar scroll & Scroll-to-top =====
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 20) {
            navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('visible', window.pageYOffset > 300);
        }
    });

    // ===== Smooth scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ===== Intersection Observer for fade-in =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.06
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.about-card, .project-card, .exp-card, .content-card, .contact-item, .capability-card, .event-stat'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.7s ease ${index * 0.06}s, transform 0.7s ease ${index * 0.06}s`;
        fadeObserver.observe(el);
    });

    // ===== Active Nav Highlighting =====
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navSections = document.querySelectorAll('section[id], header.hero');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    navSections.forEach(section => navObserver.observe(section));

    // ===== Portfolio Lightbox (Card Click) =====
    const overlay = document.getElementById('portfolioOverlay');
    const stageImg = document.getElementById('portfolioImage');
    const counter = document.getElementById('portfolioCounter');
    const thumbsContainer = document.getElementById('portfolioThumbs');
    const navBar = overlay.querySelector('.portfolio-nav');
    let currentGallery = [];
    let currentIndex = 0;

    function openImages(srcs) {
        currentGallery = srcs;
        currentIndex = 0;
        const multi = currentGallery.length > 1;
        navBar.style.display = multi ? '' : 'none';
        thumbsContainer.style.display = multi ? '' : 'none';
        if (multi) renderThumbs();
        showImage(0);
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showImage(index) {
        if (index < 0) index = currentGallery.length - 1;
        if (index >= currentGallery.length) index = 0;
        currentIndex = index;
        stageImg.classList.remove('loaded');
        stageImg.src = currentGallery[index];
        stageImg.onload = () => stageImg.classList.add('loaded');
        if (currentGallery.length > 1) {
            counter.textContent = `${index + 1} / ${currentGallery.length}`;
            document.querySelectorAll('.portfolio-thumb').forEach((t, i) => {
                t.classList.toggle('active', i === index);
            });
            const activeThumb = thumbsContainer.children[index];
            if (activeThumb) {
                activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        }
    }

    function renderThumbs() {
        thumbsContainer.innerHTML = '';
        currentGallery.forEach((src, i) => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'portfolio-thumb' + (i === 0 ? ' active' : '');
            img.alt = '';
            img.addEventListener('click', () => showImage(i));
            thumbsContainer.appendChild(img);
        });
    }

    // Bind click on all cards with data-images
    document.querySelectorAll('[data-images]').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if (e.target.closest('a, button, video')) return;
            const srcs = card.getAttribute('data-images').split(',').map(s => s.trim());
            if (srcs.length > 0) openImages(srcs);
        });
    });

    overlay.querySelector('.portfolio-close').addEventListener('click', closeGallery);
    overlay.querySelector('.portfolio-prev').addEventListener('click', () => showImage(currentIndex - 1));
    overlay.querySelector('.portfolio-next').addEventListener('click', () => showImage(currentIndex + 1));

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeGallery();
    });

    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
});
