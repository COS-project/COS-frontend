'use client';

import './globals.css';

import { RecoilRoot } from 'recoil';

import Timer from '@/components/common/Timer';

// export const metadata: Metadata = {
//   title: 'COS project',
//   description: 'Generated by create next app',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="">
      <RecoilRoot>
        <body>{children}</body>
        <Timer></Timer>
      </RecoilRoot>
    </html>
  );
}
