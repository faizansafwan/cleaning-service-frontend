'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const noNavbarRoutes = ['/', '/register'];
  const shouldShowNavbar = !noNavbarRoutes.includes(pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <main className={shouldShowNavbar ? 'pt-20' : ''}>{children}</main>
    </>
  );
}
