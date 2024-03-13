import { SignedIn, useUser } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { qr_code } from '@prisma/client';

type QRCodeDetailsBodyProps = {
  qr_code_author: qr_code['author'];
  qr_code_active: qr_code['active'];
  qr_code_archived: qr_code['archived'];
};

export default async function QRCodeDetailsBody({
  qr_code_author,
  qr_code_active,
  qr_code_archived,
}: QRCodeDetailsBodyProps) {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  const isWriter =
    userEmail === process.env.NEXT_PUBLIC_WRITER_EMAIL_1 ||
    userEmail === process.env.NEXT_PUBLIC_WRITER_EMAIL_2;
  return (
    <div className="flex flex-col justify-evenly">
      <SignedIn>
        {user && isWriter ? <p>Author:&nbsp;{qr_code_author}</p> : null}
      </SignedIn>
      <p>
        Active:&nbsp;
        {qr_code_active ? (
          <span className="font-bold text-green-500">&nbsp;Yes</span>
        ) : (
          <span className="font-bold text-red-500">&nbsp;No</span>
        )}
      </p>
      <p>
        Archived:
        {qr_code_archived ? (
          <span className="font-bold text-green-500">&nbsp;Yes</span>
        ) : (
          <span className="font-bold text-red-500">&nbsp;No</span>
        )}
      </p>
    </div>
  );
}
