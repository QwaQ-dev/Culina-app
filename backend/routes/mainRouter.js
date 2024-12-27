const Router = require("express");
const router = new Router();
const ProfileRouter = require("./profileRouter");
const UserRouter = require("./userRouter");
const DashboardRouter = require("./dashboardRouter");

router.use('/profile', ProfileRouter);
router.use('/dashboard', DashboardRouter);
router.use('/user', UserRouter);

module.exports = router;