
const express = require("express");
const router = express.Router();
const {  newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder, } = require("../controller/orederController");
const { isAuthenticationuser, authourizeRoles } = require("../middleware/auth");


router.route("/order/new").post(isAuthenticationuser, newOrder);

router.route("/order/:id").get(isAuthenticationuser, getSingleOrder);

router.route("/orders/me").get(isAuthenticationuser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticationuser,authourizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticationuser,authourizeRoles("admin"), updateOrder)
  .delete(isAuthenticationuser,authourizeRoles("admin"), deleteOrder);

module.exports = router 