import { By } from "selenium-webdriver"

export class LoginModal {

    get userNameTextBox() { return By.id("loginUserName"); }
    get passwordTextBox() { return By.id("loginPassword"); }
    get termsAndConditionsCheckbox() { return By.id("agree"); }
    get loginButton() { return By.className("btn-primary"); }
    get errorMessage() { return By.id("login-error"); }

    constructor(baseElement) {
        this.baseElement = baseElement;
    }

    enterUsername(username) {
        return this.baseElement.findElement(this.userNameTextBox).sendKeys(username);
    }

    enterPassword(password) {
        return this.baseElement.findElement(this.passwordTextBox).sendKeys(password);
    }

    acceptTermsAndConditions() {
        return this.baseElement.findElement(this.termsAndConditionsCheckbox).click();
    }

    getErrorMessage() {
        return this.baseElement.findElement(this.errorMessage).getText();
    }

    clickLogin() {
       return this.baseElement.findElement(this.loginButton).click();
    }

}