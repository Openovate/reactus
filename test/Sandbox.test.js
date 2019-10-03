// Browser testing
//see: https://itnext.io/testing-your-javascript-in-a-browser-with-jest-puppeteer-express-and-webpack-c998a37ef887
//this is needed for testing, which allows JSX to be transpiled on the server
require('@babel/polyfill');

test('Home Page Test', async () => {
  const page = await browser.newPage();
  await page.goto(PATH, { waitUntil: 'networkidle2' });

  const title = await page.title();
  const header = await page.$eval('h1', header => header.innerText)

  expect(title).toBe('Welcome!');
  expect(header).toBe('Home Page')
})

test('Navigation Test', async () => {
  const page = await browser.newPage();
  await page.goto(PATH, { waitUntil: 'networkidle2' });

  (await page.$$('a'))[1].click();

  await page.waitFor(500);

  const header = await page.$eval('h1', header => header.innerText);

  expect(header).toBe('Product 1');
})
