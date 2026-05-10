/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, CheckCircle2, CalendarDays, Truck } from 'lucide-react';
import { useState, FormEvent, ChangeEvent } from 'react';
import { CartItem, OrderData } from '../types';
import {
  DELIVERY,
  formatRsd,
  formatSerbianDate,
  getDeliveryDeadline,
  getDeliveryFee,
  getNextDeliveryDate,
  getOrderTotal,
  getSubtotal,
} from '../constants';

interface CheckoutFormProps {
  items: CartItem[];
  onBack: () => void;
  onBackToProducts: () => void;
  onSubmit: (order: OrderData) => void;
}

export default function CheckoutForm({ items, onBack, onBackToProducts, onSubmit }: CheckoutFormProps) {
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
  const subtotal = getSubtotal(totalPackages);
  const deliveryFee = getDeliveryFee(totalPackages);
  const totalPrice = getOrderTotal(totalPackages);
  const deliveryDate = getNextDeliveryDate();
  const deliveryDeadline = getDeliveryDeadline(deliveryDate);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      items,
      subtotal,
      deliveryFee,
      totalPrice,
      totalEggs,
      totalPackages,
      deliveryDate: deliveryDate.toISOString(),
      deliveryDeadline: deliveryDeadline.toISOString(),
      customer: formData,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-cream pt-24 pb-20 flex items-center justify-center">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="bg-white rounded-[2rem] border border-brand-beige p-10 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Korpa je prazna</h2>
            <p className="text-gray-600 mb-8">Dodajte bar jedno pakovanje domaćih jaja pre nego što nastavite na poručivanje.</p>
            <button
              onClick={onBackToProducts}
              className="px-8 py-4 bg-brand-green text-white font-bold rounded-full shadow-lg hover:bg-opacity-90 transition-all"
            >
              Nazad na ponudu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-brand-green mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Nazad na početnu</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-brand-beige shadow-sm">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Podaci za dostavu</h2>
              <p className="text-gray-600 mb-8">
                Dostava se vrši sredom i subotom. Vaš prvi mogući termin je <strong>{formatSerbianDate(deliveryDate)}</strong>.
              </p>

              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-brand-cream border border-brand-beige p-4 flex gap-3">
                  <CalendarDays className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Planirani dan dostave</p>
                    <p className="text-sm text-gray-600">{formatSerbianDate(deliveryDate)}</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-brand-cream border border-brand-beige p-4 flex gap-3">
                  <Truck className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Pravila dostave</p>
                    <p className="text-sm text-gray-600">{DELIVERY.orderDeadlineText}</p>
                  </div>
                </div>
              </div>

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
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div>
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.quantity} pakovanja × {item.eggsPerPackage} jaja</p>
                    </div>
                    <span className="font-bold text-brand-green whitespace-nowrap">{formatRsd(item.quantity * item.pricePerPackage)}</span>
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
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Međuzbir:</span>
                  <span className="font-medium text-gray-900">{formatRsd(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Dostava:</span>
                  <span className="font-medium text-gray-900">{deliveryFee === 0 ? 'Besplatna' : formatRsd(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 mt-2 pt-3 border-t border-dashed border-brand-beige">
                  <span>Ukupan iznos:</span>
                  <span className="text-brand-green">{formatRsd(totalPrice)}</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-brand-cream rounded-2xl border border-brand-beige flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-gray-900">Način plaćanja</p>
                  <p className="text-sm text-gray-600">Plaćanje prilikom dostave (gotovina)</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-green-50 rounded-2xl border border-green-100 flex items-start gap-3">
                <CalendarDays className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-gray-900">Prvi mogući termin</p>
                  <p className="text-sm text-gray-600">{formatSerbianDate(deliveryDate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
