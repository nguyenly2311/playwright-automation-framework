import { test as setup } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

setup("Authenticate", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login();

    await page.context().storageState({
        path: "playwright/.auth/user.json",
    });
});