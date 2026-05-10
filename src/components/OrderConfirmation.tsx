/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle, Home, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { OrderData } from '../types';

interface OrderConfirmationProps {
  order: OrderData;
  onBackToHome: () => void;
}

export default function OrderConfirmation({ order, onBackToHome }: OrderConfirmationProps) {
  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center pt-24 pb-20">
      <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-brand-beige shadow-sm text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-brand-green" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Hvala na porudžbini!</h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto">
            Vaša porudžbina domaćih jaja je uspešno poslata. Uskoro ćemo vas kontaktirati radi potvrde dostave.
          </p>

          <div className="bg-brand-cream rounded-3xl p-8 border border-brand-beige text-left mb-10">
            <h4 className="font-bold text-gray-900 mb-6 pb-4 border-b border-brand-beige">Detalji porudžbine</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Dostava na adresu</p>
                  <p className="text-gray-900 font-medium">{order.customer.fullName}</p>
                  <p className="text-gray-600">{order.customer.address}, {order.customer.city}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Kontakt telefon</p>
                  <p className="text-gray-900 font-medium">{order.customer.phone}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Poručeno</p>
                    <p className="text-gray-900 font-medium">{order.totalEggs} komada jaja</p>
                    <p className="text-sm text-gray-500">({order.items[0].quantity} pakovanja)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Za uplatu</p>
                    <p className="text-brand-green font-bold text-xl">{order.totalPrice} RSD</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-brand-green font-medium">
                  <Truck className="w-4 h-4" />
                  <span>Plaćanje pri dostavi</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onBackToHome}
            className="px-10 py-4 bg-brand-green text-white font-bold rounded-full shadow-lg hover:bg-opacity-90 transform active:scale-[0.98] transition-all flex items-center justify-center gap-3 mx-auto"
          >
            <Home className="w-5 h-5" />
            Nazad na početnu
          </button>
        </motion.div>
      </div>
    </div>
  );
}
