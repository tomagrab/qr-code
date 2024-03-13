import { Label } from '@/components/ui/label';

type QRCodeTableFilterInputContainerProps = {
  labelTitle?: string;
  labelFor?: string;
  children: React.ReactNode;
};

export default function QRCodeTableFilterInputContainer({
  labelTitle,
  labelFor,
  children,
}: QRCodeTableFilterInputContainerProps) {
  return (
    <div
      className={`
        flex
        grow
        flex-col
        items-center
        gap-2
    `}
    >
      {labelTitle && labelFor ? (
        <Label htmlFor={labelFor}>{labelTitle}</Label>
      ) : null}
      {children}
    </div>
  );
}
