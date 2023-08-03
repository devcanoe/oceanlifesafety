import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  roots: ["<rootDir>/src/", "<rootDir>/__tests__/"],
  coverageDirectory: '__tests__',
  transform: {
  "^.+\\.ts?$": "ts-jest",
  },
  "testMatch": [
    "**/*.test.ts"
 ]
};

export default config;