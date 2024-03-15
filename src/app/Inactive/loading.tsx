import LoadingTable from '@/components/Layout/Loading/LoadingTable/LoadingTable';

export default function Loading() {
  return (
    <main>
      <InactiveLoadingHeader />
      <LoadingTable numberOfButtons={5} numberOfColumns={7} numberOfRows={5} />
    </main>
  );
}

const InactiveLoadingHeader = () => {
  return (
    <div
      className={`
              flex
              flex-row
              items-center
              gap-2
              px-2
              py-4
          `}
    >
      <h2
        className={`
                text-2xl
                font-bold
              `}
      >
        Inactive QR Codes
      </h2>
    </div>
  );
};
