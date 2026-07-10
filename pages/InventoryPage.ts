import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {

    // ==========================
    // Locators
    // ==========================

    readonly cboFilter: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;

    constructor(page: Page) {
        super(page);

        this.cboFilter = page.locator(".product_sort_container");
        this.productNames = page.locator(".inventory_item_name");
        this.productPrices = page.locator(".inventory_item_price");
    }

    // ==========================
    // Navigation
    // ==========================

    async open() {
        await this.page.goto("https://www.saucedemo.com/inventory.html");
    }

    async verifyInventoryPageDisplayed() {
        await expect(this.page).toHaveURL(/inventory.html/);
    }

    // ==========================
    // Filter
    // ==========================

    async selectFilter(option: string) {
        await this.cboFilter.selectOption({ label: option });
    }

    // ==========================
    // Product Information
    // ==========================

    async getAllProductNames(): Promise<string[]> {
        return await this.productNames.allTextContents();
    }

    async getAllProductPrices(): Promise<number[]> {

        const prices = await this.productPrices.allTextContents();

        return prices.map(price =>
            Number(price.replace("$", ""))
        );
    }

    // ==========================
    // Verification
    // ==========================

    async verifyProductsSortedByNameAscending() {

        const actual = await this.getAllProductNames();

        const expected = [...actual].sort();

        expect(actual).toEqual(expected);
    }

    async verifyProductsSortedByNameDescending() {

        const actual = await this.getAllProductNames();

        const expected = [...actual]
            .sort()
            .reverse();

        expect(actual).toEqual(expected);
    }

    async verifyProductsSortedByPriceAscending() {

        const actual = await this.getAllProductPrices();

        const expected = [...actual]
            .sort((a, b) => a - b);

        expect(actual).toEqual(expected);
    }

    async verifyProductsSortedByPriceDescending() {

        const actual = await this.getAllProductPrices();

        const expected = [...actual]
            .sort((a, b) => b - a);

        expect(actual).toEqual(expected);
    }

}