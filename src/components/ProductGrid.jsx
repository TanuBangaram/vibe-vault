export default function ProductGrid({ items }) {
  if (!items.length) {
    return <div className="empty">No matches. Try raising budget or toggles.</div>;
  }

  return (
    <div className="grid">
      {items.map((p) => (
        <article key={p.id} className="card">
          <img className="cardImg" src={p.image} alt={p.name} />
          <div className="cardBody">
            <div className="cardName">{p.name}</div>

            <div className="cardMeta">
              <span className="badge">{p.brand}</span>
              <span className="price">₹{p.price}</span>
            </div>

            <div className="miniRow">
              {p.vibe.slice(0, 2).map((v) => (
                <span key={v} className="miniTag">{v}</span>
              ))}
              {p.tags.slice(0, 2).map((t) => (
                <span key={t} className="miniTag soft">{t}</span>
              ))}
            </div>

            <button className="buyBtn" onClick={() => alert("Saved to Vault ✨")}>
              Save to Vault
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
