const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dbModel = require('./model/dbModel');
const routing = require('./routes/routing');
const cors = require('cors');
const auth = require('./auth/auth');
const Message = require('./model/message');

const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // Your React app port
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ✅ Connect to DB at startup
dbModel.connect()
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());

// ✅ Mount your routes
app.use('/api', auth, routing);
app.use('/', routing);

// ✅ Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal server error' });
});

// ✅ Socket.IO Event Handlers
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  // Join room
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  // Send message
  socket.on('send_message', async (data) => {
    try {
      const newMessage = new Message({
        roomId: data.roomId,
        senderId: data.senderId,
        senderName: data.senderName,
        message: data.message,
        timestamp: data.timestamp || new Date()
      });
      
      await newMessage.save();
      io.to(data.roomId).emit('receive_message', data);
      console.log(`✅ Message sent to room ${data.roomId}`);
    } catch (err) {
      console.error('❌ Failed to save message:', err);
    }
  });

  // Typing indicator
  socket.on('typing', (data) => {
    socket.to(data.roomId).emit('user_typing');
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Socket.IO enabled`);
});

module.exports = app;
