import { Conversation } from "../model/conversationModel.js";
import { Message } from "../model/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
        success: false,
      });
    }

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    gotConversation.messages.push(newMessage._id);

    await gotConversation.save();

    return res.status(201).json({
      message: "Message sent successfully",
      success: true,
      newMessage,
    });
  } catch (error) {
    console.error("Send message error:", error);

    return res.status(500).json({
      message: "Failed to send message",
      success: false,
    });
  }
};

// //////////////////////////////////////////////// recive message ///////////////////////////////

export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    return res.status(200).json(conversation?.messages);
  } catch (error) {
    console.error("Send message error:", error);

    return res.status(500).json({
      message: "Failed to send message",
      success: false,
    });
  }
};
