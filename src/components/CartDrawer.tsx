/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, ShoppingBag, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const totalPackages = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalEggs = items.reduce((sum, item) => sum + (item.quantity * item.eggsPerPackage), 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.quantity * item.pricePerPackage), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-green" />
                <h2 className="text-xl font-bold text-gray-900">Vaša Korpa</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-brand-beige" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Vaša korpa je prazna</h3>
                  <p className="text-gray-500 mb-8">Niste dodali nijedno pakovanje jaja u korpu.</p>
                  <button
                    onClick={onClose}
                    className="px-8 py-3 bg-brand-green text-white font-bold rounded-full shadow-md hover:bg-opacity-90 transition-all"
                  >
                    Pogledaj ponudu
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-brand-cream rounded-2xl border border-brand-beige">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{item.name}</h4>
                        <p className="text-sm text-gray-500 mb-4">{item.eggsPerPackage} jaja po pakovanju</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-white rounded-full p-1 border border-gray-200">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="font-bold text-gray-900 w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                          <span className="font-bold text-brand-green">{item.quantity * item.pricePerPackage} RSD</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors self-start"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-8 border-t border-gray-100 bg-gray-50/50">
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Ukupno pakovanja</span>
                    <span>{totalPackages}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Ukupno jaja</span>
                    <span>{totalEggs}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200 border-dashed">
                    <span>Ukupno za uplatu</span>
                    <span className="text-brand-green">{totalPrice} RSD</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2 italic">* Plaćanje se vrši prilikom dostave</p>
                </div>
                
                <div className="flex flex-col gap-3">
                  <button
                    onClick={onCheckout}
                    className="w-full py-4 bg-brand-green text-white font-bold rounded-2xl shadow-lg hover:bg-opacity-90 transform active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    Idi na poručivanje
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-3 text-gray-500 font-medium hover:text-gray-900 transition-colors"
                  >
                    Nastavi kupovinu
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
