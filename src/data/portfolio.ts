import type { Language } from '../contexts/language';

export const CV_URL = '/CV_Andre_Lamego.pdf';

const sharedLinks = {
  github: 'https://github.com/andrelamego',
  linkedin: 'https://www.linkedin.com/in/andre-oliveira-lamego/',
  cv: CV_URL,
};

export const portfolioByLanguage = {
  pt: {
    hero: {
      name: 'André Lamego',
      subtitle: 'Desenvolvedor Backend Java especialista em APIs REST, Clean Architecture e mensageria com Spring Boot e Kafka.',
      kicker: 'Software Engineer • Java Specialist',
      availability: 'Aberto a oportunidades como Desenvolvedor Backend Java Júnior/Estágio, remoto, híbrido ou São Paulo.',
      links: sharedLinks,
      ctas: {
        cv: 'Baixar CV',
        github: 'GitHub',
        linkedin: 'LinkedIn',
      },
    },
    labels: {
      explore: 'Explore',
      trajectory: 'Minha Trajetória',
      projects: 'Projetos',
      projectsSubtitle: 'Soluções backend robustas, APIs REST e integração entre serviços.',
      selectedWorks: 'Selected Works',
      education: 'Formação',
      skills: 'Competências',
    },
    projects: [
      {
        id: 'muttley',
        title: 'Projeto Muttley',
        description: 'Plataforma para gerenciamento de eventos acadêmicos com backend em Spring Boot, Clean Architecture, persistência híbrida e mensageria com Kafka.',
        link: 'https://github.com/Bielnegri/Backend-Muttley',
        tags: ['Java', 'Spring Boot', 'Clean Architecture', 'PostgreSQL', 'MongoDB', 'Apache Kafka'],
        gradient: 'from-purple-500/20 to-transparent',
        screenshots: [
          '/screenshots/muttley/dashboard.jpg',
          '/screenshots/muttley/certificados.jpg',
          '/screenshots/muttley/certificado-preview.jpg',
          '/screenshots/muttley/evento-detalhes.jpg',
        ],
      },
      {
        id: 'br-validator',
        title: 'BR Validator',
        description: 'Biblioteca Starter Spring Boot para validação simplificada e em conformidade com Bean Validation para dados e documentos do Brasil.',
        link: 'https://github.com/andrelamego/br-validator',
        tags: ['Java', 'Spring Boot', 'Bean Validation', 'Maven Central'],
        gradient: 'from-emerald-500/20 to-transparent',
        screenshots: [],
      },
    ],
    education: {
      degree: 'Análise e Desenvolvimento de Sistemas',
      institution: 'FATEC Zona Leste',
      period: '2024 - 2028 (Cursando)',
    },
    skills: [
      'Java', 'Spring Boot', 'REST APIs', 'Clean Architecture', 'Arquitetura em Camadas', 'PostgreSQL', 'MongoDB', 'SQL Server', 'MySQL', 'Apache Kafka', 'Hibernate', 'Spring Data JPA', 'JDBC', 'JUnit', 'Mockito', 'Playwright', 'Docker', 'Git', 'GitHub', 'Linux', 'Scrum', 'SOLID', 'Python', 'JavaScript', 'React', 'Inglês avançado', 'Espanhol básico',
    ],
    trajectory: [
      {
        id: 'start',
        year: 'Aos 13',
        title: 'O Primeiro Contato',
        description: 'A paixão por tecnologia e programação começou aos 13 anos. O que era apenas curiosidade rapidamente virou um fascínio por entender como os sistemas funcionam por trás dos panos.',
        codeSnippet: 'function explore() {\n  let curiosity = true;\n  while (curiosity) {\n    learn();\n  }\n}',
        color: 'rgba(107, 114, 128, 0.15)',
      },
      {
        id: 'fatec',
        year: '2024 - 2028',
        title: 'FATEC Zona Leste',
        description: 'Graduação em Análise e Desenvolvimento de Sistemas, consolidando bases em algoritmos, arquitetura de computadores e engenharia de software.',
        codeSnippet: "SELECT * FROM knowledge\nWHERE topic = 'Engenharia';\n\n// Fundamentos estruturados\nclass FATECZoneLeste {}",
        color: 'rgba(59, 130, 246, 0.15)',
      },
      {
        id: 'java',
        year: 'Especialização',
        title: 'Backend Java & Kafka',
        description: 'Foco no desenvolvimento robusto com Java, Spring Boot, bancos SQL/NoSQL, Hibernate e comunicação assíncrona de alto desempenho com Apache Kafka.',
        codeSnippet: '@RestController\n@RequestMapping("/api")\npublic class System {\n  @GetMapping("/status")\n  public Status up() {\n    return Status.READY;\n  }\n}',
        color: 'rgba(147, 51, 234, 0.15)',
      },
    ],
  },
  en: {
    hero: {
      name: 'André Lamego',
      subtitle: 'Backend Java developer focused on REST APIs, Clean Architecture, Spring Boot and Kafka-based messaging.',
      kicker: 'Software Engineer • Java Specialist',
      availability: 'Open to Junior Backend Java Developer and internship opportunities, remote, hybrid or based in São Paulo.',
      links: sharedLinks,
      ctas: {
        cv: 'Download CV',
        github: 'GitHub',
        linkedin: 'LinkedIn',
      },
    },
    labels: {
      explore: 'Explore',
      trajectory: 'My Path',
      projects: 'Projects',
      projectsSubtitle: 'Robust backend solutions, REST APIs and service integration.',
      selectedWorks: 'Selected Works',
      education: 'Education',
      skills: 'Skills',
    },
    projects: [
      {
        id: 'muttley',
        title: 'Muttley Project',
        description: 'Academic event management platform with a Spring Boot backend, Clean Architecture, hybrid persistence and Kafka messaging.',
        link: 'https://github.com/Bielnegri/Backend-Muttley',
        tags: ['Java', 'Spring Boot', 'Clean Architecture', 'PostgreSQL', 'MongoDB', 'Apache Kafka'],
        gradient: 'from-purple-500/20 to-transparent',
        screenshots: [
          '/screenshots/muttley/dashboard.jpg',
          '/screenshots/muttley/certificados.jpg',
          '/screenshots/muttley/certificado-preview.jpg',
          '/screenshots/muttley/evento-detalhes.jpg',
        ],
      },
      {
        id: 'br-validator',
        title: 'BR Validator',
        description: 'Spring Boot starter library for simple Bean Validation-compatible validation of Brazilian data and documents.',
        link: 'https://github.com/andrelamego/br-validator',
        tags: ['Java', 'Spring Boot', 'Bean Validation', 'Maven Central'],
        gradient: 'from-emerald-500/20 to-transparent',
        screenshots: [],
      },
    ],
    education: {
      degree: 'Systems Analysis and Development',
      institution: 'FATEC Zona Leste',
      period: '2024 - 2028 (In progress)',
    },
    skills: [
      'Java', 'Spring Boot', 'REST APIs', 'Clean Architecture', 'Layered Architecture', 'PostgreSQL', 'MongoDB', 'SQL Server', 'MySQL', 'Apache Kafka', 'Hibernate', 'Spring Data JPA', 'JDBC', 'JUnit', 'Mockito', 'Playwright', 'Docker', 'Git', 'GitHub', 'Linux', 'Scrum', 'SOLID', 'Python', 'JavaScript', 'React', 'Advanced English', 'Basic Spanish',
    ],
    trajectory: [
      {
        id: 'start',
        year: 'Age 13',
        title: 'First Contact',
        description: 'My interest in technology and programming started at 13. What began as curiosity quickly became a fascination with understanding how systems work behind the scenes.',
        codeSnippet: 'function explore() {\n  let curiosity = true;\n  while (curiosity) {\n    learn();\n  }\n}',
        color: 'rgba(107, 114, 128, 0.15)',
      },
      {
        id: 'fatec',
        year: '2024 - 2028',
        title: 'FATEC Zona Leste',
        description: 'Degree in Systems Analysis and Development, strengthening foundations in algorithms, computer architecture and software engineering.',
        codeSnippet: "SELECT * FROM knowledge\nWHERE topic = 'Engineering';\n\n// Structured foundations\nclass FATECZoneLeste {}",
        color: 'rgba(59, 130, 246, 0.15)',
      },
      {
        id: 'java',
        year: 'Specialization',
        title: 'Backend Java & Kafka',
        description: 'Focus on robust development with Java, Spring Boot, SQL/NoSQL databases, Hibernate and high-performance asynchronous communication with Apache Kafka.',
        codeSnippet: '@RestController\n@RequestMapping("/api")\npublic class System {\n  @GetMapping("/status")\n  public Status up() {\n    return Status.READY;\n  }\n}',
        color: 'rgba(147, 51, 234, 0.15)',
      },
    ],
  },
} satisfies Record<Language, unknown>;

export const getPortfolioData = (language: Language) => portfolioByLanguage[language];
export const portfolioData = portfolioByLanguage.pt;
