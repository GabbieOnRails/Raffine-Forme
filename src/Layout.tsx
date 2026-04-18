import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
