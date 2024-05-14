module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  moduleFileExtensions: ["ts", "js"],
  moduleDirectories: ["node_modules", "server"],
  moduleNameMapper: {
    "^utils/(.*)$": "<rootDir>/server/utils/$1",
    "^errors/(.*)$": "<rootDir>/server/errors/$1",
    "^services/(.*)$": "<rootDir>/server/services/$1",
  },
};
