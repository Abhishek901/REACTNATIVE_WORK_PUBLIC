
export interface IOTPBussiness<T> {
    sendOTP(input:T):Promise<Object>; 
}
    
