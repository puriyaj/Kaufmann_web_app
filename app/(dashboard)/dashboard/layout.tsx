'use client';
import { useState, useEffect } from 'react';
import Loader from '@cmp/common/Loader';

import Sidebar from '@cmp/Sidebar';
import Header from '@cmp/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div suppressHydrationWarning={true}>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">{children}</div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
