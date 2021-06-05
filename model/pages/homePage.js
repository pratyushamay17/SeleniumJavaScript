import { By } from "selenium-webdriver"
import {driver} from "../../driver-factory"
import { LoginModal }  from "../modals/loginModal";
import { LogoutModal } from "../modals/logoutModal";

class HomePage
{
    get contact() { return By.css("#nav-contact a"); }
    get loginMenu() { return By.css("#nav-login");}
    get loginModal() { return By.className("popup");}
    get loggedInUser() { return By.css("#nav-user a");}
    get logoutModal() { return By.className("popup")}
    get logoutMenu() { return By.id("nav-logout"); }

    clickContactLink(){
        return driver.findElement(this.contact).click(); 
    }

    async clickLoginLink(){
        await driver.findElement(this.loginMenu).click();
        return new LoginModal(await driver.findElement(this.loginModal));
    }

    async getLoggedInUser(){
        const users = await driver.findElements(this.loggedInUser);
        if(users.length === 0){
            return "";
        }
        return users[0].getText();
    }

    async clickLogoutLink(){
        await driver.findElement(this.logoutMenu).click();
        return new LogoutModal(await driver.findElement(this.logoutModal));
    }
} 
export default new HomePage