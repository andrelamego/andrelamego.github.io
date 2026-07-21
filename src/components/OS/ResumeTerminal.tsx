import React, { useMemo, useState, useRef, useEffect } from 'react';
import { CV_URL } from '../../data/portfolio';
import { useLanguage } from '../../contexts/language';

type CommandOutput = {
  command: string;
  output: React.ReactNode;
};

const linkClass = 'text-blue-400 hover:underline';

const getTerminalData = (language: 'pt' | 'en') => {
  if (language === 'en') {
    return {
      welcome: <>Welcome to Lamego OS Terminal v1.0.0<br />Type <span className="text-yellow-300 font-bold">help</span> to see available commands.</>,
      notFound: (cmd: string) => <>Command not found: {cmd}. Type 'help'.</>,
      outputs: {
        about: (
          <div>
            <p className="text-emerald-400 font-bold">André Lamego - Backend Java Developer</p>
            <p className="text-gray-400 text-xs mt-1">andreolamego@gmail.com | +55 11 98732-6102 | São Paulo, SP</p>
            <p className="mt-2 leading-relaxed text-xs">
              Backend developer focused on Java and Spring Boot, building REST APIs and scalable applications. Experience with Clean Architecture, relational and NoSQL database modeling, Hibernate, Spring Data JPA, JDBC and asynchronous service communication with Apache Kafka.
            </p>
          </div>
        ),
        projects: (
          <div>
            <p className="text-emerald-400 font-bold">Featured Projects:</p>
            <div className="mt-2 space-y-4">
              <div>
                <p className="font-bold text-white text-xs">1. Muttley - Academic Event Management</p>
                <p className="text-gray-400 text-[11px] mb-1">Backend with Spring Boot, Clean Architecture, PostgreSQL, MongoDB and Kafka.</p>
                <p className="text-gray-500 text-[11px]">Repository currently private.</p>
              </div>
              <div>
                <p className="font-bold text-white text-xs">2. BR Validator - Brazilian Data Validation</p>
                <p className="text-gray-400 text-[11px] mb-1">Spring Boot starter library using Bean Validation.</p>
                <a href="https://github.com/andrelamego/br-validator" target="_blank" rel="noreferrer" className={`${linkClass} text-xs`}>Open repository</a>
              </div>
            </div>
          </div>
        ),
        education: (
          <div>
            <p className="text-emerald-400 font-bold">Education:</p>
            <div className="mt-2 text-xs">
              <p className="font-bold text-white">Systems Analysis and Development (In progress)</p>
              <p className="text-gray-300">FATEC Zona Leste - São Paulo, SP</p>
              <p className="text-gray-400 text-[11px]">Period: 2024 - 2028</p>
            </div>
          </div>
        ),
        skills: (
          <div>
            <p className="text-emerald-400 font-bold">Technical Skills:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-300 text-xs">
              <li><span className="text-white font-bold">Languages:</span> Java, Python, JavaScript</li>
              <li><span className="text-white font-bold">Frameworks:</span> Spring Boot, React</li>
              <li><span className="text-white font-bold">Architecture:</span> Clean Architecture, Layered Architecture</li>
              <li><span className="text-white font-bold">Databases:</span> SQL Server, PostgreSQL, MySQL, MongoDB</li>
              <li><span className="text-white font-bold">Messaging:</span> Apache Kafka</li>
              <li><span className="text-white font-bold">Testing:</span> JUnit, Playwright, Mockito</li>
              <li><span className="text-white font-bold">DevOps & OS:</span> Docker, Linux, Windows</li>
            </ul>
          </div>
        ),
        contact: (
          <div className="text-xs">
            <p className="text-emerald-400 font-bold">Contact:</p>
            <p>Email: <a href="mailto:andreolamego@gmail.com" className={linkClass}>andreolamego@gmail.com</a></p>
            <p>Phone: +55 11 98732-6102</p>
            <p>LinkedIn: <a href="https://linkedin.com/in/andre-oliveira-lamego/" target="_blank" rel="noreferrer" className={linkClass}>linkedin.com/in/andre-oliveira-lamego</a></p>
            <p>GitHub: <a href="https://github.com/andrelamego" target="_blank" rel="noreferrer" className={linkClass}>github.com/andrelamego</a></p>
          </div>
        ),
        languages: (
          <div className="text-xs">
            <p className="text-emerald-400 font-bold">Languages:</p>
            <p>English: Advanced</p>
            <p>Spanish: Basic</p>
          </div>
        ),
        'stack backend': (
          <div className="text-xs">
            <p className="text-emerald-400 font-bold">Backend Stack:</p>
            <p>Java, Spring Boot, REST APIs, Clean Architecture, Layered Architecture, Hibernate, Spring Data JPA, JDBC, PostgreSQL, MongoDB, SQL Server, MySQL, Apache Kafka, JUnit and Mockito.</p>
          </div>
        ),
        whyhire: (
          <div className="text-xs leading-relaxed">
            <p className="text-emerald-400 font-bold">Why hire André?</p>
            <p>He combines solid Java backend fundamentals with curiosity, clean communication and a strong habit of structuring code for maintenance. He is a good fit for teams building APIs, integrations and backend services with Spring Boot.</p>
          </div>
        ),
        cv: (
          <div className="text-xs">
            <p className="text-emerald-400 font-bold">CV opened.</p>
            <a href={CV_URL} download className={linkClass}>Download CV_Andre_Lamego.pdf</a>
          </div>
        ),
        help: (
          <div>
            <p className="text-emerald-400 font-bold">Available commands:</p>
            <ul className="grid grid-cols-2 gap-2 mt-2">
              <li><span className="text-yellow-300">about</span> - Profile</li>
              <li><span className="text-yellow-300">projects</span> - Projects</li>
              <li><span className="text-yellow-300">education</span> - Education</li>
              <li><span className="text-yellow-300">skills</span> - Skills</li>
              <li><span className="text-yellow-300">cv</span> - Open CV</li>
              <li><span className="text-yellow-300">contact</span> - Contact links</li>
              <li><span className="text-yellow-300">languages</span> - Languages</li>
              <li><span className="text-yellow-300">stack backend</span> - Backend stack</li>
              <li><span className="text-yellow-300">whyhire</span> - Short pitch</li>
              <li><span className="text-yellow-300">clear</span> - Clear terminal</li>
              <li><span className="text-yellow-300">exit</span> - Close terminal</li>
            </ul>
          </div>
        ),
      },
    };
  }

  return {
    welcome: <>Bem-vindo ao Lamego OS Terminal v1.0.0<br />Digite <span className="text-yellow-300 font-bold">help</span> para ver os comandos disponíveis.</>,
    notFound: (cmd: string) => <>Comando não encontrado: {cmd}. Digite 'help'.</>,
    outputs: {
      about: (
        <div>
          <p className="text-emerald-400 font-bold">André Lamego - Desenvolvedor Backend Java</p>
          <p className="text-gray-400 text-xs mt-1">andreolamego@gmail.com | +55 11 98732-6102 | São Paulo, SP</p>
          <p className="mt-2 leading-relaxed text-xs">
            Profissional de desenvolvimento backend com foco em Java e Spring Boot, atuando na construção de APIs REST e aplicações escaláveis. Experiência na aplicação de Clean Architecture, modelagem de bancos relacionais e NoSQL, Hibernate, Spring Data JPA, JDBC e comunicação assíncrona com Apache Kafka.
          </p>
        </div>
      ),
      projects: (
        <div>
          <p className="text-emerald-400 font-bold">Projetos em Destaque:</p>
          <div className="mt-2 space-y-4">
            <div>
              <p className="font-bold text-white text-xs">1. Muttley - Gerenciamento de Eventos Acadêmicos</p>
              <p className="text-gray-400 text-[11px] mb-1">Backend com Spring Boot, Clean Architecture, PostgreSQL, MongoDB e Kafka.</p>
              <p className="text-gray-500 text-[11px]">Repositório privado no momento.</p>
            </div>
            <div>
              <p className="font-bold text-white text-xs">2. BR Validator - Validação de Dados Brasileiros</p>
              <p className="text-gray-400 text-[11px] mb-1">Biblioteca Starter Spring Boot para validação de dados usando Bean Validation.</p>
              <a href="https://github.com/andrelamego/br-validator" target="_blank" rel="noreferrer" className={`${linkClass} text-xs`}>Acessar repositório</a>
            </div>
          </div>
        </div>
      ),
      education: (
        <div>
          <p className="text-emerald-400 font-bold">Formação Acadêmica:</p>
          <div className="mt-2 text-xs">
            <p className="font-bold text-white">Análise e Desenvolvimento de Sistemas (Cursando)</p>
            <p className="text-gray-300">FATEC Zona Leste - São Paulo, SP</p>
            <p className="text-gray-400 text-[11px]">Período: 2024 - 2028</p>
          </div>
        </div>
      ),
      skills: (
        <div>
          <p className="text-emerald-400 font-bold">Competências Técnicas:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-300 text-xs">
            <li><span className="text-white font-bold">Linguagens:</span> Java, Python, JavaScript</li>
            <li><span className="text-white font-bold">Frameworks:</span> Spring Boot, React</li>
            <li><span className="text-white font-bold">Arquitetura:</span> Clean Architecture, Arquitetura em Camadas</li>
            <li><span className="text-white font-bold">Bancos de Dados:</span> SQL Server, PostgreSQL, MySQL, MongoDB</li>
            <li><span className="text-white font-bold">Mensageria:</span> Apache Kafka</li>
            <li><span className="text-white font-bold">Testes:</span> JUnit, Playwright, Mockito</li>
            <li><span className="text-white font-bold">DevOps & OS:</span> Docker, Linux, Windows</li>
          </ul>
        </div>
      ),
      contact: (
        <div className="text-xs">
          <p className="text-emerald-400 font-bold">Contato:</p>
          <p>Email: <a href="mailto:andreolamego@gmail.com" className={linkClass}>andreolamego@gmail.com</a></p>
          <p>Telefone: +55 11 98732-6102</p>
          <p>LinkedIn: <a href="https://linkedin.com/in/andre-oliveira-lamego/" target="_blank" rel="noreferrer" className={linkClass}>linkedin.com/in/andre-oliveira-lamego</a></p>
          <p>GitHub: <a href="https://github.com/andrelamego" target="_blank" rel="noreferrer" className={linkClass}>github.com/andrelamego</a></p>
        </div>
      ),
      languages: (
        <div className="text-xs">
          <p className="text-emerald-400 font-bold">Idiomas:</p>
          <p>Inglês: Avançado</p>
          <p>Espanhol: Básico</p>
        </div>
      ),
      'stack backend': (
        <div className="text-xs">
          <p className="text-emerald-400 font-bold">Stack Backend:</p>
          <p>Java, Spring Boot, APIs REST, Clean Architecture, Arquitetura em Camadas, Hibernate, Spring Data JPA, JDBC, PostgreSQL, MongoDB, SQL Server, MySQL, Apache Kafka, JUnit e Mockito.</p>
        </div>
      ),
      whyhire: (
        <div className="text-xs leading-relaxed">
          <p className="text-emerald-400 font-bold">Por que contratar o André?</p>
          <p>Ele combina fundamentos sólidos de backend Java com curiosidade, comunicação clara e hábito de organizar código para manutenção. É um bom encaixe para times construindo APIs, integrações e serviços backend com Spring Boot.</p>
        </div>
      ),
      cv: (
        <div className="text-xs">
          <p className="text-emerald-400 font-bold">CV aberto.</p>
          <a href={CV_URL} download className={linkClass}>Baixar CV_Andre_Lamego.pdf</a>
        </div>
      ),
      help: (
        <div>
          <p className="text-emerald-400 font-bold">Comandos disponíveis:</p>
          <ul className="grid grid-cols-2 gap-2 mt-2">
            <li><span className="text-yellow-300">about</span> - Sobre mim</li>
            <li><span className="text-yellow-300">projects</span> - Projetos</li>
            <li><span className="text-yellow-300">education</span> - Escolaridade</li>
            <li><span className="text-yellow-300">skills</span> - Competências</li>
            <li><span className="text-yellow-300">cv</span> - Abrir CV</li>
            <li><span className="text-yellow-300">contact</span> - Links de contato</li>
            <li><span className="text-yellow-300">languages</span> - Idiomas</li>
            <li><span className="text-yellow-300">stack backend</span> - Stack backend</li>
            <li><span className="text-yellow-300">whyhire</span> - Pitch curto</li>
            <li><span className="text-yellow-300">clear</span> - Limpa o terminal</li>
            <li><span className="text-yellow-300">exit</span> - Fecha o terminal</li>
          </ul>
        </div>
      ),
    },
  };
};

