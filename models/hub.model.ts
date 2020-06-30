import { IHubInterface } from './Interfaces/hub.interface';

export class HubModel {
    private _hubModel: IHubInterface;
    constructor(hubModel: IHubInterface) {
        this._hubModel = hubModel
    }
}
Object.seal(HubModel);