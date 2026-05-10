/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useState, FormEvent, ChangeEvent } from 'react';
import { CartItem, OrderData } from '../types';

interface CheckoutFormProps {
  items: CartItem[];
  onBack: () => void;
  onSubmit: (order: OrderData) => void;
}

export default function CheckoutForm({ items, onBack, onSubmit }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    note: '',
  });

  const totalPackages = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalEggs = items.reduce((sum, item) => sum + (item.quantity * item.eggsPerPackage), 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.quantity * item.pricePerPackage), 0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      items,
      totalPrice,
      totalEggs,
      customer: formData,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-brand-cream pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-brand-green mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Nazad na korpu</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-brand-beige shadow-sm">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Podaci za dostavu</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Ime i prezime *</label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="npr. Marko Marković"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Broj telefona *</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="npr. 06x xxx xxxx"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Email adresa *</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="npr. vas.email@gmail.com"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Adresa za dostavu *</label>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="ulica i broj"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Grad / mesto *</label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="npr. Beograd"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Napomena za dostavu</label>
                  <textarea
                    name="note"
                    rows={4}
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Npr. Dostava posle 17h, pozovite pre dolaska..."
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all resize-none"
                  />
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full py-5 bg-brand-green text-white font-bold text-lg rounded-2xl shadow-xl hover:bg-opacity-90 transform active:scale-[0.99] transition-all"
                  >
                    Pošalji porudžbinu
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-12 xl:col-span-5">
            <div className="bg-white rounded-3xl p-8 border border-brand-beige shadow-sm sticky top-28">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Pregled porudžbine</h3>
              
              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.quantity} pakovanja x {item.eggsPerPackage} jaja</p>
                    </div>
                    <span className="font-bold text-brand-green">{item.quantity * item.pricePerPackage} RSD</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-brand-beige">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Ukupno pakovanja:</span>
                  <span className="font-medium text-gray-900">{totalPackages}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Ukupno jaja:</span>
                  <span className="font-medium text-gray-900">{totalEggs}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 mt-2">
                  <span>Ukupan iznos:</span>
                  <span className="text-brand-green">{totalPrice} RSD</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-brand-cream rounded-2xl border border-brand-beige flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-gray-900">Način plaćanja</p>
                  <p className="text-sm text-gray-600">Plaćanje prilikom dostave (gotovina)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
