/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { IMAGES } from '../constants';
import { motion } from 'motion/react';

interface HeroProps {
  onStartShopping: () => void;
}

export default function Hero({ onStartShopping }: HeroProps) {
  return (
    <section id="home" className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Sveža domaća jaja <br />
              <span className="text-brand-green italic">direktno do vašeg stola</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
              Naručite domaća jaja u pakovanju od 10 komada — sveža, pažljivo odabrana i spremna za dostavu na vašu adresu.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onStartShopping}
                className="px-8 py-4 bg-brand-green text-white font-semibold rounded-full shadow-lg hover:bg-opacity-90 transform hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
              >
                Naruči jaja
              </button>
              <button
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-brand-green font-semibold rounded-full border-2 border-brand-green hover:bg-brand-beige transition-all"
              >
                Pogledaj ponudu
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative z-10 border-8 border-white">
              <img
                src={IMAGES.hero}
                alt="Sveža domaća jaja u korpi"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decals */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-yolk/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-green/10 rounded-full blur-3xl -z-10" />
            
            <div className="absolute -bottom-6 right-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-brand-beige">
              <div className="w-12 h-12 bg-brand-yolk rounded-full flex items-center justify-center text-white">
                <span className="font-bold">100%</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Prirodno & Domaće</p>
                <p className="text-xs text-gray-500">Bez industrijske obrade</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
