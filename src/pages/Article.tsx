import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, ExternalLink, Share2, Bookmark, Check, Copy } from 'lucide-react';
import { articles } from '../data/articles';
import { useFavorites } from '../hooks/useFavorites';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OFFICIAL_RESOURCES = [
  { title: 'CDC - Centers for Disease Control and Prevention', url: 'https://www.cdc.gov' },
  { title: 'WHO - World Health Organization', url: 'https://www.who.int' },
  { title: 'NIH - National Institutes of Health', url: 'https://www.nih.gov' },
  { title: 'UNAIDS - Joint United Nations Programme on HIV/AIDS', url: 'https://www.unaids.org' }
];

export const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);
  const { isFavorited, toggleFavorite } = useFavorites();
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  if (!article) {
    return <Navigate to="/" replace />;
  }

  const favorited = article ? isFavorited(article.id) : false;

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: article.title,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareTooltip(true);
    setTimeout(() => setShowShareTooltip(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-7xl"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Main Content */}
        <article className="lg:col-span-8">
          <header className="mb-10">
            <div className="mb-4 flex items-center gap-4">
              <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                {article.category}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 md:text-xl">
              {article.title}
            </h1>
            <div className="mt-8 flex items-center justify-between border-y py-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{article.author}</p>
                  <p className="text-xs text-slate-500">Medical Contributor</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative z-10">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="cursor-pointer rounded-full transition-all hover:bg-blue-50 hover:text-blue-600"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleShare();
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <AnimatePresence>
                    {showShareTooltip && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white shadow-lg"
                      >
                        <div className="flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          Link Copied!
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={cn(
                      "cursor-pointer rounded-full transition-all z-10",
                      favorited ? "bg-blue-50 text-blue-600 border-blue-200" : "hover:bg-blue-50 hover:text-blue-600"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (article) toggleFavorite(article.id);
                    }}
                  >
                    <Bookmark className={cn("h-4 w-4", favorited && "fill-current")} />
                  </Button>
              </div>
            </div>
          </header>

          <div className="prose prose-slate prose-base max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 prose-img:rounded-2xl">
            {(() => {
              // Remove markdown images from content to prevent duplicates
              const cleanContent = article.content.replace(/!\[.*?\]\(.*?\)/g, '');
              const paragraphs = cleanContent.trim().split(/\n\s*\n/);
              const firstParagraph = paragraphs[0];
              const remainingParagraphs = paragraphs.slice(1).join('\n\n');

              return (
                <>
                  <Markdown>{firstParagraph}</Markdown>
                  {article.image && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="my-8 overflow-hidden rounded-2xl shadow-lg"
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full object-cover"
                      />
                    </motion.div>
                  )}
                  <Markdown>{remainingParagraphs}</Markdown>
                </>
              );
            })()}
          </div>

          <Separator className="my-12" />

          {/* Related Links in Content */}
          <div className="rounded-2xl bg-slate-100 p-8">
            <h3 className="mb-4 text-lg font-bold">Official Resources</h3>
            <ul className="space-y-4">
              {OFFICIAL_RESOURCES.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md hover:text-blue-600"
                  >
                    <span className="font-medium">{link.title}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-8">
            {/* Related Articles */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Related Articles</h3>
              {articles
                .filter((a) => a.id !== article.id && a.category === article.category)
                .slice(0, 3)
                .map((a) => (
                  <Link key={a.id} to={`/article/${a.id}`} className="group block">
                    <div className="flex gap-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={a.image}
                          alt={a.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <h4 className="line-clamp-2 text-sm font-bold leading-snug group-hover:text-blue-600">
                          {a.title}
                        </h4>
                        <p className="mt-1 text-xs text-slate-500">
                          {new Date(a.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            {/* Newsletter Card */}
            <Card className="bg-slate-900 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Stay Informed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-slate-400">
                  Get the latest HIV health updates and service news delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-md bg-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </motion.div>
  );
};
