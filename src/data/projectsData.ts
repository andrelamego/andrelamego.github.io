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

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectData {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon: 'muttley' | 'validator' | 'nasa';
  screenshots: string[];
  techStack: string[];
  architecture: string;
  challenges: string;
  githubUrl?: string;
  demoUrl?: string;
  status: 'Em Desenvolvimento' | 'Concluído' | 'Arquivado' | 'In Development' | 'Completed' | 'Archived';
  metrics: ProjectMetric[];
  timeline: ProjectTimelineEvent[];
  role: string;
  highlights: string[];
  proofLinks?: ProjectLink[];
  installSnippet?: string;
  usageSnippet?: string;
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
    role: 'Minha atuação',
    highlights: 'Evidências técnicas',
    resources: 'Recursos',
    install: 'Instalação',
    usage: 'Exemplo de uso',
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
    role: 'My role',
    highlights: 'Technical evidence',
    resources: 'Resources',
    install: 'Install',
    usage: 'Usage example',
  },
} satisfies Record<Language, Record<string, string>>;

export const projectsByLanguage = {
  pt: [
    {
      id: 'muttley',
      name: 'Projeto Muttley',
      shortDescription: 'Gerenciamento de eventos e certificados acadêmicos em desenvolvimento.',
      longDescription: 'Plataforma em desenvolvimento para gerenciamento de eventos acadêmicos, participantes, certificados digitais e atribuição de medalhas. O backend segue Clean Architecture, comunicação orientada a eventos e está atualmente na etapa de execução dos testes.',
      icon: 'muttley',
      screenshots: [
        '/screenshots/muttley/dashboard.jpg',
        '/screenshots/muttley/certificados.jpg',
        '/screenshots/muttley/certificado-preview.jpg',
        '/screenshots/muttley/evento-detalhes.jpg',
      ],
      techStack: ['Java', 'Spring Boot', 'Clean Architecture', 'PostgreSQL', 'MongoDB', 'Apache Kafka', 'Hibernate', 'Spring Data JPA'],
      architecture: 'Sistema modelado com Clean Architecture, separação clara de domínio, casos de uso e adaptadores. Os PDFs dos certificados não são persistidos no banco: o sistema armazena as informações do certificado e monta o documento sob demanda quando a requisição é feita. A arquitetura também divide responsabilidades em três microsserviços: envio de e-mail, worker para download do PDF e geração de QR Code.',
      challenges: 'Organizar domínios complexos sem acoplamento entre módulos, integrar frontend e backend, montar certificados sob demanda sem persistir binários desnecessários e estruturar microsserviços assíncronos mantendo clareza de manutenção.',
      status: 'Em Desenvolvimento',
      role: 'Participação no desenvolvimento backend da plataforma, com foco em organização arquitetural, persistência, integração entre serviços e validação do sistema na fase atual de testes.',
      highlights: [
        'Backend estruturado com Clean Architecture, separando domínio, casos de uso e adaptadores.',
        'Certificados montados sob demanda: o banco armazena os dados do certificado, não o PDF final.',
        'Três microsserviços separados para envio de e-mail, worker de download de PDF e geração de QR Code.',
        'Fluxos assíncronos modelados para reduzir acoplamento entre etapas do sistema.',
        'Domínio acadêmico com gerenciamento de eventos, participantes, certificados digitais e medalhas.',
        'Projeto ainda não publicado, atualmente na etapa de execução dos testes, sem cobertura real consolidada.',
      ],
      metrics: [
        { label: 'Domínio', value: 'Eventos e Certificados', trend: 'neutral' },
        { label: 'Certificados', value: 'PDF sob demanda', trend: 'up' },
        { label: 'Microsserviços', value: 'E-mail, PDF, QR Code', trend: 'up' },
        { label: 'Status', value: 'Execução de testes', trend: 'neutral' },
      ],
      timeline: [
        { date: 'Arquitetura', title: 'Separação de Camadas', description: 'Organização do backend com Clean Architecture, domínio, casos de uso e adaptadores.' },
        { date: 'Certificados', title: 'PDF sob Demanda', description: 'Persistência das informações do certificado e montagem do PDF apenas quando o download é requisitado.' },
        { date: 'Serviços', title: 'E-mail, PDF e QR Code', description: 'Divisão de responsabilidades em serviços dedicados para envio de e-mail, download do PDF e geração de QR Code.' },
        { date: 'Validação', title: 'Execução de Testes', description: 'Projeto em fase de testes; a cobertura real ainda não foi consolidada.' },
      ],
    },
    {
      id: 'br-validator',
      name: 'BR Validator',
      shortDescription: 'Biblioteca Spring Boot para validação nativa de dados brasileiros.',
      longDescription: 'Starter customizado para Spring Boot que fornece anotações simplificadas para Bean Validation de documentos e dados nacionais, como CPF, CNPJ, e-mail e senha. Publicado no Maven Central para reutilização em projetos Java.',
      icon: 'validator',
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
      role: 'Autor da biblioteca e responsável pelo desenho da API de validação, empacotamento como starter Spring Boot e publicação pública.',
      highlights: [
        'Publicado no Maven Central com coordenadas io.github.andrelamego:br-validator.',
        'Última versão verificada: 1.4.0.',
        'API baseada em Bean Validation para uso natural em DTOs e records de aplicações Spring Boot.',
        'Anotações para CPF, CNPJ, CEP, telefone, data de nascimento, e-mail e senha.',
        'Projeto distribuído com licença MIT e metadados públicos de SCM.',
      ],
      proofLinks: [
        { label: 'Maven Central', url: 'https://central.sonatype.com/artifact/io.github.andrelamego/br-validator' },
        { label: 'MVN Repository', url: 'https://mvnrepository.com/artifact/io.github.andrelamego/br-validator' },
      ],
      installSnippet: '<dependency>\n  <groupId>io.github.andrelamego</groupId>\n  <artifactId>br-validator</artifactId>\n  <version>1.4.0</version>\n</dependency>',
      usageSnippet: 'public record DocumentoRequest(\n  @ValidCpf(formatted = true, required = true)\n  String cpf,\n\n  @ValidCnpj(formatted = true, required = false)\n  String cnpj,\n\n  @ValidEmail(requireAt = true)\n  String email\n) {}',
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
    {
      id: 'nasa-data-explorer',
      name: 'NASA Data Explorer',
      shortDescription: 'Frontend React para exploração de dados e imagens das APIs públicas da NASA.',
      longDescription: 'Aplicação web publicada no GitHub Pages que consome APIs da NASA para apresentar imagens astronômicas, fotos de rovers em Marte e galerias EPIC da Terra em uma interface responsiva com tema espacial.',
      icon: 'nasa',
      screenshots: [],
      techStack: ['React', 'Vite', 'Tailwind CSS', 'React Router DOM', 'Axios', 'Lucide React', 'NASA APIs', 'GitHub Pages'],
      architecture: 'Frontend em React organizado por páginas, componentes, hooks e serviços de API. A comunicação com APIs externas fica isolada em serviços dedicados para APOD, Mars Rover Photos, NASA Image and Video Library e EPIC, com uso de variáveis de ambiente para a chave da NASA.',
      challenges: 'Lidar com APIs externas, limites de requisição, endpoints indisponíveis e diferentes formatos de mídia, mantendo estados de carregamento, estados vazios, fallback de fonte de dados e navegação responsiva.',
      githubUrl: 'https://github.com/andrelamego/nasa-data-explorer',
      demoUrl: 'https://andrelamego.github.io/nasa-data-explorer/',
      status: 'Concluído',
      role: 'Desenvolvimento frontend da aplicação, integração com APIs públicas da NASA, modelagem dos serviços de consumo, tratamento de estados de UI e publicação no GitHub Pages.',
      highlights: [
        'APOD com imagens e vídeos, explicações, links HD e adaptação visual conforme o tipo de mídia.',
        'Galeria de Marte com filtros por rover, câmera, data/sol, paginação e cache local de respostas.',
        'Fallback para a NASA Image and Video Library quando o endpoint de Mars Rover Photos está indisponível.',
        'Galeria EPIC com imagens naturais/enhanced, navegação por data, timeline, autoplay e comparação com slider.',
        'Deploy público no GitHub Pages, demonstrando entrega frontend além do foco backend.',
      ],
      proofLinks: [
        { label: 'Aplicação publicada', url: 'https://andrelamego.github.io/nasa-data-explorer/' },
      ],
      metrics: [
        { label: 'APIs', value: 'APOD, Mars, EPIC', trend: 'up' },
        { label: 'Deploy', value: 'GitHub Pages', trend: 'up' },
        { label: 'UX', value: 'Loading, cache, fallback', trend: 'neutral' },
      ],
      timeline: [
        { date: 'Base', title: 'Interface React', description: 'Construção da aplicação com rotas, componentes reutilizáveis e layout responsivo com tema espacial.' },
        { date: 'APIs', title: 'Integrações NASA', description: 'Consumo de APOD, Mars Rover Photos, NASA Image and Video Library e EPIC por serviços dedicados.' },
        { date: 'Resiliência', title: 'Fallback e Cache', description: 'Tratamento de indisponibilidade, paginação, cache local e estados de carregamento ou vazio.' },
        { date: 'Publicação', title: 'GitHub Pages', description: 'Deploy público da aplicação para acesso direto pelo navegador.' },
      ],
    },
  ],
  en: [
    {
      id: 'muttley',
      name: 'Muttley Project',
      shortDescription: 'Academic event and certificate management currently in development.',
      longDescription: 'Platform in development for managing academic events, participants, digital certificates and medal assignment. The backend follows Clean Architecture, event-driven communication and is currently in the test execution stage.',
      icon: 'muttley',
      screenshots: [
        '/screenshots/muttley/dashboard.jpg',
        '/screenshots/muttley/certificados.jpg',
        '/screenshots/muttley/certificado-preview.jpg',
        '/screenshots/muttley/evento-detalhes.jpg',
      ],
      techStack: ['Java', 'Spring Boot', 'Clean Architecture', 'PostgreSQL', 'MongoDB', 'Apache Kafka', 'Hibernate', 'Spring Data JPA'],
      architecture: 'System modeled with Clean Architecture and clear separation of domain, use cases and adapters. Certificate PDFs are not persisted in the database: the system stores certificate data and renders the document on demand when requested. Responsibilities are also split into three microservices: email delivery, PDF download worker and QR Code generation.',
      challenges: 'Organizing complex domains without coupling modules, integrating frontend and backend, rendering certificates on demand without persisting unnecessary binaries, and structuring asynchronous microservices while keeping the code maintainable.',
      status: 'In Development',
      role: 'Contributed to the backend development of the platform, focusing on architectural organization, persistence, service integration and system validation during the current test phase.',
      highlights: [
        'Backend structured with Clean Architecture, separating domain, use cases and adapters.',
        'Certificates rendered on demand: the database stores certificate data, not the final PDF.',
        'Three microservices split across email delivery, PDF download worker and QR Code generation.',
        'Asynchronous flows modeled to reduce coupling between system steps.',
        'Academic domain covering events, participants, digital certificates and medal assignment.',
        'Project is not published yet and is currently in the test execution stage, without consolidated real coverage.',
      ],
      metrics: [
        { label: 'Domain', value: 'Events and Certificates', trend: 'neutral' },
        { label: 'Certificates', value: 'On-demand PDF', trend: 'up' },
        { label: 'Microservices', value: 'Email, PDF, QR Code', trend: 'up' },
        { label: 'Status', value: 'Test execution', trend: 'neutral' },
      ],
      timeline: [
        { date: 'Architecture', title: 'Layer Separation', description: 'Backend organization with Clean Architecture, domain, use cases and adapters.' },
        { date: 'Certificates', title: 'On-Demand PDF', description: 'Certificate data is persisted and the PDF is rendered only when the download is requested.' },
        { date: 'Services', title: 'Email, PDF and QR Code', description: 'Responsibilities are split into dedicated services for email delivery, PDF download and QR Code generation.' },
        { date: 'Validation', title: 'Test Execution', description: 'Project is in the testing phase; real coverage has not been consolidated yet.' },
      ],
    },
    {
      id: 'br-validator',
      name: 'BR Validator',
      shortDescription: 'Spring Boot library for native validation of Brazilian data.',
      longDescription: 'Custom Spring Boot starter that provides simple Bean Validation annotations for Brazilian documents and data, such as CPF, CNPJ, email and password. Published on Maven Central for reuse in Java projects.',
      icon: 'validator',
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
      role: 'Author of the library, responsible for the validation API design, Spring Boot starter packaging and public release.',
      highlights: [
        'Published on Maven Central with coordinates io.github.andrelamego:br-validator.',
        'Latest verified version: 1.4.0.',
        'Bean Validation-based API for natural use in DTOs and records inside Spring Boot applications.',
        'Annotations for CPF, CNPJ, CEP, phone, birth date, email and password.',
        'Distributed with an MIT license and public SCM metadata.',
      ],
      proofLinks: [
        { label: 'Maven Central', url: 'https://central.sonatype.com/artifact/io.github.andrelamego/br-validator' },
        { label: 'MVN Repository', url: 'https://mvnrepository.com/artifact/io.github.andrelamego/br-validator' },
      ],
      installSnippet: '<dependency>\n  <groupId>io.github.andrelamego</groupId>\n  <artifactId>br-validator</artifactId>\n  <version>1.4.0</version>\n</dependency>',
      usageSnippet: 'public record DocumentRequest(\n  @ValidCpf(formatted = true, required = true)\n  String cpf,\n\n  @ValidCnpj(formatted = true, required = false)\n  String cnpj,\n\n  @ValidEmail(requireAt = true)\n  String email\n) {}',
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
    {
      id: 'nasa-data-explorer',
      name: 'NASA Data Explorer',
      shortDescription: 'React frontend for exploring public NASA API data and imagery.',
      longDescription: 'GitHub Pages-published web application that consumes NASA APIs to present astronomy images, Mars rover photos and EPIC Earth galleries through a responsive space-themed interface.',
      icon: 'nasa',
      screenshots: [],
      techStack: ['React', 'Vite', 'Tailwind CSS', 'React Router DOM', 'Axios', 'Lucide React', 'NASA APIs', 'GitHub Pages'],
      architecture: 'React frontend organized into pages, components, hooks and API services. External API communication is isolated in dedicated services for APOD, Mars Rover Photos, NASA Image and Video Library and EPIC, with environment variables for the NASA API key.',
      challenges: 'Handling external APIs, request limits, unavailable endpoints and different media formats while keeping loading states, empty states, data-source fallbacks and responsive navigation polished.',
      githubUrl: 'https://github.com/andrelamego/nasa-data-explorer',
      demoUrl: 'https://andrelamego.github.io/nasa-data-explorer/',
      status: 'Completed',
      role: 'Frontend development of the application, public NASA API integration, API service modeling, UI state handling and GitHub Pages deployment.',
      highlights: [
        'APOD support for images and videos, explanations, HD links and visual adaptation by media type.',
        'Mars gallery with rover, camera, date/sol filters, pagination and local response caching.',
        'Fallback to NASA Image and Video Library when the Mars Rover Photos endpoint is unavailable.',
        'EPIC gallery with natural/enhanced imagery, date navigation, timeline, autoplay and split-slider comparison.',
        'Public deployment on GitHub Pages, showing frontend delivery alongside the backend focus.',
      ],
      proofLinks: [
        { label: 'Published application', url: 'https://andrelamego.github.io/nasa-data-explorer/' },
      ],
      metrics: [
        { label: 'APIs', value: 'APOD, Mars, EPIC', trend: 'up' },
        { label: 'Deploy', value: 'GitHub Pages', trend: 'up' },
        { label: 'UX', value: 'Loading, cache, fallback', trend: 'neutral' },
      ],
      timeline: [
        { date: 'Foundation', title: 'React Interface', description: 'Application built with routes, reusable components and a responsive space-themed layout.' },
        { date: 'APIs', title: 'NASA Integrations', description: 'Consumption of APOD, Mars Rover Photos, NASA Image and Video Library and EPIC through dedicated services.' },
        { date: 'Resilience', title: 'Fallback and Cache', description: 'Handling unavailable endpoints, pagination, local cache, loading states and empty states.' },
        { date: 'Release', title: 'GitHub Pages', description: 'Public deployment for direct browser access.' },
      ],
    },
  ],
} satisfies Record<Language, ProjectData[]>;

export const getProjectsData = (language: Language): ProjectData[] => projectsByLanguage[language];
export const projects = projectsByLanguage.pt;
