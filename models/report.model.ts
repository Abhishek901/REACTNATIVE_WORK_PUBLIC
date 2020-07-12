import { IReportInterface } from "./Interfaces/report.interface";

export class ReportModel {
  private _ReportModel: IReportInterface;
  constructor(ReportModel: IReportInterface) {
    this._ReportModel = ReportModel;
  }
}