export function ResumeTerminal() {
  const { language } = useLanguage();
  const terminal = useMemo(() => getTerminalData(language), [language]);
  const [history, setHistory] = useState<CommandOutput[]>([
    { command: '', output: <div className="text-emerald-300">{terminal.welcome}</div> },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (cmd === 'exit') {
      window.dispatchEvent(new CustomEvent('close-os-window', { detail: 'terminal' }));
      return;
    }

    if (cmd === 'cv') {
      window.open(CV_URL, '_blank', 'noopener,noreferrer');
    }

    let output: React.ReactNode;
    if (cmd === '') {
      output = '';
    } else if (terminal.outputs[cmd as keyof typeof terminal.outputs]) {
      output = terminal.outputs[cmd as keyof typeof terminal.outputs];
    } else {
      output = <span className="text-red-400">{terminal.notFound(cmd)}</span>;
    }

    setHistory(prev => [...prev, { command: input, output }]);
    setInput('');
  };

  return (
    <div className="w-full h-full bg-black/90 text-gray-300 font-mono text-sm p-4 overflow-y-auto custom-scrollbar flex flex-col">
      <div className="flex-1">
        {history.map((item, i) => (
          <div key={i} className="mb-4">
            {item.command && (
              <div className="flex gap-2">
                <span className="text-emerald-500">guest@lamego-os:~$</span>
                <span className="text-white">{item.command}</span>
              </div>
            )}
            <div className="mt-1">{item.output}</div>
          </div>
        ))}
        <form onSubmit={handleCommand} className="flex gap-2 mt-2">
          <span className="text-emerald-500">guest@lamego-os:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white border-none focus:ring-0 p-0"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
