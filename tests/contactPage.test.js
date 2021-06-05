import { jest } from "@jest/globals"
import { driver } from "../driver-factory"
import ContactPage from "../model/pages/contactPage"
import HomePage from "../model/pages/homePage"
import BaseTest from "./baseTest"
//import fs from " fs/promises"



describe("Contact page tests", () => {
    beforeAll(async () => {
        BaseTest.beforeAll()
    })
    

    beforeEach(async () => {
        await BaseTest.beforeEach()
        await HomePage.clickContactLink()
    })

    // afterEach(async () => {
        
    //     const data = await driver.takeScreenshot();
    //     let date = new Date();
    //     let dateString = date.getMonth() + "-" + date.getDate() + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
    //     const filename = "screenshots\\test screenshot" + dateString + ".png"
    //     await fs.writeFile(filename, data, "base64");
    //     console.log("screenshot created :" +filename)
    // })
    
    afterAll(async () => {
        await BaseTest.afterAll()
    })

    test("there is an error message for invalid email", async() => {
        
        await ContactPage.enterEmail("invalid")
        const errorMessage = await ContactPage.getEmailErrorMessage()
        expect(errorMessage).toEqual("Please enter a valid email")        
    })

    test("Mandatory fields", async () => {
        // verify error messages appear with invalid inputs
        await ContactPage.clickSubmit()
        
        let errorMessage = await ContactPage.getForeNameErrorMesage();
        expect(errorMessage).toEqual("Forename is required");

        errorMessage= await ContactPage.getEmailErrorMessage();
        expect(errorMessage).toEqual("Email is required");

        
        errorMessage = await ContactPage.getMessageErrorMessage();
        expect(errorMessage).toEqual("Message is required");

        // enter valid inputs in mandatory text fields

        await ContactPage.enterForename("john")
        await ContactPage.enterSurname("loo")
        await ContactPage.enterEmail("john@gmail.com")
        await ContactPage.enterTelephone("12345")
        await ContactPage.enterMessage("hi this is john")
        
        errorMessage = await ContactPage.getForeNameErrorMesage();
        expect(errorMessage).toEqual("");
        errorMessage = await ContactPage.getEmailErrorMessage();
        expect(errorMessage).toEqual("");
        errorMessage = await ContactPage.getMessageErrorMessage();
        expect(errorMessage).toEqual("");
        
        await ContactPage.clickSubmit()
    })

    test("there is a success message on valid submission", async () => {
        const forename = "prats"
        await ContactPage.enterForename(forename);
        await ContactPage.enterEmail("prats@p.com");
        await ContactPage.enterMessage("hi");
        await ContactPage.clickSubmit();
        const successMessage = await ContactPage.getSuccessMessage();
        expect(successMessage).toEqual("Thanks " + forename + ", we appreciate your feedback.")
    })
})