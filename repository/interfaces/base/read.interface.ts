export default interface read<T> {
  find: (callback: (error: any, result: Array<T>) => void) => void;
  findOne: (id: string, callback: (error: any, result: T) => void) => void;
  
}
