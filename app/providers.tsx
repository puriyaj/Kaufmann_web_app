'use client';

import { ConfirmationProvider } from '@utils/hooks/confirmation.provider';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import { ActionContextProvider } from 'utils/hooks/action';
export const dynamic = 'force-dynamic';
export function Providers({ children }: any) {
  const [interval, setInterval] = useState(0);

  return (
    <>
      <SessionProvider >
        <ConfirmationProvider>
          <ActionContextProvider>{children}</ActionContextProvider>
        </ConfirmationProvider>
      </SessionProvider>
    </>
  );
}
