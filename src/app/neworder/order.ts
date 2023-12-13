export class Order {
    orderid:number;
    customerusername:String;
    productid:number;
    qty:number;
    orderprice:number;
    status:String;
    orderTime: string;
    
    constructor() {
        const istDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        this.orderTime = istDate;
    }
}

