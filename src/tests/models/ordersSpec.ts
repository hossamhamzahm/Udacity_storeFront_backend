import { OrdersStore } from "../../models/orders";


describe("Orders Tests", () => {
    it("[index] should output all orders", async() => {
        const productsStore = new OrdersStore();
        const rows = await productsStore.index();


        const anticipated_result = [
            {
                f_name: 'hossam',
                l_name: 'hamza',
                product_id: 1,
                product_name: 'Jacket',
                product_price: 25,
                product_category: 'Clothing',
                current_order: false,
                user_id: 1,
                order_id: 1
            },
            {
                f_name: 'hossam',
                l_name: 'hamza',
                product_id: 2,
                product_name: 'T-shirt',
                product_price: 15,
                product_category: 'Clothing',
                current_order: false,
                user_id: 1,
                order_id: 2

            },
            {
                f_name: 'hossam',
                l_name: 'hamza',
                product_id: 3,
                product_name: 'Apple',
                product_price: 2,
                product_category: 'Food',
                current_order: false,
                user_id: 1,
                order_id: 3
            },
            {
                f_name: 'hossam',
                l_name: 'hamza',
                product_id: 4,
                product_name: 'Banana',
                product_price: 3,
                product_category: 'Food',
                current_order: true,
                user_id: 1,
                order_id: 4
            }]

        console.log(rows);
        expect(rows).toEqual(anticipated_result);
    })

    it("[show current] should show orders which are not completed", async() => {
        const productsStore = new OrdersStore();
        const rows = await productsStore.show_current("1");

        const anticipated_result = [{
                f_name: 'hossam',
                l_name: 'hamza',
                product_id: 4,
                product_name: 'Banana',
                product_price: 3,
                product_category: 'Food',
                current_order: true,
                user_id: 1,
                order_id: 4
            }
        ]
        expect(rows).toEqual(anticipated_result);
    })
})