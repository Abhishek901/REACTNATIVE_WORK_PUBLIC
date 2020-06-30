import { Request, Response, Router } from "express";
import { IBaseController } from "../../../baseController/base/base.controller.interface";
import { HubBussiness } from "../../../bussinessLogic/hub.bussiness"
import { IHubInterface } from "../../../models/Interfaces/hub.interface";

class HubController implements IBaseController<HubBussiness> {
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
            var hub: IHubInterface = <IHubInterface>req.body;
            var hubBusiness = new HubBussiness();
            hubBusiness.create(hub, (error, result) => {
                if (error) res.send({ error: error });
                else res.send({ success: "Hub created success", request: result });
            });
        } catch (e) {
            console.log(e);
            res.send({ error: "error in your request" });
        }
    };

    delete = (req: Request, res: Response) => {
        const hubBusiness = new HubBussiness();
        hubBusiness.delete(req.params.id, (err, results) => {
            if (err) {
                res.status(500).send({ message: "Network Error !!!" });
            }
            res.status(500).send({ message: "deleted!!" });
        });
    };

    find = (req: Request, res: Response) => {
        const hubBusiness = new HubBussiness();
        hubBusiness.find(
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

    findById = (req: Request, res: Response) => { };

    update = (req: Request, res: Response) => { };
}
module.exports = HubController;
