import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { articles } from '../data/articles';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Activity, Shield, Heart, Info, MessageSquare } from 'lucide-react';

export const Category: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const filteredArticles = articles.filter((a) => a.category === name);

  const categoryIcons: Record<string, any> = {
    'Prevention': Shield,
    'Treatment': Heart,
    'Services': Info,
    'Living with HIV': Activity,
    'News': Activity,
    'User Stories': MessageSquare,
  };

  const Icon = categoryIcons[name || ''] || Activity;

  return (
    <div className="space-y-12">
      {/* Category Header */}
      <header className="rounded-3xl bg-slate-100 px-6 py-12 md:px-12 md:py-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="rounded-2xl bg-blue-600 p-4 text-white shadow-lg">
            <Icon className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              {name}
            </h1>
            <p className="mt-2 text-lg text-slate-500">
              Professional resources and latest updates on {name?.toLowerCase()}.
            </p>
          </div>
        </div>
      </header>

      {/* Articles Grid */}
      <section>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, idx) => (
              <motion.div
                key={article.id}
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
            ))
          ) : (
            <div className="col-span-full py-24 text-center">
              <p className="text-xl text-slate-500">No articles found in this category yet.</p>
              <Link 
                to="/" 
                className={cn(buttonVariants({ variant: "link" }), "mt-4")}
              >
                Return Home
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
