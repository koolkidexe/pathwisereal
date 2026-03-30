import { motion, AnimatePresence } from "framer-motion";
import { SAMPLE_TOPICS } from "@/lib/data";
import { SUBJECTS, GRADE_LEVELS } from "@/lib/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, BookOpen, Bookmark, BookmarkCheck, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AllMaterial() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allTopics = SAMPLE_TOPICS;
  const filtered = allTopics.filter(t => {
    if (subjectFilter !== "all" && t.subject !== subjectFilter) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-5xl mx-auto relative">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-glow-secondary/5 blur-[120px]" />
      </div>
      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 space-y-6">
        <motion.div variants={item} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">All Material</h1>
            <p className="text-muted-foreground text-sm">Explore any topic, any grade level</p>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search topics..." className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
          </div>
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-muted/30 border-border/50">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {SUBJECTS.map(s => <SelectItem key={s.value} value={s.value}>{s.icon} {s.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Topics Grid */}
        <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map(topic => {
              const subjectInfo = SUBJECTS.find(s => s.value === topic.subject);
              const totalLessons = topic.subtopics.reduce((s, st) => s + st.lessons.length, 0);
              const isBookmarked = bookmarks.has(topic.id);
              return (
                <motion.div key={topic.id} layout variants={item} exit={{ opacity: 0, scale: 0.95 }} className="glass rounded-xl p-5 space-y-3 group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{subjectInfo?.icon}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{subjectInfo?.label}</span>
                    </div>
                    <button onClick={() => toggleBookmark(topic.id)} className="p-1 rounded hover:bg-muted/50 transition-colors">
                      {isBookmarked ? <BookmarkCheck className="w-5 h-5 text-primary" /> : <Bookmark className="w-5 h-5 text-muted-foreground" />}
                    </button>
                  </div>
                  <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground">{topic.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{totalLessons} lessons</span>
                      <span>•</span>
                      <span>{topic.subtopics.length} subtopics</span>
                    </div>
                    <Button size="sm" variant="ghost" className="text-primary text-xs h-8" onClick={() => navigate(`/lesson/${topic.subtopics[0]?.lessons[0]?.id}`)}>
                      Start <ChevronDown className="w-3 h-3 ml-1 -rotate-90" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No topics found matching your search.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
