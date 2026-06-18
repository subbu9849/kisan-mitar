import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MessageSquarePlus, Heart, MessageCircle, Share2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { key: "all", labelKey: "community.all" },
  { key: "questions", labelKey: "community.questions" },
  { key: "success", labelKey: "community.success" },
  { key: "tips", labelKey: "community.tips" },
  { key: "news", labelKey: "community.news" },
];

const demoPosts = [
  {
    id: "1",
    author: "రమేష్ రెడ్డి",
    village: "తాడేపల్లి, గుంటూరు",
    category: "success",
    content: "ఈ సీజన్‌లో నా 2 ఎకరాల వరి పొలంలో SRI పద్ధతిని ఉపయోగించాను. నీటి వినియోగం 30% తగ్గింది, దిగుబడి 22 క్వింటాళ్ల నుండి 27 క్వింటాళ్లకు పెరిగింది. ఈ పద్ధతిని అందరు రైతులు ప్రయత్నించాలని నా సూచన.",
    likes: 45,
    commented: 12,
    time: "2 గంటల క్రితం",
  },
  {
    id: "2",
    author: "లక్ష్మి",
    village: "పొన్నూరు, గుంటూరు",
    category: "questions",
    content: "నా మిర్చి పంట ఆకులు పసుపు రంగులోకి మారుతున్నాయి. ఇది ఏ వ్యాధి అయి ఉంటుంది? దయచేసి ఎవరైనా సలహా ఇవ్వగలరు.",
    likes: 18,
    commented: 24,
    time: "5 గంటల క్రితం",
  },
  {
    id: "3",
    author: "వెంకటేష్",
    village: "సత్తెనపల్లి, గుంటూరు",
    category: "tips",
    content: "వేసవిలో మిర్చి పంటకు నీరు తక్కువగా పెట్టాలి. వారానికి ఒకసారి బిందు సేద్యం సరిపోతుంది. అధిక నీరు వేస్తే వేరు కుళ్లు వ్యాధి వస్తుంది. నా స్వంత అనుభవంతో చెబుతున్నాను.",
    likes: 67,
    commented: 8,
    time: "1 రోజు క్రితం",
  },
  {
    id: "4",
    author: "శ్రీనివాస్",
    village: "చిలకలూరిపేట, గుంటూరు",
    category: "news",
    content: "PM కిసాన్ 15వ విడత ఈ నెల 30న విడుదల కానుంది. అర్హులైన రైతులందరూ e-KYC పూర్తి చేసుకోండి. KCC ఉన్నవారికి అదనంగా రుణ సదుపాయం.",
    likes: 89,
    commented: 15,
    time: "2 రోజుల క్రితం",
  },
  {
    id: "5",
    author: "సుబ్బారావు",
    village: "తెనాలి, గుంటూరు",
    category: "questions",
    content: "వరి నారుమడికి ఏ ఎరువు వేయాలి? DAP వేస్తే మంచిదా లేక కాంప్లెక్స్ వేస్తే మంచిదా? నిపుణులు సలహా ఇవ్వగలరు.",
    likes: 14,
    commented: 31,
    time: "3 రోజుల క్రితం",
  },
];

export default function CommunityPage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [commentText, setCommentText] = useState("");
  const [activeCommentPost, setActiveCommentPost] = useState<string | null>(null);

  const filtered = activeCategory === "all"
    ? demoPosts
    : demoPosts.filter((p) => p.category === activeCategory);

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Create Post Button */}
      <button className="w-full flex items-center gap-3 rounded-2xl bg-card border border-border/40 p-4 transition-all hover:shadow-md active:scale-[0.99]">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <MessageSquarePlus className="h-5 w-5 text-primary" />
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          {t("community.createPost")}...
        </span>
      </button>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-4 px-4">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={cn(
              "flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              activeCategory === cat.key
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            {t(cat.labelKey)}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-3">
        {filtered.map((post) => {
          const isLiked = likedPosts.has(post.id);
          const showComment = activeCommentPost === post.id;

          return (
            <div
              key={post.id}
              className="rounded-2xl bg-card border border-border/40 overflow-hidden transition-all hover:shadow-sm"
            >
              {/* Author */}
              <div className="flex items-center gap-3 px-4 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-bold text-primary">
                    {post.author[0]}
                  </span>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-foreground">{post.author}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {post.village} • {post.time}
                  </p>
                </div>
                <span
                  className={cn(
                    "ml-auto rounded-full px-2.5 py-0.5 text-[10px] font-medium",
                    post.category === "success"
                      ? "bg-emerald-50 text-emerald-700"
                      : post.category === "questions"
                        ? "bg-amber-50 text-amber-700"
                        : post.category === "tips"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-purple-50 text-purple-700",
                  )}
                >
                  {t(`community.${post.category}`)}
                </span>
              </div>

              {/* Content */}
              <div className="px-4 py-3">
                <p className="text-[13px] text-foreground/90 leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 border-t border-border/30 px-2 py-1.5">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors",
                    isLiked
                      ? "text-red-500 bg-red-50"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
                  {isLiked ? post.likes + 1 : post.likes}
                </button>
                <button
                  onClick={() =>
                    setActiveCommentPost(showComment ? null : post.id)
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-muted-foreground hover:bg-muted transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  {post.commented}
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-muted-foreground hover:bg-muted transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              {/* Comment Input */}
              {showComment && (
                <div className="flex items-center gap-2 border-t border-border/30 px-4 py-2 bg-muted/30">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={t("community.writeComment")}
                    className="flex-1 rounded-lg bg-card border border-border/40 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary/30"
                  />
                  <button
                    onClick={() => {
                      setCommentText("");
                      setActiveCommentPost(null);
                    }}
                    disabled={!commentText.trim()}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40 transition-opacity"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
