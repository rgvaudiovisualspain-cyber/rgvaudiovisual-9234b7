import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, Play, X } from 'lucide-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RgvAudiovisual,
})

type View = 'inicio' | 'pelicula' | 'prensa' | 'estudio' | 'contacto'

const navigation: Array<{ id: View; label: string }> = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'pelicula', label: 'Película' },
  { id: 'prensa', label: 'Prensa' },
  { id: 'estudio', label: 'Estudio' },
  { id: 'contacto', label: 'Contacto' },
]

const press = [
  {
    title:
      'El tomellosero Raúl Plaza Villagra llevará a la pantalla ‘Voy con todo’, una historia de decisiones y sacrificios',
    source: 'Cuadernos Manchegos',
    date: '31.07.2026',
    url: 'https://www.cuadernosmanchegos.com/tomelloso/el-tomellosero-raul-plaza-villagra-llevara-a-la-pantalla-voy-con-todo-una-historia-de-decisiones-y-sacrificios/',
  },
  {
    title:
      'El joven realizador de Tomelloso Raúl Plaza apuesta por el cine independiente con «Voy con todo»',
    source: 'La Voz de Tomelloso',
    date: '31.07.2026',
    url: 'https://www.lavozdetomelloso.com/74146/joven_realizador_tomelloso_raul_plaza_apuesta_cine_independiente_voy_todo',
  },
  {
    title:
      'El joven realizador de Tomelloso Raúl Plaza apuesta por el cine independiente con «Voy con todo»',
    source: 'Lanza Digital',
    date: '31.07.2026',
    url: 'https://www.lanzadigital.com/provincia/tomelloso/el-joven-realizador-de-tomelloso-raul-plaza-apuesta-por-el-cine-independiente-con-voy-con-todo/',
  },
]

const credits = [
  ['Dirección, guion, producción y montaje', 'Raúl Plaza Villagra'],
  ['Música original', 'David Tirado'],
  ['Elenco', 'Víctor Duque, Enrique Benito, Vera España, Esther García'],
  ['Elenco', 'Irwin Rodríguez, Manolo Carrasco, Alejandro Nogales'],
  ['Rodaje', 'Tomelloso · sin financiación externa'],
  ['Duración', '17 min'],
  ['Año', '2026'],
]

function RgvAudiovisual() {
  const [view, setView] = useState<View>('inicio')
  const [menuOpen, setMenuOpen] = useState(false)
  const [trailerOpen, setTrailerOpen] = useState(false)

  const navigate = (nextView: View) => {
    setView(nextView)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    document.body.style.overflow = trailerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [trailerOpen])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setTrailerOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <div className="site-shell">
      <Header
        activeView={view}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onNavigate={navigate}
      />

      <main key={view} className="page-enter">
        {view === 'inicio' && (
          <Home onNavigate={navigate} onPlay={() => setTrailerOpen(true)} />
        )}
        {view === 'pelicula' && <Film />}
        {view === 'prensa' && <Press />}
        {view === 'estudio' && <Studio onNavigate={navigate} />}
        {view === 'contacto' && <Contact />}
      </main>

      {trailerOpen && <TrailerModal onClose={() => setTrailerOpen(false)} />}
    </div>
  )
}

