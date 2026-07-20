import type { Language } from '../contexts/language';

export interface ProjectMetric {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ProjectTimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface ProjectData {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  screenshots: string[];
  techStack: string[];
  architecture: string;
  challenges: string;
  githubUrl?: string;
  demoUrl?: string;
  status: 'Em Desenvolvimento' | 'Concluído' | 'Arquivado' | 'In Development' | 'Completed' | 'Archived';
  metrics: ProjectMetric[];
  timeline: ProjectTimelineEvent[];
}

export const projectLabels = {
  pt: {
    title: 'Projetos',
    source: 'Código Fonte',
    demo: 'Live Demo',
    stack: 'Stack Tecnológica',
    metrics: 'Métricas',
    architecture: 'Arquitetura',
    challenges: 'Desafios Técnicos',
    development: 'Desenvolvimento',
    screenshots: 'Screenshots',
  },
  en: {
    title: 'Projects',
    source: 'Source Code',
    demo: 'Live Demo',
    stack: 'Tech Stack',
    metrics: 'Highlights',
    architecture: 'Architecture',
    challenges: 'Technical Challenges',
    development: 'Development',
    screenshots: 'Screenshots',
  },
} satisfies Record<Language, Record<string, string>>;

export const projectsByLanguage = {
  pt: [
    {
      id: 'muttley',
      name: 'Projeto Muttley',
      shortDescription: 'Gerenciamento de eventos e certificados acadêmicos com mensageria.',
      longDescription: 'Plataforma de gerenciamento de eventos acadêmicos, participantes, certificados digitais e atribuição de medalhas. Construída sob os preceitos de Clean Architecture e comunicação orientada a eventos.',
      icon: '🏅',
      screenshots: [
        '/screenshots/muttley/dashboard.jpg',
        '/screenshots/muttley/certificados.jpg',
        '/screenshots/muttley/certificado-preview.jpg',
        '/screenshots/muttley/evento-detalhes.jpg',
      ],
      techStack: ['Java', 'Spring Boot', 'Clean Architecture', 'PostgreSQL', 'MongoDB', 'Apache Kafka', 'Hibernate', 'Spring Data JPA'],
      architecture: 'Sistema modelado com Clean Architecture, separação clara de domínio, casos de uso e adaptadores, além de persistência com PostgreSQL para dados estruturados e MongoDB para documentos de eventos/certificados. Integração com Apache Kafka para comunicação assíncrona desacoplada.',
      challenges: 'Organizar domínios complexos sem acoplamento entre módulos, integrar frontend e backend e estruturar fluxos assíncronos com Kafka mantendo clareza de manutenção.',
      githubUrl: 'https://github.com/Bielnegri/Backend-Muttley',
      status: 'Concluído',
      metrics: [
        { label: 'Domínio', value: 'Eventos e Certificados', trend: 'neutral' },
        { label: 'Persistência', value: 'PostgreSQL & MongoDB', trend: 'up' },
        { label: 'Mensageria', value: 'Apache Kafka', trend: 'up' },
      ],
      timeline: [
        { date: 'Arquitetura', title: 'Separação de Camadas', description: 'Organização do backend com Clean Architecture, domínio, casos de uso e adaptadores.' },
        { date: 'Persistência', title: 'SQL e NoSQL', description: 'Uso de PostgreSQL, MongoDB, Spring Data JPA e Hibernate para dados estruturados e documentos.' },
        { date: 'Integrações', title: 'Eventos Assíncronos', description: 'Comunicação entre serviços e processamento de eventos com Apache Kafka.' },
      ],
    },
    {
      id: 'br-validator',
      name: 'BR Validator',
      shortDescription: 'Biblioteca Spring Boot para validação nativa de dados brasileiros.',
      longDescription: 'Starter customizado para Spring Boot que fornece anotações simplificadas para Bean Validation de documentos e dados nacionais, como CPF, CNPJ, e-mail e senha. Publicado no Maven Central para reutilização em projetos Java.',
      icon: '✅',
      screenshots: [
        '/screenshots/br-validator/document-request-basics.png',
        '/screenshots/br-validator/email-password-rules.png',
        '/screenshots/br-validator/cep-phone-birthdate.png',
      ],
      techStack: ['Java', 'Spring Boot', 'Bean Validation', 'Maven Central', 'JSR-380'],
      architecture: 'Componente plugável construído sobre os adaptadores e validadores da especificação Bean Validation, empacotado como um Spring Boot AutoConfiguration Starter de baixo acoplamento.',
      challenges: 'Garantir a precisão matemática dos cálculos dos dígitos validadores, manter uma API simples para quem usa Bean Validation e preparar a distribuição pública da dependência.',
      githubUrl: 'https://github.com/andrelamego/br-validator',
      status: 'Concluído',
      metrics: [
        { label: 'Validações', value: 'CPF, CNPJ, E-mail, Senha', trend: 'neutral' },
        { label: 'Integração', value: 'Bean Validation', trend: 'up' },
        { label: 'Distribuição', value: 'Maven Central', trend: 'up' },
      ],
      timeline: [
        { date: 'API', title: 'Anotações de Validação', description: 'Criação de anotações prontas para documentos e dados brasileiros.' },
        { date: 'Spring', title: 'Integração com Bean Validation', description: 'Mapeamento dos validadores para uso natural em aplicações Spring Boot.' },
        { date: 'Distribuição', title: 'Publicação Pública', description: 'Empacotamento e publicação no Maven Central para reutilização em projetos Java.' },
      ],
    },
  ],
  en: [
    {
      id: 'muttley',
      name: 'Muttley Project',
      shortDescription: 'Academic event and certificate management with asynchronous messaging.',
      longDescription: 'Platform for managing academic events, participants, digital certificates and medal assignment. Built around Clean Architecture and event-driven communication.',
      icon: '🏅',
      screenshots: [
        '/screenshots/muttley/dashboard.jpg',
        '/screenshots/muttley/certificados.jpg',
        '/screenshots/muttley/certificado-preview.jpg',
        '/screenshots/muttley/evento-detalhes.jpg',
      ],
      techStack: ['Java', 'Spring Boot', 'Clean Architecture', 'PostgreSQL', 'MongoDB', 'Apache Kafka', 'Hibernate', 'Spring Data JPA'],
      architecture: 'System modeled with Clean Architecture, clear separation of domain, use cases and adapters, PostgreSQL for structured data and MongoDB for event/certificate documents. Apache Kafka is used for decoupled asynchronous communication.',
      challenges: 'Organizing complex domains without coupling modules, integrating frontend and backend, and structuring Kafka-based asynchronous flows while keeping the code maintainable.',
      githubUrl: 'https://github.com/Bielnegri/Backend-Muttley',
      status: 'Completed',
      metrics: [
        { label: 'Domain', value: 'Events and Certificates', trend: 'neutral' },
        { label: 'Persistence', value: 'PostgreSQL & MongoDB', trend: 'up' },
        { label: 'Messaging', value: 'Apache Kafka', trend: 'up' },
      ],
      timeline: [
        { date: 'Architecture', title: 'Layer Separation', description: 'Backend organization with Clean Architecture, domain, use cases and adapters.' },
        { date: 'Persistence', title: 'SQL and NoSQL', description: 'Use of PostgreSQL, MongoDB, Spring Data JPA and Hibernate for structured data and documents.' },
        { date: 'Integrations', title: 'Asynchronous Events', description: 'Service communication and event processing with Apache Kafka.' },
      ],
    },
    {
      id: 'br-validator',
      name: 'BR Validator',
      shortDescription: 'Spring Boot library for native validation of Brazilian data.',
      longDescription: 'Custom Spring Boot starter that provides simple Bean Validation annotations for Brazilian documents and data, such as CPF, CNPJ, email and password. Published on Maven Central for reuse in Java projects.',
      icon: '✅',
      screenshots: [
        '/screenshots/br-validator/document-request-basics.png',
        '/screenshots/br-validator/email-password-rules.png',
        '/screenshots/br-validator/cep-phone-birthdate.png',
      ],
      techStack: ['Java', 'Spring Boot', 'Bean Validation', 'Maven Central', 'JSR-380'],
      architecture: 'Pluggable component built on top of Bean Validation adapters and validators, packaged as a low-coupling Spring Boot AutoConfiguration Starter.',
      challenges: 'Ensuring mathematical accuracy for validator digit calculations, keeping the Bean Validation API easy to use and preparing the dependency for public distribution.',
      githubUrl: 'https://github.com/andrelamego/br-validator',
      status: 'Completed',
      metrics: [
        { label: 'Validations', value: 'CPF, CNPJ, Email, Password', trend: 'neutral' },
        { label: 'Integration', value: 'Bean Validation', trend: 'up' },
        { label: 'Distribution', value: 'Maven Central', trend: 'up' },
      ],
      timeline: [
        { date: 'API', title: 'Validation Annotations', description: 'Creation of ready-to-use annotations for Brazilian documents and data.' },
        { date: 'Spring', title: 'Bean Validation Integration', description: 'Validator mapping for natural use in Spring Boot applications.' },
        { date: 'Distribution', title: 'Public Release', description: 'Packaging and publishing on Maven Central for reuse in Java projects.' },
      ],
    },
  ],
} satisfies Record<Language, ProjectData[]>;

export const getProjectsData = (language: Language): ProjectData[] => projectsByLanguage[language];
export const projects = projectsByLanguage.pt;
