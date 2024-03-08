import { QRCodeFormSchema } from '@/lib/schemas/QRCodeFormSchema/QRCodeFormSchema';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Define a main function to run your Prisma Client queries
async function main() {
  // ... you will write your Prisma Client queries here
}

// Run the `main` function and exit
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

/*
 * CRUD Operations
 * Create: Create a new record in your database
 * Read: Read a record from your database
 * Update: Update a record in your database
 * Delete: Delete a record from your database
 */

/*
 * QR Code CRUD
 */

export const createQRCode = async (
  values: z.infer<typeof QRCodeFormSchema>,
) => {
  try {
    const qr_code = await prisma.qr_code.create({
      data: {
        youtube_url: values.youtube_url,
        pdf_url: values.pdf_url,
      },
    });

    const qr_code_log = await createQRCodeLog(qr_code.id);

    return {
      qr_code,
      qr_code_log,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const readQRCode = async (id: number) => {
  try {
    const qr_code = await prisma.qr_code.findUnique({
      where: {
        id,
      },
    });

    return qr_code;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const readQRCodes = async () => {
  try {
    const qr_codes = await prisma.qr_code.findMany();

    return qr_codes;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const readMostRecentQRCode = async () => {
  try {
    const qr_code = await prisma.qr_code.findFirst({
      orderBy: {
        created_at: 'desc',
      },
    });

    return qr_code;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateQRCode = async (
  id: number,
  values: z.infer<typeof QRCodeFormSchema>,
) => {
  try {
    // Update the QR code with the new values and add a record to the QR code log
    const qr_code = await prisma.qr_code.update({
      where: {
        id,
      },
      data: {
        youtube_url: values.youtube_url,
        pdf_url: values.pdf_url,
      },
    });

    // Create a new record in the QR code log
    const updated_qr_code_log = await createQRCodeLog(qr_code.id);

    return {
      qr_code,
      updated_qr_code_log,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteQRCode = async (id: number) => {
  try {
    const qr_code = await prisma.qr_code.delete({
      where: {
        id,
      },
    });

    return qr_code;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/*
 * QR Code Log CRUD
 */

export const createQRCodeLog = async (qr_code_id: number) => {
  try {
    const qr_code_log = await prisma.qr_code_log.create({
      data: {
        qr_code_id,
      },
    });

    return qr_code_log;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const readQRCodeLog = async (id: number) => {
  try {
    const qr_code_log = await prisma.qr_code_log.findUnique({
      where: {
        id,
      },
    });

    return qr_code_log;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const readQRCodeLogs = async () => {
  try {
    const qr_code_logs = await prisma.qr_code_log.findMany();

    return qr_code_logs;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const readMostRecentQRCodeLog = async () => {
  try {
    const qr_code_log = await prisma.qr_code_log.findFirst({
      orderBy: {
        created_at: 'desc',
      },
    });

    return qr_code_log;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const readQRCodeLogsByQRCode = async (qr_code_id: number) => {
  try {
    const qr_code_logs = await prisma.qr_code_log.findMany({
      where: {
        qr_code_id,
      },
    });

    return qr_code_logs;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateQRCodeLog = async (id: number, qr_code_id: number) => {
  try {
    const qr_code_log = await prisma.qr_code_log.update({
      where: {
        id,
      },
      data: {
        qr_code_id,
      },
    });

    return qr_code_log;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteQRCodeLog = async (id: number) => {
  try {
    const qr_code_log = await prisma.qr_code_log.delete({
      where: {
        id,
      },
    });

    return qr_code_log;
  } catch (error) {
    console.error(error);
    return null;
  }
};
