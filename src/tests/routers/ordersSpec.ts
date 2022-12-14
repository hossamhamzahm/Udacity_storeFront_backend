import request from 'supertest';
import app from '../../server';
process.env.ENV = "test";



describe("Orders Endpoint Tests", () => {
    it("[GET] /orders should output all orders (token required)", (done) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmX25hbWUiOiJob3NzYW0iLCJ1c2VyX2lkIjoxLCJpYXQiOjE2NjkwMDgxMDZ9.NPsEHnSGle56-hD6IxUbWIl55tKk2KZL97WkUUyIkSM'

        const anticipated_result = [{
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


        request(app)
        .get('/orders')
        .set({ Authorization: `Bearer ${token}` })
        .expect(200).end((err, res) => {
            expect(res.body).toEqual(anticipated_result);

            if (err) return done.fail();
            return done();
        })
    })


    it("[GET] /orders/:userID should output current order (token required)", (done) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmX25hbWUiOiJob3NzYW0iLCJ1c2VyX2lkIjoxLCJpYXQiOjE2NjkyMzkyNzZ9.eHtzKLSnJZ-brb-r9r3rzVuTP29VpgEfjb1puSJHHNE'

        const anticipated_result = [
        {
            quantity: 3,
            product_name: 'Banana',
            product_price: 3,
            product_category: 'Food',
            order_id: 4
        },
        {
            quantity: 3,
            product_name: 'Apple',
            product_price: 2,
            product_category: 'Food',
            order_id: 4
        },
        {
            quantity: 1,
            product_name: 'T-shirt',
            product_price: 15,
            product_category: 'Clothing',
            order_id: 4
        }]


        request(app)
        .get('/orders/1')
        .set({ Authorization: `Bearer ${token}` })
        .expect(200).end((err, res) => {
            expect(res.body).toEqual(anticipated_result);
            
            if (err) return done.fail();
            return done();
        })
    })


    it("[GET] /orders/:userID (shouldn't result in 200 cuz the token is invalid)", (done) => {
        const token = 'aeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmX25hbWUiOiJob3NzYW0iLCJ1c2VyX2lkIjoxLCJpYXQiOjE2NjkwMDgxMDZ9.NPsEHnSGle56-hD6IxUbWIl55tKk2KZL97WkUUyIkSM'

        const anticipated_result = [
        {
            quantity: 3,
            product_name: 'Banana',
            product_price: 3,
            product_category: 'Food',
            order_id: 4
        },
        {
            quantity: 3,
            product_name: 'Apple',
            product_price: 2,
            product_category: 'Food',
            order_id: 4
        },
        {
            quantity: 1,
            product_name: 'T-shirt',
            product_price: 15,
            product_category: 'Clothing',
            order_id: 4
        }]


        request(app)
        .get('/orders/1')
        .set({ Authorization: `Bearer ${token}` })
        .expect(400).end((err, res) => {           
            if (err) return done();
            return done.fail();
        })
    })

    it("[PATCH] /orders/:userID/:productID should add a product to current order (token required)", (done) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmX25hbWUiOiJob3NzYW0iLCJ1c2VyX2lkIjoxLCJpYXQiOjE2NjkyMzkyNzZ9.eHtzKLSnJZ-brb-r9r3rzVuTP29VpgEfjb1puSJHHNE'

        const anticipated_result = [
        {
            product_id: '1',
            quantity: 1,
            order_id: '4'
        }]

        request(app)
        .patch('/orders/1/1')
        .set({ Authorization: `Bearer ${token}` })
        .expect(200).end((err, res) => {
            expect(res.body).toEqual(anticipated_result);
            
            if (err) return done.fail();
            return done();
        })
    })
})