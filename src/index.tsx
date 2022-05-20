import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query'

//const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={client}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);
