import { until } from "selenium-webdriver";
import { driver } from "../../driver-factory"

export class BasePage {


    async clickElement(locator) {
        return await driver.findElement(locator).click();
    }

    async sendKeysToElement(locator, text) {
        return await driver.findElement(locator).sendKeys(text);
    }

    async getElementText(locator) {
        const elements = await driver.findElements(locator);
        if (elements.length === 0) {
            return "";
        }
        return elements[0].getText();
    }

    async waitAndGetElementText(locator, timeout) {
        const element = driver.wait(until.elementLocated(locator), timeout);
        return element.getText();
    }
}