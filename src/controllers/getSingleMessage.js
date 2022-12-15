import Message from "../models/Message";

const getOneMessage= async (req, res) => {
    try {
        const message = await Message.findOne({ _id: req.params.id });
        res.send(message)
    } catch {
        res.status(404)
        res.send({ error: "message doesn't exist!" })
    }



}


export default getOneMessage