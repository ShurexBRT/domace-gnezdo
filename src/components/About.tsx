/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { IMAGES } from '../constants';
import { motion } from 'motion/react';

export default function About() {
  return (
    <section className="py-20 bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-brand-beige">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Visual */}
            <div className="lg:col-span-5 h-[400px] lg:h-auto order-2 lg:order-1">
              <img
                src={IMAGES.farm}
                alt="Naša mala farma"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Text */}
            <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-center order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                Malo domaćinstvo, <br />
                <span className="text-brand-green italic">velika pažnja prema kvalitetu</span>
              </h2>
              <p className="mt-8 text-lg text-gray-600 leading-relaxed">
                Naša domaća jaja dolaze iz lokalnog domaćinstva gde se svako pakovanje pažljivo bira i priprema za kupce. Ideja je jednostavna — sveža jaja bez komplikacija, direktno do vaše kuhinje.
              </p>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Verujemo u prirodan ciklus i transparentnost. Od koka koje slobodno kljucaju u dvorištu do vašeg doručka, svaki korak je prožet poštovanjem prema prirodi i krajnjem korisniku.
              </p>
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-brand-beige overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Kupac" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 font-medium">Preko 100+ zadovoljnih porodica</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
