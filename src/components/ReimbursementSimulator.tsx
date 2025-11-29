import { useState, useEffect, FormEvent } from 'react';
import { Calculator } from 'lucide-react';
import { SiteOfService, ReimbursementScenarioResponse, CodeSummary } from '../types';
import { codeService } from '../services/codeService';
import { reimbursementService } from '../services/reimbursementService';
import { ScenarioResults } from './ScenarioResults';

export function ReimbursementSimulator() {
  const [code, setCode] = useState('');
  const [siteOfService, setSiteOfService] = useState<SiteOfService>('HOPD');
  const [deviceCost, setDeviceCost] = useState('');
  const [ntapAddOn, setNtapAddOn] = useState('');
  const [results, setResults] = useState<ReimbursementScenarioResponse | null>(
    null
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [allCodes, setAllCodes] = useState<CodeSummary[]>([]);
  const [codesLoading, setCodesLoading] = useState(true);

  useEffect(() => {
    const loadCodes = async () => {
      try {
        setCodesLoading(true);
        const codes = await codeService.listCodes();
        setAllCodes(codes);
      } catch (err) {
        setError('Failed to load codes. Please refresh the page.');
        console.error(err);
      } finally {
        setCodesLoading(false);
      }
    };
    loadCodes();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setResults(null);

    if (!code || !deviceCost) {
      setError('Please fill in all required fields');
      return;
    }

    const deviceCostNum = parseFloat(deviceCost);
    if (isNaN(deviceCostNum) || deviceCostNum < 0) {
      setError('Device cost must be a valid positive number');
      return;
    }

    const ntapAddOnNum = ntapAddOn ? parseFloat(ntapAddOn) : undefined;
    if (ntapAddOn && (isNaN(ntapAddOnNum!) || ntapAddOnNum! < 0)) {
      setError('NTAP add-on must be a valid positive number');
      return;
    }

    try {
      setLoading(true);
      const scenario = await reimbursementService.calculateScenario({
        code,
        siteOfService,
        deviceCost: deviceCostNum,
        ntapAddOn: ntapAddOnNum,
      });

      if (!scenario) {
        setError('Code not found. Please select a valid procedure code.');
        return;
      }

      setResults(scenario);
    } catch (err: any) {
      setError(err.message || 'Failed to calculate scenario. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCode('');
    setSiteOfService('HOPD');
    setDeviceCost('');
    setNtapAddOn('');
    setResults(null);
    setError('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Calculator className="w-5 h-5 text-gray-700" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Calculate Reimbursement
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Procedure Code
            </label>
            <select
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-gray-900 transition-all disabled:bg-gray-50 disabled:text-gray-500"
              required
              disabled={codesLoading}
            >
              <option value="">{codesLoading ? 'Loading codes...' : 'Select a code...'}</option>
              {allCodes.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} - {c.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="siteOfService"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Site of Service
            </label>
            <select
              id="siteOfService"
              value={siteOfService}
              onChange={(e) => setSiteOfService(e.target.value as SiteOfService)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-gray-900 transition-all"
              required
            >
              <option value="IPPS">IPPS (Inpatient)</option>
              <option value="HOPD">HOPD (Hospital Outpatient)</option>
              <option value="ASC">ASC (Ambulatory Surgery Center)</option>
              <option value="OBL">OBL (Office-Based Lab)</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="deviceCost"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Device Cost
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                $
              </span>
              <input
                type="number"
                id="deviceCost"
                value={deviceCost}
                onChange={(e) => setDeviceCost(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-gray-900 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="ntapAddOn"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              NTAP Add-On Payment{' '}
              <span className="text-gray-500 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                $
              </span>
              <input
                type="number"
                id="ntapAddOn"
                value={ntapAddOn}
                onChange={(e) => setNtapAddOn(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-gray-900 transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gray-700 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Calculating...
                </span>
              ) : (
                'Calculate'
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <div>
        {results ? (
          <ScenarioResults results={results} />
        ) : (
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="p-3 bg-gray-200 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Calculator className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-600 font-medium">
              Fill in the form and click Calculate to see results
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
