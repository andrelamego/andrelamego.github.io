import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone, Copy, Check, GitBranch, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../contexts/language';

const EMAIL = 'andreolamego@gmail.com';
const PHONE = '+55 11 98732-6102';
const LINKEDIN = 'https://www.linkedin.com/in/andre-oliveira-lamego/';
const GITHUB = 'https://github.com/andrelamego';

export function ContactApp() {
  const { language } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [copied, setCopied] = useState<'email' | 'phone' | null>(null);
  const text = language === 'pt'
    ? {
        title: 'Vamos conversar?',
        intro: 'Estou sempre aberto a conversar sobre tecnologia, arquitetura de software e novas oportunidades.',
        email: 'Email',
        phone: 'Telefone',
        location: 'Localização',
        name: 'Nome',
        namePlaceholder: 'Seu nome',
        emailPlaceholder: 'seu@email.com',
        subject: 'Assunto',
        subjectPlaceholder: 'Sobre o que vamos falar?',
        message: 'Mensagem',
        messagePlaceholder: 'Sua mensagem...',
        send: 'Enviar Mensagem',
        sending: 'Enviando...',
        sent: 'Mensagem Enviada!',
        copyEmail: 'Copiar email',
        copyPhone: 'Copiar telefone',
        copied: 'Copiado',
        linkedin: 'LinkedIn',
        github: 'GitHub',
      }
    : {
        title: 'Let’s talk?',
        intro: 'I am open to conversations about technology, software architecture and new opportunities.',
        email: 'Email',
        phone: 'Phone',
        location: 'Location',
        name: 'Name',
        namePlaceholder: 'Your name',
        emailPlaceholder: 'you@email.com',
        subject: 'Subject',
        subjectPlaceholder: 'What should we talk about?',
        message: 'Message',
        messagePlaceholder: 'Your message...',
        send: 'Send Message',
        sending: 'Opening email...',
        sent: 'Email Opened!',
        copyEmail: 'Copy email',
        copyPhone: 'Copy phone',
        copied: 'Copied',
        linkedin: 'LinkedIn',
        github: 'GitHub',
      };

  const copyToClipboard = async (value: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || (language === 'pt' ? 'Contato pelo portfolio' : 'Contact from portfolio')).trim();
    const message = String(formData.get('message') || '').trim();
    const body = encodeURIComponent(`${message}\n\nNome: ${name}\nEmail: ${email}`);

    setStatus('sending');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
    setStatus('sent');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-white dark:bg-[#0a0a0a] text-black dark:text-white p-6 gap-8 overflow-y-auto custom-scrollbar">
      {/* Contact Info */}
      <div className="flex-1 flex flex-col justify-center gap-6 p-6 glass rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
        <div>
          <h2 className="text-2xl font-bold mb-2">{text.title}</h2>
          <p className="text-black/60 dark:text-white/60 text-sm">
            {text.intro}
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Mail size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-black/40 dark:text-white/40">{text.email}</p>
              <p className="truncate text-sm">{EMAIL}</p>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(EMAIL, 'email')}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/5 text-black/55 transition-colors hover:bg-black/10 hover:text-black dark:border-white/10 dark:bg-white/5 dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label={text.copyEmail}
              title={copied === 'email' ? text.copied : text.copyEmail}
            >
              {copied === 'email' ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Phone size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-black/40 dark:text-white/40">{text.phone}</p>
              <p className="truncate text-sm">{PHONE}</p>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(PHONE, 'phone')}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/5 text-black/55 transition-colors hover:bg-black/10 hover:text-black dark:border-white/10 dark:bg-white/5 dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label={text.copyPhone}
              title={copied === 'phone' ? text.copied : text.copyPhone}
            >
              {copied === 'phone' ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-xs text-black/40 dark:text-white/40">{text.location}</p>
              <p className="text-sm">São Paulo, SP</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-black text-sm font-semibold text-white px-4 py-3 transition-opacity hover:opacity-85 dark:border-white/10 dark:bg-white dark:text-black"
          >
            <ExternalLink size={16} />
            {text.linkedin}
            <ExternalLink size={13} />
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-black/5 text-sm font-semibold text-black/75 px-4 py-3 transition-colors hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/10"
          >
            <GitBranch size={16} />
            {text.github}
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Form */}
      <div className="flex-[1.5] flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-xs text-black/60 dark:text-white/60 ml-1">{text.name}</label>
              <input required name="name" type="text" className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors text-sm" placeholder={text.namePlaceholder} />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-xs text-black/60 dark:text-white/60 ml-1">{text.email}</label>
              <input required name="email" type="email" className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors text-sm" placeholder={text.emailPlaceholder} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-black/60 dark:text-white/60 ml-1">{text.subject}</label>
            <input required name="subject" type="text" className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors text-sm" placeholder={text.subjectPlaceholder} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-black/60 dark:text-white/60 ml-1">{text.message}</label>
            <textarea required name="message" rows={4} className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors text-sm resize-none custom-scrollbar" placeholder={text.messagePlaceholder} />
          </div>
          
          <button 
            disabled={status !== 'idle'}
            type="submit" 
            className="mt-2 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-xl px-6 py-3 flex items-center justify-center gap-2 hover:bg-black/80 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'idle' && <><Send size={16} /> {text.send}</>}
            {status === 'sending' && text.sending}
            {status === 'sent' && text.sent}
          </button>
        </form>
      </div>
    </div>
  );
}
