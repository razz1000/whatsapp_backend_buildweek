import RoomsModel from "../socket/models/rooms.js";
import MessagesModel from "../apis/messages/model.js";

export const saveMessage = async (message, roomName) => {
  try {
    const room = await RoomsModel.findOne({ name: roomName });
    // save message in messages collection
    const newMessage = new MessagesModel({
      text: message.text,
      sender: message.sender,
      /* room: room._id, */
    });
    console.log("NewMessage:", newMessage);
    const savedMessage = await newMessage.save();
    return savedMessage;
  } catch (error) {
    console.log(error);
  }
};
