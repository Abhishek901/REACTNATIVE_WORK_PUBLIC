export default interface read<T>{
    find(item:T):Promise<T[]>
    findOne(itemID:String):Promise<T>
}