/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: 'Koliko jaja ima jedno pakovanje?',
    answer: 'Jedno pakovanje sadrži 10 domaćih jaja.',
  },
  {
    question: 'Koliko košta jedno pakovanje?',
    answer: 'Jedno pakovanje od 10 jaja košta 400 RSD.',
  },
  {
    question: 'Koliko košta jedno jaje?',
    answer: 'Cena jednog jajeta je 40 RSD.',
  },
  {
    question: 'Kako se vrši dostava?',
    answer: 'Nakon porudžbine kontaktiramo vas radi potvrde termina i adrese dostave.',
  },
  {
    question: 'Kako se plaća?',
    answer: 'Plaćanje se vrši prilikom dostave.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-12">Česta pitanja</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-brand-beige overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-900">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="px-6 pb-5 text-gray-600 border-t border-brand-beige/50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
