import { Builder } from "selenium-webdriver"

const getChromeDriver = () => {
    let driver = new Builder().forBrowser("chrome").build()
    driver.manage().setTimeouts({ implicit: 3000 })
    driver.manage().window().maximize()
    return driver
}

export const driver = getChromeDriver();
