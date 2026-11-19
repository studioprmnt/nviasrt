import * as migration_20261119_032005_initial from './20261119_032005_initial';
import * as migration_20261119_120254_seo from './20261119_120254_seo';
import * as migration_20261119_121412_mcp from './20261119_121412_mcp';

export const migrations = [
  {
    up: migration_20261119_032005_initial.up,
    down: migration_20261119_032005_initial.down,
    name: '20261119_032005_initial',
  },
  {
    up: migration_20261119_120254_seo.up,
    down: migration_20261119_120254_seo.down,
    name: '20261119_120254_seo',
  },
  {
    up: migration_20261119_121412_mcp.up,
    down: migration_20261119_121412_mcp.down,
    name: '20261119_121412_mcp'
  },
];
