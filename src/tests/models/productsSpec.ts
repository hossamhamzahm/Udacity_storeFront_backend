import { ProductsStore, Product } from "../../models/products";



describe("Products model testing", () => {
    it("should output all products (index should select four products)", async() => {
        const productsStore = new ProductsStore();
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
        ]

        expect(rows).toEqual(anticipated_result);
    })
})