import { By } from "selenium-webdriver"

export class LogoutModal {

    get logoutLink() { return By.className("btn-success"); }

    constructor(baseElement) {
        this.baseElement = baseElement;
    }
    
    clickLogout() {
        return this.baseElement.findElement(this.logoutLink).click();
    }
}