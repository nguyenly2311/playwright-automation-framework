/**
 * ============================================================================
 * Test Suite: Verify the Filter Functionality and Business Flow of SauceDemo.
 * ============================================================================
 * 
 * Test Coverage:
 * - Verify the product name will be filtered from A to Z (asc).
 * - Verify the product name will be filtered from Z to A (desc).
 * - Verify the product price will be filtered from low to high (asc).
 * - Verify the product price will be filtered from high to low (desc).
 * 
 * Preconditions:
 * - User is authenticated (Storage State)
 * - User is on Inventory page
 * ============================================================================
 */

import { test } from "../../fixtures/baseTest";
import { InventoryPage } from "../../pages/InventoryPage";
import { FilterOption } from "../../constants/FilterOption";

test.describe("Inventory Filter Verification", () => {

    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);
        await inventoryPage.open();
        await inventoryPage.verifyInventoryPageDisplayed();

    });

    test("Verify Name A to Z", async () => {
        await inventoryPage.selectFilter(FilterOption.NAME_ASC);
        await inventoryPage.verifyProductsSortedByNameAscending();
    });

    test("Verify Name Z to A", async () => {
        await inventoryPage.selectFilter(FilterOption.NAME_DESC);
        await inventoryPage.verifyProductsSortedByNameDescending();
    });

    test("Verify Price Low to High", async () => {
        await inventoryPage.selectFilter(FilterOption.PRICE_ASC);
        await inventoryPage.verifyProductsSortedByPriceAscending();
    });

    test("Verify Price High to Low", async () => {
        await inventoryPage.selectFilter(FilterOption.PRICE_DESC);
        await inventoryPage.verifyProductsSortedByPriceDescending();
    });

});