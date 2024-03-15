import LoadingCard from '@/components/Layout/Loading/LoadingCard/LoadingCard';

export default function Loading() {
  return (
    <main
      className={`
        flex
        grow
        flex-col
        items-center
        justify-center
    `}
    >
      <LoadingCard />
    </main>
  );
}
