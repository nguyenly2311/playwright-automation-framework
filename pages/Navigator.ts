import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class BurgerMenu extends BasePage {
    readonly btnBurgerMenu: Locator;
    readonly burgerMenuPanel: Locator;
    readonly aboutOption: Locator;
    readonly logoutOption: Locator;
    readonly resetAppStateOption: Locator;
    readonly btncloseBurgerMenu: Locator;
    
    constructor(page: Page) {
        super(page);
        this.btnBurgerMenu = page.locator("#react-burger-menu-btn");
        this.burgerMenuPanel = page.locator(".bm-menu-wrap");
        this.aboutOption = page.locator("#about_sidebar_link");
        this.logoutOption = page.locator("#logout_sidebar_link");
        this.resetAppStateOption = page.locator("#reset_sidebar_link");
        this.btncloseBurgerMenu = page.locator("#react-burger-cross-btn");
    }

    async openBurgerMenu() {
        await this.btnBurgerMenu.click();
    }

    async verifyBurgerMenuIsDisplayed() {
        await expect(this.burgerMenuPanel).toBeVisible();
    }

    async closeBurgerMenu() {
        await this.btncloseBurgerMenu.click();
    }

    async clickAbout() {
        await this.aboutOption.click();
    }

    async verifyAboutPage() {
        await expect(this.page).toHaveURL("https://saucelabs.com/");
    }

    async clickLogout() {
        await this.logoutOption.click();
    }

    async verifyLogoutSuccessfully() {
        await expect(this.page).toHaveURL("https://www.saucedemo.com/");
    }
}