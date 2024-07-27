import express from "express";
import {
  newAdmin,
  login,
  patientRegister,
  getAllDoctors,
  getUserDetails,
  logoutAdmin,
  logoutPatient,
  addNewDoctor,
} from "../controller/userController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/new", isAdminAuthenticated, newAdmin);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.post("/doctor/new", isAdminAuthenticated, addNewDoctor);

export default router;
