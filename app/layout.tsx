import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const dynamic = 'force-dynamic';
const Urls: string[] = ['/image/1.webp'];
export const metadata: Metadata = {
  title: 'Online Shop ',
  description: 'Buy cheap',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers> {children}</Providers>
        <div id="modal_root"></div>
        <div id="modal_barcode"></div>
        <div id="modal_magnifier"></div>
        <ToastContainer />
      </body>
    </html>
  );
}
