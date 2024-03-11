import { Button } from '@/components/ui/button';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import HeaderNavButtons from './HeaderNavButtons/HeaderNavButtons';

export default function Header() {
  return (
    <header
      className={`
        flex
        w-full
        items-center
        bg-velblue
        px-4
        py-2
      `}
    >
      <div
        className={`
          flex
          w-1/2
          justify-start
        `}
      >
        <SignedIn>
          <HeaderNavButtons />
        </SignedIn>
      </div>
      <div
        className={`
            shrink-0
          `}
      >
        <h1
          className={`
            py-2
            text-center
            text-xl
            font-bold
            text-white
        `}
        >
          Velocitor Solutions QR Code Manager
        </h1>
      </div>
      <div
        className={`
          flex
          w-1/2
          justify-end
        `}
      >
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button
              className={`
                bg-velgreen
                text-white
                hover:bg-vellightgreen
              `}
            >
              Sign in
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}
