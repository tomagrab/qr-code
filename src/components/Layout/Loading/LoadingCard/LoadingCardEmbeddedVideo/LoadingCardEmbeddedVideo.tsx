import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingCardEmbeddedVideo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-lg bg-gray-900 shadow-md">
        <Skeleton
          className={`
            h-56
            w-full
            rounded-lg
            border
            border-gray-900
            md:h-[13.5rem]
            md:w-96
        `}
        />
      </div>
    </div>
  );
}
