/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plus, Minus, ShoppingCart, Truck } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import {
  PRODUCT,
  IMAGES,
  DELIVERY,
  formatRsd,
  getDeliveryFee,
  getFreeDeliveryRemaining,
  getOrderTotal,
  getSubtotal,
} from '../constants';
import { CartItem } from '../types';

interface ProductSectionProps {
  onAddToCart: (item: CartItem) => void;
}

export default function ProductSection({ onAddToCart }: ProductSectionProps) {
  const [quantity, setQuantity] = useState(1);

  const totalEggs = quantity * PRODUCT.eggsPerPackage;
  const subtotal = getSubtotal(quantity);
  const deliveryFee = getDeliveryFee(quantity);
  const totalPrice = getOrderTotal(quantity);
  const remainingForFreeDelivery = getFreeDeliveryRemaining(quantity);

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

  const handleAdd = () => {
    onAddToCart({
      id: PRODUCT.id,
      name: PRODUCT.name,
      pricePerPackage: PRODUCT.pricePerPackage,
      quantity,
      eggsPerPackage: PRODUCT.eggsPerPackage,
    });
  };

  return (
    <section id="products" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Naša Ponuda</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Jednostavno: domaća jaja u pakovanju od 10 komada. Najisplativije je 3 pakovanja jer tada dobijate besplatnu dostavu.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-brand-cream rounded-3xl overflow-hidden shadow-sm border border-brand-beige flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <img
                src={IMAGES.product}
                alt={PRODUCT.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-brand-green text-white px-4 py-1 rounded-full text-sm font-bold">
                3+ pakovanja = besplatna dostava
              </div>
            </div>

            {/* Content */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{PRODUCT.name}</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Sveža domaća jaja iz lokalnog domaćinstva, pažljivo birana za svakodnevnu upotrebu — idealna za doručak, kolače, domaću testeninu i porodičnu kuhinju.
              </p>

              <div className="mt-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-brand-green">{formatRsd(PRODUCT.pricePerPackage)}</span>
                  <span className="text-gray-500">/ pakovanje</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span>1 pakovanje = {PRODUCT.eggsPerPackage} jaja</span>
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                  <span>{PRODUCT.pricePerEgg} RSD po jajetu</span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-white border border-brand-beige p-4 flex gap-3 items-start">
                <Truck className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                <div className="text-sm text-gray-600">
                  <p className="font-bold text-gray-900">Dostava sredom i subotom</p>
                  <p>{formatRsd(DELIVERY.fee)} za 1–2 pakovanja. Besplatna dostava za 3 ili više pakovanja.</p>
                </div>
              </div>

              {/* Quantity & Summary */}
              <div className="mt-8 p-6 bg-white rounded-2xl border border-brand-beige">
                <p className="text-sm font-semibold text-gray-900 mb-4 text-center">Izaberite broj pakovanja</p>
                <div className="flex items-center justify-between gap-6">
                  <button
                    onClick={handleDecrement}
                    className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label="Smanji broj pakovanja"
                  >
                    <Minus className="w-5 h-5 text-gray-600" />
                  </button>
                  <span className="text-2xl font-bold text-gray-900 w-12 text-center">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label="Povećaj broj pakovanja"
                  >
                    <Plus className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-dashed border-gray-200 space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Pakovanja / jaja</span>
                    <span className="font-bold text-gray-900">{quantity} pak. / {totalEggs} jaja</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Međuzbir</span>
                    <span className="font-bold text-gray-900">{formatRsd(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Dostava</span>
                    <span className="font-bold text-gray-900">{deliveryFee === 0 ? 'Besplatna' : formatRsd(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-brand-beige text-base">
                    <span className="font-bold text-gray-900">Ukupno</span>
                    <span className="font-bold text-brand-green">{formatRsd(totalPrice)}</span>
                  </div>
                </div>

                {remainingForFreeDelivery > 0 ? (
                  <p className="mt-4 rounded-xl bg-brand-beige/60 px-4 py-3 text-sm font-medium text-gray-700 text-center">
                    Dodajte još {remainingForFreeDelivery} {remainingForFreeDelivery === 1 ? 'pakovanje' : 'pakovanja'} i ostvarite besplatnu dostavu.
                  </p>
                ) : (
                  <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-brand-green text-center">
                    Ostvarili ste besplatnu dostavu.
                  </p>
                )}
              </div>

              <button
                onClick={handleAdd}
                className="mt-8 w-full py-4 bg-brand-green text-white font-bold rounded-2xl shadow-lg hover:bg-opacity-90 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-5 h-5" />
                Dodaj u korpu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
