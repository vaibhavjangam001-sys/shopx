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
    const uniqueSlug = `test-iphone-${Date.now()}`;

    const response = await request(app)
      .post('/api/v1/products')
      .attach('images', Buffer.from('fake-image-content'), {
        filename: 'test.jpg',
        contentType: 'image/jpeg',
      })
      .field('productName', 'Test iPhone')
      .field('slug', uniqueSlug)
      .field('sku', 'TEST-IP-001')
      .field('brand', 'Apple')
      .field('description', 'Test product for automated testing')
      .field('category', '6a79dd3929473a53a3454e2d')
      .field('price', '69999')
      .field('stock', '10')
      .field('status', 'active');

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it('should reject non-image file uploads', async () => {
    const response = await request(app)
      .post('/api/v1/products')
      .attach('images', Buffer.from('not an image'), {
        filename: 'test.txt',
        contentType: 'text/plain',
      })
      .field('productName', 'Test iPhone 2')
      .field('slug', 'test-iphone-2')
      .field('sku', 'TEST-IP-002')
      .field('brand', 'Apple')
      .field('description', 'Test product for invalid image upload')
      .field('category', '6a79dd3929473a53a3454e2d')
      .field('price', '69999')
      .field('stock', '10')
      .field('status', 'active');

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain(
      'Only JPG, PNG or WEBP images are allowed'
    );
  });
});