function Header({
  activeView,
  menuOpen,
  onMenuToggle,
  onNavigate,
}: {
  activeView: View
  menuOpen: boolean
  onMenuToggle: () => void
  onNavigate: (view: View) => void
}) {
  return (
    <header className="site-header">
      <button
        type="button"
        className="wordmark"
        onClick={() => onNavigate('inicio')}
        aria-label="Ir al inicio"
      >
        <span>RGV</span>
        <small>Audiovisual</small>
      </button>

      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Principal">
        {navigation.map((item) => (
          <button
            type="button"
            key={item.id}
            className={activeView === item.id ? 'nav-link is-active' : 'nav-link'}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <button
        type="button"
        className="menu-button"
        onClick={onMenuToggle}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  )
}

function Home({
  onNavigate,
  onPlay,
}: {
  onNavigate: (view: View) => void
  onPlay: () => void
}) {
  return (
    <>
      <section className="hero grain">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/videos/rgv-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-copy">
          <p>Producción audiovisual independiente.</p>
          <p>Convertimos instantes en historias eternas.</p>
          <button type="button" className="button button-primary" onClick={onPlay}>
            <Play size={14} fill="currentColor" />
            Ver tráiler
          </button>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <span>Descubrir</span>
          <i />
        </div>
      </section>

      <section className="featured section-wrap">
        <FilmPoster onClick={() => onNavigate('pelicula')} />
        <div className="featured-copy">
          <Eyebrow>Último trabajo</Eyebrow>
          <h1>Voy con todo</h1>
          <p>
            Voy con todo no busca ofrecer respuestas, sino enfrentar al espectador a una
            decisión que probablemente crea tener clara… hasta que se siente frente a la
            pantalla.
          </p>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => onNavigate('pelicula')}
          >
            Ver ficha completa
            <ArrowUpRight size={15} />
          </button>
        </div>
        <span className="section-number" aria-hidden="true">
          01
        </span>
      </section>

      <Footer />
    </>
  )
}

function Film() {
  return (
    <>
      <section className="film-heading grain">
        <div className="film-heading-inner">
          <div className="tags">
            <span className="tag tag-active">Selección oficial</span>
            <span className="tag">Drama</span>
            <span className="tag">17 min</span>
          </div>
          <Eyebrow>Un cortometraje de Raúl Plaza Villagra</Eyebrow>
          <h1>Voy con todo</h1>
          <span className="film-year">2026</span>
        </div>
      </section>

      <section className="film-details section-wrap">
        <div className="film-content">
          <p className="synopsis">
            Mario cree que el futuro depende de las decisiones, no de la suerte — hasta que
            una partida de póker le obliga a elegir entre sus sueños y la persona que tiene
            enfrente. ¿Qué harías tú para cumplirlos?
          </p>
          <div className="credits">
            {credits.map(([role, name], index) => (
              <div className="credit-line" key={`${role}-${index}`}>
                <span>{role}</span>
                <strong>{name}</strong>
              </div>
            ))}
          </div>
        </div>
        <FilmPoster />
      </section>

      <section className="stills section-wrap">
        <Eyebrow>Fotogramas</Eyebrow>
        <div className="stills-grid">
          <div className="still grain">
            <img src="/images/stills/voy-con-todo-01.jpg" alt="Figura encapuchada contemplando la ciudad de noche" loading="lazy" />
            <span>01</span>
          </div>
          <div className="still grain">
            <img src="/images/stills/voy-con-todo-02.jpg" alt="Silueta frente a una puerta iluminada" loading="lazy" />
            <span>02</span>
          </div>
          <div className="still grain">
            <img src="/images/stills/voy-con-todo-03.jpg" alt="Mujer fumando durante una partida" loading="lazy" />
            <span>03</span>
          </div>
          <div className="still grain">
            <img src="/images/stills/voy-con-todo-04.jpg" alt="Primer plano de un jugador concentrado" loading="lazy" />
            <span>04</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

function Press() {
  return (
    <>
      <section className="simple-heading section-wrap">
        <Eyebrow>Prensa</Eyebrow>
        <h1>Cobertura de<br />‘Voy con todo’</h1>
      </section>
      <section className="press-list section-wrap">
        {press.map((article, index) => (
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="press-article"
            key={article.source}
          >
            <span className="press-index">0{index + 1}</span>
            <div>
              <p>{article.source} · {article.date}</p>
              <h2>{article.title}</h2>
              <span className="read-more">Leer noticia <ArrowUpRight size={14} /></span>
            </div>
          </a>
        ))}
      </section>
      <Footer />
    </>
  )
}

function Studio({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <>
      <section className="studio section-wrap">
        <div>
          <Eyebrow>Estudio</Eyebrow>
          <h1>Cine con oficio,<br /><em>hecho para durar.</em></h1>
        </div>
        <div className="studio-copy">
          <p>
            RGV Audiovisual es una productora independiente centrada en cortometrajes de
            autor. Cada proyecto se trata con el mismo rigor que una producción de
            largometraje: guion cuidado, dirección de fotografía deliberada, y un proceso de
            montaje pausado.
          </p>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => onNavigate('contacto')}
          >
            Contacto
            <ArrowUpRight size={15} />
          </button>
        </div>
      </section>
      <section className="studio-statement grain">
        <span>Guion</span><i />
        <span>Rodaje</span><i />
        <span>Montaje</span>
      </section>
      <Footer />
    </>
  )
}

function Contact() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitStatus('sending')

    const form = event.currentTarget
    const formData = new FormData(form)
    const body = new URLSearchParams()
    formData.forEach((value, key) => body.append(key, String(value)))

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })

      if (!response.ok) throw new Error('No se pudo enviar el formulario')

      form.reset()
      setSubmitStatus('success')
    } catch {
      setSubmitStatus('error')
    }
  }

  return (
    <>
      <section className="contact section-wrap">
        <div className="contact-intro">
          <Eyebrow>Contacto</Eyebrow>
          <h1>Hablemos de<br /><em>tu historia.</em></h1>
          <p>Cuéntanos sobre tu proyecto.</p>
        </div>
        <form
          className="contact-form"
          name="contacto"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contacto" />
          <input type="hidden" name="subject" value="Nuevo mensaje desde RGV Audiovisual" />
          <p className="form-honeypot" aria-hidden="true">
            <label>
              No rellenar: <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <label>
            <span>Nombre</span>
            <input name="name" placeholder="Tu nombre" required />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" placeholder="tu@email.com" required />
          </label>
          <label>
            <span>Mensaje</span>
            <textarea name="message" placeholder="Cuéntanos sobre tu proyecto" rows={4} required />
          </label>
          <button type="submit" className="button button-primary" disabled={submitStatus === 'sending'}>
            {submitStatus === 'sending' ? 'Enviando…' : 'Enviar'}
          </button>
          {submitStatus === 'success' && (
            <p className="form-status form-status-success" role="status">
              Mensaje enviado. Gracias por contactar con nosotros.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="form-status form-status-error" role="alert">
              No se pudo enviar el mensaje. Inténtalo de nuevo.
            </p>
          )}
        </form>
      </section>
      <Footer />
    </>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

function FilmPoster({ onClick }: { onClick?: () => void }) {
  const poster = (
    <div className="poster grain">
      <img src="/images/voy-con-todo-poster.jpg" alt="Cartel de Voy con todo" />
    </div>
  )

  if (!onClick) return <div className="film-card">{poster}<FilmMeta /></div>

  return (
    <button type="button" className="film-card film-card-button" onClick={onClick}>
      {poster}
      <FilmMeta />
    </button>
  )
}

function FilmMeta() {
  return (
    <div className="film-meta">
      <strong>Voy con todo</strong>
      <span>Raúl Plaza Villagra, 2026</span>
      <small>Drama · 17 min</small>
    </div>
  )
}

function TrailerModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="trailer-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="trailer-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-heading">
          <div>
            <Eyebrow>Tráiler</Eyebrow>
            <h2 id="trailer-title">Voy con todo</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar tráiler"><X /></button>
        </div>
        <div className="trailer-frame">
          <iframe
            src="https://www.instagram.com/p/DbMU2QnuxAR/embed"
            title="Voy con todo — Tráiler"
            allowFullScreen
          />
        </div>
        <a
          href="https://www.instagram.com/p/DbMU2QnuxAR/"
          target="_blank"
          rel="noreferrer"
          className="instagram-link"
        >
          Ver en Instagram <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>RGV AUDIOVISUAL © 2026</span>
      <span>Toledo, España</span>
    </footer>
  )
}
