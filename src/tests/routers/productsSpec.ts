import request from "supertest";
import app from "../../server";
process.env.ENV = "test";



describe("Products Tests", () => {
    it("[GET] /products should output all products", (done) => {
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

        request(app)
        .get('/products')
        .expect(200)
        .end((err, res) => {
            expect(res.body).toEqual(jasmine.objectContaining(anticipated_result));

            if(err) return done.fail();
            return done();
        })
    })

    
    it("[GET] /products/:id show a specific product", (done) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmX25hbWUiOiJob3NzYW0iLCJ1c2VyX2lkIjoxLCJpYXQiOjE2NjkyMzkyNzZ9.eHtzKLSnJZ-brb-r9r3rzVuTP29VpgEfjb1puSJHHNE'
    
    const anticipated_result = {
            product_id: 1,
            product_name: 'Jacket',
            product_price: 25,
            product_category: 'Clothing'
        };

        request(app)
        .get('/products/1')
        .set({ Authorization: `Bearer ${token}` })
        .expect(200)
        .end((err, res) => {
            expect(res.body).toEqual(jasmine.objectContaining(anticipated_result));

            if(err) return done.fail();
            return done();
        })
    })

    it("[POST] /products should fail without a token provided", (done) => {

        const req_body = {
            product_name: "new_product",
            product_price: 30,
            product_category: "new_cat",
        };

        const anticipated_result = {
            product_name: 'new_product',
            product_price: 30,
            product_category: 'new_cat'
        }

        request(app)
        .post('/products')
        .send(req_body)
        .expect(401)
        .end((err, res) => {
            if(err) return done.fail();
            return done();
        })
    })


    it("[POST] /products should create one product", (done) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmX25hbWUiOiJob3NzYW0iLCJ1c2VyX2lkIjoxLCJpYXQiOjE2NjkyMzkyNzZ9.eHtzKLSnJZ-brb-r9r3rzVuTP29VpgEfjb1puSJHHNE'

        const req_body = {
            product_name: "new_product",
            product_price: 30,
            product_category: "new_cat",
        };

        const anticipated_result = {
            product_name: 'new_product',
            product_price: 30,
            product_category: 'new_cat'
        }

        request(app)
        .post('/products')
        .set({ Authorization: `Bearer ${token}` })
        .send({product: req_body})
        .expect(200)
        .end((err, res) => {

            if(err) return done.fail();
            return done();
        })
    })
})