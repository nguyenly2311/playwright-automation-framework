/**
 * ============================================================================
 * Test Suite: Verify the Add to Cart Functionality and Business Flow of SauceDemo.
 * ============================================================================
 * 
 * Test Coverage:
 * - Add a single product to cart
 * - Add multiple products to cart
 * - Verify added products in cart
 * - Remove product from cart
 * - Continue shopping from cart page
 *
 * Preconditions:
 * - User is authenticated (Storage State)
 * - User is on Inventory page
 * ============================================================================
 */

import { test } from "../../fixtures/baseTest";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { ProductData } from "../../test-data/productData";

test.describe("Cart Verification", () => {

    test.beforeEach(async ({ page }) => {
            const inventoryPage = new InventoryPage(page);
            await inventoryPage.navigateToInventoryPage();
        });
    
    /**
    * TC01 - Verify Add To Cart button is active.
    * Expected:
    * - Button changes to Remove.
    * - Shopping Cart Badge = 1.
    */
    test("TC01 - Verify Add To Cart button is active", async ({ page }) => {
        const inventory = new InventoryPage(page);
        await inventory.verifyInventoryPageDisplayed();
        await inventory.addProductToCart(ProductData.BIKE_LIGHT);
        await inventory.verifyRemoveButtonDisplayed(ProductData.BIKE_LIGHT);
        await inventory.verifyShoppingCartBadge(1);
    });

    /**
    * TC02 - Verify Add Multiple Products.
    * Expected:
    * - All products are added to the cart.
    * - Shopping Cart Badge shows the number of added items.
    */
    test("TC02 - Verify Add Multiple Products", async ({ page }) => {
        const inventory = new InventoryPage(page);
        await inventory.verifyInventoryPageDisplayed();
        await inventory.addProductToCart(ProductData.BACKPACK);
        await inventory.verifyShoppingCartBadge(1);
        await inventory.addProductToCart(ProductData.BIKE_LIGHT);
        await inventory.verifyShoppingCartBadge(2);
        await inventory.addProductToCart(ProductData.BOLT_T_SHIRT);
        await inventory.verifyShoppingCartBadge(3);
    });

    /**
    * TC03 - Verify Products Are Added Successfully Into Cart
    * Expected:
    * - The amount of Products are added and visible in the cart page.
    * - The Shopping Cart Badge shows the correct number of items.
    */
    test("TC03 - Verify Products Are Added Successfully Into Cart", async ({ page }) => {
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);
        const bikeLight = ProductData.BIKE_LIGHT;
        const backpack = ProductData.BACKPACK;
        await inventory.verifyInventoryPageDisplayed();
        await inventory.addProductToCart(bikeLight);
        await inventory.addProductToCart(backpack);
        await inventory.verifyShoppingCartBadge(2);
        await inventory.openShoppingCart();
        await cart.verifyCartPage();
        await cart.verifyProductExists(bikeLight);
        await cart.verifyProductExists(backpack);
    });

    /**
     * TC04 - Verify Remove Product
     * Expected:
     * - Product is removed from the cart.
     * - Shopping Cart Badge is updated accordingly.
     * - Product is no longer visible in the cart page.
     */
    test("TC04 - Verify Remove Product", async ({ page }) => {
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);
        const bikeLight = ProductData.BIKE_LIGHT;
        await inventory.verifyInventoryPageDisplayed();
        await inventory.addProductToCart(bikeLight);
        await inventory.openShoppingCart();
        await cart.verifyCartPage();
        await cart.verifyProductExists(bikeLight);
        await cart.removeProduct(bikeLight);
        await cart.verifyProductNotExists(bikeLight);
    });

    /**
     * TC05 - Verify Continue Shopping Button
     * Expected:
     * - User is redirected to the inventory page when the Continue Shopping button is clicked.
     */
    test("TC05 - Verify Continue Shopping Button", async ({ page }) => {
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);
        await inventory.verifyInventoryPageDisplayed();
        await inventory.addProductToCart(ProductData.BACKPACK);
        await inventory.openShoppingCart();
        await cart.verifyCartPage();
        await cart.clickContinueShopping();
        await cart.verifyInventoryPage();
    });

});