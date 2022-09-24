import dbConnect from "../../../libs/dbConnect";
import { RecordModel } from "../../../models/record";
import jwtToken from "../../../libs/jwtToken";

const recordHandler = async (req, res) => {
    const isAuthed = jwtToken.checkToken(req);
    if (!isAuthed) {
        return res.status(401).json({ isOk: false, error: "unauthtorized" })
    }

    await dbConnect();

    const { id } = req.query;
    if (req.method == "DELETE") {
        try {
            await RecordModel.deleteOne({ _id: id })
            return res.status(200).json({ isOk: true });
        } catch (error) {
            return res.status(500).json({ isOk: false, error: error.message });
        }
    }

    return res.status(404).json({ isOk: false, error: "method not exist" });
}

export default recordHandler;