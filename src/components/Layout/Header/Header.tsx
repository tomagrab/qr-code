import { UserButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <header
      className={`
        flex
        w-full
        items-center
        rounded-t-lg
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
      ></div>
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
          Velocitor Solutions
        </h1>
      </div>
      <div
        className={`
          flex
          w-1/2
          justify-end
        `}
      >
        <UserButton />
      </div>
    </header>
  );
}
