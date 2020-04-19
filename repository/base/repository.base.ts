import IRead from '../interfaces/base/read.interface';
import IWrite from '../interfaces/base/write.interface';

import { Schema,Document ,Model} from 'mongoose';

export class RepositoryBase <T extends Document> implements IRead<T> , IWrite<T>{
   private _model:Model<Document>;

   constructor(schemaModel:Model<Document>){
         this._model = schemaModel;
   }

   async create(item:T):Promise<Document>{
        const result = await this._model.create(item);
        return result;       
   }

   update(id: String, item: T): Promise<Document> {
      throw new Error('Method not implemented.');
   }
   delete(id: String): Promise<Document> {
      throw new Error('Method not implemented.');
   }
   find(item: T): Promise<T[]> {
      throw new Error('Method not implemented.');
   }
   findOne(id: String): Promise<T> {
      throw new Error('Method not implemented.');
   }

}
