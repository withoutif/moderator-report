import { Request, Response } from "express";
import { ReportService } from "../services/reportService";

const report = async (req: Request, res: Response) => {
  try {
    const report = await ReportService.createReport(req.params?.postId);
    return res.status(200).json(report);
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
};

const resolve = async (req: Request, res: Response) => {
  try {
    const report = await ReportService.resolveReport(req.params?.reportId);
    return res.status(200).json(report);
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
};

export default { report, resolve };
