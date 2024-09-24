import { Router } from "express";
import { CompanyController } from "../controllers/CompanyController";
import verifySession from "../middlewares/verifySession";

const router = Router();
const companyController = new CompanyController();

router.get("/:id", companyController.GetCompanyById);
router.get("/all", verifySession, companyController.GetAllCompanies);
router.post("/create", verifySession, companyController.CreateCompany);
router.put("/update", verifySession, companyController.UpdateCompany);

export default router;
