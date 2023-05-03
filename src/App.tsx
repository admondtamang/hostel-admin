import React from 'react';
import { path } from '@pages/path';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from '../components/context/userContext';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const router = createBrowserRouter(path);

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
