import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Calendar, ArrowRight, BookmarkX } from 'lucide-react';
import { articles } from '../data/articles';
import { useFavorites } from '../hooks/useFavorites';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const favoritedArticles = articles.filter((a) => favorites.includes(a.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-7xl"
    >
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Heart className="h-8 w-8 fill-current" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">My Favorites</h1>
        <p className="mt-4 text-lg text-slate-600">
          Your saved articles for quick access and reference.
        </p>
      </div>

      {favoritedArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {favoritedArticles.map((article) => (
            <motion.div
              key={article.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="group h-full overflow-hidden border-none shadow-md transition-all hover:shadow-xl">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white/90 text-blue-600 shadow-sm hover:bg-white hover:text-red-500"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(article.id);
                      }}
                    >
                      <BookmarkX className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardHeader className="p-6">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium text-blue-600 uppercase tracking-wider">
                    {article.category}
                  </div>
                  <CardTitle className="line-clamp-2 text-xl font-bold leading-tight group-hover:text-blue-600">
                    <Link to={`/article/${article.id}`}>{article.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="mb-6 line-clamp-3 text-sm text-slate-600 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                    <Link
                      to={`/article/${article.id}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Read More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-20 px-4 text-center shadow-sm">
          <div className="mb-6 rounded-full bg-slate-100 p-6 text-slate-400">
            <Heart className="h-12 w-12" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">No favorites yet</h2>
          <p className="mt-2 max-w-md text-slate-500">
            Start exploring our articles and click the bookmark icon to save the ones you find most helpful.
          </p>
          <Link to="/">
            <Button className="mt-8 bg-blue-600 hover:bg-blue-700">
              Browse Articles
            </Button>
          </Link>
        </div>
      )}
    </motion.div>
  );
};
