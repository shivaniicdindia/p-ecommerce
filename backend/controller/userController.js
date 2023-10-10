 const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "progile id",
      url: "profile url",
    },
  });

  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/z${resetToken}`;  
  // console.log(resetPasswordUrl )

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    console.log(resetPasswordToken)

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
   res.status(200).json({
    success: true,
    user,
  });
});

// update User password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  // console.log(user +"for password")

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});


// update profile


exports.updateUserProfile = catchAsyncError(async (req, res, next) => {

const newUserData = {
  name : req.body.name,
  email:req.body.email,
}

const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
  new:true,
  runValidators:true,
  useFindAndModify:false
})

res.status(200).json({
  success:true,
  message:'update user profile by  succesfully',
  user
})

});

//  get all users by (admin)

exports.getallUsers = catchAsyncError(async (req,res,next)=>{
  const user = await User.find();
  res.status(200).json({
    success:true,
    message:'Get all users by  succesfully',
    user,
  })
})
//  get single  users by (admin)
exports.getSingleUser = catchAsyncError(async (req,res,next)=>{
  const user = await User.findById(req.params.id);
  if(!user){
    return next( new ErrorHander("user does not exit",400 ))
  }
  res.status(200).json({
    success:true,
    message:'Get single user succesfully',
    user,
  })
})



// update Role by admin


exports.updateUserRole = catchAsyncError(async (req, res, next) => {

  const userRole = {
    name : req.body.name,
    email:req.body.email,
    role : req.body.role
  }
  const user = await User.findByIdAndUpdate(req.user.id,userRole,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })
  
  res.status(200).json({
    success:true,
    message:'update user role  succesfully',
    user
  })
  
  });


  // Delete  Profile by admin


exports.deleteUser = catchAsyncError(async (req, res, next) => {
  //  we will remove cloudinary later

  const user = await User.findById(req.params.id);

  if(!user){
    return next(new ErrorHander(`user does not exist with Id: ${req.params.id}`))
  }

  await user.deleteOne();
  
  res.status(200).json({
    success:true,
    message:'delete user succesfully',
    user
  })
  
  });