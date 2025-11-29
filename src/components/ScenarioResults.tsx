import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ReimbursementScenarioResponse } from '../types';
import { formatCurrency } from '../utils/format';

interface ScenarioResultsProps {
  results: ReimbursementScenarioResponse;
}

export function ScenarioResults({ results }: ScenarioResultsProps) {

  const getClassificationConfig = () => {
    switch (results.classification) {
      case 'profitable':
        return {
          bg: 'bg-gradient-to-r from-gray-100 to-gray-50',
          border: 'border-gray-300',
          text: 'text-gray-900',
          badge: 'bg-gray-700 text-white',
          icon: TrendingUp,
          iconColor: 'text-gray-700',
          label: 'Profitable',
        };
      case 'break-even':
        return {
          bg: 'bg-gradient-to-r from-gray-200 to-gray-100',
          border: 'border-gray-400',
          text: 'text-gray-900',
          badge: 'bg-gray-600 text-white',
          icon: Minus,
          iconColor: 'text-gray-700',
          label: 'Break-Even',
        };
      case 'loss':
        return {
          bg: 'bg-gradient-to-r from-gray-300 to-gray-200',
          border: 'border-gray-500',
          text: 'text-gray-900',
          badge: 'bg-gray-800 text-white',
          icon: TrendingDown,
          iconColor: 'text-gray-700',
          label: 'Loss',
        };
    }
  };

  const config = getClassificationConfig();
  const Icon = config.icon;

  const deviceCost = results.totalPayment - results.margin;
  const maxValue = Math.max(
    results.totalPayment,
    deviceCost,
    Math.abs(results.margin)
  );

  return (
    <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
      <div
        className={`${config.bg} ${config.border} border-b px-6 py-4 flex items-center justify-between`}
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white rounded-lg">
            <Icon className={`w-4 h-4 ${config.iconColor}`} />
          </div>
          <span
            className={`text-sm font-semibold uppercase tracking-wider ${config.text}`}
          >
            {config.label}
          </span>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${config.badge} shadow-sm`}>
          Margin: {formatCurrency(results.margin)}
        </span>
      </div>

      <div className="p-6 space-y-6 bg-gradient-to-br from-white to-gray-50">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Base Payment</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(results.basePayment)}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Add-On Payment</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(results.addOnPayment)}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Payment</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(results.totalPayment)}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Net Margin</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(results.margin)}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Financial Breakdown
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm text-gray-600">Total Payment</span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(results.totalPayment)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-7 shadow-inner">
                <div
                  className="bg-gradient-to-r from-gray-600 to-gray-700 h-7 rounded-full transition-all duration-700 shadow-sm"
                  style={{
                    width: `${(results.totalPayment / maxValue) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm text-gray-600">Device Cost</span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(deviceCost)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-7 shadow-inner">
                <div
                  className="bg-gray-500 h-7 rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: `${(deviceCost / maxValue) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm text-gray-600">Margin</span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(results.margin)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-7 shadow-inner">
                <div
                  className="bg-gray-800 h-7 rounded-full transition-all duration-700 shadow-sm"
                  style={{
                    width: `${(Math.abs(results.margin) / maxValue) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
          <p className="text-xs text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Classification Thresholds:</strong> Profitable (margin ≥
            $1,000), Break-Even (margin between -$500 and $1,000), Loss (margin
            &lt; -$500)
          </p>
        </div>
      </div>
    </div>
  );
}
