import { RepositoryBase } from "./base/repository.base";
import { IHubInterface } from "../models/Interfaces/hub.interface";
import HubSchemModel from "../dataAccess/Schemas/hub.schema";

export class HubRepository extends RepositoryBase<IHubInterface> {
  constructor() {
    super(HubSchemModel);
  }
  findByPopulateRole = (callback, query, refKey) => {
    // this.findByPopulate(callback, query, {
    //   path: refKey,
    //   Model: RoleSchemaModel,
    // });
  };
}
Object.seal(HubRepository);
