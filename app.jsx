/* ────────────────────────────────────────────────────────────────
   app.jsx — top-level composition
   ──────────────────────────────────────────────────────────────── */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#1a9b6e",
  "showFloatingCTA": true,
  "ctaLabel": "Demana pressupost"
}/*EDITMODE-END*/;

function CTABands() {
  const { t } = useLang();
  const b1 = t.ctaBand1 || {};
  const b2 = t.ctaBand2 || {};
  return (
    <React.Fragment>
      <CTABand
        text={b1.text || "Vols un pressupost orientatiu per a la teva obra o reforma?"}
        emphasis={b1.emphasis || "Resposta en 24 h."}
        label={b1.label || "Demana pressupost"}
      />
      <CTABand
        text={b2.text || "Vols integrar l'energia tèrmica amb la teva instal·lació elèctrica?"}
        emphasis={b2.emphasis || "Et fem el càlcul."}
        label={b2.label || "Calcula el teu projecte"}
      />
    </React.Fragment>
  );
}

function App() {
  const tweaks = (window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}]);
  const t = tweaks[0];
  const setTweak = tweaks[1];

  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);

  return (
    <LangProvider>
      <ModalProvider>
        <Navbar />
        <main>
          <Hero />
          <Construccio />
          <CTABandSection band="1" />
          <Eficient />
          <Sostenible />
          <Termiques />
          <CTABandSection band="2" />
          <Domotica />
          <Solar />
          <FinalCTA />
          <Footer />
        </main>
        {t.showFloatingCTA && <FloatingCTA />}
        {window.TweaksPanel && (
          <window.TweaksPanel title="Tweaks">
            <window.TweakSection title="Brand">
              <window.TweakColor
                label="Accent"
                value={t.accent}
                onChange={(v) => setTweak("accent", v)}
                options={["#1a9b6e", "#2563eb", "#0a0a0a", "#c9582a"]}
              />
            </window.TweakSection>
            <window.TweakSection title="Conversió">
              <window.TweakToggle
                label="Botó flotant sticky"
                value={t.showFloatingCTA}
                onChange={(v) => setTweak("showFloatingCTA", v)}
              />
            </window.TweakSection>
          </window.TweaksPanel>
        )}
      </ModalProvider>
    </LangProvider>
  );
}

function CTABandSection({ band }) {
  const { t } = useLang();
  if (band === "1") {
    const b = t.ctaBand1 || {};
    return (
      <CTABand
        text={b.text || "Vols un pressupost orientatiu per a la teva obra o reforma?"}
        emphasis={b.emphasis || "Resposta en 24 h."}
        label={b.label || "Demana pressupost"}
      />
    );
  }
  const b = t.ctaBand2 || {};
  return (
    <CTABand
      text={b.text || "Vols integrar l'energia tèrmica amb la teva instal·lació elèctrica?"}
      emphasis={b.emphasis || "Et fem el càlcul."}
      label={b.label || "Calcula el teu projecte"}
    />
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
