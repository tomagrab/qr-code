import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export default function HeaderMobileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`
            text-white
            focus:ring-2
            focus:ring-slate-200
          `}
      >
        <Menu size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Pages</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={'/'}>Home</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={'/Archive'}>Archive</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={'/Inactive'}>Inactive</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
