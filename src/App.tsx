import { useState } from 'react';
import { Layout } from './components/Layout';
import { TabNav } from './components/TabNav';
import { CodeExplorer } from './components/CodeExplorer';
import { CodeDetail } from './components/CodeDetail';
import { ReimbursementSimulator } from './components/ReimbursementSimulator';
import { codeService } from './services/codeService';
import { CodeDetail as CodeDetailType } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'explorer' | 'simulator'>('explorer');
  const [selectedCode, setSelectedCode] = useState<CodeDetailType | null>(null);

  const handleViewDetail = async (code: string) => {
    const detail = await codeService.getCodeDetail(code);
    if (detail) {
      setSelectedCode(detail);
    }
  };

  const handleCloseDetail = () => {
    setSelectedCode(null);
  };

  return (
    <Layout>
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'explorer' ? (
        <CodeExplorer onViewDetail={handleViewDetail} />
      ) : (
        <ReimbursementSimulator />
      )}

      {selectedCode && (
        <CodeDetail code={selectedCode} onClose={handleCloseDetail} />
      )}
    </Layout>
  );
}

export default App;
