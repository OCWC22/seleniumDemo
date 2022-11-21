//https://www.lambdatest.com/blog/mocha-javascript-tutorial-with-examples-for-selenium-testing/
//https://github.com/SeleniumHQ/seleniumhq.github.io/blob/trunk/examples/javascript/test/getting_started/firstScript.spec.js

const { By, Builder } = require('selenium-webdriver');
const { suite } = require('selenium-webdriver/testing');
const AxeBuilder = require('@axe-core/webdriverjs');
const assert = require("assert");


suite(function(env) {
    //describe() - mocha - mainly to define creation fo test groups in Mocha, takes 2 arguments, first is the name of the test group, second is the function that contains the test cases

    describe('First script', function() {
        let driver;

        before(async function() {
            driver = await new Builder().forBrowser('chrome').build();
        });

        after(async () => await driver.quit());

        //it() - mocha - write invidivual Mocha test cases, takes 2 arguments, first is the name of the test case, second is the function that contains the test steps
        it('First Selenium script', async function() {
            await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

            let title = await driver.getTitle();
            //assertion library - assert - to verify the expected and actual results
            assert.equal("Web form", title);

            await driver.manage().setTimeouts({ implicit: 500 });

            let textBox = await driver.findElement(By.name('my-text'));
            let submitButton = await driver.findElement(By.css('button'));

            await textBox.sendKeys('Selenium');
            await submitButton.click();

            let message = await driver.findElement(By.id('message'));
            let value = await message.getText();
            assert.equal("Received!", value);
        });

    });
});