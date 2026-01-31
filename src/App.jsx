import { useMemo, useState } from "react";
import { products } from "./data/products";
import ProductGrid from "./components/ProductGrid";
import Assistant from "./components/Assistant";

const VIBES = ["Y2K", "Vintage", "Cottagecore", "Academia", "Pink Girly", "80s"];

export default function App() {
  const [activeVibes, setActiveVibes] = useState(["Y2K"]);
  const [budget, setBudget] = useState(1500);
  const [toggles, setToggles] = useState({
    Thrift: true,
    "Small Biz": true,
    Eco: true,
  });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const vibeOk =
        activeVibes.length === 0 || activeVibes.some((v) => p.vibe.includes(v));

      const budgetOk = p.price <= budget;

      const enabledTags = Object.entries(toggles)
        .filter(([, on]) => on)
        .map(([k]) => k);

      const toggleOk =
        enabledTags.length === 0 || p.tags.some((t) => enabledTags.includes(t));

      return vibeOk && budgetOk && toggleOk;
    });
  }, [activeVibes, budget, toggles]);

  function toggleVibe(v) {
    setActiveVibes((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  }

  function toggleTag(tag) {
    setToggles((prev) => ({ ...prev, [tag]: !prev[tag] }));
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo">
          <span className="logoMark">VV</span>
          <div>
            <div className="logoTitle">VibeVault</div>
            <div className="logoSub">Y2K magazine + game UI vibe</div>
          </div>
        </div>

        <div style={{ color: "var(--muted)", fontSize: 12 }}>
          Matches: <b style={{ color: "white" }}>{filtered.length}</b>
        </div>
      </header>

      <div className="layout">
        <main className="main">
          <section className="panel">
            <div className="panelTitle">Pick your vibe</div>

            <div className="chips">
              {VIBES.map((v) => (
                <button
                  key={v}
                  className={"chip " + (activeVibes.includes(v) ? "on" : "")}
                  onClick={() => toggleVibe(v)}
                >
                  {v}
                </button>
              ))}
            </div>

            <div className="controlsRow">
              <div className="sliderBox">
                <div className="rowBetween">
                  <div className="label">Max budget</div>
                  <div className="pill">₹{budget}</div>
                </div>
                <input
                  className="slider"
                  type="range"
                  min="200"
                  max="2500"
                  step="50"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                />
              </div>

              <div className="toggleBox">
                <div className="label">Filters</div>
                <div className="toggles">
                  {Object.keys(toggles).map((t) => (
                    <label key={t} className="toggle">
                      <input
                        type="checkbox"
                        checked={toggles[t]}
                        onChange={() => toggleTag(t)}
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panelTitle">Catalog</div>
            <ProductGrid items={filtered} />
          </section>
        </main>

        <aside>
          <Assistant activeVibes={activeVibes} budget={budget} toggles={toggles} />
        </aside>
      </div>

      <footer className="footer">
        <span>VibeVault • hackathon build</span>
        <span>Tip: click chips to mix vibes</span>
      </footer>
    </div>
  );
}

