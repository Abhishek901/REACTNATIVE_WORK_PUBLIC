import { IReportBussiness } from "./interfaces/report.bussiness.interface";
import { ReportRepository } from "../repository/report.repository";
import { IReportInterface } from "../models/Interfaces/report.interface";

export class ReportBussiness implements IReportBussiness {
  private _ReportRepository: ReportRepository;

  constructor() {
    this._ReportRepository = new ReportRepository();
  }

  create(item: IReportInterface, callback: (error: any, result: any) => void) {
    this._ReportRepository.create(item, callback);
  }

  update(
    _id: string,
    item: IReportInterface,
    callback: (error: any, result: any) => void
  ) {
    this._ReportRepository.findOne(_id, (err, res) => {
      if (err) callback(err, res);
      else this._ReportRepository.update(res._id, item, callback);
    });
  }

  find(
    callback: (error: any, result: Array<IReportInterface>) => void,
    queryObject = {},
    withOption: boolean = false
  ) {
    withOption
      ? this._ReportRepository.findByOption(callback, queryObject)
      : this._ReportRepository.find(callback);
  }

  findOne(
    _id: string,
    callback: (error: any, result: IReportInterface) => void
  ) {
    this._ReportRepository.findOne(_id, callback);
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._ReportRepository.delete(_id, callback);
  }

  findOneAndUpdate(
    _id: string,
    doc,
    callback: (error: any, result: any) => void
  ) {
    this._ReportRepository.findOneAndUpdate(_id, doc, callback);
  }
}
