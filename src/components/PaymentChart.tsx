import { PaymentsBySite } from '../types';
import { formatCurrency } from '../utils/format';

interface PaymentChartProps {
  payments: PaymentsBySite;
}

export function PaymentChart({ payments }: PaymentChartProps) {
  const sites = ['IPPS', 'HOPD', 'ASC', 'OBL'] as const;
  const maxPayment = Math.max(...Object.values(payments));

  return (
    <div className="space-y-4">
      {sites.map((site) => {
        const payment = payments[site];
        const percentage = maxPayment > 0 ? (payment / maxPayment) * 100 : 0;

        return (
          <div key={site} className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium text-gray-700">{site}</span>
              <span className="text-sm font-semibold text-gray-900">
                {formatCurrency(payment)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-9 relative overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-gray-600 to-gray-700 h-9 rounded-full transition-all duration-700 flex items-center justify-end pr-3 shadow-sm"
                style={{ width: `${percentage}%` }}
              >
                {percentage > 15 && (
                  <span className="text-xs font-semibold text-white">
                    {percentage.toFixed(0)}%
                  </span>
                )}
              </div>
              {percentage <= 15 && percentage > 0 && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-gray-700">
                  {percentage.toFixed(0)}%
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
