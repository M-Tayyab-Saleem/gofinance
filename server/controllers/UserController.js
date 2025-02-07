import User from "../models/UserModels.js";

export const getUserData = async (req, res) => {
  try {
    const {userId} = req.body;
    const user = await User.findById(userId);  
    if (!user) {
      return res.status(400).json({  message: "User does not exist" });
    } 
    res.status(200).json({ success: true ,user})
        
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

//get Any User
export const getAnyUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);  
    if (!user) {
      return res.status(400).json({  message: "User does not exist" });
    } 
    res.status(200).json({ success: true ,user})
        
} catch (error) {   
    res.status(500).json({ message: error.message });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;
try {
  const deleteddUser = await User.findByIdAndDelete(id)
  if (!deleteddUser) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "User deleted successfully" });
} catch (error) {
  res.status(500).json({ message: error.message });
}
};