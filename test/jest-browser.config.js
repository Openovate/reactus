module.exports = {
  preset: "jest-puppeteer",
  globals: {
    PATH: "http://localhost:3000"
  },
  testMatch: [
    "**/test/browser/**/*.test.js"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  }
}
