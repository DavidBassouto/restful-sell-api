import 'reflect-metadata';
import 'dotenv/config';
import { AppDataSource } from '../typeorm/data-source';
import { app } from './App';

(async () => {
  await AppDataSource.initialize().catch(err => {
    console.error('Error during Data Source initialization', err);
  });
  app.listen(process.env.PORT || 3333, () => {
    console.log('Server starded on port 3333!✨');
  });
})();
