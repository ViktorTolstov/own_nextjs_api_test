import dbConnect from "../../../libs/dbConnect";
import processData from "../../../libs/ssLogic";
import { RecordModel } from "../../../models/record";
import jwtToken from "../../../libs/jwtToken";

const recordHandler = async (req, res) => {
    const isAuthed = jwtToken.checkToken(req);
    if (!isAuthed) {
        return res.status(401).json({ isOk: false, error: "unauthtorized" })
    }

    await dbConnect();

    try {
        switch (req.method) {
            case "GET":
                const { body } = req;

                const records = await RecordModel.find();
                const result = processData(records, body);

                return res.status(200).json({ isOk: true, result })
            case "POST":
                const { name, salary, currency, department, sub_department, on_contract = false } = req.body;

                const record = new RecordModel({
                    name,
                    salary,
                    currency,
                    department,
                    sub_department,
                    on_contract,
                });

                const recordCreated = await record.save();
                return res.status(200).json({ isOk: true, result: recordCreated });
            default:
                return res.status(404).json({ isOk: false, error: "method not exist" });
        }
    } catch (error) {
        return res.status(500).json({ isOk: false, error: error.message });
    }
}

export default recordHandler;