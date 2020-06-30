import { Request, Response, Router } from "express";
import { IBaseController } from "../../../baseController/base/base.controller.interface";
import { RoleBussiness } from "../../../bussinessLogic/role.bussiness";
import { IRole } from "../../../models/Interfaces/role.interface";

class RoleController implements IBaseController<RoleBussiness> {
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
    try {
      var roll: IRole = <IRole>req.body;
      var roleBusiness = new RoleBussiness();
      roleBusiness.create(roll, (error, result) => {
        if (error) res.send({ error: error });
        else res.send({ success: "role created success", request: result });
      });
    } catch (e) {
      console.log(e);
      res.send({ error: "error in your request" });
    }
  };

  delete = (req: Request, res: Response) => {
    const roleBusiness = new RoleBussiness();
    roleBusiness.delete(req.params.id, (err, results) => {
      if (err) {
        res.status(500).send({ message: "Network Error !!!" });
      }
      res.status(500).send({ message: "deleted!!" });
    });
  };

  find = (req: Request, res: Response) => {
    const roleBusiness = new RoleBussiness();
    roleBusiness.find(
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
module.exports = RoleController;
