import express, {Request, Response} from "express"
import bcrypt from "bcrypt"
import cloudinary from "../Config/cloudinary"
import authModel from "../Model/authModel"


export const createUser =async (req:any, res: Response) => {
   try {
    const {userName, email, password,} = req.body;
    const salt: any = await bcrypt.genSalt(10);
    const hashed: any =  await bcrypt.hash(password, salt);


    // if(password !== confirmPassword){
    //     return res.status(400).json({error:"Confirm password must be password"})
    //    }

    const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file?.path,
      );
  
      const user = await authModel.create({
        userName,
        email,
        password: hashed,
        avatar: secure_url,
        avatarID: public_id,
        // comfirmPassword:hashed
      });

    //   console.log(user)

      res.status(201).json({
        message : "User Successfully Created",
        data: user,
      });
} catch (error: any) {
    res.status(404).json({
        message : "Error creating user",
        data: error.message,
        err:error
    
    })
   } 
}

export const findUsers =async (req:any, res : Response) => {
    try {
        const user = await authModel.find().sort({createdAt: -1})

        res.status(201).json({
            message: "find Users",
            data: user,
        });
    } catch (error) {
        res.status(404).json({
            message : "Error  finding user",
            data : error
        })
    }
}

export const findOneUser= async (req: any, res: Response) => {
    try {
      const { UserID } = req.params;
      const user = await authModel.findById(UserID);
  
      res.status(201).json({
        message: "find one User",
        data: user,
      });
    } catch (error) {
      res.status(404).json({
        message: "Error finding User",
      });
    }
  };

  
export const updateOneUser = async (req: any, res: Response) => {
    try {
      const { name } = req.body;
      const { UserID } = req.params;
  
      const user = await authModel.findByIdAndUpdate(
        UserID,
        { name },
        { new: true },
      );
  
      res.status(201).json({
        message: "User Succesfully Updated",
        data: user,
      });
    } catch (error) {
      res.status(404).json({
        message: "Error updating User",
      });
    }
  };

  export const deleteOneUser = async (req: any, res: Response) => {
    try {
      const { UserID } = req.params;
  
      const user = await authModel.findByIdAndDelete({ id: UserID });
  
      res.status(201).json({
        message: "Successfully deleted user",
        data: user,
      });
    } catch (error) {
      res.status(404).json({
        message: "Error deleting User",
      });
    }
  };

  export const signinUser = async (req: any, res: Response) => {
    try {
      const { email, password } = req.body;
  
      const user = await authModel.findOne({ email });
  
      if (user) {
        const checkPassword = await bcrypt.compare(password, user?.password!);
  
        if (checkPassword) {
          return res.status(201).json({
            message: "user sign in",
            data: user._id,
          });
        } else {
          res.status(404).json({ message: "password not correct" });
        }
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } catch (error) {
      res.status(404).json({
        message: "Error while Signing User In",
      });
    }
  };