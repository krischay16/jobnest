const Message = require('../model/message'); // ✅ Changed from '../model/model'

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);

    // Join a chat room
    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    // Handle incoming messages with validation and acknowledgement
    // Client may provide an acknowledgement callback: socket.emit('send_message', data, ack)
    socket.on('send_message', async (data, ack) => {
      try {
        console.log('Received message data:', data);

        // basic validation
        if (!data || !data.roomId || !data.senderId || !data.message) {
          const errorMsg = 'Missing required fields: roomId, senderId, and message are required.';
          console.warn('Validation failed for send_message:', errorMsg, data);
          if (typeof ack === 'function') return ack({ ok: false, error: errorMsg });
          return socket.emit('send_error', { error: errorMsg });
        }

        // Save message to database
        const newMessage = new Message({
          roomId: data.roomId,
          senderId: data.senderId,
          senderName: data.senderName || 'Unknown',
          message: data.message,
          timestamp: data.timestamp || new Date()
        });

        await newMessage.save();

        // Broadcast to everyone in the room (including sender)
        io.to(data.roomId).emit('receive_message', {
          roomId: data.roomId,
          senderId: data.senderId,
          senderName: data.senderName || 'Unknown',
          message: data.message,
          timestamp: newMessage.timestamp
        });

        console.log(`✅ Message saved and broadcast to room ${data.roomId}:`, data.message);

        if (typeof ack === 'function') ack({ ok: true });
      } catch (err) {
        console.error('❌ Failed to save message:', err);
        const errorMsg = err && err.message ? err.message : 'Failed to save message';
        if (typeof ack === 'function') return ack({ ok: false, error: errorMsg });
        socket.emit('send_error', { error: errorMsg });
      }
    });

    // Typing indicator
    socket.on('typing', (data) => {
      socket.to(data.roomId).emit('user_typing', {
        senderId: data.senderId
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('❌ User disconnected:', socket.id);
    });
  });
};
