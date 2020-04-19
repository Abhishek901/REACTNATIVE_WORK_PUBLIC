export interface IReadBussiness<T>{
    find(item:T):Promise<T[]>
    findOne(itemID:String):Promise<T>
}