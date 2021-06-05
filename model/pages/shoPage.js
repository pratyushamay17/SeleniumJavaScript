import { By } from "selenium-webdriver"
import { driver } from "../../driver-factory";
import { BasePage } from "./basePage"

class ShopPage extends BasePage {
    buyButton(item) { return By.xpath(`//li[contains(.,'${item}')]//a[@class='btn btn-success']`); }

    async buyItem(myItem) {
        const items = await driver.findElement(By.className("product"));

        items.forEach(item => {
            const title = await item.findElement(By.className("product-title")).getText();

            if (title === myItem) {
                await item.findElement(By.className("btn-success")).click();
                break;
            }
        });
    }
}
export default new ShopPage