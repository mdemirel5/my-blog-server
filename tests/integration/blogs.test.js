let server;
const mongoose = require('mongoose');
const request = require('supertest');
const { Blog } = require('../../models/blog');
const { User } = require('../../models/user');

describe('/api/blogs', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => {
        server.close();
        await Blog.remove({});
        await User.remove({});
    });



    describe('GET /', () => {
        it('should return all blogs', async () => {
            await Blog.collection.insertMany([
                { title: 'blog1' },
                { title: 'blog2' }
            ]);
            const res = await request(server).get('/api/blogs');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(blog => blog.title === 'blog1')).toBeTruthy();
            expect(res.body.some(blog => blog.title === 'blog2')).toBeTruthy();

        });
    });

    describe('GET /:id', () => {
        it('should return the corresponding blog if a valid id  is passed', async () => {
            /*   const user1 = new User({ name: 'user1', username: 'user1', password: '12345' });
              await user1.save(); */
            const user1 = new User();
            const blog1 = new Blog({ title: 'blogee1', content: 'content1', user: user1 });
            await blog1.save();

            const res = await request(server).get(`/api/blogs/${blog1._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title', blog1.title);
        });

        it('should return 404 error if a invalid id  is passed', async () => {

            const res = await request(server).get(`/api/blogs/1`);
            expect(res.status).toBe(404);

        });
    });



    describe('POST /', () => {
        let token;
        let title;
        let content;
        let userId;
        const exec = () => {
            return request(server)
                .post('/api/blogs')
                .set('x-auth-token', token)
                .send({
                    title, content, userId
                });
        };

        beforeEach(() => {
            token = new User().generateAuthToken();
            [title, content] = ['title1', 'content1'];
        })

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 400 if the title has less than 1 characters', async () => {
            title = '';

            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 400 if the title has more than 50 characters', async () => {
            title = new Array(52).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should save the blog if it is valid', async () => {
            await exec();

            const blog = await Blog.find({ title: 'title1' });
            expect(blog).not.toBeNull();
        });

        it('should return the blog if it is valid', async () => {
            user = new User({ name: 'user1', username: 'user1', password: '12345' });
            user.save();
            userId = user._id;


            const res = await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('title', 'title1');

        });
    });
});