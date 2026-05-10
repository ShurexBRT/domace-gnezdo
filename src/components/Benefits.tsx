/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Leaf, Award, ShoppingBag, Truck } from 'lucide-react';
import { motion } from 'motion/react';

const benefits = [
  {
    title: 'Sveža jaja',
    text: 'Jaja se pažljivo biraju i pakuju za dostavu istog dana.',
    icon: Leaf,
    color: 'text-brand-green',
    bg: 'bg-green-50',
  },
  {
    title: 'Domaće poreklo',
    text: 'Direktno iz lokalnog domaćinstva, bez industrijskog osećaja.',
    icon: Award,
    color: 'text-brand-yolk',
    bg: 'bg-orange-50',
  },
  {
    title: 'Jednostavna kupovina',
    text: 'Izaberite broj pakovanja i pošaljite porudžbinu za manje od minut.',
    icon: ShoppingBag,
    color: 'text-brand-brown',
    bg: 'bg-stone-50',
  },
  {
    title: 'Dostava na adresu',
    text: 'Nakon porudžbine kontaktiramo vas radi potvrde termina dostave.',
    icon: Truck,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
];

export default function Benefits() {
  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Zašto Domaće Gnezdo?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-brand-beige shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-14 h-14 ${benefit.bg} rounded-2xl flex items-center justify-center mb-6`}>
                <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
