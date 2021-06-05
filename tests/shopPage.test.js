import HomePage from "../model/pages/homePage"
import ShopPage from "../model/pages/shoPage"
import BaseTest from "./baseTest"


describe("shop page tests", () => {
    beforeAll(() => {
        BaseTest.beforeAll()
    })

    beforeEach(async () => {
        await BaseTest.beforeEach()
        await HomePage.clickShopLink()
    })

    afterEach(async () => {
        await BaseTest.afterEach()
    })

    afterAll(async () => {
        await BaseTest.afterAll()
    })

    test("clicking buy on an item aads it to the cart", async () => {
        await ShopPage.buyItem("Stuffed Frog");

        const cartSize = await ShopPage.getCartSize();
        expect(cartSize).toEqual("1")
    })
})