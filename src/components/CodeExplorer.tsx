import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { CodeSummary } from '../types';
import { codeService } from '../services/codeService';

interface CodeExplorerProps {
  onViewDetail: (code: string) => void;
}

export function CodeExplorer({ onViewDetail }: CodeExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [allCodes, setAllCodes] = useState<CodeSummary[]>([]);
  const [filteredCodes, setFilteredCodes] = useState<CodeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCodes = async () => {
      try {
        setLoading(true);
        const codes = await codeService.listCodes();
        setAllCodes(codes);
        setFilteredCodes(codes);
      } catch (err) {
        setError('Failed to load codes. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCodes();
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setFilteredCodes(allCodes);
        return;
      }

      try {
        setLoading(true);
        const results = await codeService.searchCodes(searchQuery);
        setFilteredCodes(results);
      } catch (err) {
        setError('Failed to search codes. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(performSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, allCodes]);

  return (
    <div className="bg-white rounded-lg border border-gray-300 shadow-sm">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Procedure Codes
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by code or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-gray-900 placeholder-gray-400 transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-700 bg-red-50">
                  {error}
                </td>
              </tr>
            ) : filteredCodes.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  No codes found matching your search
                </td>
              </tr>
            ) : (
              filteredCodes.map((code: CodeSummary) => (
                <tr
                  key={code.code}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {code.code}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {code.description}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800 border border-gray-300">
                      {code.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <button
                      onClick={() => onViewDetail(code.code)}
                      className="text-gray-700 hover:text-gray-900 font-medium transition-colors hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
