import { Page } from "@playwright/test";

export class BasePage {

    constructor(protected page: Page) {}

    async navigateToInventoryPage() {
        await this.page.goto("https://www.saucedemo.com/inventory.html");
    }
}