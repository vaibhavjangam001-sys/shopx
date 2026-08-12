import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app.js';
import connectDB from '../../src/config/db.config.js';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/v1/products', () => {
  it('should create a product', async () => {
    const response = await request(app)
      .post('/api/v1/products')
      .send({
        productName: 'Test iPhone',
        slug: 'test-iphone',
        sku: 'TEST-IP-001',
        brand: 'Apple',
        description: 'Test product for automated testing',
        category: '6a79dd3929473a53a3454e2d',
        price: 69999,
        stock: 10,
        images: [
          {
            url: 'https://example.com/test-iphone.jpg',
            publicId: 'test-iphone-001',
          },
        ],
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
  });
});
