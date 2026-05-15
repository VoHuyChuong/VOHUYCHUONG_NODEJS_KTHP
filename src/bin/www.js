//khởi động --> app.js 

const app = require('../app');
const http = require('http');
const connectDB = require('../helpers/connectDB');

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);


connectDB().then(() => {
    server.listen(port, () => {
        console.log(` Server đang chạy tại: http://localhost:${port}`);
    });
});