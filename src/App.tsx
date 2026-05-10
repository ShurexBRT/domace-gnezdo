/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import DeliveryInfo from './components/DeliveryInfo';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutForm from './components/CheckoutForm';
import OrderConfirmation from './components/OrderConfirmation';
import { CartItem, View, OrderData } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [order, setOrder] = useState<OrderData | null>(null);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => 
      prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const handleNavigate = (newView: View) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    handleNavigate('checkout');
  };

  const handleSubmitOrder = (orderData: OrderData) => {
    setOrder(orderData);
    setCartItems([]);
    handleNavigate('confirmation');
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onNavigate={handleNavigate}
      />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero onStartShopping={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} />
            
            {/* Trust Strip */}
            <div className="bg-white border-y border-brand-beige py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-gray-900">Sveža jaja</p>
                    <p className="text-sm text-gray-500">Pravo iz dvorišta</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-gray-900">Pakovanje 10 kom</p>
                    <p className="text-sm text-gray-500">Standardna mera</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-gray-900">40 RSD</p>
                    <p className="text-sm text-gray-500">Cena po jajetu</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-gray-900">Lokalna dostava</p>
                    <p className="text-sm text-gray-500">Brzo i sigurno</p>
                  </div>
                </div>
              </div>
            </div>

            <ProductSection onAddToCart={handleAddToCart} />
            <Benefits />
            <HowItWorks />
            <About />
            <DeliveryInfo />
            <FAQ />

            {/* Final CTA */}
            <section className="py-20 bg-brand-green text-white text-center">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Spremni za sveža domaća jaja?</h2>
                <p className="text-lg opacity-90 mb-10 max-w-xl mx-auto">
                  Izaberite broj pakovanja i pošaljite porudžbinu za manje od minut.
                </p>
                <button
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-12 py-4 bg-white text-brand-green font-bold rounded-full shadow-2xl hover:bg-brand-cream transition-all transform hover:-translate-y-1"
                >
                  Naruči odmah
                </button>
              </div>
            </section>

            <Footer />
          </motion.div>
        )}

        {view === 'checkout' && (
          <motion.div
            key="checkout"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <CheckoutForm 
              items={cartItems} 
              onBack={() => handleNavigate('home')} 
              onSubmit={handleSubmitOrder}
            />
            <Footer />
          </motion.div>
        )}

        {view === 'confirmation' && order && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <OrderConfirmation 
              order={order} 
              onBackToHome={() => handleNavigate('home')} 
            />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
