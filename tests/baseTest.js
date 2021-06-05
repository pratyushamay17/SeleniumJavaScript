import { jest } from "@jest/globals"
import { driver } from "../driver-factory"

class BaseTest {
    beforeAll() {
        jest.setTimeout(60000);
    }

    async beforeEach() {
        await driver.get("https://jupiter.cloud.planittesting.com/#/home")
    }

    async afterEach() {
        const data = await driver.takeScreenshot();
        let date = new Date();
        let dateString = date.getMonth() + "-" + date.getDate() + " " + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
        const fileName = "screenshots\\test screenshot" + dateString + ".png";
        await fs.writeFile(fileName,data,"base64");
        console.log("screenshot created: " + fileName);
    }

    async afterAll() {
        await driver.quit()
    }
}

export default new BaseTest