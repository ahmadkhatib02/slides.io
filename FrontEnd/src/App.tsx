import { useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      // Case 1: backend returned the PPTX file directly
      const ct = res.headers.get("content-type") || "";
      if (
        ct.includes(
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        )
      ) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "deck.pptx";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        // Case 2: backend returned JSON with a public path
        const data = await res.json(); // { path: "https://.../deck.pptx" }
        if (data?.path) {
          // either navigate or force download
          const a = document.createElement("a");
          a.href = data.path;
          a.download = "deck.pptx";
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else {
          throw new Error("Unexpected response");
        }
      }
    } catch (err) {
      alert("Generation failed. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <h1>SlideDeck Generator</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="prompt">Prompt</label>
        <textarea
          id="prompt"
          rows={6}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ width: "100%", margin: "8px 0" }}
          placeholder="e.g., Make a slide deck on AI ethics..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate PPTX"}
        </button>
      </form>
    </main>
  );
}
