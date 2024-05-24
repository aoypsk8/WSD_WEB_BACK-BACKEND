const express = require('express');
const router = express.Router();
// const {Controllers} = require('../controllers/authController')
const AuthController = require('../controllers/authController');
const UnitController = require('../controllers/unitController');
const ProductController = require('../controllers/productController');
const PositionController = require('../controllers/positionController');
const EmployeeController = require('../controllers/employeeController');
const PriceController = require('../controllers/priceController');
const BranchController = require('../controllers/branchController');
const WaterLineController = require('../controllers/waterLineController');
const UserWaterLineController = require('../controllers/userWaterLineController');

//======================= authController =============================
router.post("/auth/loginUser",AuthController.loginUser); 

//======================= UnitController =============================
router.post("/unit/create",UnitController.unitCreate); 
router.delete("/unit/delete/:id",UnitController.unitDelete); 
router.get("/unit/getAll",UnitController.unitGetAll); 
router.put("/unit/update/:id",UnitController.unitUpdate); 

//======================= ProductController =============================
router.post("/product/create",ProductController.productCreate); 
router.put("/product/update",ProductController.productUpdate); 
router.delete("/product/delete",ProductController.productDelete); 
router.get("/product/getAll",ProductController.productGetAll); 


//======================= PositionController =============================
router.post("/position/create",PositionController.positionCreate); 
router.delete("/position/delete",PositionController.positionDelete); 
router.get("/position/getAll",PositionController.positionGetAll); 
router.put("/position/update",PositionController.positionUpdate); 

//======================= EmployeeController =============================
router.post("/employee/create",EmployeeController.employeeCreate); 
router.put("/employee/update",EmployeeController.employeeUpdate); 
router.delete("/employee/delete",EmployeeController.employeeDelete); 
router.get("/employee/getAll",EmployeeController.employeeGetAll); 

//======================= PriceController =============================
router.post("/price/create",PriceController.priceCreate); 
router.put("/price/update",PriceController.priceUpdate); 
router.delete("/price/delete",PriceController.priceDelete); 
router.get("/price/getAll",PriceController.priceGetAll); 


//======================= BranchController =============================
router.post("/branch/create",BranchController.branchCreate); 
router.put("/branch/update",BranchController.branchUpdate); 
router.delete("/branch/delete",BranchController.branchDelete); 
router.get("/branch/getAll",BranchController.branchGetAll); 



//======================= WaterLineController =============================
router.post("/waterLine/create",WaterLineController.waterCreate); 
router.put("/waterLine/update",WaterLineController.waterUpdate); 
router.delete("/waterLine/delete",WaterLineController.waterDelete); 
router.get("/waterLine/getAll",WaterLineController.waterGetAll); 


//======================= UserWaterLineController =============================
router.post("/userWaterLine/create",UserWaterLineController.userWaterLineCreate); 
router.put("/userWaterLine/update",UserWaterLineController.userWaterLineUpdate); 
router.delete("/userWaterLine/delete",UserWaterLineController.userWaterLineDelete); 
router.get("/userWaterLine/getAll",UserWaterLineController.userWaterLineGetAll); 
module.exports = router;
