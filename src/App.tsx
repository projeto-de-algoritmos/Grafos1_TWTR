import React from 'react';
import GlobalStyles from './styles/GlobalStyles';
import AppProvider from './hooks/index';

import Layout from './components/Layout';

const App: React.FC = () => (
  <>
    <AppProvider>
      <Layout />
    </AppProvider>

    <GlobalStyles />
  </>
);

export default App;
