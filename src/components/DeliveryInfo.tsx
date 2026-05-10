/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Info, Banknote, CalendarDays, Truck, Gift } from 'lucide-react';
import { DELIVERY, formatRsd } from '../constants';

export default function DeliveryInfo() {
  return (
    <section id="delivery" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Dostava domaćih jaja</h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Dostava se planira unapred kako bi jaja stigla sveža, bez haosa i improvizacije. Porudžbine grupišemo po rutama i dostavljamo sredom i subotom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-brand-cream p-8 rounded-3xl border border-brand-beige flex gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <CalendarDays className="w-6 h-6 text-brand-green" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Dostavni dani</h4>
              <p className="text-sm text-gray-600">Dostava se vrši svake srede i subote. Tačno vreme dogovaramo nakon potvrde porudžbine.</p>
            </div>
          </div>

          <div className="bg-brand-cream p-8 rounded-3xl border border-brand-beige flex gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <Info className="w-6 h-6 text-brand-green" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Rok za poručivanje</h4>
              <p className="text-sm text-gray-600">Poručivanje za sredu je do utorka u {DELIVERY.cutoffHour}:00, a za subotu do petka u {DELIVERY.cutoffHour}:00.</p>
            </div>
          </div>

          <div className="bg-brand-cream p-8 rounded-3xl border border-brand-beige flex gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <Truck className="w-6 h-6 text-brand-green" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Cena dostave</h4>
              <p className="text-sm text-gray-600">Za 1–2 pakovanja dostava je {formatRsd(DELIVERY.fee)}. Za 3 ili više pakovanja dostava je besplatna.</p>
            </div>
          </div>

          <div className="bg-brand-cream p-8 rounded-3xl border border-brand-beige flex gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <Banknote className="w-6 h-6 text-brand-green" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Plaćanje pri dostavi</h4>
              <p className="text-sm text-gray-600">Nema plaćanja karticom unapred. Celokupan iznos plaćate gotovinom kada vam jaja budu uručena.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] bg-brand-green text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
            <Gift className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Najisplativije: 3 pakovanja</h3>
            <p className="text-white/90 leading-relaxed">
              Za 3 pakovanja dobijate 30 domaćih jaja za 1.200 RSD i besplatnu dostavu. To je najbolja opcija za porodicu i za planiranu dostavu bez dodatnih troškova.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
