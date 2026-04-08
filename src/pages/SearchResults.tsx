import React, { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { articles } from '../data/articles';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';

export const SearchResults: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return articles.filter(article => 
      article.title.toLowerCase().includes(lowerQuery) || 
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.category.toLowerCase().includes(lowerQuery) ||
      article.content.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const displayArticles = useMemo(() => {
    if (results.length > 0) return results;
    
    // If no results, pick 5 random articles
    const shuffled = [...articles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }, [results]);

  return (
    <div className="space-y-12 pb-24">
      {/* Search Header */}
      <header className="rounded-3xl bg-slate-100 px-6 py-12 md:px-12 md:py-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="rounded-2xl bg-blue-600 p-4 text-white shadow-lg">
            <SearchIcon className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Search Results
            </h1>
            <p className="mt-2 text-lg text-slate-500">
              {results.length > 0 
                ? `Found ${results.length} results for "${query}"`
                : `No results found for "${query}". Here are some recommended articles for you.`}
            </p>
          </div>
        </div>
        <Link 
          to="/" 
          className={cn(buttonVariants({ variant: "ghost" }), "mt-4 flex items-center gap-2 text-blue-600")}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </header>

      {/* Results Grid */}
      <section>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayArticles.map((article, idx) => (
            <motion.div
              key={`${article.id}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="group flex h-full flex-col overflow-hidden transition-all hover:shadow-xl">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
          ))}
        </div>
      </section>
    </div>
  );
};
