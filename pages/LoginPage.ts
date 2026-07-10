import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Decoder } from "../utils/helper";
import { LoginData } from "../test-data/loginData";

export class LoginPage extends BasePage {
    readonly txtUsername: Locator;
    readonly txtPassword: Locator;
    readonly btnLogin: Locator;

    constructor(page: Page) {
        super(page);
        this.txtUsername = page.locator("#user-name");
        this.txtPassword = page.locator("#password");
        this.btnLogin = page.locator("#login-button");
    }

    async navigateToLoginPage() {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async enterUsername() {
        await this.txtUsername.fill(
            Decoder.decode(LoginData.validUser.username)
        );
    }

    async enterPassword() {
        await this.txtPassword.fill(
            Decoder.decode(LoginData.validUser.password)
        );
    }

    async clickLoginButton() {
        await this.btnLogin.click();
    }

    async login() {
        await this.navigateToLoginPage();

        await this.enterUsername();
        await this.enterPassword();
        await this.clickLoginButton();

        await this.verifyLoginSuccessfully();
    }

    async verifyLoginSuccessfully() {
        await expect(this.page).toHaveURL(/inventory.html/);
    }
}