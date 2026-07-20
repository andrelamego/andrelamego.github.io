# André Lamego Portfolio

Portfolio interativo de André Lamego, desenvolvido com React, TypeScript e Vite. A proposta visual simula um sistema operacional para apresentar currículo, projetos, contato e preferências de idioma de forma memorável, sem esconder as informações que recrutadores precisam encontrar rápido.

## Destaques

- Experiência inspirada em desktop, com janelas, dock/barra de tarefas e temas macOS/Windows 7.
- Abertura por clique simples para reduzir fricção na navegação.
- Conteúdo em português e inglês, alternável pelo controle PT/EN.
- Terminal de currículo com comandos como `about`, `projects`, `cv`, `contact`, `languages`, `stack backend` e `whyhire`.
- Download direto do CV em PDF a partir da interface e do terminal.
- Projetos em destaque com detalhes técnicos, stack, screenshots e links de repositório.
- Formulário de contato via `mailto:` com email, telefone e localização.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lenis
- Lucide React

## Como Rodar

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Gere a build de produção:

```bash
npm run build
```

Rode a validação estática:

```bash
npm run lint
```

Pré-visualize a build:

```bash
npm run preview
```

## Estrutura

```text
public/
  CV_Andre_Lamego.pdf
  screenshots/
src/
  components/
    OS/
    Portfolio/
  contexts/
  data/
  hooks/
```

## Conteúdo

As informações públicas do site estão alinhadas ao currículo:

- Desenvolvedor Backend Java com foco em Spring Boot, APIs REST, Clean Architecture e Kafka.
- Projetos Muttley e BR Validator.
- Formação em Análise e Desenvolvimento de Sistemas pela FATEC Zona Leste, 2024-2028.
- Competências técnicas, idiomas, GitHub, LinkedIn, email e telefone.

## Deploy

O projeto é uma aplicação Vite estática. Após `npm run build`, o conteúdo final fica em `dist/` e pode ser publicado em serviços como Vercel, Netlify, GitHub Pages ou qualquer hospedagem de arquivos estáticos.
