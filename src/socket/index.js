import { saveMessage } from '../utils/messages.js'
import userModel from '../apis/users/model.js'
import RoomModel from '../apis/rooms/model.js'

let onlineUsers = []

const connectionHandler = (socket) => {
  // We have established a connection with a client
  socket.emit('welcome', { message: `Hello ${socket.id}!` })
  console.log('Connection established')
  console.log('welcome', ` ${socket.id}!`)

  // FE is emitting setUsername event --> BE should listen for that

  // When a new client connects to the chat and sets a username, BE should keep track of that socketId & username
  socket.on('setUsername', async (payload) => {
    onlineUsers.push({
      username: payload.username
      /* socketId: room, */
      /* room: payload.room, */
    })
    const updatedUserSocket = await userModel.findByIdAndUpdate(
      payload.username,
      {
        userSocket: socket.id
      },
      { new: true, runValidators: true }
    )
    console.log('ONLINE USERS: ', onlineUsers)
    /*     const socketUser = await userModel.findById(payload.username);
    console.log("Socket USer;", socketUser); */

    // To join a specific room we can use socket.join
    socket.join(payload.room)

    console.log('ROOMS ', socket.rooms)

    // FE is waiting for an event called loggedin, we gonna emit that and send the list of online users
    socket.emit('loggedin', onlineUsers)
    // Also the other connected users should receive the list of current online users
    socket.broadcast.emit('newConnection', onlineUsers) // We want to emit this event to every connected socket but not the current one
  })

  socket.on('joinRooms', ({ history }) => {
    history.map((hist) => socket.join(hist.room))
  })

  socket.on('message', async (sender, content, room) => {
    console.log('sender', sender)
    console.log('content', content)
    console.log('room', room)

    const foundRoom = await RoomModel.findById(room)

    if (foundRoom) {
      await saveMessage(sender, content, room)
    } else {
      const newRoom = new RoomModel({
        room,
        member: [sender],
        messages: []
      })
      await newRoom.save()
      await saveMessage(sender, content, room)
    }

    // we would like to save the message in db

    // we would like to emit to everybody who is in the room
    socket.to(room).emit('receivedMessage', {
      sender,
      room,
      content
    })
  })

  socket.on('disconnect', () => {
    // event automatically emitted by the FE when user closes the browser/tab
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
    socket.broadcast.emit('newConnection', onlineUsers)
    console.log('User with Socket ID', ` ${socket.id}!`, 'Disconnected')
  })
}

export default connectionHandler
