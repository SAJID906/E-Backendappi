import { User } from "../Model/userModel.js";
export const Getuser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(201).json({ message: "Now in admin page", user:user });
    console.log(" admin page");
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};
export const DelUser = async (req, res) => {
  try {
    const ParamUser_id = req.params.id;
    //Check By id if admin not Delete User
    const checkAdmin = await User.findById(ParamUser_id);
    if (checkAdmin.Role == "admin") {
      return res.status(409).json({ message: "Yon can not delete yourself" });
    }
    const user = await User.findByIdAndDelete(ParamUser_id);
    if (!user) {
      res.status(404).json({ message: "User Not find" });
    }

    res.status(200).json({ message: "user Successfuly Delete", user });
  } catch (error) {
    console.log("error in delter", error);
  }
};
