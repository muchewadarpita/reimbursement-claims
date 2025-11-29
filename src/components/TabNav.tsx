interface TabNavProps {
  activeTab: 'explorer' | 'simulator';
  onTabChange: (tab: 'explorer' | 'simulator') => void;
}

export function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <div className="border-b border-gray-300 mb-6 bg-white rounded-t-lg">
      <nav className="-mb-px flex space-x-8 px-4">
        <button
          onClick={() => onTabChange('explorer')}
          className={`
            py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200
            ${
              activeTab === 'explorer'
                ? 'border-gray-700 text-gray-900 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-400'
            }
          `}
        >
          Code Explorer
        </button>
        <button
          onClick={() => onTabChange('simulator')}
          className={`
            py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200
            ${
              activeTab === 'simulator'
                ? 'border-gray-700 text-gray-900 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-400'
            }
          `}
        >
          Reimbursement Simulator
        </button>
      </nav>
    </div>
  );
}
