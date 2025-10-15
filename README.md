# Real-Time Sensor Dashboard

A lightweight real-time sensor dashboard built with **Node.js**, **Socket.io**, and **Chart.js**. This project simulates **temperature data** and displays it dynamically on a web interface.

## Features

- Real-time temperature updates via **Socket.io**.
- Interactive chart rendered with **Chart.js**.
- Chart reset functionality.
- Minimal setup for local use.

## Technologies

- **Node.js** – Backend server
- **Express.js** – Serving frontend files
- **Socket.io** – Real-time server-client communication
- **Chart.js** – Interactive chart
- **HTML/CSS/JavaScript** – Frontend interface

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm

## File Structure

```
sensor-dashboard/
├── index.html   # Frontend interface
├── app.js       # Frontend JS handling chart and real-time updates
├── server.js    # Node.js backend server
```

## Notes

* Sensor data is simulated for demonstration.
* Currently, only temperature is implemented.
* The dashboard can be extended to include additional sensors and features.
