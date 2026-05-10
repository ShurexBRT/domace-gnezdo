export const PRODUCT = {
  id: 'domaca-jaja-10',
  name: 'Domaća jaja — 10 komada',
  pricePerPackage: 400,
  eggsPerPackage: 10,
  pricePerEgg: 40,
  currency: 'RSD',
};

export const DELIVERY = {
  fee: 450,
  freeDeliveryMinPackages: 3,
  deliveryDays: [3, 6], // JavaScript days: 3 = Wednesday, 6 = Saturday
  cutoffHour: 18,
  orderDeadlineText: 'Porudžbine za sredu primamo do utorka u 18:00, a za subotu do petka u 18:00.',
};

export const COLORS = {
  cream: '#FAF9F6',
  beige: '#F5F5DC',
  yolk: '#FFCC33',
  green: '#4F7942',
  brown: '#8B4513',
  gray: '#333333',
};

export const IMAGES = {
  hero: '/images/domaca-jaja-hero.png',
  product: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=1974&auto=format&fit=crop',
  farm: '/images/nasa-mala-farma.png',
};

export function formatRsd(amount: number): string {
  return new Intl.NumberFormat('sr-RS').format(amount) + ' RSD';
}

export function getSubtotal(packageCount: number): number {
  return packageCount * PRODUCT.pricePerPackage;
}

export function getDeliveryFee(packageCount: number): number {
  return packageCount >= DELIVERY.freeDeliveryMinPackages ? 0 : DELIVERY.fee;
}

export function getFreeDeliveryRemaining(packageCount: number): number {
  return Math.max(DELIVERY.freeDeliveryMinPackages - packageCount, 0);
}

export function getOrderTotal(packageCount: number): number {
  return getSubtotal(packageCount) + getDeliveryFee(packageCount);
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function atCutoff(date: Date): Date {
  const cutoff = new Date(date);
  cutoff.setHours(DELIVERY.cutoffHour, 0, 0, 0);
  return cutoff;
}

function isBeforeOrAtCutoff(date: Date): boolean {
  return date.getTime() <= atCutoff(date).getTime();
}

export function getNextDeliveryDate(fromDate: Date = new Date()): Date {
  const day = fromDate.getDay();
  const beforeCutoff = isBeforeOrAtCutoff(fromDate);

  // Delivery is Wednesday. Last valid order time: Tuesday 18:00.
  if (day === 0 || day === 1 || (day === 2 && beforeCutoff)) {
    const daysToWednesday = (3 - day + 7) % 7 || 7;
    return addDays(fromDate, daysToWednesday);
  }

  // Delivery is Saturday. Last valid order time: Friday 18:00.
  if (day === 2 || day === 3 || day === 4 || (day === 5 && beforeCutoff)) {
    const daysToSaturday = (6 - day + 7) % 7 || 7;
    return addDays(fromDate, daysToSaturday);
  }

  // After Friday cutoff or during Saturday: move to next Wednesday.
  const daysToNextWednesday = (3 - day + 7) % 7 || 7;
  return addDays(fromDate, daysToNextWednesday);
}

export function getDeliveryDeadline(deliveryDate: Date): Date {
  const deadline = new Date(deliveryDate);
  const deliveryDay = deliveryDate.getDay();

  // Wednesday delivery -> Tuesday cutoff.
  if (deliveryDay === 3) {
    deadline.setDate(deliveryDate.getDate() - 1);
  }

  // Saturday delivery -> Friday cutoff.
  if (deliveryDay === 6) {
    deadline.setDate(deliveryDate.getDate() - 1);
  }

  deadline.setHours(DELIVERY.cutoffHour, 0, 0, 0);
  return deadline;
}

export function formatSerbianDate(date: Date): string {
  return new Intl.DateTimeFormat('sr-RS', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
