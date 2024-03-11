import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ArchiveButton() {
  return (
    <Link href="/Archive">
      <Button
        className={`
                bg-velgreen
                text-white
                hover:bg-vellightgreen
            `}
      >
        Archive
      </Button>
    </Link>
  );
}
