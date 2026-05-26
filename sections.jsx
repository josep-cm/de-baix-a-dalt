/* ────────────────────────────────────────────────────────────────
   sections.jsx — page sections: Hero, Construcció, Eficient,
   Sostenible, Tèrmiques, Domòtica, Solar, Final CTA, Footer
   ──────────────────────────────────────────────────────────────── */

/* ───── Hero ───── */
function Hero() {
  const { open } = useModal();
  const { t } = useLang();
  const h = t.hero || {};
  const c = t.cta || {};

  return (
    <section className="hero" id="top">
      <div className="hero__bg">
        <img
          src="https://images.unsplash.com/photo-1614595737476-42487331b8a1?w=1920&q=85&auto=format&fit=crop"
          alt="Edifici de formigó modern amb jocs d'ombres"
          className="hero__bg-img"
        />
      </div>
      <div className="container hero__content">
        <div className="hero__top">
          <div>
            <Eyebrow light num="DBD/01">{h.eyebrow || "Construcció i instal·lacions"}</Eyebrow>
          </div>
        </div>

        <h1 className="display display--light hero__claim">
          {(h.claim || ["Construcció", "eficient i", "sostenible."]).map((line, i) => (
            <span key={i}>{line}{i < 2 && <br />}</span>
          ))}
        </h1>
        <p className="hero__subtitle">
          {h.subtitle || "Transformem espais amb tecnologia, confort i precisió constructiva. Des de l'estructura fins a l'última instal·lació, de baix a dalt."}
        </p>
        <div className="hero__cta-row">
          <Button variant="invert" size="lg" onClick={() => open(c.demana || "Demana pressupost")}>{c.demana || "Demana pressupost"}</Button>
          <Button variant="ghost" size="lg" onClick={() => open(c.calcula || "Calcula el teu projecte")} style={{ color: "white", borderColor: "rgba(255,255,255,0.32)" }}>{c.calcula || "Calcula el teu projecte"}</Button>
        </div>

        <div className="hero__bottom">
          <span className="hero__scroll">
            <span className="hero__scroll-line" />
            {h.scroll || "Scroll · explora"}
          </span>
          <div className="hero__counters">
            <div><strong>{h.counter1val || "180+"}</strong>{h.counter1label || "Projectes lliurats"}</div>
            <div><strong>{h.counter2val || "+20 anys"}</strong>{h.counter2label || "D'expertesa tècnica"}</div>
            <div><strong>{h.counter3val || "42%"}</strong>{h.counter3label || "Estalvi energètic"}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── CTA Band ───── */
function CTABand({ text, label, emphasis }) {
  const { open } = useModal();
  return (
    <Reveal as="section" className="cta-band">
      <div className="container cta-band__inner">
        <p className="cta-band__text">
          {text}{emphasis && <> <em>{emphasis}</em></>}
        </p>
        <Button variant="primary" size="lg" onClick={() => open(label || "Demana pressupost")}>{label || "Demana pressupost"}</Button>
      </div>
    </Reveal>
  );
}

/* ───── 02 — Construcció ───── */
function Construccio() {
  const { t } = useLang();
  const s = t.construccio || {};
  const items = s.items || [
    { title: "Obra nova i reforma", sub: "Projectes claus en mà des de la fase de plànol fins al lliurament." },
    { title: "Cases unifamiliars", sub: "Habitatges a mida, pensats per al lloc i el clima on s'aixequen." },
    { title: "Edificis plurifamiliars", sub: "Promocions residencials amb estàndards d'eficiència elevats." },
    { title: "Empreses, comerços i indústria", sub: "Espais productius i comercials adaptats al teu sector." },
    { title: "Assessorament energètic", sub: "Auditoria i estratègia per optimitzar la inversió constructiva." },
  ];
  const stats = s.stats || [
    { num: "180", unit: "+", label: "Projectes lliurats arreu de Catalunya" },
    { num: "+20", unit: "anys", label: "Coordinant obra, instal·lacions i energia" },
    { num: "42", unit: "%", label: "Estalvi energètic mitjà respecte a obra convencional" },
  ];

  return (
    <section className="section" id="construccio">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="section-header__index">
              <span className="section-header__num">{s.num || "02 · CONSTRUCCIÓ"}</span>
              <Eyebrow>{s.eyebrow || "El que construïm"}</Eyebrow>
            </div>
            <div>
              <h2 className="h1">{s.title || "Projectes constructius adaptats a cada necessitat."}</h2>
              <p className="lede lede--muted" style={{ marginTop: 24 }}>
                {s.sub || "Enfocament tècnic i eficient. Treballem amb propietaris, promotors i empreses des de la primera reunió fins a l'entrega final."}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="service-grid">
            {items.map((it, i) => (
              <div className="service-grid__cell" key={i}>
                <span className="service-grid__num">0{i + 1}</span>
                <div className="service-grid__body">
                  <h3 className="service-grid__title">{it.title}</h3>
                  <p className="service-grid__sub">{it.sub}</p>
                </div>
                <span className="service-grid__chev"><IconArrow size={11} /></span>
              </div>
            ))}
            <div className="service-grid__cell" style={{ alignItems: "center" }}>
              <span className="service-grid__num">→</span>
              <div className="service-grid__body">
                <h3 className="service-grid__title" style={{ color: "var(--accent)" }}>{s.ctaTitle || "Vols valorar la teva obra?"}</h3>
                <p className="service-grid__sub">{s.ctaSub || "Comparteix-nos les dades i et tornem un pressupost orientatiu."}</p>
              </div>
              <CTABand.Inline />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ marginTop: 56 }}>
            <div className="stats">
              {stats.map((st, i) => (
                <div className="stats__item" key={i}>
                  <div className="stats__num">{st.num}{st.unit && <small>{st.unit}</small>}</div>
                  <p className="stats__label">{st.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

CTABand.Inline = function CTABandInline() {
  const { open } = useModal();
  const { t } = useLang();
  const label = (t.cta || {}).demana || "Demana pressupost";
  return (
    <button
      className="service-grid__chev"
      onClick={() => open(label)}
      style={{ background: "var(--carbon)", borderColor: "var(--carbon)", color: "white", width: 36, height: 36 }}
      aria-label={label}
    >
      <IconArrow />
    </button>
  );
};

/* ───── 03 — Construcció eficient ───── */
function Eficient() {
  const { t } = useLang();
  const s = t.eficient || {};
  const points = s.items || [
    { title: "Eficiència energètica", sub: "Demanda mínima" },
    { title: "Aïllament tèrmic", sub: "Envolupant continu" },
    { title: "Renovació d'aire", sub: "Ventilació amb recuperador" },
    { title: "Confort tèrmic", sub: "Estable tot l'any" },
    { title: "Llum natural", sub: "Orientació i obertures" },
  ];

  return (
    <section className="section section--paper" id="eficient">
      <div className="container">
        <div className="feature-row">
          <Reveal>
            <div className="feature-row__visual">
              <img
                src="https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=900&q=85&auto=format&fit=crop"
                alt="Interior modern amb grans finestres i estètica minimalista"
                className="feature-row__visual-img"
              />
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="feature-row__copy">
              <div className="section-header__num" style={{ marginBottom: 24 }}>{s.num || "03 · CONSTRUCCIÓ EFICIENT"}</div>
              <h2 className="h1">{s.title || "Cada watt invertit, només per estar bé a dins."}</h2>
              <p className="lede lede--muted" style={{ marginTop: 24 }}>
                {s.sub || "Dissenyem l'edifici perquè gasti poc abans d'instal·lar res. L'energia més barata és la que no necessites consumir."}
              </p>
              <ul className="feature-row__list">
                {points.map((p, i) => (
                  <li key={i}>
                    <span className="li__num">0{i + 1}</span>
                    <span className="li__title">{p.title}</span>
                    <span className="li__sub">{p.sub}</span>
                  </li>
                ))}
              </ul>
              <div className="feature-row__cta">
                <CTAButton label={s.ctaLabel || "Calcula el teu projecte"} />
                <a href="#sostenible" className="text-link">{s.linkLabel || "Veure construcció sostenible"} <IconArrow /></a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───── 04 — Construcció sostenible ───── */
function Sostenible() {
  const { t } = useLang();
  const s = t.sostenible || {};
  const items = s.items || [
    { title: "Materials sostenibles", desc: "Productes amb declaració ambiental, baixos en emissió i de procedència controlada." },
    { title: "Reciclatge d'obra", desc: "Gestió selectiva dels residus i reintroducció de materials sempre que és possible." },
    { title: "Reducció d'impacte ambiental", desc: "Avaluació de cicle de vida des del disseny i logística d'obra optimitzada." },
    { title: "Eficiència global", desc: "Disseny passiu, instal·lacions de baixa demanda i monitoratge post-entrega." },
  ];

  return (
    <section className="section section--ink" id="sostenible">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="section-header__index">
              <span className="section-header__num">{s.num || "04 · SOSTENIBLE"}</span>
              <Eyebrow>{s.eyebrow || "Construïm pensant en demà"}</Eyebrow>
            </div>
            <div>
              <h2 className="h1">{s.title || "Construcció amb consciència de cicle."}</h2>
              <p className="lede" style={{ marginTop: 24 }}>
                {s.sub || "Cada decisió constructiva té un impacte mesurable. Triem materials, sistemes i processos que ho redueixen sense renunciar al confort ni al rendiment."}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <ul className="big-list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {items.map((it, i) => (
              <li className="big-list__item" key={i}>
                <span className="big-list__num">0{i + 1}</span>
                <h3 className="big-list__title">{it.title}</h3>
                <p className="big-list__desc">{it.desc}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div style={{ marginTop: 64, display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
            <p className="lede" style={{ maxWidth: "46ch" }}>
              {s.closing || "Un projecte sostenible no costa més: estalvia durant els 50 anys següents."}
            </p>
            <CTAButton label={s.ctaLabel || "Parla amb nosaltres"} size="lg" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───── 05 — Instal·lacions tèrmiques ───── */
function Termiques() {
  const { t } = useLang();
  const s = t.termiques || {};
  const points = s.items || [
    { title: "Aerotèrmia", sub: "COP > 4" },
    { title: "Geotèrmia", sub: "Subsòl estable" },
    { title: "ACS amb bomba de calor", sub: "Aigua calenta eficient" },
    { title: "Terra radiant i refrescant", sub: "Confort homogeni" },
    { title: "Climatització avançada", sub: "Conductes i unitats" },
  ];

  return (
    <section className="section" id="termiques">
      <div className="container">
        <div className="feature-row feature-row--reverse">
          <Reveal>
            <div className="feature-row__visual">
              <img
                src="assets/bomba.jpg"
                alt="Bomba de calor instal·lació tècnica"
                className="feature-row__visual-img"
              />
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="feature-row__copy">
              <div className="section-header__num" style={{ marginBottom: 24 }}>{s.num || "05 · INSTAL·LACIONS TÈRMIQUES"}</div>
              <h2 className="h1">{s.title || "Calor i fred amb una sola màquina ben triada."}</h2>
              <p className="lede lede--muted" style={{ marginTop: 24 }}>
                {s.sub || "Calculem la càrrega real de l'edifici i dimensionem només el que necessita. Sense sobredimensionats, amb manteniment senzill."}
              </p>
              <ul className="feature-row__list">
                {points.map((p, i) => (
                  <li key={i}>
                    <span className="li__num">0{i + 1}</span>
                    <span className="li__title">{p.title}</span>
                    <span className="li__sub">{p.sub}</span>
                  </li>
                ))}
              </ul>
              <div className="feature-row__cta">
                <CTAButton label={s.ctaLabel || "Demana pressupost"} />
                <a href="#domotica" className="text-link">{s.linkLabel || "Integració amb domòtica"} <IconArrow /></a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───── 06 — Instal·lacions elèctriques + Domòtica ───── */
function Domotica() {
  const { t } = useLang();
  const s = t.domotica || {};
  const items = s.items || [
    { tag: "ELE", title: "Instal·lacions elèctriques", desc: "Quadres ben dimensionats, traçats nets i materials de primera." },
    { tag: "APP", title: "Control des d'una app", desc: "Una sola interfície per a llum, climatització, persianes i escenes." },
    { tag: "KNX", title: "Integració domòtica", desc: "Sistemes oberts (KNX, Loxone, Home Assistant) sense lock-in." },
    { tag: "AUT", title: "Automatització fina", desc: "Escenes per horari, presència o consum: la casa s'adapta a tu." },
  ];

  return (
    <section className="section section--paper" id="domotica">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="section-header__index">
              <span className="section-header__num">{s.num || "06 · DOMÒTICA"}</span>
              <Eyebrow>{s.eyebrow || "Elèctrica + automatització"}</Eyebrow>
            </div>
            <div>
              <h2 className="h1">{s.title || "Casa connectada, sense soroll tecnològic."}</h2>
              <p className="lede lede--muted" style={{ marginTop: 24 }}>
                {s.sub || "Llums, persianes, climatització i aire integrats en un sistema únic. Senzill d'usar, robust quan no hi penses."}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="split">
            {items.map((it, i) => (
              <div className="split__card" key={i}>
                <span className="split__icon">{it.tag}</span>
                <h3 className="split__title">{it.title}</h3>
                <p className="split__desc">{it.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div style={{ marginTop: 56, display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
            <p className="lede" style={{ color: "var(--ink)", maxWidth: "44ch" }}>
              {s.closing || "Vols veure-ho funcionar en un projecte real? Et fem una demostració."}
            </p>
            <CTAButton label={s.ctaLabel || "Parla amb nosaltres"} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───── 07 — Energia solar ───── */
function Solar() {
  const { t } = useLang();
  const s = t.solar || {};
  const items = s.items || [
    { tag: "PV", title: "Plaques fotovoltaiques", desc: "Captació dimensionada al consum real, no al sostre disponible." },
    { tag: "BAT", title: "Bateries", desc: "Emmagatzematge per cobrir vespres i pics de demanda nocturna." },
    { tag: "INV", title: "Inversors", desc: "Tecnologia híbrida amb monitoratge i diagnòstic remot." },
    { tag: "OPT", title: "Optimització del consum", desc: "Gestió automàtica de càrregues per maximitzar autoconsum." },
  ];

  return (
    <section className="section section--ink" id="solar">
      <div className="container">
        <div className="feature-row">
          <Reveal>
            <div className="feature-row__visual">
              <img
                src="assets/solar.jpg"
                alt="Plaques solars fotovoltaiques"
                className="feature-row__visual-img"
              />
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="feature-row__copy">
              <div className="section-header__num" style={{ marginBottom: 24 }}>{s.num || "07 · ENERGIA SOLAR"}</div>
              <h2 className="h1">{s.title || "L'energia més barata és la que produeixes tu."}</h2>
              <p className="lede" style={{ marginTop: 24 }}>
                {s.sub || "Disseny solar fet pels mateixos qui calculen l'edifici. Cap component sobredimensionat, cap connexió mal triada."}
              </p>
              <ul className="feature-row__list">
                {items.map((it, i) => (
                  <li key={i}>
                    <span className="li__num">{it.tag}</span>
                    <span className="li__title">{it.title}</span>
                    <span className="li__sub">{it.desc}</span>
                  </li>
                ))}
              </ul>
              <div className="feature-row__cta">
                <CTAButton label={s.ctaLabel || "Calcula el teu projecte"} size="lg" />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div style={{ marginTop: 64, display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap", alignItems: "center", borderTop: "1px solid var(--green-section-line)", paddingTop: 40 }}>
            <p className="lede" style={{ maxWidth: "46ch" }}>
              {s.closing || "Et fem un estudi d'autoconsum gratuït a partir de la teva factura."}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───── 08 — Final mega CTA ───── */
function FinalCTA() {
  const { open } = useModal();
  const { t } = useLang();
  const s = t.finalCta || {};
  const title = s.title || ["Vols transformar", "el teu espai?"];

  return (
    <section className="cta-final">
      <div className="cta-final__bg" />
      <div className="container cta-final__inner">
        <Reveal>
          <span className="eyebrow eyebrow--dark" style={{ marginBottom: 28 }}>{s.eyebrow || "08 · Construïm el següent"}</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="cta-final__title">
            {title[0]} <em>{title[1]}</em>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="cta-final__sub">
            {s.sub || "Comparteix-nos la idea —per petita que sigui— i et tornem una proposta tècnica i econòmica en menys d'una setmana."}
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="cta-final__row">
            <Button variant="accent" size="xl" onClick={() => open(s.cta1 || "Demana pressupost")}>{s.cta1 || "Demana pressupost"}</Button>
            <Button variant="ghost" size="xl" onClick={() => open(s.cta2 || "Parla amb nosaltres")} style={{ color: "white", borderColor: "rgba(255,255,255,0.32)" }}>{s.cta2 || "Parla amb nosaltres"}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───── Footer ───── */
function Footer() {
  const { open } = useModal();
  const { t } = useLang();
  const f = t.footer || {};
  const links = f.links || {};

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand" aria-label="De baix a dalt">
              <span className="footer__brand-mark" />
            </div>
            <p className="footer__about" style={{ marginTop: 28 }}>
              {f.about || "Construcció eficient i sostenible. Cases, edificis i instal·lacions tècniques a Catalunya, executats amb precisió de baix a dalt."}
            </p>
          </div>
          <div>
            <p className="footer__heading">{f.colServeis || "Serveis"}</p>
            <a className="footer__link" href="#construccio">{(t.nav || {}).construccio || "Construcció"}</a>
            <a className="footer__link" href="#eficient">{(t.nav || {}).eficient || "Eficient"}</a>
            <a className="footer__link" href="#sostenible">{(t.nav || {}).sostenible || "Sostenible"}</a>
            <a className="footer__link" href="#termiques">{(t.nav || {}).termiques || "Tèrmiques"}</a>
            <a className="footer__link" href="#domotica">{(t.nav || {}).domotica || "Domòtica"}</a>
            <a className="footer__link" href="#solar">{(t.nav || {}).solar || "Solar"}</a>
          </div>
          <div>
            <p className="footer__heading">{f.colEstudi || "Estudi"}</p>
            <a className="footer__link" href="#top">{links.sobreNosaltres || "Sobre nosaltres"}</a>
            <a className="footer__link" href="projectes.html">{links.projectes || "Projectes"}</a>
            <a className="footer__link" href="blog.html">{links.blog || "Blog tècnic"}</a>
            <a className="footer__link" href="#construccio">{links.proces || "Procés tècnic"}</a>
          </div>
          <div>
            <p className="footer__heading">{f.colContacte || "Contacte"}</p>
            <a className="footer__link" href="mailto:hola@debaixadalt.cat">hola@debaixadalt.cat</a>
            <a className="footer__link" href="tel:+34000000000">+34 000 000 000</a>
            <button className="footer__link footer__link--btn" onClick={() => open(links.pressupost || "Demana pressupost")}>{links.pressupost || "Demana pressupost"}</button>
            <a className="footer__link" href="#">{links.treball || "Treballa amb nosaltres"}</a>
          </div>
        </div>
        <div className="footer__zones">
          <p className="footer__zones-label">{f.zonesLabel || "Zones d'actuació"}</p>
          <p className="footer__zones-list">
            {f.zonesList || "Vallès Occidental · Vallès Oriental · Baix Llobregat · Barcelonès · Maresme · Girona · Tarragona · Lleida — Sabadell · Terrassa · Sant Cugat del Vallès · Rubí · Cerdanyola · Granollers · Mollet del Vallès · Barcelona · L'Hospitalet · Badalona · Santa Coloma · Cornellà · Esplugues · Sant Joan Despí · Sant Feliu de Llobregat · Gavà · Viladecans · Castelldefels · Sant Boi · El Prat · Mataró · Reus"}
          </p>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} De baix a dalt SLU. {f.legal || "Tots els drets reservats."}</span>
          <span>{f.legalLinks || "Avís legal · Privacitat · Cookies"}</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Hero, CTABand, Construccio, Eficient, Sostenible, Termiques, Domotica, Solar, FinalCTA, Footer,
});
