import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Shield, Heart, Info, Activity, Search, X, MessageSquare } from 'lucide-react';
import { articles } from '../data/articles';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (query?: string) => {
    const finalQuery = query || searchQuery;
    if (finalQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(finalQuery.trim())}`);
      setShowRecommendations(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowRecommendations(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const categories = [
    { id: 'prevention', name: 'Prevention', icon: Shield, color: 'bg-blue-100 text-blue-700' },
    { id: 'treatment', name: 'Treatment', icon: Heart, color: 'bg-red-100 text-red-700' },
    { id: 'services', name: 'Services', icon: Info, color: 'bg-green-100 text-green-700' },
    { id: 'living-with-hiv', name: 'Living with HIV', icon: Activity, color: 'bg-purple-100 text-purple-700' },
    { id: 'user-stories', name: 'User Stories', icon: MessageSquare, color: 'bg-orange-100 text-orange-700' },
  ];

  const suggestedQueries = [
    'Single-pill HIV Therapy',
    'Oncemrk Trial',
    'Do I Need PrEP',
    'Single Tablet Regimen HIV',
    'Modern Triple Therapy HIV',
    'HIV Clinical Trials',
    'How to Fight HIV',
    'HIV and Dyslipidemia',
    'Impact of PrEP on HIV',
    'HIV Prevention Methods',
    'HIV Testing Services',
    'Living with HIV Support',
    'HIV Research Updates',
    'PrEP Side Effects',
    'U=U Campaign',
    'HIV Stigma Reduction'
  ];

  const recommendations = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const lowerQuery = searchQuery.toLowerCase();
    
    // 1. Prioritize queries starting with the input
    const startsWith = suggestedQueries.filter(q => 
      q.toLowerCase().startsWith(lowerQuery)
    );
    
    // 2. Then queries containing the input (but not starting with it)
    const contains = suggestedQueries.filter(q => 
      q.toLowerCase().includes(lowerQuery) && !q.toLowerCase().startsWith(lowerQuery)
    );
    
    // Combine and limit to 5
    return [...startsWith, ...contains].slice(0, 5);
  }, [searchQuery]);

  const filteredArticles = useMemo(() => {
    if (!searchQuery) return articles;
    const query = searchQuery.toLowerCase();
    return articles.filter(article => 
      article.title.toLowerCase().includes(query) || 
      article.excerpt.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const articlesByCategory = useMemo(() => {
    const grouped: Record<string, typeof articles> = {};
    categories.forEach(cat => {
      const limit = cat.name === 'User Stories' ? 8 : 16;
      grouped[cat.name] = filteredArticles.filter(a => a.category === cat.name).slice(0, limit);
    });
    return grouped;
  }, [filteredArticles, categories]);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-20 text-white md:px-12 md:py-32">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold tracking-tight md:text-6xl"
          >
            Find the HIV Information You Need
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-blue-100 md:text-xl"
          >
            Search our database of professional, evidence-based articles and resources.
          </motion.p>

          {/* Search Bar Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-10 max-w-2xl"
            ref={searchRef}
          >
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowRecommendations(true);
                }}
                onFocus={() => setShowRecommendations(true)}
                onKeyDown={handleKeyDown}
                placeholder="Search for PrEP, treatment, support..."
                className="h-16 w-full rounded-2xl border-none bg-white pl-14 pr-32 text-lg text-slate-900 shadow-2xl placeholder:text-slate-400 focus:ring-4 focus:ring-blue-400/50 transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
                <Button 
                  size="lg" 
                  className="rounded-xl bg-blue-600 px-6 font-semibold hover:bg-blue-700"
                  onClick={() => handleSearch()}
                >
                  Search
                </Button>
              </div>

              {/* Recommendations Dropdown */}
              <AnimatePresence>
                {showRecommendations && recommendations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/5"
                  >
                    <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Suggested Searches
                    </div>
                    {recommendations.map((rec, idx) => (
                      <button
                        key={rec}
                        onClick={() => {
                          setSearchQuery(rec);
                          handleSearch(rec);
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Search className="h-4 w-4 text-slate-400" />
                        <span className="font-medium">
                          {/* Highlight matching part */}
                          {rec.toLowerCase().startsWith(searchQuery.toLowerCase()) ? (
                            <>
                              <span className="font-bold text-blue-600">{rec.substring(0, searchQuery.length)}</span>
                              {rec.substring(searchQuery.length)}
                            </>
                          ) : (
                            rec
                          )}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Suggested Queries (Static) */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 group/info relative">
                <span className="text-sm font-bold tracking-wider text-blue-100/80">Popular Search</span>
                <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-blue-200/30 text-[11px] font-black text-blue-100 cursor-help transition-colors group-hover/info:border-white group-hover/info:text-white">
                  !
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 mb-3 w-64 -translate-x-1/2 scale-95 opacity-0 transition-all duration-200 group-hover/info:scale-100 group-hover/info:opacity-100 pointer-events-none z-50">
                  <div className="rounded-xl bg-slate-900 p-4 text-sm leading-relaxed text-white shadow-2xl ring-1 ring-white/10">
                    These are the most frequently searched topics by our community to help you find relevant information quickly.
                    <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-slate-900" />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {suggestedQueries.slice(0, 9).map((query) => (
                  <button
                    key={query}
                    onClick={() => {
                      setSearchQuery(query);
                      navigate(`/search?q=${encodeURIComponent(query)}`);
                    }}
                    className="text-sm font-semibold text-white bg-white/10 border border-white/20 px-5 py-2.5 rounded-full transition-all duration-200 hover:bg-white hover:text-blue-600 hover:border-white hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] whitespace-nowrap"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-700/20 blur-3xl" />
      </section>

      {/* Category Sections */}
      {categories.map((cat) => (
        <section key={cat.id} id={cat.id} className="scroll-mt-24">
          <div className="mb-8 flex items-end justify-between border-b pb-4">
            <div>
              <div className="flex items-center gap-3">
                <div className={cn("rounded-lg p-2", cat.color)}>
                  <cat.icon className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">{cat.name}</h2>
              </div>
              <p className="mt-2 text-slate-500">Latest resources and professional insights on {cat.name.toLowerCase()}.</p>
            </div>
              <div className="flex items-center gap-4">
                {cat.name === 'User Stories' && (
                  <Button 
                    variant="outline" 
                    className="hidden md:flex items-center gap-2 border-orange-200 text-orange-700 hover:bg-orange-50"
                    onClick={() => {
                      window.location.href = 'mailto:support@hivservice.com?subject=Share My Story&body=I would like to share my story with HIV Service Hub...';
                    }}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Share Your Story
                  </Button>
                )}
                <Link 
                to={`/category/${cat.name}`} 
                className={cn(buttonVariants({ variant: "ghost" }), "hidden md:flex items-center gap-2 text-blue-600")}
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {articlesByCategory[cat.name]?.length > 0 ? (
              articlesByCategory[cat.name].map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-xl">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-xl leading-snug">
                        <Link to={`/article/${article.id}`} className="hover:text-blue-600">
                          {article.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-3 mt-2">
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto border-t bg-slate-50/50 p-4">
                      <div className="flex w-full items-center justify-between text-xs text-slate-500">
                        <span className="font-medium">{article.author}</span>
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-400">
                No articles found matching your search in this category.
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Newsletter / CTA */}
      <section className="rounded-3xl bg-slate-900 px-6 py-12 text-white md:px-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">Stay Updated</h2>
          <p className="mt-4 text-slate-400">
            Subscribe to our newsletter to receive the latest professional articles and service updates directly in your inbox.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg bg-white/10 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Subscribe
            </Button>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
