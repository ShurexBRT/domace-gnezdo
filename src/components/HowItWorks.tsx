/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

const steps = [
  {
    number: '01',
    title: 'Izaberite broj pakovanja',
    text: 'Odlučite koliko svežih jaja vam je potrebno (prodaja ide na 10 komada).',
  },
  {
    number: '02',
    title: 'Unesite podatke',
    text: 'Popunite jednostavnu formu sa adresom i kontaktom za dostavu.',
  },
  {
    number: '03',
    title: 'Potvrda i dostava',
    text: 'Kontaktiramo vas za potvrdu i donosimo jaja na vaš kućni prag.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Kako poručiti?</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Proces je brz i jednostavan, baš kao što bi domaća kupovina trebalo da bude.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-brand-beige" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="text-center relative z-10"
            >
              <div className="w-16 h-16 bg-brand-green text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg border-4 border-brand-cream">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed px-4">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
