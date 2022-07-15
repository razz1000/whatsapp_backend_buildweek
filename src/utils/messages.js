import createHttpError from 'http-errors'
import MessagesModel from '../apis/messages/model.js'
import RoomModel from '../apis/rooms/model.js'

export const saveMessage = async (sender, content, room) => {
  try {
    /*     const room = await RoomsModel.findOne({ name: roomName }); */
    // save message in messages collection
    // console.log('Sender message  1 : ', sender)

    const newMessage = new MessagesModel({
      content: content,
      sender: sender,
      room: room
    })

    // console.log("NewMessage:", newMessage);
    console.log('Enter Saved Message')
    const savedMessage = await newMessage.save()

    const room2 = await RoomModel.findOneAndUpdate(
      room,
      { $push: { messages: savedMessage._id } },
      { new: true, runValidators: true }
    )
    if (!room2) {
      createHttpError(404, 'Room not found')
    }
    console.log('Saved Message Room:', room2)
    return savedMessage
  } catch (error) {
    console.log(error)
  }
}

export const saveMessage2 = async (sender, content, room) => {
  try {
    console.log('Enterd SavedMessage AND CREATE ROOOM')
    const newMessage = new MessagesModel({
      content: content,
      sender: sender,
      room: room
    })
    // console.log("NewMessage:", newMessage);
    const savedMessage = await newMessage.save()
    console.log('new message in saved message', savedMessage)

    const newRoom = new RoomModel({
      room,
      member: [sender],
      messages: [savedMessage._id]
    })
    console.log('Create Rooom: ', newRoom)
    await newRoom.save()
    console.log('new room after new message', newRoom)

    return savedMessage
  } catch (error) {
    console.log(error)
  }
}
