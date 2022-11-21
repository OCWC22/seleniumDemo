//https://www.lambdatest.com/blog/mocha-javascript-tutorial-with-examples-for-selenium-testing/
//https://github.com/SeleniumHQ/seleniumhq.github.io/blob/trunk/examples/javascript/test/getting_started/firstScript.spec.js

const { By, Builder } = require('selenium-webdriver');
const { suite } = require('selenium-webdriver/testing');
const AxeBuilder = require('@axe-core/webdriverjs');
const assert = require("chai").assert;


suite(function(env) {
    //describe() - mocha - mainly to define creation fo test groups in Mocha, takes 2 arguments, first is the name of the test group, second is the function that contains the test cases

    describe('First script', function() {
        let driver;

        before(async function() {
            // start the driver session
            driver = await new Builder().forBrowser('chrome').build();
        });

        after(async () => await driver.quit());

        //it() - mocha - write invidivual Mocha test cases, takes 2 arguments, first is the name of the test case, second is the function that contains the test steps
        it('First Selenium script', async function() {
            // navigate to the url
            await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

            //request the browser info
            let title = await driver.getTitle();
            //assertion library - assert - to verify the expected and actual results
            assert.equal("Web form", title);

            //establish wait strategy - implicit wait - to wait for the element to be present on the page
            await driver.manage().setTimeouts({ implicit: 500 });
            
            //find the elements
            let textBox = await driver.findElement(By.name('my-text'));
            let submitButton = await driver.findElement(By.css('button'));

            //take action on elements
            await textBox.sendKeys('Selenium');
            await submitButton.click();

            // load the elemnt into a variable
            let message = await driver.findElement(By.id('message'));

            // request element information from the variable
            let value = await message.getText();

            //assertion statement to validate 
            assert.equal("Received!", value);
        });

    });
});