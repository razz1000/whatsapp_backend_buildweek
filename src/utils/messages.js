import RoomsModel from "../socket/models/rooms.js";
import MessagesModel from "../apis/messages/model.js";

export const saveMessage = async (sender, content) => {
  try {
    /*     const room = await RoomsModel.findOne({ name: roomName }); */
    // save message in messages collection
    console.log("Sender message  1 : ", sender);

    const newMessage = new MessagesModel({
      content: content,
      sender: sender,
      /* room: room._id, */
    });
    console.log("NewMessage:", newMessage);
    const savedMessage = await newMessage.save();
    return savedMessage;
  } catch (error) {
    console.log(error);
  }
};
