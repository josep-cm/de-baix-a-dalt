/* ────────────────────────────────────────────────────────────────
   ui.jsx — atoms + chrome (Navbar, Modal, FloatingCTA, Button,
   Eyebrow, Reveal, IconArrow, ModalContext)
   ──────────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef, useContext, createContext, useCallback } = React;

/* ───── Modal context ───── */
const ModalCtx = createContext({ open: () => {}, close: () => {} });
function useModal() { return useContext(ModalCtx); }

/* ───── Lang context ───── */
const LangCtx = createContext({ lang: "ca", setLang: () => {}, t: {} });
function useLang() { return useContext(LangCtx); }

function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => window.detectLang ? window.detectLang() : "ca");
  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem("dbd-lang", l);
    document.documentElement.lang = l;
  };
  const t = (window.TRANSLATIONS && window.TRANSLATIONS[lang]) || {};
  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>
      {children}
    </LangCtx.Provider>
  );
}

/* ───── Icons ───── */
function IconArrow({ size = 11 }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}
function IconClose({ size = 13 }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="none">
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}
function IconCheck({ size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

/* ───── Button ───── */
function Button({ children, variant = "primary", size = "md", as: As = "button", onClick, className: extraCls, ...rest }) {
  const cls = ["btn", `btn--${variant}`, size === "lg" && "btn--lg", size === "xl" && "btn--xl", extraCls].filter(Boolean).join(" ");
  return (
    <As className={cls} onClick={onClick} {...rest}>
      <span>{children}</span>
      <span className="arrow"><IconArrow /></span>
    </As>
  );
}

function CTAButton({ label = "Demana pressupost", variant = "primary", size = "md" }) {
  const { open } = useModal();
  return <Button variant={variant} size={size} onClick={() => open(label)}>{label}</Button>;
}

/* ───── Eyebrow ───── */
function Eyebrow({ children, light, num }) {
  return (
    <span className={"eyebrow" + (light ? " eyebrow--dark" : "")}>
      {num && <span style={{ fontFamily: "var(--font-mono)", opacity: 0.7 }}>{num}</span>}
      {children}
    </span>
  );
}

/* ───── Reveal-on-scroll ───── */
const CHILD_ANIMATED = "stats__item split__card service-grid__cell big-list__item".split(" ");

function Reveal({ children, delay = 0, as: As = "div", className = "", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          CHILD_ANIMATED.forEach((cls) => {
            el.querySelectorAll("." + cls).forEach((child) => child.classList.add("is-in"));
          });
          io.unobserve(el);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <As ref={ref} className={"reveal " + className} style={{ "--reveal-delay": `${delay}ms` }} {...rest}>
      {children}
    </As>
  );
}

/* ───── Lang selector ───── */
function LangSelector() {
  const { lang, setLang } = useLang();
  const langs = ["ca", "es", "en"];
  return (
    <div className="lang-selector" aria-label="Selecciona idioma">
      {langs.map((l) => (
        <button
          key={l}
          className={"lang-selector__btn" + (lang === l ? " is-active" : "")}
          onClick={() => setLang(l)}
          aria-current={lang === l ? "true" : undefined}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/* ───── Hamburger icon ───── */
function IconHamburger({ open }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect
        x="2" y={open ? "10" : "5"} width="18" height="1.8" rx="1" fill="currentColor"
        style={{ transform: open ? "rotate(45deg)" : "none", transformOrigin: "center", transition: "all .3s" }}
      />
      <rect
        x="2" y="10.1" width="18" height="1.8" rx="1" fill="currentColor"
        style={{ opacity: open ? 0 : 1, transition: "opacity .2s" }}
      />
      <rect
        x="2" y={open ? "10" : "15"} width="18" height="1.8" rx="1" fill="currentColor"
        style={{ transform: open ? "rotate(-45deg)" : "none", transformOrigin: "center", transition: "all .3s" }}
      />
    </svg>
  );
}

/* ───── Navbar ───── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, lang, setLang } = useLang();
  const nav = t.nav || {};

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const hero = document.querySelector(".hero");
      if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight - 60;
        setOverHero(y < heroBottom);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tanca el menú en fer scroll
  useEffect(() => {
    if (!menuOpen) return;
    const onScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  // Bloqueja scroll del body quan el menú és obert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const cls = ["nav", scrolled && "nav--scrolled", overHero && !scrolled && "nav--dark", menuOpen && "nav--menu-open"].filter(Boolean).join(" ");

  return (
    <header className={cls}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand" aria-label="De baix a dalt — inici" onClick={closeMenu}>
          <span className="nav__brand-mark" />
        </a>

        {/* Desktop links */}
        <nav className="nav__links" aria-label="primary">
          <a className="nav__link" href="#construccio">{nav.construccio || "Construcció"}</a>
          <a className="nav__link" href="#eficient">{nav.eficient || "Eficient"}</a>
          <a className="nav__link" href="#sostenible">{nav.sostenible || "Sostenible"}</a>
          <a className="nav__link" href="#termiques">{nav.termiques || "Tèrmiques"}</a>
          <a className="nav__link" href="#domotica">{nav.domotica || "Domòtica"}</a>
          <a className="nav__link" href="#solar">{nav.solar || "Solar"}</a>
          <span className="nav__divider" aria-hidden="true" />
          <a className="nav__link" href="projectes.html">{nav.projectes || "Projectes"}</a>
          <a className="nav__link" href="blog.html">{nav.blog || "Blog"}</a>
        </nav>

        <div className="nav__cta">
          <LangSelector />
          <CTAButton label={nav.cta || "Demana pressupost"} variant="ghost" />
        </div>

        {/* Hamburger — només mòbil */}
        <button
          className="nav__hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Tanca el menú" : "Obre el menú"}
          aria-expanded={menuOpen}
        >
          <IconHamburger open={menuOpen} />
        </button>
      </div>

      {/* Mobile menu drawer */}
      <div className={"nav__drawer" + (menuOpen ? " is-open" : "")} aria-hidden={!menuOpen}>
        <nav className="nav__drawer-links">
          {[
            ["#construccio", nav.construccio || "Construcció"],
            ["#eficient", nav.eficient || "Eficient"],
            ["#sostenible", nav.sostenible || "Sostenible"],
            ["#termiques", nav.termiques || "Tèrmiques"],
            ["#domotica", nav.domotica || "Domòtica"],
            ["#solar", nav.solar || "Solar"],
            ["projectes.html", nav.projectes || "Projectes"],
            ["blog.html", nav.blog || "Blog"],
          ].map(([href, label]) => (
            <a key={href} className="nav__drawer-link" href={href} onClick={closeMenu}>{label}</a>
          ))}
        </nav>
        <div className="nav__drawer-bottom">
          <div className="nav__drawer-lang">
            {["ca", "es", "en"].map((l) => (
              <button
                key={l}
                className={"nav__drawer-lang-btn" + (lang === l ? " is-active" : "")}
                onClick={() => { setLang(l); closeMenu(); }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <CTAButton label={nav.cta || "Demana pressupost"} variant="primary" size="lg" />
        </div>
      </div>
    </header>
  );
}

/* ───── Floating sticky CTA ───── */
function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const { open } = useModal();
  const { t } = useLang();
  const label = (t.floatCta) || "Demana pressupost";

  useEffect(() => {
    const onScroll = () => {
      const heroH = document.querySelector(".hero")?.offsetHeight || 600;
      const footer = document.querySelector(".footer");
      const nearFooter = footer && (window.scrollY + window.innerHeight) > (footer.offsetTop + 40);
      setVisible(window.scrollY > heroH * 0.6 && !nearFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={"float-cta" + (visible ? " is-visible" : "")}
      onClick={() => open(label)}
      aria-label={label}
    >
      <span className="float-cta__dot" />
      <span>{label}</span>
    </button>
  );
}

/* ───── Contact Modal ───── */
const EMPTY_FORM = { name: "", phone: "", email: "", type: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9\s\+\-\(\)]{6,20}$/;

function validateForm(form, m = {}) {
  const errs = {};
  if (!form.name.trim()) errs.name = m.errName || "El nom és obligatori";
  if (!form.phone.trim()) errs.phone = m.errPhone || "El telèfon és obligatori";
  else if (!PHONE_RE.test(form.phone.trim())) errs.phone = m.errPhoneFmt || "Format de telèfon no vàlid";
  if (!form.email.trim()) errs.email = m.errEmail || "L'email és obligatori";
  else if (!EMAIL_RE.test(form.email.trim())) errs.email = m.errEmailFmt || "Format d'email no vàlid";
  return errs;
}

function ContactModal({ open, initialLabel, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dialogRef = useRef(null);
  const firstInputRef = useRef(null);
  const { t } = useLang();
  const m = t.modal || {};

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setForm(EMPTY_FORM);
      setErrors({});
      setIsLoading(false);
      setTimeout(() => firstInputRef.current?.focus(), 220);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      const el = dialogRef.current;
      if (!el) return;
      const focusable = Array.from(el.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )).filter((n) => !n.disabled);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const setField = (k) => (e) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => { const n = { ...prev }; delete n[k]; return n; });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validateForm(form, m);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setIsLoading(true);
    console.log("[DBD] Form submit →", { ...form, label: initialLabel });
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      console.log("[DBD] Form submitted ✓");
    }, 900);
  };

  const Field = ({ id, label, error, children }) => (
    <label className={"field" + (error ? " field--error" : "")}>
      <span className="field__label">{label}</span>
      {children}
      {error && <span className="field__error">{error}</span>}
    </label>
  );

  return (
    <div
      className={"modal-backdrop is-open"}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal" ref={dialogRef}>
        <aside className="modal__aside">
          <div>
            <Eyebrow light num="01 →">{m.eyebrow || "Contacte directe"}</Eyebrow>
            <h2 className="modal__aside-title" style={{ marginTop: 20 }}>
              {m.asideTitle || "Parla amb un tècnic. Sense compromís."}
            </h2>
            <p className="modal__aside-sub">
              {m.asideSub || "Ens posem en contacte amb tu en menys de 24 hores laborables amb una primera valoració del teu projecte."}
            </p>
          </div>
          <div className="modal__aside-meta">
            <div className="modal__aside-meta-item"><span className="dot" /><span>{m.meta1 || "Resposta < 24 h laborables"}</span></div>
            <div className="modal__aside-meta-item"><span className="dot" /><span>{m.meta2 || "Visita tècnica sense cost"}</span></div>
            <div className="modal__aside-meta-item"><span className="dot" /><span>{m.meta3 || "Pressupost detallat per partides"}</span></div>
          </div>
        </aside>

        {submitted ? (
          <div className="modal__success">
            <span className="modal__success-tick"><IconCheck /></span>
            <h3 className="modal__form-title" style={{ marginTop: 8 }}>{m.successTitle || "Sol·licitud enviada."}</h3>
            <p className="lede lede--muted" style={{ fontSize: 16 }}>
              {(m.successSub || "Gràcies, {name}. Et trucarem al {phone} en menys de 24 hores laborables.")
                .replace("{name}", form.name.split(" ")[0] || "—")
                .replace("{phone}", form.phone)}
            </p>
            <Button variant="ghost" onClick={onClose}>{m.backBtn || "Tornar a la web"}</Button>
            <button className="modal__close" onClick={onClose} aria-label={m.closeLabel || "Tanca"}><IconClose /></button>
          </div>
        ) : (
          <form className="modal__form" onSubmit={onSubmit} noValidate>
            <button type="button" className="modal__close" onClick={onClose} aria-label={m.closeLabel || "Tanca"}><IconClose /></button>
            <div className="modal__form-eyebrow">{initialLabel || m.formEyebrow || "Demana pressupost"}</div>
            <h3 id="modal-title" className="modal__form-title">{m.formTitle || "Explica'ns el teu projecte"}</h3>

            <div className="field-row">
              <Field label={m.fieldName || "Nom complet"} error={errors.name}>
                <input ref={firstInputRef} className="field__input" type="text" value={form.name} onChange={setField("name")} placeholder="Anna Roca" aria-invalid={!!errors.name} />
              </Field>
              <Field label={m.fieldPhone || "Telèfon"} error={errors.phone}>
                <input className="field__input" type="tel" value={form.phone} onChange={setField("phone")} placeholder="600 000 000" aria-invalid={!!errors.phone} />
              </Field>
            </div>

            <Field label={m.fieldEmail || "Email"} error={errors.email}>
              <input className="field__input" type="email" value={form.email} onChange={setField("email")} placeholder="anna@correu.cat" aria-invalid={!!errors.email} />
            </Field>

            <label className="field">
              <span className="field__label">{m.fieldType || "Tipus de projecte"}</span>
              <select className="field__select" value={form.type} onChange={setField("type")}>
                <option value="">{m.fieldTypeDefault || "Selecciona una opció"}</option>
                {(m.fieldTypes || [
                  { value: "construccio", label: "Construcció d'obra nova" },
                  { value: "reforma", label: "Reforma integral" },
                  { value: "installacions", label: "Instal·lacions" },
                  { value: "solar", label: "Energia solar" },
                  { value: "altres", label: "Altres" },
                ]).map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field__label">{m.fieldMsg || "Missatge (opcional)"}</span>
              <textarea className="field__textarea" rows="3" value={form.message} onChange={setField("message")} placeholder={m.fieldMsgPlaceholder || "M2 aproximats, ubicació, terminis…"} />
            </label>

            <div className="modal__submit-row">
              <p className="modal__legal">
                {m.legal || "Acceptant, ens autoritzes a contactar-te per gestionar la teva sol·licitud."}{" "}
                <a href="#privacitat">{m.legalLink || "Política de privacitat"}</a>.
              </p>
              <Button as="button" variant="primary" size="lg" type="submit" disabled={isLoading} className={isLoading ? "btn--loading" : ""}>
                {isLoading ? (m.submitting || "Enviant…") : (m.submit || "Enviar sol·licitud")}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ───── Modal provider ───── */
function ModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("Demana pressupost");
  const api = {
    open: useCallback((l) => { setLabel(l || "Demana pressupost"); setOpen(true); }, []),
    close: useCallback(() => setOpen(false), []),
  };
  return (
    <ModalCtx.Provider value={api}>
      {children}
      <ContactModal open={open} initialLabel={label} onClose={api.close} />
    </ModalCtx.Provider>
  );
}

/* Expose globally so other Babel scripts can pick these up */
Object.assign(window, {
  Button, CTAButton, Eyebrow, Reveal, IconArrow, IconClose, IconCheck,
  Navbar, FloatingCTA, ContactModal, ModalProvider, ModalCtx, useModal,
  LangProvider, LangCtx, useLang, LangSelector,
});
