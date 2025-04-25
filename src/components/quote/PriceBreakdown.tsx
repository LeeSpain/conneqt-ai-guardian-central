
import { QuotePrice } from '@/types/quote';

interface PriceBreakdownProps {
  quotePrice: QuotePrice;
}

export const PriceBreakdown = ({ quotePrice }: PriceBreakdownProps) => (
  <div className="mt-8 p-6 bg-gray-50 rounded-lg">
    <h4 className="font-semibold mb-4">Estimated Monthly Price</h4>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>Base Price:</span>
        <span>€{quotePrice.basePrice.toFixed(2)}</span>
      </div>
      {quotePrice.discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Volume Discount:</span>
          <span>-€{quotePrice.discount.toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between">
        <span>VAT (21%):</span>
        <span>€{quotePrice.vat.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-semibold text-lg pt-2 border-t">
        <span>Total Monthly Price:</span>
        <span>€{quotePrice.total.toFixed(2)}</span>
      </div>
    </div>
  </div>
);
