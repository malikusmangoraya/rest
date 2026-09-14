import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
export default function Footer() {
  return (
    <footer className="bg-background border-t py-12 text-foreground">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">LumicorePro</span>
          <Badge variant="outline">v1.0</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Input type="email" placeholder="Subscribe to newsletter" className="max-w-xs" />
          <Button type="submit">Subscribe</Button>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} LumicorePro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

```jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import LumicorePro from './LumicorePro';
import Badge from '@/components/ui/Badge';
import Input from '@/components/forms/Input';
import Button from '@/components/ui/Button';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sub, setSub] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSub(true);
    }
  };

  const handleAnchorClick = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="text-white" style={{ backgroundColor: 'var(--t-footer)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          <div className="space-y-4">
            <LumicorePro dark />
            <p className="text-sm text-slate-300 leading-relaxed max-w-xs">
              Building exceptional digital products with performance, security, and design excellence.
            </p>
            <div>
              <Badge
                variant="success"
                size="sm"
                dot
                className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-medium"
              >
                99.99% Operational
              </Badge>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" onClick={handleAnchorClick} className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" onClick={handleAnchorClick} className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Stay Updated</h4>
            <p className="text-xs text-slate-300 mb-3">Weekly product updates and insights.</p>
            {sub ? (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="h-4 w-4" /> Subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full"
                  inputClassName="border-white/20 bg-white/10 text-xs text-white placeholder-slate-400 focus:border-white/40 focus:outline-none"
                />
                <Button
                  type="submit"
                  size="sm"
                  fullWidth
                  className="bg-[#b8860b] hover:bg-[#966d09] text-white text-xs font-semibold transition-colors"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Rest. All rights reserved. Powered by{' '}
            <span className="font-semibold text-white">LumicorePro</span>.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" onClick={handleAnchorClick} className="hover:text-white">
              Twitter
            </a>
            <a href="#" onClick={handleAnchorClick} className="hover:text-white">
              LinkedIn
            </a>
            <a href="#" onClick={handleAnchorClick} className="hover:text-white">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```;
