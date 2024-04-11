import config from '../../config/config';
import AppDataSource from './ormconfig';
import AppDataSourceSeed from './ormconfig-seed';

export default config.env === 'development'? AppDataSourceSeed: AppDataSource;
  