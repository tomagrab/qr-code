import { sql } from 'drizzle-orm';
import {
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

export const qrCode = pgTable(
  'qr_code',
  {
    id: serial('id').primaryKey(),
    url: varchar('url', { length: 256 }),
    createdAt: timestamp('created_at').default(sql`now()`),
  },
  qrCode => {
    return {
      urlIndex: uniqueIndex('url_idx').on(qrCode.url),
    };
  },
);
