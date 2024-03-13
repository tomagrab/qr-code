import HeaderNavButtons from '@/components/Layout/Header/HeaderNavButtons/HeaderNavButtons';
import HeaderMobileMenu from '@/components/Layout/Header/HeaderMobileMenu/HeaderMobileMenu';
import { Button } from '@/components/ui/button';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

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
          hidden
          w-1/2
          justify-start
          md:flex
        `}
      >
        <HeaderNavButtons />
      </div>
      <div
        className={`
          flex
          w-1/2
          justify-start
          md:hidden
        `}
      >
        <HeaderMobileMenu />
      </div>
      <div
        className={`
            shrink-0
          `}
      >
        <h1
          className={`
            hidden
            py-2
            text-center
            text-xl
            font-bold
            text-white
            md:block
          `}
        >
          Velocitor Solutions QR Code Manager
        </h1>
        <h1
          className={`
            block
            py-2
            text-center
            text-xl
            font-bold
            text-white
            md:hidden
          `}
        >
          QR Code Manager
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
