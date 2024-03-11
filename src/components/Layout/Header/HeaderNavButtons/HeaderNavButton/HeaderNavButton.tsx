import Link from 'next/link';

type HeaderNavButtonProps = {
  href: string;
  title: string;
};

export default function HeaderNavButton({ href, title }: HeaderNavButtonProps) {
  return (
    <Link
      href={href}
      className={`
        rounded-md
        bg-velgreen
        px-2
        py-1
        text-sm
        text-white
        hover:bg-vellightgreen
      `}
    >
      {title}
    </Link>
  );
}
