/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 pt-16 pb-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <h2 className="font-display font-bold text-3xl mb-6 text-brand-green">Domaće Gnezdo</h2>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              Sveža domaća jaja, pravo iz dvorišta do vašeg stola. Verujemo u kvalitet, lokalnu proizvodnju i poverenje naših kupaca.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-bold mb-6">Navigacija</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#home" className="hover:text-brand-green transition-colors">Početna</a></li>
              <li><a href="#products" className="hover:text-brand-green transition-colors">Ponuda</a></li>
              <li><a href="#delivery" className="hover:text-brand-green transition-colors">Dostava</a></li>
              <li><a href="#contact" className="hover:text-brand-green transition-colors">Kontakt</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-bold mb-6">Kontakt info</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-green" />
                <span>06x xxx xxxx</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-green" />
                <span>kontakt@domacegnezdo.rs</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-green" />
                <span>Lokalno domaćinstvo, Srbija</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Domaće Gnezdo. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
}
