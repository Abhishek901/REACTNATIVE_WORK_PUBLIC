import { Request, Router, Response } from "express";
import { UserBussiness } from "../../../bussinessLogic/user.bussiness";
import { IBaseController } from "../../../baseController/base/base.controller.interface";
import { IUserInterface } from "../../../models/Interfaces/user.interface";
import AuthMiddlewares from "../../../server/middlewares/authMiddlewares/auth.base.middlware";
class UserController implements IBaseController<UserBussiness> {
  private router: Router;
  constructor(router: Router, limit) {
    this.router = router;
    this.router.post("/", limit, this.create);
    this.router.delete("/:id", limit, this.delete);
    this.router.get("/", limit, this.find);
    this.router.get("/me", AuthMiddlewares.base, limit, this.getCurrentUser);
    this.router.get("/:id", AuthMiddlewares.base, this.findOne);
    this.router.put("/update", AuthMiddlewares.base, this.update);
    this.router.put("/masterupdate", this.masterupdate);
  }

  create = (req: Request, res: Response) => {
    const User: IUserInterface = req.body;
    const AddUserLogic = new UserBussiness();
    AddUserLogic.create(User, (err, result) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      res.status(200).send(result);
    });
  };

  delete = (req: Request, res: Response) => {
    const deleteUserLogic = new UserBussiness();
    if (req.params.id !== undefined) {
      deleteUserLogic.delete(req.params.id, (err, result) => {
        if (err) {
          res.status(500).send({ message: err });
        }
        res.status(200).send(result);
      });
    } else {
      res.status(500).send({ message: "Enter Id with request" });
    }
  };

  find = (req: Request, res: Response) => {
    const user: IUserInterface = req.body;
    const FindUserLogic = new UserBussiness();
    FindUserLogic.find((err, result) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      res.status(200).send({ message: result });
    });
  };

  findOne = (req: Request, res: Response) => {
    const FindUserLogic = new UserBussiness();
    const callback = (error, results) => {
      if (error) {
        res.status(500).send({ message: error });
      }
      res.status(200).send({ message: results });
    };
    const id = req.body.user.user._id;
    FindUserLogic.findOne(id, callback);
  };

  findById = (req: Request, res: Response) => {};

  getCurrentUser = (req: Request, res: Response) => {
    const FindUserLogic = new UserBussiness();
    const callback = (error, results) => {
      if (error) {
        res.status(500).send({ message: error });
      }
      res.status(200).send({ message: results });
    };
    const query = { _id: req.body.user.user._id };
    FindUserLogic.findByPopulate(callback, query, "role");
  };

  update = (req: Request, res: Response) => {
    const UpdateOneUserLogic = new UserBussiness();
    const _id = req.body.user.user._id;
    const doc = req.body.doc;
    UpdateOneUserLogic.findOneAndUpdate(_id, doc, (error, result) => {
      if (error) {
        res.status(500).send({ message: error });
      }
      res.status(200).send({ message: result });
    });
  };

  masterupdate = (req: Request, res: Response) => {
    const UpdateOneUserLogic = new UserBussiness();
    const _id = req.body._id;
    const doc = req.body.doc;
    UpdateOneUserLogic.findOneAndUpdate(_id, doc, (error, result) => {
      if (error) {
        res.status(500).send({ message: error });
      }
      res.status(200).send({ message: result });
    });
  };
}
module.exports = UserController;
