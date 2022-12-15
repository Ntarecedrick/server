import Message from "../models/Message";
import validateMessage from "../validation/validateMessage";

const postMessages=  async (req, res) => {
    const { error, value } = validateMessage(req.body);

    if (error) {
        return res.send(error.details)
    } else {
        const message = new Message({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        })
        await message.save();
        return res.send(message)
    }

}

export default postMessages