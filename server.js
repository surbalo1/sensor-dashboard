const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

// function to generate random sensor data
function generateSensorData() {
    return {
        temp: (20 + Math.random()*10).toFixed(2),
        humidity: (40 + Math.random()*30).toFixed(2),
        pressure: (1000 + Math.random()*20).toFixed(2)
    };
}

io.on('connection', socket => {
    console.log('Client connected');

    setInterval(() => {
        const data = generateSensorData();
        socket.emit('sensor-data', data);
    }, 1000);
});

server.listen(3000, () => console.log('Server running at http://localhost:3000'));
