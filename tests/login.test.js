/**
* @jest-environment node
*/
import HomePage from "../model/pages/homePage"
import { jest } from "@jest/globals"
import { driver } from "../driver-factory"
import * as fs from "fs/promises"

describe("Login page tests", () => {
    jest.setTimeout(60000)
    let loginModal
    
    beforeEach(async() => {
        await driver.get("https://jupiter2.cloud.planittesting.com/");
        loginModal = await HomePage.clickLoginLink();
    })
 
    afterEach(async () => {
        const data = await driver.takeScreenshot();
        let date = new Date();
        let dateString = date.getMonth() + "-" + date.getDate() + " " + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
        const fileName = "screenshots\\test screenshot" + dateString + ".png";
        await fs.writeFile(fileName,data,"base64");
        console.log("screenshot created: " + fileName);
    })
 
    afterAll(async() => {
        await driver.quit();
    })
 
    test.skip("successful login", async() =>{        
          // enter login details + submit
        const username = "Pete";
        await loginModal.enterUsername(username);
        await loginModal.enterPassword("letmein");
        await loginModal.acceptTermsAndConditions();
        await loginModal.clickLogin();
        // verify the logged in user
        const loggedInUser = await HomePage.getLoggedInUser();
        expect(loggedInUser).toEqual(username);
    })
 
    
    test.skip("unsuccessful login", async() =>{ 
        await loginModal.enterUsername("Pete");
        await loginModal.enterPassword("incorrect");
        await loginModal.acceptTermsAndConditions();
        await loginModal.clickLogin();
        // verify the logged in user
        const errorMessage = await loginModal.getErrorMessage();
        expect(errorMessage).toEqual("Your login details are incorrect");
    })
 
    test("successful logout", async() =>{        
          // enter login details + submit
        const username = "Pete";
        await loginModal.enterUsername(username);
        await loginModal.enterPassword("letmein");
        await loginModal.acceptTermsAndConditions();
        await loginModal.clickLogin();
        // verify the logged in user

        // let loggedInUser = await HomePage.getLoggedInUser();
        // expect(loggedInUser).toEqual(username);
        let logoutModal = await HomePage.clickLogoutLink();
        await logoutModal.clickLogout();
        let loggedInUser = await HomePage.getLoggedInUser();
        expect(loggedInUser).toEqual("");

    })
 
    test.skip("cancel logout", async() =>{        
          // enter login details + submit
        const username = "Pete";
        await loginModal.enterUsername(username);
        await loginModal.enterPassword("letmein");
        await loginModal.acceptTermsAndConditions();
        await loginModal.clickLogin();
        // verify the logged in user
        let loggedInUser = await HomePage.getLoggedInUser();
        expect(loggedInUser).toEqual(username);
        let logoutModal = await HomePage.clickLogoutLink();
        await logoutModal.clickCancelButton();
        loggedInUser = await HomePage.getLoggedInUser();
        expect(loggedInUser).toEqual(username);
    })
})