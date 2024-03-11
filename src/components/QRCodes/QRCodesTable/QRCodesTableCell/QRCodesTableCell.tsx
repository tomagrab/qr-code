type QRCodesTableCellProps = {
  children: React.ReactNode;
};

export default function QRCodesTableCell({ children }: QRCodesTableCellProps) {
  return <div className="flex items-center justify-center">{children}</div>;
}
