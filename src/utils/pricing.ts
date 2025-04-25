
import { QuotePrice } from '@/types/quote';

export const calculateQuotePrice = (hoursPerDay: string, daysPerWeek: string): QuotePrice | null => {
  if (!hoursPerDay || !daysPerWeek) return null;

  const baseHourlyRate = 28; // €28/hour
  const hours = Number(hoursPerDay);
  const days = Number(daysPerWeek);
  const totalHours = hours * days * 4; // Monthly hours
  
  let discount = 0;
  if (hours >= 12) discount = 0.05; // 5% discount
  if (hours === 24 && days === 7) discount = 0.10; // 10% discount
  
  const basePrice = totalHours * baseHourlyRate;
  const discountAmount = basePrice * discount;
  const finalPrice = basePrice - discountAmount;
  const vat = finalPrice * 0.21; // 21% VAT
  const total = finalPrice + vat;

  return {
    basePrice,
    discount: discountAmount,
    finalPrice,
    vat,
    total
  };
};
