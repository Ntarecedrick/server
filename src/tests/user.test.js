import request from 'supertest';
import app from '../index';


test ('register user', async ()=>{
    const user= await request(app).post('/user/register').send({
        name: "example name",
        email: "example@test.com",
        password: "exampletest123"
    });

    expect(user.statusCode).toBe(200)
})

test('user login', async ()=>{
    const user= await request(app).post('/user/login').send({
        email: "example@test.com",
        password: "exampletest123"
    });

    expect(user.statusCode).toBe(200)
})