/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (view: 'home' | 'checkout' | 'confirmation') => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Navbar({ cartCount, onOpenCart, onNavigate, onScrollToSection }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Početna', sectionId: 'home' },
    { name: 'Ponuda', sectionId: 'products' },
    { name: 'Kako poručiti', sectionId: 'how-it-works' },
    { name: 'Dostava', sectionId: 'delivery' },
    { name: 'Kontakt', sectionId: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-brand-cream/80 backdrop-blur-md border-b border-brand-beige/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="text-xl md:text-2xl font-display font-bold text-brand-green">
              Domaće Gnezdo
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                className="text-sm font-medium text-gray-600 hover:text-brand-green transition-colors"
                onClick={() => onScrollToSection(link.sectionId)}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenCart}
              className="relative p-2 text-gray-600 hover:text-brand-green transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-brand-yolk rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-cream border-b border-brand-beige"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  type="button"
                  className="block w-full text-left px-3 py-4 text-base font-medium text-gray-600 hover:bg-brand-beige rounded-lg"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onScrollToSection(link.sectionId);
                  }}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
