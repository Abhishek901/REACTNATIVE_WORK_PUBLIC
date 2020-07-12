import { Request, Response, Router } from "express";
import { IBaseController } from "../../../baseController/base/base.controller.interface";
import { ReportBussiness } from "../../../bussinessLogic/report.bussiness";
import { IReportInterface } from "../../../models/Interfaces/report.interface";
import { IncomingForm } from "formidable";
import xlsxFile from "read-excel-file/node";

class ReportController implements IBaseController<ReportBussiness> {
  private _router: Router;

  constructor(router: Router) {
    this._router = router;
    this._router.get("/", this.find);
    this._router.post("/", this.create);
    this._router.get("/:id", this.findById);
    this._router.delete("/:id", this.delete);
    this._router.put("/:id", this.update);
  }

  create = async (req: Request, res: Response) => {
    var form = new IncomingForm();
    form.on("file", (field, file) => {
      // you can access it using file.path
      console.log("here in file upload.................");
      console.log(field, JSON.parse(JSON.stringify(file)));
      xlsxFile(file.path).then((rows) => {
        console.log(rows);
        
      });
    });
    form.on("end", () => {
      res.json();
    });
    form.parse(req);
    // try {
    //   var report: IReportInterface = <IReportInterface>req.body;
    //   var reportBussiness = new ReportBussiness();
    //   reportBussiness.create(report, (error, result) => {
    //     if (error) res.send({ error: error });
    //     else res.send({ success: "role created success", request: result });
    //   });
    // } catch (e) {
    //   console.log(e);
    //   res.send({ error: "error in your request" });
    // }
  };

  delete = (req: Request, res: Response) => {
    const reportBussiness = new ReportBussiness();
    reportBussiness.delete(req.params.id, (err, results) => {
      if (err) {
        res.status(500).send({ message: "Network Error !!!" });
      }
      res.status(500).send({ message: "deleted!!" });
    });
  };

  find = (req: Request, res: Response) => {
    const reportBussiness = new ReportBussiness();
    reportBussiness.find(
      (error, results) => {
        if (error) {
          res.status(500).send({ message: error });
        }
        res.status(200).send(results);
      },
      {},
      true
    );
  };

  findById = (req: Request, res: Response) => {};

  update = (req: Request, res: Response) => {};
}
module.exports = ReportController;
