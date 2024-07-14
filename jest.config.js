const dotenv = require("dotenv");
const nextJest = require("next/jest");

dotenv.config({ path: ".env.development" });

const createJestConfig = nextJest({
  dir: ".",
});

const jestConifg = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

module.exports = jestConifg;
