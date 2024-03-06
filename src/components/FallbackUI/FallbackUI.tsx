import Header from '@/components/Layout/Header/Header';

export default function FallbackUI() {
  return (
    <main
      className={`
          flex
          flex-col
          items-center
          justify-center
          gap-4
          rounded-lg
          border
          border-gray-200
          shadow-md
        `}
    >
      <Header />
      <div
        className={`
            flex
            flex-col
            items-center
            gap-4
            p-4
            pt-0
          `}
      >
        <p
          className={`
              text-center
            `}
        >
          No video has been added yet.
        </p>
      </div>
    </main>
  );
}
