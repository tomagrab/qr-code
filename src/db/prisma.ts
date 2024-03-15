import { QRCodeFormSchema } from '@/lib/schemas/QRCodeFormSchema/QRCodeFormSchema';
import { currentUser } from '@clerk/nextjs/server';
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
  youtube_title: string,
) => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error('User not found');
    }

    const userFullName = user.firstName + ' ' + user.lastName;
    const userEmail = user.emailAddresses[0].emailAddress;

    const qr_code = await prisma.qr_code.create({
      data: {
        title: values.title,
        description: values.description,
        active: values.active,
        archived: values.archived,
        youtube_title: youtube_title,
        youtube_url: values.youtube_url,
        pdf_url: values.pdf_url,
        author: userFullName || userEmail,
      },
    });

    return {
      qr_code,
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

    if (!qr_code) {
      throw new Error('QR code not found');
    }

    return qr_code;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const readQRCodesCount = async () => {
  try {
    const qr_codes_count = await prisma.qr_code.count();

    if (!qr_codes_count) {
      throw new Error('QR codes not found');
    }

    return qr_codes_count;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const readActiveQRCodesCount = async () => {
  try {
    const qr_codes_count = await prisma.qr_code.count({
      where: {
        active: true,
        archived: false,
      },
    });

    if (!qr_codes_count) {
      throw new Error('QR codes not found');
    }

    return qr_codes_count;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const readInactiveQRCodesCount = async () => {
  try {
    const qr_codes_count = await prisma.qr_code.count({
      where: {
        active: false,
      },
    });

    if (!qr_codes_count) {
      throw new Error('QR codes not found');
    }

    return qr_codes_count;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const readArchivedQRCodesCount = async () => {
  try {
    const qr_codes_count = await prisma.qr_code.count({
      where: {
        active: true,
        archived: true,
      },
    });

    if (!qr_codes_count) {
      throw new Error('QR codes not found');
    }

    return qr_codes_count;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const readQRCodes = async () => {
  try {
    const qr_codes = await prisma.qr_code.findMany({
      where: {
        active: true,
        archived: false,
      },
    });

    return qr_codes;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const readInactiveQRCodes = async () => {
  try {
    const qr_codes = await prisma.qr_code.findMany({
      where: {
        active: false,
      },
    });

    return qr_codes;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const readArchivedQRCodes = async () => {
  try {
    const qr_codes = await prisma.qr_code.findMany({
      where: {
        active: true,
        archived: true,
      },
    });

    return qr_codes;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const readAllQRCodes = async () => {
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
        createdAt: 'desc',
      },
    });

    return qr_code;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const readQRCodeByURL = async (
  urlType: 'youtube_url' | 'pdf_url',
  url: string,
) => {
  try {
    const qr_code = await prisma.qr_code.findFirst({
      where: {
        [urlType]: url,
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
  youtube_title: string,
  values: z.infer<typeof QRCodeFormSchema>,
) => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error('User not found');
    }

    const userFullName = user.firstName + ' ' + user.lastName;
    const userEmail = user.emailAddresses[0].emailAddress;

    // Get the current QR code record
    const currentQRCode = await readQRCode(id);

    if (!currentQRCode) {
      throw new Error('QR code not found');
    }

    // Get the version number of the current QR code record
    const currentVersion = currentQRCode?.version;

    // Generate a new version number for the updated QR code record
    const newVersion = currentVersion + 1;

    // Update the QR code with the new values and add a record to the QR code log
    const qr_code = await prisma.qr_code.update({
      where: {
        id,
      },
      data: {
        title: values.title,
        description: values.description,
        active: values.active,
        archived: values.archived,
        youtube_title: youtube_title,
        version: newVersion,
        author: userFullName || userEmail,
        youtube_url: values.youtube_url,
        pdf_url: values.pdf_url,
      },
    });

    return {
      qr_code,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const archiveQRCode = async (id: number) => {
  try {
    const qr_code = await prisma.qr_code.update({
      where: {
        id,
      },
      data: {
        archived: true,
      },
    });

    return qr_code;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const toggleArchiveQRCode = async (id: number) => {
  try {
    const qr_code = await readQRCode(id);

    if (!qr_code) {
      throw new Error('QR code not found');
    }

    // Update the version number of the QR code record
    const newVersion = qr_code.version + 1;

    const archived = qr_code.archived;

    const toggled_qr_code = await prisma.qr_code.update({
      where: {
        id,
      },
      data: {
        archived: !archived,
        version: newVersion,
      },
    });

    return toggled_qr_code;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const inactivateQRCode = async (id: number) => {
  try {
    const qr_code = await prisma.qr_code.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });

    return qr_code;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const toggleActiveQRCode = async (id: number) => {
  try {
    const qr_code = await readQRCode(id);

    if (!qr_code) {
      throw new Error('QR code not found');
    }

    // Update the version number of the QR code record
    const newVersion = qr_code.version + 1;

    const active = qr_code.active;

    const toggled_qr_code = await prisma.qr_code.update({
      where: {
        id,
      },
      data: {
        // Toggle active
        active: !active,
        // If active, set archived to false. If inactive, keep the current value
        archived: active ? false : qr_code.archived,
        // If active, set the youtube_url to the Velocitor QR Code website. If inactive, keep the current value
        youtube_url: active
          ? 'https://www.velocitor-qr-code.com/'
          : qr_code.youtube_url,
        // If active, set the youtube_title to 'No Title found'. If inactive, keep the current value
        youtube_title: active ? 'No Title found' : qr_code.youtube_title,
        // If active, set the pdf_url to the Velocitor QR Code website. If inactive, keep the current value
        pdf_url: active
          ? 'https://www.velocitor-qr-code.com/'
          : qr_code.pdf_url,
        version: newVersion,
      },
    });

    return toggled_qr_code;
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
    // Get a QR Code to copy into the new log entry
    const qr_code = await readQRCode(qr_code_id);

    if (!qr_code) {
      throw new Error('QR code not found');
    }

    // Create a new qr_code_log entry with the incremented version number
    const qr_code_log = await prisma.qr_code_log.create({
      data: {
        qr_code_id: qr_code_id,
        title: qr_code.title,
        description: qr_code.description,
        active: qr_code.active,
        archived: qr_code.archived,
        youtube_title: qr_code.youtube_title,
        version: qr_code.version,
        author: qr_code.author,
        youtube_url: qr_code.youtube_url,
        pdf_url: qr_code.pdf_url,
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
        createdAt: 'desc',
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    return qr_code_logs;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const readQRCodeLogsByQRCodeAndVersion = async (
  qr_code_id: number,
  version: number,
) => {
  try {
    const qr_code_log = await prisma.qr_code_log.findFirst({
      where: {
        qr_code_id,
        version,
      },
    });

    return qr_code_log;
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
