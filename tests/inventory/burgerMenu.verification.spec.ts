/**
 * ============================================================================
 * Test Suite: Verify the Navigators in Burger Menu section Functionality and Business Flow of SauceDemo.
 * ============================================================================
 * 
 * Test Coverage:
 * - Verify About menu will direct users to the Sauce Labs website.
 * - Verify Logout menu will log out the user and redirect to the login page.
 * - Verify Close Burger Menu will close the burger menu panel and return to the inventory page.
 * 
 * Preconditions:
 * - User is authenticated (Storage State)
 * - User is on Inventory page
 * ============================================================================
 */

import { test } from "../../fixtures/baseTest";
import { BurgerMenu } from "../../pages/Navigator";

test.describe("Burger Menu Verification", () => {

    test.beforeEach(async ({ page }) => {
        const burgerMenu = new BurgerMenu(page);
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