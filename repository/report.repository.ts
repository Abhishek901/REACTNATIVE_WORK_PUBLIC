import { RepositoryBase } from "./base/repository.base";
import { IReportInterface } from "../models/Interfaces/report.interface";
import ReportSchemaModel from "../dataAccess/Schemas/report.schema";

export class ReportRepository extends RepositoryBase<IReportInterface> {
  constructor() {
    super(ReportSchemaModel);
  }
}

Object.seal(ReportRepository);
