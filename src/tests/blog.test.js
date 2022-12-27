import request from 'supertest';
import app from '../index';
import Blog from '../models/Blog'
import { dataImage, tokenValue } from './values';
import dotenv from 'dotenv';

dotenv.config()

test('should get all blogs', async () => {
    const blogs = await request(app).get("/api/blogs");

    expect(blogs.statusCode).toBe(200)
})

test('should get blog likes', async () => {
    const blog = await Blog.findOne();

    const id = blog._id

    const blogs = await request(app).get(`/api/blogs/${id}/likes`);

    expect(blogs.statusCode).toBe(200)
});

test('should Post blog likes', async () => {
    const blog = await Blog.findOne();
    const id = blog._id
    const blogs = await request(app).post(`/api/blogs/${id}/likes`).set(
        'Authorization', tokenValue
    ).send();

    expect(blogs.statusCode).toBe(200)
})

test('should get a single blog', async () => {
    const blog = await Blog.findOne();

    const id = blog._id
    const blogs = await request(app).get(`/api/blogs/${id}`);

    expect(blogs.statusCode).toBe(200)
})

test('should get a single comment', async () => {
    const blog = await Blog.findOne();

    const id = blog._id
    const blogs = await request(app).get(`/api/blogs/${id}/comments`);

    expect(blogs.statusCode).toBe(200)
})

test('should post a comment', async () => {
    const blog = await Blog.findOne();

    const id = blog._id
    const blogs = await request(app).post(`/api/blogs/${id}/comments`).set('Authorization', tokenValue).send({
        message: "hello dear test"
    })
    expect(blogs.statusCode).toBe(200);
})

test('should post a blog', async () => {

    const blogs = await request(app).post(`/api/blogs`).set('Authorization', tokenValue).send({
        title: "a new test for blog",
        content: "we are just testing a route for posting",
        image: dataImage
    })
    expect(blogs.statusCode).toBe(200)
})

test('should update a blog', async () => {
    const blog = await Blog.findOne();

    const id = blog._id
    const blogs = await request(app).put(`/api/blogs/${id}`).set('Authorization', tokenValue).send({
        title: "a new test for blog",
        content: "we are just testing a route for posting",
        image: dataImage
    })
    expect(blogs.statusCode).toBe(200)
})
