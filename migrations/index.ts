import * as migration_20261119_032005_initial from './20261119_032005_initial';

export const migrations = [
  {
    up: migration_20261119_032005_initial.up,
    down: migration_20261119_032005_initial.down,
    name: '20261119_032005_initial'
  },
];
