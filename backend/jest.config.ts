import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  preset:"ts-jest",
  rootDir: '.',
  transform: {
  "^.+\\.ts?$": "ts-jest",
  },
  "testMatch": [
    "**/*.test.ts"
 ]
};

export default config;