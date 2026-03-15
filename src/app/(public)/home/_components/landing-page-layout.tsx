import { Layout } from 'antd';
import type { ReactNode } from 'react';
import Navbar from './Navbar';
import HomeFooter from '../../../_components/footer';

export default function LandingPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Layout
      style={{
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />

      <main className="">{children}</main>

      <HomeFooter />
    </Layout>
  );
}
