import { test as base, expect } from "@playwright/test";
import path from "path";

export { expect };

export const test = base;

test.afterEach(async ({ page }, testInfo) => {

    const status =
        testInfo.status === "passed"
            ? "PASS"
            : "FAIL";

    const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-");

    const safeTitle = testInfo.title.replace(/[<>:"/\\|?*]/g, "_");

    const fileName =
        `${timestamp}_${safeTitle}_${status}.png`;

    await page.screenshot({

        path: path.join(
            "test-results",
            "screenshots",
            fileName
        ),

        fullPage: true

    });

});