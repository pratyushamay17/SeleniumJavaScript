import { By, until } from "selenium-webdriver"
import { driver } from "../../driver-factory"
import { BasePage } from "./basePage"

class ContactPage extends BasePage{
    
    get emailTextBox() { return By.id("email"); }
    get foreNameTextBox() { return By.id("forename"); }
    get messageTextBox() { return By.id("message"); }
    get surnameTextBox() { return By.id("surname"); }
    get telephoneTextBox() { return By.id("telephone"); }
    get submitButton() { return By.className("btn-primary"); }
    get foreNameErrorMesage() { return By.id("forename-err"); }
    get messageErrorMessage() { return By.id("message-err"); }
    get emailErrorMessage() { return By.id("email-err"); }
    get successMessageElement() { return By.className("alert-success"); }
    
    enterEmail(email) {
        return this.sendKeysToElement(this.emailTextBox,email)
    }

    enterForename(name) {
        return this.sendKeysToElement(this.foreNameTextBox,name)
    }

    enterMessage(message) {
        return this.sendKeysToElement(this.messageTextBox,message)
    }

    enterSurname(surname) {
        return this.sendKeysToElement(this.surnameTextBox,surname);
    }

    enterTelephone(telephone) {
        return this.sendKeysToElement(this.telephoneTextBox,telephone);
    }
    
    clickSubmit() {
        return this.clickElement(this.submitButton);
    }

    async getForeNameErrorMesage() {

        return await this.getElementText(this.foreNameErrorMesage)
    }

    async getMessageErrorMessage() {

        return await this.getElementText(this.messageErrorMessage);
        
    }

    async getEmailErrorMessage() {
        
        return await this.getElementText(this.emailErrorMessage);
        
    }
    
    getSuccessMessage() {
        let successMessage = driver.wait(until.elementLocated(this.successMessageElement), 30000);
        return successMessage.getText();
    }

    
    
}

export default new ContactPage