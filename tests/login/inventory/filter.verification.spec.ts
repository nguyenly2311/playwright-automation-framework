import { test } from "../../../fixtures/baseTest";
import { InventoryPage } from "../../../pages/InventoryPage";
import { FilterOption } from "../../../constants/FilterOption";

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