import expressAsyncHandler from "express-async-handler";

const followUser = expressAsyncHandler(async (req, res) => {
  try {
    // const user = await UserModel.findById(req.userId);
    // const othUser = await UserModel.findById(req.params.othUserId);
    // if (!user || !othUser) throw new Error("User not found");
    // if (user.following.includes(othUser.id)) throw new Error("Following already");
    // await UserModel.findByIdAndUpdate(user.id, { following: [...user.following, othUser] });
    // res.status(200).json({ message: `${user.username} is following ${othUser.username} now` });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const unfollowUser = expressAsyncHandler(async (req, res) => {
  try {
    // const user = await UserModel.findById(req.userId);
    // const othUser = await UserModel.findById(req.params.othUserId);
    // if (user === null || othUser === null) throw new Error("User not found");
    // if (!user.following.includes(othUser.id)) throw new Error("Not following yet");
    // await UserModel.findByIdAndUpdate(user.id, {
    //   following: user.following.filter((value) => value.toString() !== othUser.id),
    // });
    // res.status(200).json({ message: `${user.username} is not following ${othUser.username} now` });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const getFollowers = expressAsyncHandler(async (req, res) => {
  try {
    // res.status(200).json({ message: `${user.username} is following ${othUser.username} now` });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const getFollowing = expressAsyncHandler(async (req, res) => {
  try {
    // res.status(200).json({ message: `${user.username} is following ${othUser.username} now` });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export { followUser, unfollowUser, getFollowers, getFollowing };
