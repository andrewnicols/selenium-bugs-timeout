const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function run() {
    const builder = new Builder()
        .forBrowser('chrome')
        .usingServer('http://localhost:4444/wd/hub');

    const driver = await builder.build();

    await driver.manage().setTimeouts({pageLoad: 90 * 1000});

    await driver.get('http://localhost:8000/index.php');
    console.log("Loaded");
    driver.quit();
}

run();
