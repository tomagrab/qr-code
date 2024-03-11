import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomeButton() {
  return (
    <Link href="/">
      <Button
        className={`
                bg-velgreen
                text-white
                hover:bg-vellightgreen
            `}
      >
        Home
      </Button>
    </Link>
  );
}
