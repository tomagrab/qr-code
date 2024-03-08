import { z } from 'zod';

const MAX_FILE_SIZE = 4500000;
const ACCEPTED_FILE_TYPES = ['application/pdf'];

export const PDFUploadFromSchema = z.object({
  // Allow only PDF files that are less than 4.5MB
  pdf: z.any().refine(
    file => {
      if (file) {
        console.log('Selected file size: ', file.size);
        return (
          file.size <= MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type)
        );
      }
      return false;
    },
    {
      message: 'File must be a PDF and less than 4.5MB',
    },
  ),
});
