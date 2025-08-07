import { Router } from "express";
import { addSchool, listSchools } from "@/controllers/school.controller";
const router: Router = Router();

router.route("/addSchool").post(addSchool);
router.route("/listSchools").get(listSchools);
router.route("/health").get((_, res) => {
    return res.json({success: true, message: "ok"});
});
export default router;
