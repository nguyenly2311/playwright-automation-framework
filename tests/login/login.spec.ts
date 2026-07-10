import { test } from "../../fixtures/baseTest";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Login Verification", () => {
    test("Verify user can login successfully", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.login();
        await loginPage.verifyLoginSuccessfully();
    });
});