const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateUserProfile, getallUsers, getSingleUser, updateUserRole, deleteUser } = require("../controller/userController");
const { isAuthenticationuser, authourizeRoles } = require("../middleware/auth");



const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route('/password/forgot').post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticationuser, getUserDetails);
router.route('/password/update').put(isAuthenticationuser, updatePassword)
router.route('/me/update').put(isAuthenticationuser, updateUserProfile)
router.route('/admin/users').get(isAuthenticationuser, authourizeRoles("admin"), getallUsers)
router.route('/admin/user/:id')
.get(isAuthenticationuser, authourizeRoles("admin"), getSingleUser)
.put(isAuthenticationuser, authourizeRoles('admin'), updateUserRole)
.delete(isAuthenticationuser, authourizeRoles('admin'), deleteUser)



module.exports = router  