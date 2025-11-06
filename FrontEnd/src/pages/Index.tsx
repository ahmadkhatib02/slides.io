import { useState } from "react";
import { Loader2, FileText, Download, Sparkles, Zap, TrendingUp } from "lucide-react";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a topic for your slide deck");
      return;
    }

    setLoading(true);
    setError("");
    setDownloadUrl("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "success" && data.path) {
        setDownloadUrl(`http://127.0.0.1:8000${data.path}`);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      setError(
        err.message || "Failed to generate slide deck. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[120px] animate-glow-pulse" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]" />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 md:p-8">
        <div className="w-full max-w-3xl animate-fade-in">
          {/* Main Card with Glassmorphism */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
            
            <div className="relative bg-card/50 backdrop-blur-xl rounded-3xl shadow-elevated border border-border/50 p-8 md:p-12 space-y-8">
              {/* Header */}
              <div className="text-center space-y-4 animate-scale-in">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl" />
                    <div className="relative bg-gradient-to-br from-primary to-secondary p-3 rounded-2xl">
                      <Sparkles className="w-8 h-8 text-background" />
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-3">
                    slides.io
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-xl mx-auto">
                    Transform your ideas into stunning presentations with AI
                  </p>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 text-sm">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-foreground/80">Lightning Fast</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 text-sm">
                    <TrendingUp className="w-4 h-4 text-secondary" />
                    <span className="text-foreground/80">Professional Quality</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 text-sm">
                    <FileText className="w-4 h-4 text-accent" />
                    <span className="text-foreground/80">Ready to Use</span>
                  </div>
                </div>
              </div>

              {/* Input Section */}
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="prompt"
                    className="block text-sm font-medium text-foreground/80 mb-3"
                  >
                    What's your presentation about?
                  </label>
                  <div className="relative">
                    <textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="e.g., Introduction to Machine Learning, Climate Change Solutions, Product Marketing Strategy..."
                      className="w-full px-5 py-4 bg-input/50 backdrop-blur-sm border border-border/50 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                      rows={4}
                      disabled={loading}
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                  className="group/btn relative w-full overflow-hidden rounded-2xl p-[2px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary animate-shimmer bg-[length:200%_100%]" />
                  <div className="relative flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-8 rounded-2xl transition-colors">
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Generating Presentation...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 group-hover/btn:animate-float" />
                        <span>Generate Slide Deck</span>
                      </>
                    )}
                  </div>
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="animate-scale-in bg-destructive/10 backdrop-blur-sm border border-destructive/20 text-destructive px-5 py-4 rounded-2xl">
                  <p className="font-medium mb-1">Error</p>
                  <p className="text-sm opacity-90">{error}</p>
                </div>
              )}

              {/* Success Message with Download */}
              {downloadUrl && (
                <div className="animate-scale-in bg-success/10 backdrop-blur-sm border border-success/20 rounded-2xl p-6 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-success/30 rounded-xl blur-lg" />
                      <div className="relative bg-success/20 rounded-xl p-3">
                        <FileText className="w-6 h-6 text-success" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-success text-lg mb-1">
                        Presentation Ready!
                      </h3>
                      <p className="text-success/80 text-sm">
                        Your slide deck has been generated successfully
                      </p>
                    </div>
                  </div>

                  <a
                    href={downloadUrl}
                    download
                    className="group/download relative flex items-center justify-center gap-3 w-full overflow-hidden rounded-2xl p-[2px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-success to-success/80" />
                    <div className="relative flex items-center justify-center gap-3 w-full bg-success hover:bg-success/90 text-success-foreground font-semibold py-4 px-8 rounded-2xl transition-colors">
                      <Download className="w-5 h-5 group-hover/download:animate-bounce" />
                      <span>Download PowerPoint (.pptx)</span>
                    </div>
                  </a>
                </div>
              )}

              {/* Tips Section */}
              <div className="bg-muted/30 backdrop-blur-sm rounded-2xl p-5 border border-border/30">
                <p className="text-sm font-medium text-foreground/90 mb-3 flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  <span>Tips for better results</span>
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Be specific about your topic and target audience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">•</span>
                    <span>Mention key points you want covered</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Include context for better, tailored results</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-muted-foreground text-sm">
            <p className="flex items-center justify-center gap-2">
              Powered by AI
              <span className="text-primary">•</span>
              Generate professional presentations in seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
