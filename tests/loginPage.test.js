import { jest } from "@jest/globals"
import { driver } from "../driver-factory"
import HomePage from "../model/pages/homePage"
//import { fs } from "fs/promises"

describe("Login tests", () => {
    let loginModal
    beforeAll(async () => {
        jest.setTimeout(60000)
    })
    

    beforeEach(async () => {
        await driver.get("https://jupiter2.cloud.planittesting.com")
        loginModal = await HomePage.clickLoginLink();
    })

    // afterEach(async () => {
        
    //     const data = await driver.takeScreenshot();
    //     let date = new Date();
    //     let dateString = date.getMonth() + "-" + date.getDate() + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
    //     const filename = "screenshots\\test screenshot" + dateString + ".png";
    //     await fs.writeFile(filename, data, "base64");
    //     console.log("screenshot created :" + filename);
    // })
    
    afterAll(async () => {
     await driver.quit()
    })

    test.skip("successful login to jupiterToys", async () => {
       

        const username = "prats"
        await loginModal.enterUsername(username);
        await loginModal.enterPassword("letmein");
        await loginModal.acceptTermsAndConditions();
        await loginModal.clickLogin();
        const loggedInUser = await HomePage.getLoggedInUser();
        expect(loggedInUser).toEqual(username);
    })

    test.skip("Unsuccessful login to jupiterToys", async () => {
       

        const username = "prats"
        await loginModal.enterUsername(username);
        await loginModal.enterPassword("letmenotin");
        await loginModal.acceptTermsAndConditions();
        await loginModal.clickLogin();
        const errorMessage = loginModal.getErrorMessage();
        expect(errorMessage).toEqual("Your login details are incorrect")
    })

    test("successful logout", async () => {
        const username = "pratsnew"
        await loginModal.enterUsername(username);
        await loginModal.enterPassword("letmenotin");
        await loginModal.acceptTermsAndConditions();
        await loginModal.clickLogin();

        let logoutModal = await HomePage.clickLogoutLink()
        await logoutModal.clickLogout();

        const loggedInUser = await HomePage.getLoggedInUser();
        expect(loggedInUser).toEqual("");
    })



})