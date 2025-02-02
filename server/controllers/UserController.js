import User from "../models/UserModels.js";

export const getUserData = async (req, res) => {
  try {
    const {userId} = req.body;
    const user = await User.findById(userId);  
    if (!user) {
      return res.status(400).json({  message: "User does not exist" });
    } 
    res.status(200).json({ success: true , userData: {
        name: user.name,
        email: user.email,
        role: user.role,
        isAccountVerified: user.isAccountVerified
        }});
} catch (error) {   
    res.status(500).json({ message: error.message });
  }
};

export const getAllUserData = async (req, res) => { 
  try{
    const allUsers = await User.find({});
    if(!allUsers){
      return res.status(400).json({ message: "User Data not found" });
    }
    res.send(allUsers)
  }catch(error){
    res.status(500).json({ message: error.message });
  }
}

//edit user
export const editUser = async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};