'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type HeaderNavButtonProps = {
  href: string;
  title: string;
};

export default function HeaderNavButton({ href, title }: HeaderNavButtonProps) {
  const currentPath = usePathname();
  const isActive =
    currentPath === href || (currentPath.includes(href) && href !== '/');

  return (
    <Link href={href}>
      <Button
        variant={'ghost'}
        className={`
        ${isActive ? 'bg-vellink hover:bg-vellightlink' : ' hover:bg-vellink'}
        text-sm
        text-white
        hover:text-white
      `}
      >
        {title}
      </Button>
    </Link>
  );
}
