export default function Header() {
  return (
    <header
      className={`
        w-full
        rounded-t-lg
        bg-velblue
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
        QR Code Updater
      </h1>
    </header>
  );
}
