import React from 'react';

import { UsersProvider } from './users';

const AppProvider: React.FC = ({ children }) => (
  <UsersProvider>{children}</UsersProvider>
);

export default AppProvider;
