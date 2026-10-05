

export const portfolioData = {
  // General Info
  name: "Sanjana H P",
  role: "Front End Developer",
  email: "sanjanahp2020@gmail.com",
  phone: "+91 82177 62899",
  location: "Bangalore, Karnataka, India",
  github: "https://github.com/sanjanahp219",
  linkedin: "https://www.linkedin.com/in/sanjana-hp-28b363285",
  yearsOfExperience: "2",
  projectsCompleted: "10+",

  // Hero Section
  hero: {
    badge: "Front-End Developer with Nearly 2 Years of Experience",
    roles: ['Front End Developer', 'React Specialist', 'UI/UX Implementer'],
    description: "Specialized in building responsive, scalable, and modern web applications using React.js, JavaScript, HTML5, CSS3, and REST APIs. Passionate about creating clean UI, reusable components, and exceptional user experiences.",
    stats: {
      experience: "2",
      projects: "10+",
      focus: "React & JS"
    }
  },

  // About Section
  about: {
    description1: "I am a Front End Developer with nearly 2 years of hands-on experience building responsive, production-ready web applications and user interfaces. My daily stack consists of React.js, JavaScript, HTML5, CSS3, and modern styling frameworks like Tailwind CSS and Material UI.",
    description2: "I thoroughly enjoy solving visual and stateful problems in the browser. Translating Figma designs into responsive layouts and writing clean, reusable components that improve developer velocity is what drives my work.",
    startYear: "2024", // Resume says 2020-2024 for degree, Jan 2025-Present for Swaragh, wait... "nearly 2 years of hands on experience" but Swaragh says Jan 2025 - Present. I will use 2023 or 2024 as Start Year based on resume summary. 2024 is safe.
    currentCompany: "Swaragh Technologies"
  },

  // Experience Section
  experience: [
    {
      id: 1,
      title: "Front End Developer",
      company: "Swaragh Technologies",
      location: "Bangalore",
      period: "Jan 2025 - Present",
      responsibilities: [
        "Build and maintain production-ready frontend features, translating product requirements, designs and wireframes into responsive, reusable React components.",
        "Develop modular frontend architecture with React Hooks, Redux Toolkit and Context API for maintainable UI modules and predictable state management.",
        "Integrate REST APIs with Axios and Fetch, handling asynchronous data flows, JSON-driven functionality and JWT-based authentication.",
        "Work with product and backend teams to review UI ideas, confirm technical feasibility and deliver high-quality interfaces with strong UX and cross-browser support.",
        "Optimize frontend performance with lazy loading, code splitting and memoization; use Chrome DevTools, Vite/Webpack and ESLint for debugging and code quality.",
        "Use Git and GitHub for version control, pull requests and code reviews; delivered 10+ websites end-to-end and maintain 15+ production sites."
      ]
    }
  ],

  // Skills Section
  skills: [
    {
      title: 'Core Web',
      skills: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'JSON', 'async/await'],
      gradient: 'from-blue-500/10 to-indigo-500/10 dark:from-blue-500/5 dark:to-indigo-500/5',
    },
    {
      title: 'React / Vue',
      skills: ['React.js', 'Vue.js', 'React Hooks', 'Functional Components', 'React Router', 'Redux Toolkit', 'Context API'],
      gradient: 'from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5',
    },
    {
      title: 'UI / UX',
      skills: ['Responsive Design', 'Figma-to-UI', 'Flexbox/Grid', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'Accessibility'],
      gradient: 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5',
    },
    {
      title: 'APIs & Backend',
      skills: ['REST APIs', 'GraphQL', 'Axios', 'Fetch API', 'JWT', 'Node.js', 'Express.js', 'MongoDB', 'MySQL'],
      gradient: 'from-amber-500/10 to-orange-500/10 dark:from-amber-500/5 dark:to-orange-500/5',
    },
    {
      title: 'Performance & Tooling',
      skills: ['Lazy Loading', 'Code Splitting', 'Vite', 'Webpack', 'ESLint', 'Git', 'GitHub', 'Jest'],
      gradient: 'from-rose-500/10 to-red-500/10 dark:from-rose-500/5 dark:to-red-500/5',
    }
  ],

  // Projects Section
  projects: [
    {
      id: 1,
      title: 'TalentSphere AI',
      subtitle: 'AI-Powered Workforce Intelligence Platform',
      description: 'Built reusable modules for employee profiles, skill tracking and project allocation; integrated secure role-based access, REST APIs, validated forms, and AI-driven resume analysis and skill matching.',
      technologies: ['React.js', 'Redux Toolkit', 'REST APIs', 'JWT', 'Axios', 'Material UI', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
      features: [
        'Employee profiles and skill tracking.',
        'Project allocation and role-based access.',
        'AI-driven resume analysis and skill matching.',
        'Validated forms and REST API integration.'
      ],
      image: '/social_poster_mockup.png', // TODO: Update with real image if available
      demoUrl: '#', // // TODO: Add live link if available
      githubUrl: 'https://github.com/sanjanahp219' // // TODO: Add exact github repo link
    },
    {
      id: 2,
      title: 'SocialPoster',
      subtitle: 'Multi-Platform Publisher and Analytics Dashboard',
      description: 'Architected reusable dashboard components for content creation, previewing, scheduling and publishing; built drag-and-drop media upload workflows and AI-assisted caption generation.',
      technologies: ['React.js', 'JavaScript', 'REST APIs', 'Modular Components', 'AI Integration'],
      features: [
        'Reusable dashboard components for content creation and scheduling.',
        'Drag-and-drop media upload workflows.',
        'AI-assisted caption generation.',
        'Multi-platform publishing capabilities.'
      ],
      image: '/event_booking_mockup.png', // TODO: Update with real image
      demoUrl: '#', // // TODO: Add live link if available
      githubUrl: 'https://github.com/sanjanahp219' // // TODO: Add exact github repo link
    },
    {
      id: 3,
      title: 'Sophrosyne Semiconductor Website',
      subtitle: 'Corporate Responsive Website',
      description: 'Converted Figma designs into a pixel-accurate responsive corporate site and improved performance and cross-browser compatibility.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive Web Design'],
      features: [
        'Pixel-accurate Figma to UI conversion.',
        'Cross-browser compatibility and optimization.',
        'High performance and responsive layout.'
      ],
      image: '/job_portal_mockup.png', // TODO: Update with real image
      demoUrl: '#', // // TODO: Add live link if available
      githubUrl: 'https://github.com/sanjanahp219' // // TODO: Add exact github repo link
    },
    {
      id: 4,
      title: 'Sulochana Enterprises Website',
      subtitle: 'Mobile-First Business Website',
      description: 'Converted Figma designs into a mobile-first responsive site with reusable sections and optimized assets for faster page loads.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive Web Design'],
      features: [
        'Mobile-first responsive site.',
        'Reusable sections.',
        'Optimized assets for faster page loads.'
      ],
      image: '/workspace_mockup.png', // TODO: Update with real image
      demoUrl: '#', // // TODO: Add live link if available
      githubUrl: 'https://github.com/sanjanahp219' // // TODO: Add exact github repo link
    }
  ],

  // Resume Section / Summary
  resumeSummary: "Front End Developer with nearly 2 years of hands-on experience building responsive, production-ready web applications and user interfaces using React.js, JavaScript, HTML5 and CSS3. Strong in reusable components, REST API integration, state management, frontend architecture and performance optimization. Delivered 10+ websites end-to-end and maintain 15+ live sites.",
  
  education: {
    degree: "Bachelor of Engineering, Computer Science",
    institution: "Channabasaveshwara Institute of Technology, Tumkur",
    period: "2020 - 2024"
  },
  
  certifications: [
    "Full Stack Development, Besant Technologies"
  ],
  
  languages: [
    "English", "Kannada", "Hindi"
  ]
};
