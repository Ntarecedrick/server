import request from 'supertest';
import app from '../index';

test('should delete a blogs', async ()=>{
    const blogs = await request(app).delete("/api/blogs/:id");

    expect(blogs.statusCode).toBe(404)
})