type QRCodesTableHeaderProps = {
  title: string;
};

export default function QRCodesTableHeader({ title }: QRCodesTableHeaderProps) {
  return <h2 className="flex items-center justify-center">{title}</h2>;
}
