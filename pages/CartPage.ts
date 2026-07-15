import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {

    readonly shoppingCartLink: Locator;
    readonly btnContinueShopping: Locator;
    readonly btnCheckout: Locator;

    constructor(page: Page) {
        super(page);
        this.shoppingCartLink = page.locator(".shopping_cart_link");
        this.btnContinueShopping = page.locator("#continue-shopping");
        this.btnCheckout = page.locator("#checkout");
    }

    async openCart() {
        await this.shoppingCartLink.click();
        await this.verifyCartPage();
    }

    async verifyCartPage() {
        await expect(this.page).toHaveURL(/cart.html/);
    }

    productName(productName: string): Locator {
        return this.page.locator(".inventory_item_name", {
            hasText: productName,
        });
    }

    async verifyProductExists(productName: string) {
        await expect(this.productName(productName)).toBeVisible();
    }

    async verifyProductNotExists(productName: string) {
        await expect(this.productName(productName)).toHaveCount(0);
    }

    removeButton(productName: string): Locator {
        const dataTest = `remove-${productName
            .toLowerCase()
            .replace(/\s+/g, "-")}`;
        return this.page.locator(`[data-test="${dataTest}"]`);
    }

    async removeProduct(productName: string) {
        await this.removeButton(productName).click();
    }

    async clickContinueShopping() {
        await this.btnContinueShopping.click();
    }

    async verifyInventoryPage() {
        await expect(this.page).toHaveURL(/inventory.html/);
    }

    async clickCheckout() {
        await this.btnCheckout.click();
    }

}