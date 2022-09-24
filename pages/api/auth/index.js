import jwtToken from "../../../libs/jwtToken";

const userLogin = process.env.FAKE_USER_LOGIN;
const userPassword = process.env.FAKE_USER_PASSWORD;

const recordHandler = async (req, res) => {
    try {
        switch (req.method) {
            case "GET":
                const { user, password } = req.body;

                if (user !== userLogin || password !== userPassword) {
                    return res.status(401).json({ isOk: false, error: "unauthtorized" })
                }

                const token = jwtToken.createToken(user);

                return res.status(200).json({ isOk: true, token })
            default:
                return res.status(404).json({ isOk: false, error: "method not exist" });
        }
    } catch (error) {
        return res.status(500).json({ isOk: false, error: error.message });
    }
}

export default recordHandler;