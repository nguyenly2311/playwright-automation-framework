import { test } from "../../../fixtures/baseTest";
import { BurgerMenu } from "../../../pages/BurgerMenu";

test.describe("Burger Menu Verification", () => {

    test.beforeEach(async ({ page }) => {
        const burgerMenu = new BurgerMenu(page);

        // Chỉ mở Inventory
        // Không login
        await burgerMenu.navigateToInventoryPage();
    });

    test("Verify About menu", async ({ page }) => {
        const burgerMenu = new BurgerMenu(page);
        await burgerMenu.openBurgerMenu();
        await burgerMenu.verifyBurgerMenuIsDisplayed();
        await burgerMenu.clickAbout();
        await burgerMenu.verifyAboutPage();
    });

    test("Verify Logout menu", async ({ page }) => {
        const burgerMenu = new BurgerMenu(page);
        await burgerMenu.openBurgerMenu();
        await burgerMenu.verifyBurgerMenuIsDisplayed();
        await burgerMenu.clickLogout();
        await burgerMenu.verifyLogoutSuccessfully();
    });

    test("Verify Close Burger Menu", async ({ page }) => {
        const burgerMenu = new BurgerMenu(page);
        await burgerMenu.openBurgerMenu();
        await burgerMenu.verifyBurgerMenuIsDisplayed();
        await burgerMenu.closeBurgerMenu();
    });

});