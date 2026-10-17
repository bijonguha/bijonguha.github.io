
/** One item in a project's pop-up gallery. Paths are under public/, e.g. "/media/mistermd/demo.mp4". */
export type ProjectMediaItem = {
  type: "video" | "gif" | "image";
  src: string;
  /** Still frame for a video or GIF (recommended). */
  poster?: string;
  /** Short line shown under the media; also read by screen readers. */
  caption?: string;
};

export const bijonConfig = {
  personal: {
    name: "BIJON GUHA",
    title: "Generative AI Engineer",
    tagline: "Building AI systems from first principles to production scale",
    subtitle: "The AI Engineer Who Builds the Future",
    primaryIdentity: "Generative AI Engineer | IIT Graduate",
    coreMessage: "I don't just use AI - I understand it inside out, from mathematical foundations to production systems",
    heroAnimation: {
      loadingText: "> Initializing bijon_guha.exe...",
      progressText: "> Loading model weights... [████████████] 100%"
    }
  },
  
  companies: [
    "IBM Labs",
    "Siemens",
    "JP Morgan",
    "Compass Digital",
    "Zensar"
  ],

  testimonials: [
    {
      id: 1,
      name: "Ritvik Raj",
      position: "Software Architect",
      company: "Siemens",
      linkedin: "https://www.linkedin.com/in/ritvik-raj-7a960a37/",
      date: "February 2025",
      relationship: "Ritvik managed Bijon directly",
      text: "Working with you has been an absolute pleasure, and I've learned so much from our collaboration. Your ability to tackle challenges with a clear, strategic mindset and your expertise in AI/ML, Generative AI, and cloud architecture have always impressed me. Beyond your technical skills, what stands out the most is your willingness to share knowledge and support your team. You bring a positive energy to every project, and your dedication to delivering high-quality solutions is truly inspiring. I have no doubt that you will continue to achieve great things, and any team would be lucky to have you.",
      category: "Strategic AI/ML"
    },
    {
      id: 2,
      name: "Shubham Dubey",
      position: "SRE3-AVP",
      company: "JPMorganChase",
      linkedin: "https://www.linkedin.com/in/shubham-dubey-devops/",
      date: "June 2024",
      relationship: "Shubham worked with Bijon on the same team",
      text: "I had the pleasure of working with Bijon on the NEOM project. As a DevOps Engineer, I collaborated closely with him, who consistently delivered actionable insights through advanced statistical analysis and AI models. He helped in seamless integration of complex data models into our production environment, ensuring robust and scalable systems. Bijon is definitely innovative, dedicated, and a great team player. I wholeheartedly endorse him.",
      category: "Statistical Analysis"
    },
    {
      id: 3,
      name: "Saurabh Srivastava",
      position: "Senior AI Architect",
      company: "IBM Labs",
      linkedin: "https://www.linkedin.com/in/saurabh-srivastava-56039217/",
      date: "July 2022",
      relationship: "Saurabh was senior to Bijon but didn't manage him directly",
      text: "Bijon's expertise in AI and advanced analytics is brilliant. The level of competent knowledge he demonstrated during AI/ML projects is always appreciated by customers. He always focuses on innovating new aspects of AI/ML and implementing them very effectively in a short span of time. Apart from being an expert in data science, Bijon is highly approachable and always willing to help his team members and find the best solutions to problems. A very knowledgeable and very good team player, always a pleasure to work with.",
      category: "AI Architecture"
    },
    {
      id: 4,
      name: "Nimai Chand Das Adhikari",
      position: "Principal Data Scientist",
      company: "Labcorp",
      linkedin: "https://www.linkedin.com/in/nimai-chand-das-adhikari-932396ba/",
      date: "September 2021",
      relationship: "Nimai Chand managed Bijon directly",
      text: "An extremely talented and highly motivated IITian. If any issue comes up in the field of computer vision, he is the best person to deal with. Bijon gives solutions with the utmost dedication and uniqueness — the kind of work that could itself be a contender for publication. His key skills are problem solving, customer engagement, and unique problem-solving that comes from strong technical foundations. He is surely an asset to any team.",
      category: "Computer Vision"
    },
    {
      id: 5,
      name: "Indrajit Kar",
      position: "Managing Director",
      company: "AI Native Business",
      linkedin: "https://www.linkedin.com/in/indrajit-kar/",
      date: "March 2021",
      relationship: "Indrajit managed Bijon directly",
      text: "Bijon worked in my AI team for more than half a year and was one of the key members in our deep learning and research projects. His credibility and skills in machine learning, optical character recognition, computer vision, and interpreting sensor data are unmatched. He does his own research to solve complex computer vision problems, and even after solving them he isn't satisfied until he's optimized the algorithms and made them production-ready. There's a huge difference between production data and test data — with Bijon's AI and ML skills, we were able to reduce the effort of production deployment and get better precision from our models in production. His ability to collaborate as well as guide senior resources on the team is commendable. I'm confident he'll do a fantastic job wherever he's placed.",
      category: "Production ML"
    },
    {
      id: 6,
      name: "Sujit Ojha",
      position: "Senior Manager, Data Science",
      company: "Ex-GE Aviation",
      linkedin: "https://www.linkedin.com/in/sujitojha/",
      date: "May 2020",
      relationship: "Sujit was Bijon's mentor",
      text: "It's rare that you come across standout talent like Bijon. I've worked alongside him for close to a year now. He has shown his prowess in deep learning, computer vision, and machine learning — one of my favorites being his work in handwriting recognition involving mathematical equations. Bijon is a valuable team member and carries a great demeanor on every project. His willingness to learn and take on new challenges is something to be desired in any professional.",
      category: "Mathematical Foundations"
    }
  ],

  projects: [
    {
      id: 1,
      name: "InterviewValley",
      tagline: "Multi-agent AI that builds a complete interview plan in under 3 minutes.",
      category: "Agentic AI",
      role: "Generative AI Engineer",
      description: "Multi-agent AI platform that generates complete interview plans in under 3 minutes.",
      achievement: "Agentic AI orchestration across multiple models — delivering deep technical rubrics, not generic questions.",
      impact: "Full interview plan: technical questions, evaluation criteria & interviewer guidance. Ready in 3 minutes.",
      isUnderDevelopment: true,
      techStack: ["Python", "React", "LangGraph", "Agentic AI", "CI/CD", "OpenAI API"],
      features: [
        "AI-Powered Question Generation",
        "Multi-agent system creates deep, non-generic technical questions",
        "Precision Targeting based on candidate experience and job requirements",
        "Time Efficient - comprehensive plans in minutes",
        "Interviewer Guidance with evaluation criteria and red flags",
        "Quality Assured with built-in question evaluation",
        "Comprehensive Reports with structured sections and timing"
      ],
      metrics: {
        generationTime: "< 3 min",
        architecture: "Multi-agent"
      },
      links: { live: "https://www.interviewvalley.com/" },
      // Card image. Put files in public/media/interviewvalley/ and use paths like "/media/interviewvalley/thumb.jpg".
      thumbnail: "",
      // Videos, GIFs and screenshots, shown in order in the pop-up player. Example:
      // { type: "gif", src: "/media/interviewvalley/demo.gif", poster: "/media/interviewvalley/poster.jpg", caption: "InterviewValley generating an interview plan" }
      media: [] as ProjectMediaItem[]
    },
    {
      id: 2,
      name: "Content Intelligence",
      tagline: "Agent skills that turn a live web app into product docs and narrated walkthrough videos.",
      category: "AI Agent Skills",
      role: "Creator & Lead Engineer",
      description: "A no-code, skills-based extension for AI coding tools (Kiro, Claude Code, Codex) that explores a live web app on its own and produces product documentation, annotated screenshots and narrated video walkthroughs.",
      achievement: "Packaged a full content pipeline as portable agent skills: the agent reads the codebase, discovers user personas and workflows, drives a real browser, annotates each screen, writes narration that must pass automatic quality checks, and renders captioned videos. There is no app-specific code.",
      impact: "Used in production in enterprise healthcare. A full role captured in 1–3 hours of agent time, with 60–90 second narrated videos per topic. No screen recording or voice-over.",
      techStack: ["Agent Skills", "Playwright MCP", "Claude", "Amazon Polly", "ffmpeg", "Python"],
      features: [
        "Autonomous product discovery: personas, journeys and screens",
        "Annotated screenshots with learner-style captions",
        "Narrated, captioned walkthrough videos per topic",
        "Five automatic checks on the narration before it is voiced",
        "Fingerprinted renders: only changed topics re-render",
        "A person approves every video before it is published",
        "Works with any skills-capable AI coding tool"
      ],
      metrics: {
        setupCode: "0 lines",
        outputs: "Docs + Video",
        agentTime: "1–3 h",
        videoPerTopic: "60–90 s"
      },
      links: {},
      // Card image. Put files in public/media/content-intelligence/ and use paths like "/media/content-intelligence/thumb.jpg".
      thumbnail: "",
      // Videos, GIFs and screenshots, shown in order in the pop-up player. Example:
      // { type: "video", src: "/media/content-intelligence/demo.mp4", poster: "/media/content-intelligence/poster.jpg", caption: "An AI agent exploring a web app and producing an annotated, narrated walkthrough video" }
      media: [] as ProjectMediaItem[]
    },
    {
      id: 3,
      name: "MisterMD",
      tagline: "A zero-install markdown editor with live preview and diagrams.",
      category: "Developer Tools",
      role: "Full-Stack Developer & UI/UX Engineer",
      description: "Zero-installation markdown editor that transforms writing with live preview and professional features",
      achievement: "Built a production-ready markdown editor with real-time rendering and advanced diagram support",
      impact: "Professional documentation in the browser, with live preview and nothing to install",
      techStack: ["React", "Next.js", "TypeScript", "Monaco Editor", "Tailwind CSS"],
      features: [
        "Real-time markdown preview",
        "Advanced diagram support (Mermaid, Chart.js)",
        "Zero installation required",
        "Export to PDF/HTML/DOCX"
      ],
      metrics: {
        lighthouse: "100/100",
        renderTime: "< 10ms",
        installTime: "0 sec"
      },
      links: { live: "https://mistermd.vercel.app/", code: "https://github.com/bijonguha/mistermd" },
      // Card image. Put files in public/media/mistermd/ and use paths like "/media/mistermd/thumb.jpg".
      thumbnail: "",
      // Videos, GIFs and screenshots, shown in order in the pop-up player. Example:
      // { type: "gif", src: "/media/mistermd/demo.gif", poster: "/media/mistermd/poster.jpg", caption: "MisterMD editor with live markdown preview" }
      media: [] as ProjectMediaItem[]
    },
    {
      id: 4,
      name: "Browsermind",
      tagline: "Private AI chat with models that run entirely in your browser.",
      category: "Browser-Based LLMs",
      role: "Generative AI Engineer",
      description: "Revolutionary WebLLM implementation enabling AI models to run locally in browsers",
      achievement: "Implemented WebLLM to run AI models locally with zero server dependency",
      impact: "100% privacy-preserving AI chat with 5 different models",
      techStack: ["WebLLM", "JavaScript", "Transformer.js", "WASM"],
      features: [
        "Local model execution",
        "5 AI models support",
        "Zero data transmission",
        "Real-time inference"
      ],
      metrics: {
        privacyScore: "100%",
        modelsSupported: 5
      },
      links: { live: "https://browsermind.vercel.app/", code: "https://github.com/bijonguha/browsermind" },
      // Card image. Put files in public/media/browsermind/ and use paths like "/media/browsermind/thumb.jpg".
      thumbnail: "",
      // Videos, GIFs and screenshots, shown in order in the pop-up player. Example:
      // { type: "gif", src: "/media/browsermind/demo.gif", poster: "/media/browsermind/poster.jpg", caption: "Browsermind chatting with a model running in the browser" }
      media: [] as ProjectMediaItem[]
    },
    {
      id: 5,
      name: "Stable Chat",
      tagline: "One API to reach many AI providers.",
      category: "AI Infrastructure",
      role: "AI Systems Architect",
      description: "Universal AI endpoint management system for seamless integration",
      achievement: "Built scalable AI infrastructure supporting multiple AI service providers",
      impact: "Seamless integration with any AI service through unified API",
      techStack: ["Node.js", "Docker", "Kubernetes", "OpenAI API", "Claude API"],
      features: [
        "Universal AI endpoints",
        "Auto-scaling infrastructure",
        "Multi-provider support",
        "Real-time monitoring"
      ],
      metrics: {
        responseTime: "< 200ms",
        providers: "5+"
      },
      links: { live: "https://stablechat.vercel.app/", code: "https://github.com/bijonguha/Stable-Chat-UI" },
      // Card image. Put files in public/media/stable-chat/ and use paths like "/media/stable-chat/thumb.jpg".
      thumbnail: "",
      // Videos, GIFs and screenshots, shown in order in the pop-up player. Example:
      // { type: "image", src: "/media/stable-chat/screen-1.png", caption: "Stable Chat interface switching between AI providers" }
      media: [] as ProjectMediaItem[]
    },
    {
      id: 6,
      name: "Jira Copilot",
      tagline: "AI story estimation inside Jira, built for Siemens' GenAI marketplace.",
      category: "AI-Powered Tools",
      role: "Lead Developer",
      description: "Intelligent Jira integration with AI-powered story estimation, built as part of Siemens' internal GenAI Marketplace",
      achievement: "Led development of the GenAI Marketplace's Jira Copilot tool, deployed on AWS and integrated with the Atlassian Jira dashboard for automated story updates",
      impact: "Reduced estimation time by 80% with AI-powered insights, part of a marketplace reaching 450+ active users",
      techStack: ["OpenAI GPT-4", "Jira API", "React", "Python", "FastAPI"],
      features: [
        "Automated story estimation",
        "Smart sprint planning",
        "Risk assessment",
        "Team productivity insights"
      ],
      metrics: {
        timeSaved: "80%",
        accuracy: "92%",
        teamsUsing: "50+"
      },
      links: { code: "https://github.com/bijonguha/jira_backend" },
      // Card image. Put files in public/media/jira-copilot/ and use paths like "/media/jira-copilot/thumb.jpg".
      thumbnail: "",
      // Videos, GIFs and screenshots, shown in order in the pop-up player. Example:
      // { type: "image", src: "/media/jira-copilot/screen-1.png", caption: "Jira Copilot suggesting a story estimate" }
      media: [] as ProjectMediaItem[]
    }
  ],

  metrics: {
    endorsements: 6,
    fortune500Companies: 4,
    aiSpecializations: 3,
    yearsInAI: "7+",
    projectsDelivered: "25+",
    modelsDeployed: "50+",
    yearsExperience: 6
  },

  publications: [
    {
      title: "WebLLM: Bringing Large Language Models to the Browser",
      venue: "AI Engineering Conference 2024",
      type: "Technical Paper"
    },
    {
      title: "Production-Ready Computer Vision Systems", 
      venue: "ML Systems Workshop",
      type: "Industry Paper"
    }
  ],

  skills: {
    programmingLanguages: ["Python", "JavaScript", "TypeScript", "C++", "R"],
    aiFrameworks: ["PyTorch", "TensorFlow", "Transformers", "LangChain", "OpenAI"],
    webTechnologies: ["React", "Node.js", "WebAssembly", "WebGL"],
    cloudPlatforms: ["AWS", "Azure", "GCP"],
    databases: ["PostgreSQL", "MongoDB", "Vector DBs"],
    tools: ["Docker", "Kubernetes", "Git", "Jupyter", "MLflow"]
  },

  navigation: {
    links: [
      { label: "Home", href: "#home" },
      { label: "AI Projects", href: "#projects" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact", href: "#contact" }
    ],
    // The PDF lives in public/. It downloads under downloadName.
    resume: {
      label: "Resume",
      file: "Bijon-Guha-Resume.pdf",
      downloadName: "Bijon-Guha-Resume.pdf"
    },
    ctaButton: {
      label: "Get in touch",
      action: "scrollToContact"
    }
  },

  heroButtons: {
    primary: {
      label: "View projects",
      action: "scrollToProjects"
    },
    secondary: {
      label: "Read my articles",
      action: "openMedium",
      url: "https://medium.com/@iitbguha"
    }
  },

  contact: {
    email: "iitbguha@gmail.com",
    linkedin: "linkedin.com/in/bijonguha",
    github: "github.com/bijonguha",
    website: "bijonguha.github.io"
  },

  seo: {
    keywords: [
      "Generative AI Engineer",
      "LLM Implementation Expert", 
      "Computer Vision Specialist",
      "Production ML Engineer",
      "WebLLM Pioneer",
      "AI Systems Architect"
    ],
    metaDescription: "Bijon Guha - Generative AI Engineer with proven expertise in LLMs, computer vision, and production ML. Endorsed by leaders at IBM, Siemens, JP Morgan, Compass Digital, and Zensar. Building AI systems from theory to production."
  }
};
