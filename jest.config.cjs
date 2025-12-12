const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,

  // pega todos os testes .test.ts dentro de /tests
  testMatch: ["**/tests/**/*.test.ts"],

  // transforma TS e JS (senão o Jest quebra nos seus arquivos .js com import/export)
  transform: {
    "^.+\\.(ts|js)$": "ts-jest",
  },

  // remove o .js no caminho interno das importações
  // loginController.ts → "../repositories/userRepository.js"
  // vira → "../repositories/userRepository"
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
