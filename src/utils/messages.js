import MessagesModel from "../apis/messages/model.js";
import RoomModel from "../apis/rooms/model.js";

export const saveMessage = async (sender, content, room) => {
  try {
    /*     const room = await RoomsModel.findOne({ name: roomName }); */
    // save message in messages collection
    // console.log('Sender message  1 : ', sender)

    const newMessage = new MessagesModel({
      content: content,
      sender: sender,
      room: room,
    });

    // console.log("NewMessage:", newMessage);
    console.log("Enter Saved Message");
    const savedMessage = await newMessage.save();

    const room2 = await RoomModel.findByIdAndUpdate(
      room,
      { $push: { messages: savedMessage } },
      { new: true, runValidators: true }
    );
    console.log("Saved Message Room:", room2);
    return savedMessage;
  } catch (error) {
    console.log(error);
  }
};

export const saveMessage2 = async (sender, content, room) => {
  try {
    /*     const room = await RoomsModel.findOne({ name: roomName }); */
    // save message in messages collection
    // console.log('Sender message  1 : ', sender)
    console.log("Enterd SavedMessage AND CREATE ROOOM");
    const newMessage = new MessagesModel({
      content: content,
      sender: sender,
      room: room,
    });
    // console.log("NewMessage:", newMessage);
    const savedMessage = await newMessage.save();

    const newRoom = new RoomModel({
      room,
      member: [sender],
      messages: [savedMessage._id],
    });
    console.log("Create Rooom: ", newRoom);
    await newRoom.save();

    return savedMessage;
  } catch (error) {
    console.log(error);
  }
};
