import {Request , Response ,Router } from 'express';
import {IBaseController} from '../../../baseController/base/base.controller.interface';
import {RoleBussiness} from '../../../bussinessLogic/role.bussiness';
import {IRole} from '../../../models/Interfaces/role.interface';


 class RoleController implements IBaseController<RoleBussiness>{
    
    private _router:Router;
    

    constructor(router:Router){
        this._router = router;
        this._router.get('/',this.find);
        this._router.post('/',this.create);
        this._router.get('/:id',this.findById);
        this._router.delete('/:id',this.delete);
        this._router.put('/:id',this.update);
    }

    create = async (req: Request, res: Response) => {
        try{
           const role:IRole = <IRole>req.body;
           const roles = new RoleBussiness();
           const results = await roles.create(role);
           res.send(JSON.stringify(results));
           
        } catch(e){
 
        }
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
 module.exports = RoleController;