import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

export class LoginHelper {

    static async login(page: Page) {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.login();
        await loginPage.verifyLoginSuccessfully();
    }

}