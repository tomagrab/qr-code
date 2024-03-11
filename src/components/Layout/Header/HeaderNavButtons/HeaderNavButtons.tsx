'use client';

import HeaderNavButton from '@/components/Layout/Header/HeaderNavButtons/HeaderNavButton/HeaderNavButton';
import { usePathname } from 'next/navigation';

export default function HeaderNavButtons() {
  const currentPath = usePathname();
  return (
    <>
      {currentPath === '/' ? (
        <HeaderNavButton href={`/Archive`} title={`Archive`} />
      ) : (
        <HeaderNavButton href={`/`} title={`Home`} />
      )}
    </>
  );
}
