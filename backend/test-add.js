const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/schedules',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(JSON.stringify({
  title: "Test",
  description: "Test description",
  date: "2026-07-31"
}));
req.end();
