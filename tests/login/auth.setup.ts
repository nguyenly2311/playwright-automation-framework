import { test as setup } from "@playwright/test";
import { LoginHelper } from "../../utils/LoginHelper";

setup("Authenticate", async ({ page }) => {
    await LoginHelper.login(page);

    await page.context().storageState({
        path: "playwright/.auth/user.json",
    });
});