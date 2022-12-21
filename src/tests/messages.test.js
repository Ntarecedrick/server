import request from 'supertest';
import app from '../index';
import Message from '../models/Message'
import tokenValue from './values'


test('should Send a Message', async () => {
    // jest.setTimeout(100000);
    const message = await request(app).post("/api/messages")
    .send({
        name: "test jest",
        email: "jest@test.com",
        message: "i am just testing"
    });
    expect(message.statusCode).toBe(200) ;
});

test('should should send a 400 eror', async ()=>{
    const message = await request(app).post("/api/messages")
    .send({
        name: "test jest",
        email: "jesttest.com",
        message: "i am just testing"
    });
    expect(message.statusCode).toBe(400) ;
})

test('should get all message', async ()=>{
    const messages= await Message.findOne();
    const id= messages._id
    const message = await request(app).get(`/api/messages/${id}`);
    expect(message.statusCode).toBe(200)
});
test('should get a message', async ()=>{
    const messages= await Message.findOne();
    const id= messages._id
    const message = await request(app).get(`/api/messages/${id}`);
    expect(message.statusCode).toBe(200)
})
