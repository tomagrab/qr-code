import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingCardDescription() {
  return (
    <div
      className={`
              flex
              items-start
              justify-between
              gap-4
            `}
    >
      <p
        className={`
                max-w-md
                text-lg
            `}
      >
        <Skeleton className={`h-8 w-full`} />
      </p>
    </div>
  );
}
