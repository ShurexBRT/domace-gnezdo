/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { PRODUCT, IMAGES } from '../constants';
import { CartItem } from '../types';

interface ProductSectionProps {
  onAddToCart: (item: CartItem) => void;
}

export default function ProductSection({ onAddToCart }: ProductSectionProps) {
  const [quantity, setQuantity] = useState(1);

  const totalEggs = quantity * PRODUCT.eggsPerPackage;
  const totalPrice = quantity * PRODUCT.pricePerPackage;

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

  const handleAdd = () => {
    onAddToCart({
      id: PRODUCT.id,
      name: PRODUCT.name,
      pricePerPackage: PRODUCT.pricePerPackage,
      quantity: quantity,
      eggsPerPackage: PRODUCT.eggsPerPackage
    });
  };

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Naša Ponuda</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Fokusirani smo na kvalitet, ne na kvantitet. Nudimo vam najbolje iz našeg dvorišta.
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
                Novo u ponudi
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
                  <span className="text-3xl font-bold text-brand-green">{PRODUCT.pricePerPackage} RSD</span>
                  <span className="text-gray-500">/ pakovanje</span>
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                  <span>1 pakovanje = {PRODUCT.eggsPerPackage} jaja</span>
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                  <span>{PRODUCT.pricePerEgg} RSD po jajetu</span>
                </div>
              </div>

              {/* Quantity & Summary */}
              <div className="mt-10 p-6 bg-white rounded-2xl border border-brand-beige">
                <p className="text-sm font-semibold text-gray-900 mb-4 text-center">Izaberite broj pakovanja</p>
                <div className="flex items-center justify-between gap-6">
                  <button
                    onClick={handleDecrement}
                    className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-5 h-5 text-gray-600" />
                  </button>
                  <span className="text-2xl font-bold text-gray-900 w-12 text-center">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-dashed border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Ukupno: {quantity} pakovanja ({totalEggs} jaja)</span>
                    <span className="font-bold text-gray-900">{totalPrice} RSD</span>
                  </div>
                </div>
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
