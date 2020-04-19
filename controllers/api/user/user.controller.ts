import { Request, Router, Response } from 'express';
import {UserBussiness} from '../../../bussinessLogic/user.bussiness';
import {IBaseController} from '../../../baseController/base/base.controller.interface';
import {IUserInterface} from '../../../models/Interfaces/user.interface';
class UserController implements IBaseController<UserBussiness> {

    private router: Router
    constructor(router: Router, limit) {
        this.router = router;
        this.router.post('/', limit, this.create);
        this.router.delete('/:id',limit,this.delete);
        this.router.get('/',limit,this.find)
        this.router.get('/:id',this.findById);
        this.router.put('/user',this.update)
    }
 
    create = (req: Request, res: Response) => {
        res.send(JSON.stringify(req.body));
    }

    delete = (req:Request,res:Response)=>{
      
    }

    find = (req:Request, res:Response)=>{

    }

    findById = (req:Request, res:Response)=>{

    }
   
    update = (req:Request,res:Response)=>{

    }

}
module.exports = UserController;