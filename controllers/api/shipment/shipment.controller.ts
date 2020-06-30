import { Request, Response, Router } from "express";
import { IBaseController } from "../../../baseController/base/base.controller.interface";
import { ShipmentBussiness } from "../../../bussinessLogic/shipment.bussiness"
import { IShipmentInterface } from "../../../models/Interfaces/shipment.interface";
import AuthMiddlewares from "../../../server/middlewares/authMiddlewares/auth.base.middlware"
class ShipmentController implements IBaseController<ShipmentBussiness> {
    private _router: Router;

    constructor(router: Router) {
        this._router = router;
        this._router.get("/per_rider", AuthMiddlewares.base, this.findPerRider);
        this._router.get("/", AuthMiddlewares.base, this.find);
        this._router.post("/", AuthMiddlewares.base, this.create);
        this._router.get("/:id", AuthMiddlewares.base, this.findById);
        this._router.delete("/:id", AuthMiddlewares.base, this.delete);
        this._router.put("/update", AuthMiddlewares.base, this.masterupdate);
    }

    create = async (req: Request, res: Response) => {
        try {
            var roll: IShipmentInterface = <IShipmentInterface>req.body;
            var shipmentBusiness = new ShipmentBussiness();
            shipmentBusiness.create(roll, (error, result) => {
                if (error) res.send({ error: error });
                else res.send({ success: "Shipment created success", request: result });
            });
        } catch (e) {
            console.log(e);
            res.send({ error: "error in your request" });
        }
    };

    delete = (req: Request, res: Response) => {
        const shipmentBusiness = new ShipmentBussiness();
        shipmentBusiness.delete(req.params.id, (err, results) => {
            if (err) {
                res.status(500).send({ message: "Network Error !!!" });
            }
            res.status(500).send({ message: "deleted!!" });
        });
    };

    find = (req: Request, res: Response) => {
        const shipmentBusiness = new ShipmentBussiness();
        shipmentBusiness.find(
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

    findPerRider = (req: Request, res: Response) => {
        console.log('here in find by rider ........................................')
        var shipmentBusiness = new ShipmentBussiness();
        const riderId = req.body.user.user._id;
        const query = { 'user_id': riderId, status: 'pickup' }
        const callback = (error, results) => {
            if (error) {
                res.status(500).send({ message: error })
            }
            res.status(200).send({ message: results })
        }
        shipmentBusiness.findByMultiplePopulate(callback, query, ['hub_id', 'user_id'])

    }

    findById = (req: Request, res: Response) => { };

    masterupdate = (req: Request, res: Response) => {
        var shipmentBusiness = new ShipmentBussiness();
        const _id = req.body._id;
        const doc = req.body.doc;
        shipmentBusiness.findOneAndUpdate(_id, doc, (error, result) => {
            if (error) {
                res.status(500).send({ message: error });
            }
            res.status(200).send({ message: result })
        })
    };

    update = (req: Request, res: Response) => { };
}
module.exports = ShipmentController;
