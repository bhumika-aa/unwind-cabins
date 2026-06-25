const http = require('http');

const API_URL = 'http://localhost:5000/api';
let token = '';
let cabinId = '';
let bookingId = '';

const request = (method, path, body = null, useAuth = false) => {
  return new Promise((resolve, reject) => {
    const url = new URL(API_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (useAuth && token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', (e) => reject(e));

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
};

const runTests = async () => {
  try {
    console.log('--- GET /api/cabins ---');
    let res = await request('GET', '/cabins');
    console.log(res.status, res.data.success ? 'Success' : res.data);
    if (res.data.data && res.data.data.length > 0) {
      cabinId = res.data.data[0]._id;
    }

    if (cabinId) {
      console.log(`--- GET /api/cabins/${cabinId} ---`);
      res = await request('GET', `/cabins/${cabinId}`);
      console.log(res.status, res.data.success ? 'Success' : res.data);
    }

    console.log('--- POST /api/auth/register ---');
    const testEmail = `test${Date.now()}@test.com`;
    res = await request('POST', '/auth/register', {
      firstName: 'Test',
      lastName: 'User',
      email: testEmail,
      password: 'password123'
    });
    console.log(res.status, res.data.success ? 'Success' : res.data);

    console.log('--- POST /api/auth/login ---');
    res = await request('POST', '/auth/login', {
      email: testEmail,
      password: 'password123'
    });
    console.log(res.status, res.data.success ? 'Success' : res.data);
    token = res.data.token;

    console.log('--- GET /api/auth/me ---');
    res = await request('GET', '/auth/me', null, true);
    console.log(res.status, res.data.success ? 'Success' : res.data);

    if (cabinId && token) {
      console.log('--- POST /api/bookings ---');
      res = await request('POST', `/cabins/${cabinId}/bookings`, {
        checkIn: new Date().toISOString(),
        checkOut: new Date(Date.now() + 86400000 * 2).toISOString(),
        guests: 2
      }, true);
      console.log(res.status, res.data.success ? 'Success' : res.data);
    }

    console.log('--- GET /api/bookings ---');
    res = await request('GET', '/bookings', null, true);
    console.log(res.status, res.data.success ? 'Success' : res.data);

    console.log('--- GET /api/blogs ---');
    res = await request('GET', '/blogs');
    console.log(res.status, res.data.success ? 'Success' : res.data);

    console.log('--- GET /api/experiences ---');
    res = await request('GET', '/experiences');
    console.log(res.status, res.data.success ? 'Success' : res.data);

    console.log('--- GET /api/reviews ---');
    res = await request('GET', '/reviews');
    console.log(res.status, res.data.success ? 'Success' : res.data);

  } catch (error) {
    console.error('Test script error:', error);
  }
};

runTests();
