import 'dotenv/config';

import { Hero } from './src/models/hero.model.js';
import { client } from './src/utils/db.js';

try {
  await client.sync({ force: true });
  console.log('Tables were (re)created');
} catch (error) {
  console.log('Unable to sync models with tables', error);
}
