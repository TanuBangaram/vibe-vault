import { useMemo, useState } from "react";

const CANNED = [
  { id: "c1", label: "Suggest 3 picks", text: "Give me 3 picks." },
  { id: "c2", label: "Cheaper options", text: "Show cheaper options." },
  { id: "c3", label: "Eco-first", text: "Prioritize Eco options." },
  { id: "c4", label: "Y2K outfit idea", text: "Give a Y2K outfit idea." },
];

export default function Assistant({ activeVibes, budget, toggles }) {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hey bestie 💿 Tell me your vibe and I’ll curate." },
  ]);

  const contextLine = useMemo(() => {
    const onTags = Object.entries(toggles)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join(", ");
    return `Vibes: ${activeVibes.length ? activeVibes.join(" + ") : "Any"} • Budget: ₹${budget} • Filters: ${onTags || "None"}`;
  }, [activeVibes, budget, toggles]);

  function send(text) {
    setMessages((prev) => [
      ...prev,
      { from: "me", text },
      { from: "ai", text: cannedReply(text, activeVibes, budget, toggles) },
    ]);
  }

  return (
    <div className="assistant">
      <div className="assistantHeader">
        <div>
          <div className="assistantTitle">AI Stylist</div>
          <div className="assistantSub">Canned demo • no API</div>
        </div>
        <div className="assistantCtx">{contextLine}</div>
      </div>

      <div className="chat">
        {messages.map((m, idx) => (
          <div key={idx} className={"msg " + (m.from === "me" ? "me" : "ai")}>
            <div className="bubble">{m.text}</div>
          </div>
        ))}
      </div>

      <div className="quick">
        {CANNED.map((c) => (
          <button key={c.id} className="quickBtn" onClick={() => send(c.text)}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="inputRow">
        <input className="fakeInput" placeholder="Demo mode — use quick buttons →" disabled />
        <button className="sendBtn" disabled>Send</button>
      </div>
    </div>
  );
}

function cannedReply(text, activeVibes, budget, toggles) {
  const vibe = activeVibes[0] || "Any";
  const tagsOn = Object.entries(toggles).filter(([, v]) => v).map(([k]) => k);

  if (text.includes("3 picks")) {
    return `3 picks for ${vibe} under ₹${budget}: accessories + statement piece + comfy layer. Keep ${tagsOn[0] || "Eco"} ON for cleaner hits.`;
  }
  if (text.includes("cheaper")) {
    return `Cheaper route: lower budget to ~₹${Math.max(200, Math.floor(budget * 0.6))}, turn ON Thrift + Eco, and mix ${vibe} with Vintage.`;
  }
  if (text.includes("Eco")) {
    return `Eco-first: Eco ON, add Small Biz ON, choose durable staples (denim/knits) + one sparkle accessory.`;
  }
  if (text.includes("outfit")) {
    return `Y2K fit: baby tee + denim mini + glossy mini bag + star clips. For softer: blend Cottagecore with lace.`;
  }
  return `Got it: ${text}. I’m demo-only, so I’ll keep it simple—use vibe chips + filters and I’ll “curate.”`;
}
