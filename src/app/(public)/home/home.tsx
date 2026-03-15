import { Layout } from 'antd';
import HomeBanner from './_components/home-banner';
import LandingPageCard from './_components/landing-page-card';

const Home = () => {
  return (
    <Layout style={{ padding: '16px', background: '#fff' }}>
      <HomeBanner />
      <LandingPageCard />
    </Layout>
  );
};

export default Home;
