const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controller/productConroller");
const { isAuthenticationuser, authourizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticationuser, authourizeRoles("admin"), getAdminProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticationuser, authourizeRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticationuser, authourizeRoles("admin"), updateProduct)
  .delete(isAuthenticationuser, authourizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticationuser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticationuser, deleteReview);

module.exports = router;