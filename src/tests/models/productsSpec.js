"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../../models/products");
describe("Products Tests", () => {
    it("[index] should output all products (index should select four products)", async () => {
        const productsStore = new products_1.ProductsStore();
        const rows = await productsStore.index();
        const anticipated_result = [
            {
                product_id: 1,
                product_name: 'Jacket',
                product_price: 25,
                product_category: 'Clothing'
            },
            {
                product_id: 2,
                product_name: 'T-shirt',
                product_price: 15,
                product_category: 'Clothing'
            },
            {
                product_id: 3,
                product_name: 'Apple',
                product_price: 2,
                product_category: 'Food'
            },
            {
                product_id: 4,
                product_name: 'Banana',
                product_price: 3,
                product_category: 'Food'
            }
        ];
        expect(rows).toEqual(anticipated_result);
    });
    it("[create] should create one product and test its return", async () => {
        const productsStore = new products_1.ProductsStore();
        const rows = await productsStore.create({
            product_name: "new_product",
            product_price: 30,
            product_category: "new_cat",
        });
        const anticipated_result = {
            product_name: 'new_product',
            product_price: 30,
            product_category: 'new_cat'
        };
        expect(rows[0]).toEqual(jasmine.objectContaining(anticipated_result));
    });
    it("[show] should find one product by its ID", async () => {
        const productsStore = new products_1.ProductsStore();
        const rows = await productsStore.show("2");
        const anticipated_result = {
            product_name: 'T-shirt',
            product_price: 15,
            product_category: 'Clothing'
        };
        expect(rows).toEqual(jasmine.objectContaining(anticipated_result));
    });
});
