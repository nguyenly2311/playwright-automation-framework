import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {

    // ==========================
    // Locators
    // ==========================

    readonly cboFilter: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        super(page);
        this.cboFilter = page.locator(".product_sort_container");
        this.productNames = page.locator(".inventory_item_name");
        this.productPrices = page.locator(".inventory_item_price");
        this.shoppingCartBadge = page.locator(".shopping_cart_badge");
        this.shoppingCartLink = page.locator(".shopping_cart_link");
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
    // Product
    // ==========================

    productName(productName: string): Locator {
        return this.page.locator(".inventory_item_name", {
            hasText: productName
        });
    }

    addToCartButton(productName: string): Locator {
        const dataTest = `add-to-cart-${productName
            .toLowerCase()
            .replace(/\s+/g, "-")}`;
        return this.page.locator(`[data-test="${dataTest}"]`);
    }

    removeButton(productName: string): Locator {
        const dataTest = `remove-${productName
            .toLowerCase()
            .replace(/\s+/g, "-")}`;
        return this.page.locator(`[data-test="${dataTest}"]`);
    }

    async addProductToCart(productName: string) {
        await this.addToCartButton(productName).click();
    }

    async removeProduct(productName: string) {
        await this.removeButton(productName).click();
    }

    async verifyRemoveButtonDisplayed(productName: string) {
        await expect(this.removeButton(productName)).toBeVisible();
    }

    async verifyShoppingCartBadge(expected: number) {
        await expect(this.shoppingCartBadge)
            .toHaveText(expected.toString());
    }

    async openShoppingCart() {
        await this.shoppingCartLink.click();
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