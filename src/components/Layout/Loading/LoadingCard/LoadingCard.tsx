import { Skeleton } from '@/components/ui/skeleton';
import LoadingCardHeader from './LoadingCardHeader/LoadingCardHeader';
import LoadingCardEmbeddedVideo from './LoadingCardEmbeddedVideo/LoadingCardEmbeddedVideo';

type LoadingCardProps = {};

export default function LoadingCard({}: LoadingCardProps) {
  return (
    <div
      className={`
            rounded-md
            border
            bg-white
            shadow-md
            `}
    >
      <LoadingCardHeader />
      <div
        className={`
            flex
            flex-col
            gap-4
            p-4
          `}
      >
        <h3
          className={`
                    text-center
                    text-2xl
                    font-bold
                  `}
        >
          <Skeleton
            className={`
            h-8
            w-full
          `}
          />
        </h3>
        <LoadingCardEmbeddedVideo />
      </div>
    </div>
  );
}
