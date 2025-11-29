import { X } from 'lucide-react';
import { CodeDetail as CodeDetailType } from '../types';
import { PaymentChart } from './PaymentChart';

interface CodeDetailProps {
  code: CodeDetailType;
  onClose: () => void;
}

export function CodeDetail({ code, onClose }: CodeDetailProps) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 py-5 flex justify-between items-start z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              CPT {code.code}
            </h2>
            <p className="text-gray-600 mt-1">{code.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors p-1 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
              Category
            </h3>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-200 text-gray-800 border border-gray-300">
              {code.category}
            </span>
          </div>

          {(code.drg || code.apc) && (
            <div className="grid grid-cols-2 gap-4">
              {code.drg && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    DRG
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {code.drg}
                  </p>
                </div>
              )}
              {code.apc && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    APC
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {code.apc}
                  </p>
                </div>
              )}
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Payment by Site of Service
            </h3>
            <PaymentChart payments={code.payments} />
          </div>

          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Payment Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">IPPS (Inpatient):</span>
                <span className="font-semibold text-gray-900">
                  ${code.payments.IPPS.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">HOPD (Outpatient):</span>
                <span className="font-semibold text-gray-900">
                  ${code.payments.HOPD.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">ASC:</span>
                <span className="font-semibold text-gray-900">
                  ${code.payments.ASC.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">OBL (Non-facility):</span>
                <span className="font-semibold text-gray-900">
                  ${code.payments.OBL.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full bg-gray-700 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
