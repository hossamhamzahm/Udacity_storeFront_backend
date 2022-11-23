import request from "supertest";
import app from "../../server";
process.env.ENV = 'test'


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmX25hbWUiOiJob3NzYW0iLCJ1c2VyX2lkIjoxLCJpYXQiOjE2NjkwMDgxMDZ9.NPsEHnSGle56-hD6IxUbWIl55tKk2KZL97WkUUyIkSM'


describe("User Tests", () => {
    it("[GET] /users testing showing all users", (done) => {
        request(app)
        .get('/users')
        .set({ Authorization: `Bearer ${token}` })
        .expect(200).end((err, res) => {
            if(err) return done.fail();
            else return done();
        })
    });

    it("[GET] /users/1 testing showing one user", (done) => {
        
        const anticipated_result = {
            user_id: 1,
            f_name: "hossam",
            l_name: "hamza",
        };

        request(app)
        .get('/users/1')
        .set({ Authorization: `Bearer ${token}` })
        .expect(200).end((err, res) => {
            expect(res.body).toEqual(jasmine.objectContaining(anticipated_result));
            if(err) return done.fail();
            else return done();
        })
    });



    it("[POST] /users/signing testing sign-in", (done) => {
        const user = {
            user_id: 1,
            f_name: "hossam",
            l_name: "hamza",
            user_password: "12345"
        };

        request(app)
        .post('/users/signin')
        .send({user})
        .expect(200).end((err, res) => {
            if(err) return done.fail();
            else return done();
        })
    });


    it("[POST] /users creating new user", (done) => {

        const user = {
            f_name: "f_name",
            l_name: "l_name",
            user_password: "232552"
        };

        request(app)
        .post('/users')
        .send({user})
        .set({ Authorization: `Bearer ${token}` })
        .expect(200).end((err, res) => {
            if(err) return done.fail();
            else return done();
        })
    });
})
