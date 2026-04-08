import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Shield, Activity, Info, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Activity },
    { name: 'Prevention', path: '/#prevention', icon: Shield },
    { name: 'Treatment', path: '/#treatment', icon: Heart },
    { name: 'Services', path: '/#services', icon: Info },
    { name: 'Living with HIV', path: '/#living-with-hiv', icon: Activity },
    { name: 'User Stories', path: '/#user-stories', icon: MessageSquare },
    { name: 'Favorites', path: '/favorites', icon: Heart },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
            <Activity className="h-8 w-8" />
            <span>HIV Service Hub</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link to={item.path}>
                      <NavigationMenuLink className={cn(
                        navigationMenuTriggerStyle(), 
                        (location.pathname + location.hash === item.path || (location.pathname === item.path && !location.hash && item.path === '/')) && "bg-slate-100 text-blue-600"
                      )}>
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="border-t bg-white p-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-slate-100",
                    (location.pathname + location.hash === item.path || (location.pathname === item.path && !location.hash && item.path === '/')) ? "bg-slate-100 text-blue-600" : "text-slate-600"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
                <Activity className="h-6 w-6" />
                <span>HIV Service Hub</span>
              </Link>
              <p className="mt-4 max-w-md text-sm text-slate-500 leading-relaxed">
                Empowering individuals and communities with professional, evidence-based information about HIV prevention, treatment, and support services. Our mission is to reduce stigma and improve health outcomes through education.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">Quick Links</h3>
              <ul className="space-y-2 text-sm text-slate-500">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className={cn("hover:text-blue-600", (location.pathname + location.hash === item.path || (location.pathname === item.path && !location.hash && item.path === '/')) && "text-blue-600 font-medium")}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">Resources</h3>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="https://www.cdc.gov/hiv" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">CDC HIV/AIDS</a></li>
                <li><a href="https://www.hiv.gov" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">HIV.gov</a></li>
                <li><a href="https://www.who.int/health-topics/hiv-aids" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">WHO HIV/AIDS</a></li>
                <li><a href="https://www.unaids.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">UNAIDS</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-xs text-slate-400">
            <p>© {new Date().getFullYear()} HIV Service Hub. All rights reserved. Professional information for a healthier future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
