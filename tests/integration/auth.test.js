const { User } = require('../../models/user');
const { Blog } = require('../../models/blog');
const mongoose = require('mongoose');
let server;
const request = require('supertest');
describe('auth middleware', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => {
        await Blog.remove({});
        await User.remove({});
        server.close();
    });

    let token;
    let userId;
    const exec = () => {
        return request(server)
            .post('/api/blogs/')
            .set('x-auth-token', token)
            .send({ title: 'title1', content: 'content1', userId });
    }

    beforeEach(() => {
        token = new User().generateAuthToken();
    });

    it('should return 401 error if no token provided', async () => {
        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 error if token is invalid', async () => {
        token = 'a';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 200 error if token is valid', async () => {
        user = new User({ name: 'user1', username: 'user1', password: '12345' });
        user.save();
        userId = user._id;

        const res = await exec();

        expect(res.status).toBe(200);
    });
});