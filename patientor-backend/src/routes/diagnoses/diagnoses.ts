import express, { Response, Request } from "express";
import diagnoseService from "../../services/diagnoseService";
import { DiagnoseEntry } from "../../types";

const router = express.Router();

router.get("/", (_req: Request, res: Response<DiagnoseEntry[]>) => {
  res.send(diagnoseService.getDiagnoses());
});

export default router;
