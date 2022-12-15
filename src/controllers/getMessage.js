import Message from "../models/Message";

const getMessage= async (req, res) => {
    const messages = await Message.find();
    res.send(messages)
}

export default getMessage