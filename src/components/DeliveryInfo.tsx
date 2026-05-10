/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Info, Banknote } from 'lucide-react';

export default function DeliveryInfo() {
  return (
    <section id="delivery" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Dostava domaćih jaja</h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Porudžbine se potvrđuju nakon slanja forme. Dostava se dogovara prema vašoj adresi i dostupnim terminima.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-brand-cream p-8 rounded-3xl border border-brand-beige flex gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <Info className="w-6 h-6 text-brand-green" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Potvrda termina</h4>
              <p className="text-sm text-gray-600">Nakon što primimo vašu porudžbinu, pozvaćemo vas ili poslati poruku radi dogovora o tačnom vremenu dostave.</p>
            </div>
          </div>

          <div className="bg-brand-cream p-8 rounded-3xl border border-brand-beige flex gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <Banknote className="w-6 h-6 text-brand-green" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Plaćanje pri dostavi</h4>
              <p className="text-sm text-gray-600">Nema plaćanja karticom unapred. Celokupan iznos plaćate isključivo gotovinom kada vam jaja budu uručena.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
