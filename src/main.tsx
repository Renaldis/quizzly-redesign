import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './global.css';
import { ConfigProvider } from 'antd';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontSize: 16,
          borderRadius: 12,
          fontFamily: 'system-ui',
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
);
