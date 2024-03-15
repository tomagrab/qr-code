import LoadingTable from '@/components/Layout/Loading/LoadingTable/LoadingTable';

export default function Loading() {
  return (
    <main>
      <ArchiveLoadingHeader />
      <LoadingTable numberOfButtons={5} numberOfColumns={7} numberOfRows={5} />
    </main>
  );
}

const ArchiveLoadingHeader = () => {
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
        Archived QR Codes
      </h2>
    </div>
  );
};
