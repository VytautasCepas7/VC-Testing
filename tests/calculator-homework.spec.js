// automation homeworks
const { test, expect } = require('@playwright/test');
const { DuckStartPage } = require('../pages/duckStartPage')
const { DuckResultsPage } = require('../pages/duckResultsPage')


test.describe('', () => {
  let page;
  
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    startPage = new DuckStartPage(page);
    resultsPage = new DuckResultsPage(page);
  });

  test.beforeEach(async () => {
    await startPage.goto();
  });

  // Builds, selectors, operations
  const builds =  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const selectors = ['div.intro-heading', '#selectBuild', '#number1Field', '#number2Field', '#selectOperationDropdown',
  '#calculateButton', '#numberAnswerField', '#integerSelect'];
  const operations = ['0', '1', '2', '3', '4'];

  
  // 1st test
  builds.forEach(option => {
    test.only(`Tests if there is all selectors in a build ${option}`, async () => {
      await page.selectOption(selectors[1], option);

      for(let index = 0; index < selectors.length; index++){
        const elementIsVisible = await page.isVisible(selectors[index]);
        expect(elementIsVisible).toBe(true);
      }
    });
  });



  // 2rd test
  builds.forEach(option => {
    test.only(`Tests if subtraction operation works as it should in build ${option}`, async () => {
      await page.selectOption(selectors[1], option);
      await page.selectOption(selectors[4], operations[1]);

      let number1 = Math.floor(Math.random() * 10) + 5;
      let number2 = Math.floor(Math.random() * 10) + 5;
      await page.fill('#number1Field', number1.toString());
      await page.fill('#number2Field', number2.toString());
      await page.click('#calculateButton');

      const actual = await page.inputValue('#numberAnswerField');
      const expected = (number1 - number2).toString();

      expect(actual).toBe(expected);
    });
  });

  // 3th test
  builds.forEach(option => {
    test.only(`Tests if multiply operation works as it should in build ${option}`, async () => {
      await page.selectOption(selectors[1], option);
      await page.selectOption(selectors[4], operations[2]);

      let number1 = Math.floor(Math.random() * 45) + 10;
      let number2 = Math.floor(Math.random() * 45) + 10;
      await page.fill('#number1Field', number1.toString());
      await page.fill('#number2Field', number2.toString());
      await page.click('#calculateButton');

      const actual = await page.inputValue('#numberAnswerField');
      const expected = (number1 * number2).toString();

      expect(actual).toBe(expected);
    });
  });

  // 4th test
  builds.forEach(option => {
    test.only(`Tests if there is calculate button in build ${option}`, async () => {
      await page.selectOption(selectors[1], option);
      const calculateButton = await page.isVisible(selectors[5]);
      expect(calculateButton).toBe(true);
    });
  });

  // 5nd test
  builds.forEach(option => {
    test.only(`When user selects concetanate, tests if "integers only" checkbox remains in build ${option}`, async () => {
      await page.selectOption(selectors[1], option);
      await page.selectOption(selectors[4], operations[4]);
      const integerCheckBox = await page.isVisible(selectors[7]);
      expect(integerCheckBox).toBe(false);
    });
  });

});

// Changes