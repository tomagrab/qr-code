'use client';
import { usePathname } from 'next/navigation';
import HomeButton from './HomeButton/HomeButton';
import ArchiveButton from './ArchiveButton/ArchiveButton';

export default function HeaderNavButtons() {
  const currentPath = usePathname();
  return <>{currentPath === '/' ? <ArchiveButton /> : <HomeButton />}</>;
}
