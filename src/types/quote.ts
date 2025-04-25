
export interface QuoteFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  serviceType: string;
  hoursPerDay: string;
  daysPerWeek: string;
  language: string;
  message: string;
}

export interface QuotePrice {
  basePrice: number;
  discount: number;
  finalPrice: number;
  vat: number;
  total: number;
}
