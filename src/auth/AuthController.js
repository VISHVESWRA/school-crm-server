import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserLogin, {mymod} from "../models/UserModel.js";

export const verifyEmail = async (req, res) => {
  try {
    const {email} = req.body;
    if (!email) {
      return res.status(400).json({message: "Email is required"});
    }

    const superAdminExist = await UserLogin.findOne({email});
    const userExist = await mymod.findOne({email});

    if (superAdminExist) {
      return res.status(200).json({
        message: "Email found",
        name: superAdminExist.name,
        email: superAdminExist.email,
        role: superAdminExist.role,
        _id: superAdminExist._id,
      });
    }

    if (userExist) {
      return res.status(200).json({
        message: "Email found",
        name: `${user.firstName} ${user.lastName}`,
        email: userExist.email,
        role: userExist.role,
        _id: userExist._id,
      });
    }

    return res.status(404).json({message: "User not found"});
  } catch (error) {
    console.error("Verify error:", error);
    res.status(500).json({message: "Server error"});
  }
};

export const Reset = async (req, res) => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({message: "Email and password are required"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserLogin.findOneAndUpdate(
      {email},
      {$set: {password: hashedPassword}},
      {new: true}
    );

    if (!user) {
      const userHashedPassword = await bcrypt.hash(password, 10);
      const user = await mymod.findOneAndUpdate(
        {email},
        {$set: {password: userHashedPassword}},
        {new: true}
      );
    }

    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    return res.status(200).json({message: "Password reset successfully"});
  } catch (e) {
    console.error("Reset error:", error);
    res.status(500).json({message: "Server error"});
  }
};

export const Login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const superAdmin = await UserLogin.findOne({email});
    const user = await mymod.findOne({email});

    const account = superAdmin || user;

    // if (superAdminExist) {
    //   const isPassword = await bcrypt.compare(
    //     password,
    //     superAdminExist.password
    //   );

    if (!account) {
      return res.status(400).json({message: "User does not exist"});
    }

    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return res.status(400).json({message: "Password does not match"});
    }

    const token = jwt.sign(
      {id: account._id, role: account.role},
      process.env.JWT_SECRET,
      {expiresIn: "1d"}
    );

    return res.json({
      token,
      user: {
        id: account._id,
        name:
          account.name ||
          `${account.firstName ?? ""} ${account.lastName ?? ""}`.trim(),
        email: account.email,
        role: account.role,
      },
    });
  } catch (e) {
    console.error("Login error:", error);
    res.status(500).json({message: "Server error"});
  }
};

//   if (superAdminExist.role === "superAdmin") {
//     const token = jwt.sign(
//       {id: superAdminExist._id, role: superAdminExist.role},
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );

//     return res.json({
//       token,
//       user: {
//         id: superAdminExist._id,
//         name: superAdminExist.name,
//         email: superAdminExist.email,
//         role: superAdminExist.role,
//       },
//     });
//   }
// } else {
//   const isUserPassword = await bcrypt.compare(password, userExist.password);

//   if (!userExist) {
//     return res.status(400).json({message: "User does not exist"});
//   }
//   if (!isUserPassword) {
//     return res.status(400).json({message: "Password does not match"});
//   }

//   const token = jwt.sign(
//     {id: userExist._id, role: userExist.role},
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "1d",
//     }
//   );

//   return res.json({
//     token,
//     user: {
//       id: userExist._id,
//       name: userExist.firstName + " " + userExist.lastName,
//       email: userExist.email,
//       role: userExist.role,
//     },
//   });
// }
