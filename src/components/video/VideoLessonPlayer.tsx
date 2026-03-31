import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Loader2, Video, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateLessonScript, LessonScript, LessonSlide } from "@/lib/ai-lesson";
import { toast } from "@/hooks/use-toast";

interface VideoLessonPlayerProps {
  topic: string;
  subject: string;
  gradeLevel?: string;
}

const VISUAL_ICONS: Record<string, string> = {
  intro: "🎬",
  concept: "💡",
  example: "📝",
  diagram: "📊",
  summary: "🎯",
};

const VISUAL_COLORS: Record<string, string> = {
  intro: "from-primary/20 to-glow-secondary/20",
  concept: "from-primary/20 to-xp/10",
  example: "from-streak/15 to-primary/15",
  diagram: "from-glow-secondary/15 to-primary/20",
  summary: "from-xp/15 to-primary/15",
};

function getBestVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const priorities = [
    (v: SpeechSynthesisVoice) => v.name.includes('Google UK English Female'),
    (v: SpeechSynthesisVoice) => v.name.includes('Google US English'),
    (v: SpeechSynthesisVoice) => /Microsoft.*Online.*Natural/i.test(v.name) && v.lang.startsWith('en'),
    (v: SpeechSynthesisVoice) => v.name.includes('Google') && v.lang.startsWith('en'),
    (v: SpeechSynthesisVoice) => v.lang.startsWith('en') && !v.localService,
    (v: SpeechSynthesisVoice) => v.lang.startsWith('en'),
  ];
  for (const test of priorities) {
    const match = voices.find(test);
    if (match) return match;
  }
  return voices[0] || null;
}

export function VideoLessonPlayer({ topic, subject, gradeLevel }: VideoLessonPlayerProps) {
  const [script, setScript] = useState<LessonScript | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  const generateVideo = useCallback(async () => {
    setLoading(true);
    setError(null);
    setCurrentSlide(0);
    setScript(null);
    window.speechSynthesis.cancel();

    try {
      const lessonScript = await generateLessonScript(topic, subject, gradeLevel);
      setScript(lessonScript);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to generate video lesson";
      setError(msg);
      toast({ title: "Error", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [topic, subject, gradeLevel]);

  // Browser TTS narration for current slide
  useEffect(() => {
    if (!isPlaying || !script) return;

    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    window.speechSynthesis.cancel();

    const slide = script.slides[currentSlide];
    const advanceSlide = () => {
      if (currentSlide < script.slides.length - 1) {
        setCurrentSlide(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    };

    if (!muted && slide && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(slide.narration);
      const voice = getBestVoice();
      if (voice) utterance.voice = voice;
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = advanceSlide;
      window.speechSynthesis.speak(utterance);
    } else {
      autoAdvanceRef.current = setTimeout(advanceSlide, 5000);
    }

    return () => {
      window.speechSynthesis.cancel();
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    };
  }, [isPlaying, currentSlide, muted, script, cleanupAudio]);

  const togglePlay = () => {
    if (!script) return;
    if (isPlaying) {
      cleanupAudio();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSlide = () => {
    if (!script) return;
    cleanupAudio();
    if (currentSlide < script.slides.length - 1) setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    cleanupAudio();
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  // Not yet generated
  if (!script && !loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl p-8 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
          <Video className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-display font-semibold text-lg">AI Video Lesson</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Generate an AI-narrated video lesson on <span className="text-primary font-medium">"{topic}"</span> with a realistic human voice
        </p>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button onClick={generateVideo} className="glow-primary-sm">
          <Video className="w-4 h-4 mr-2" /> Generate Video Lesson
        </Button>
      </motion.div>
    );
  }

  // Loading
  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl p-8 text-center space-y-4">
        <Loader2 className="w-10 h-10 text-primary mx-auto animate-spin" />
        <h3 className="font-display font-semibold">Creating lesson script...</h3>
        <p className="text-sm text-muted-foreground">This may take a moment</p>
        <div className="flex justify-center gap-1">
          {[0, 1, 2].map(i => (
            <motion.div key={i} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-primary" />
          ))}
        </div>
      </motion.div>
    );
  }

  if (!script) return null;

  const slide = script.slides[currentSlide];
  const progress = ((currentSlide + 1) / script.slides.length) * 100;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl overflow-hidden">
      {/* Video viewport */}
      <div className={`relative aspect-video bg-gradient-to-br ${VISUAL_COLORS[slide.visualType] || VISUAL_COLORS.concept} flex items-center justify-center p-8 md:p-12 overflow-hidden`}>
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div key={i} className="absolute w-2 h-2 rounded-full bg-primary/20" animate={{ x: [0, Math.random() * 100 - 50], y: [0, Math.random() * 100 - 50], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }} style={{ left: `${10 + i * 15}%`, top: `${20 + i * 10}%` }} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.4 }} className="relative z-10 text-center max-w-xl space-y-4">
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 10, delay: 0.1 }} className="text-4xl">
              {VISUAL_ICONS[slide.visualType] || "💡"}
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl font-display font-bold">
              {slide.heading}
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="text-sm md:text-base text-foreground/80 leading-relaxed">
              {slide.content}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xs text-muted-foreground/60 uppercase tracking-wider pt-2">
              Slide {currentSlide + 1} of {script.slides.length}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Playing indicator */}
        {isPlaying && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[0, 1, 2].map(i => (
                <motion.div key={i} animate={{ height: [4, 12, 4] }} transition={{ duration: 0.5, delay: i * 0.15, repeat: Infinity }} className="w-1 bg-primary rounded-full" />
              ))}
            </div>
            <span className="text-xs text-primary font-medium">{narrating ? "SPEAKING" : "LOADING..."}</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
      </div>

      {/* Controls */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={prevSlide} disabled={currentSlide === 0} className="h-9 w-9">
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button size="icon" onClick={togglePlay} className="h-10 w-10 glow-primary-sm">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={nextSlide} disabled={currentSlide >= script.slides.length - 1} className="h-9 w-9">
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-xs text-muted-foreground font-medium">
          {script.title}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setMuted(!muted)} className="h-9 w-9">
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={generateVideo} className="h-9 w-9" title="Regenerate">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Narration subtitle */}
      {isPlaying && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="px-4 pb-4">
          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-sm text-muted-foreground italic text-center">"{slide.narration}"</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
