import HeaderNavButton from '@/components/Layout/Header/HeaderNavButtons/HeaderNavButton/HeaderNavButton';
import { currentUser } from '@clerk/nextjs/server';

export default async function HeaderNavButtons() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  const isWriter =
    userEmail === process.env.NEXT_PUBLIC_WRITER_EMAIL_1 ||
    userEmail === process.env.NEXT_PUBLIC_WRITER_EMAIL_1;

  const navButtons = [
    { href: '/', title: 'Home', restricted: false },
    { href: '/Archive', title: 'Archive', restricted: true },
    { href: '/Inactive', title: 'Inactive', restricted: true },
  ];

  return (
    <div
      className={`
        flex
        justify-start
        gap-4
      `}
    >
      {navButtons.map(button => {
        if (button.restricted && (!user || !isWriter)) {
          return null;
        }

        return (
          <HeaderNavButton
            key={button.href}
            href={button.href}
            title={button.title}
          />
        );
      })}
    </div>
  );
}
