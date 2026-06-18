import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Upload, Camera, Leaf, Shield, AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiseaseResult {
  disease: string;
  confidence: number;
  treatment: string[];
  medicines: string[];
  preventiveMeasures: string[];
}

const demoHistory = [
  { id: "1", disease: "బాక్టీరియల్ లీఫ్ బ్లైట్", crop: "వరి", confidence: 94, date: "2026-06-10" },
  { id: "2", disease: "పౌడరీ మిల్డ్యూ", crop: "మిర్చి", confidence: 89, date: "2026-05-28" },
  { id: "3", disease: "ఆకు మచ్చ తెగులు", crop: "పత్తి", confidence: 92, date: "2026-05-15" },
];

const mockResult: DiseaseResult = {
  disease: "బాక్టీరియల్ లీఫ్ బ్లైట్ ( Bacterial Leaf Blight )",
  confidence: 94,
  treatment: [
    "విత్తనాలను స్ట్రెప్టోమైసిన్‌తో శుద్ధి చేయండి",
    "నత్రజని ఎరువులను సిఫార్సు కంటే ఎక్కువ వాడకండి",
    "నీటి నిల్వను నివారించడానికి పొలంలో నీటి పారుదల సరిగా ఉండేలా చూడండి",
    "స్ట్రెప్టోమైసిన్ + కాపర్ ఆక్సీక్లోరైడ్ మిశ్రమాన్ని పిచికారీ చేయండి",
  ],
  medicines: [
    "స్ట్రెప్టోమైసిన్ సల్ఫేట్ 90% + టెట్రాసైక్లిన్ హైడ్రోక్లోరైడ్ 10%",
    "కాపర్ ఆక్సీక్లోరైడ్ 50% WP",
    "కార్బెండజిమ్ 50% WP",
    "ట్రైసైక్లజోల్ 75% WP",
  ],
  preventiveMeasures: [
    "వ్యాధి నిరోధక రకాలను ఎంచుకోండి",
    "పంట మార్పిడి పద్ధతిని అనుసరించండి",
    "పొలంలో శుభ్రత పాటించండి",
    "వర్షాకాలంలో నీరు నిల్వ ఉండకుండా చూడండి",
  ],
};

export default function DiseaseDetectionPage() {
  const { t } = useTranslation();
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [activeTab, setActiveTab] = useState<"detect" | "history">("detect");
  const [isDragOver, setIsDragOver] = useState(false);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleImageUpload(file);
      }
    },
    [handleImageUpload],
  );

  const handleAnalyze = useCallback(async () => {
    if (!image) return;
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise((r) => setTimeout(r, 2000));
    setResult(mockResult);
    setIsAnalyzing(false);
  }, [image]);

  const handleCameraCapture = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleImageUpload(file);
    };
    input.click();
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Tabs */}
      <div className="flex rounded-xl bg-muted p-1">
        <button
          onClick={() => setActiveTab("detect")}
          className={cn(
            "flex-1 rounded-lg py-2 text-sm font-medium transition-all",
            activeTab === "detect"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground",
          )}
        >
          {t("disease.title")}
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={cn(
            "flex-1 rounded-lg py-2 text-sm font-medium transition-all",
            activeTab === "history"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground",
          )}
        >
          {t("disease.history")}
        </button>
      </div>

      {activeTab === "detect" ? (
        <>
          {/* Upload Area */}
          {!image && (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              className={cn(
                "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition-all",
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-border/60 bg-card hover:border-primary/40",
              )}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Upload className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="mt-4 text-sm font-medium text-foreground">
                {t("disease.dragDrop")}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                JPG, PNG లేదా WEBP • Max 10MB
              </p>
              <div className="mt-4 flex gap-3">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95">
                  <Upload className="h-4 w-4" />
                  {t("disease.uploadPrompt")}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={handleCameraCapture}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted active:scale-95"
                >
                  <Camera className="h-4 w-4" />
                  {t("disease.cameraCapture")}
                </button>
              </div>
            </div>
          )}

          {/* Image Preview */}
          {image && (
            <div className="rounded-2xl overflow-hidden border border-border/40 bg-card">
              <img
                src={image}
                alt="Uploaded crop"
                className="w-full max-h-64 object-cover"
              />
              <div className="flex gap-3 p-3">
                <button
                  onClick={() => {
                    setImage(null);
                    setResult(null);
                  }}
                  className="flex-1 rounded-xl border border-border/60 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                >
                  {t("common.cancel")}
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className={cn(
                    "flex-1 rounded-xl py-2.5 text-sm font-medium text-primary-foreground transition-all",
                    isAnalyzing
                      ? "bg-primary/60 cursor-wait"
                      : "bg-primary hover:bg-primary/90 active:scale-[0.98]",
                  )}
                >
                  {isAnalyzing ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      {t("disease.analyzing")}
                    </span>
                  ) : (
                    t("disease.analyzing")
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* Disease Card */}
              <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-red-800">{t("disease.diseaseDetected")}</h3>
                      <span className="rounded-full bg-red-200 px-2 py-0.5 text-[11px] font-bold text-red-700">
                        {result.confidence}% {t("disease.confidence")}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-red-700">{result.disease}</p>
                  </div>
                </div>
              </div>

              {/* Treatment */}
              <div className="rounded-2xl bg-card border border-border/40 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
                    <Leaf className="h-4 w-4 text-emerald-600" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground">{t("disease.treatment")}</h4>
                </div>
                <ol className="list-decimal list-outside ml-5 space-y-2">
                  {result.treatment.map((step, i) => (
                    <li key={i} className="text-[13px] text-foreground/90 leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Medicines */}
              <div className="rounded-2xl bg-card border border-border/40 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
                    <Shield className="h-4 w-4 text-amber-600" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground">{t("disease.medicines")}</h4>
                </div>
                <ul className="space-y-2">
                  {result.medicines.map((med, i) => (
                    <li key={i} className="flex items-center gap-2 text-[13px] text-foreground/90">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                      {med}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention */}
              <div className="rounded-2xl bg-card border border-border/40 p-5">
                <h4 className="text-sm font-bold text-foreground mb-3">{t("disease.prevention")}</h4>
                <ul className="space-y-2">
                  {result.preventiveMeasures.map((prev, i) => (
                    <li key={i} className="flex items-center gap-2 text-[13px] text-foreground/90">
                      <Shield className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                      {prev}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </>
      ) : (
        /* History Tab */
        <div className="space-y-3">
          {demoHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-2xl bg-card border border-border/40 p-4 transition-all hover:shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{item.disease}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {item.crop} • {item.confidence}% confidence
                </p>
                <p className="text-[10px] text-muted-foreground/70">{item.date}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
