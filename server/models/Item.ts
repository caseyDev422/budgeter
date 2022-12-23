export interface Item {
    id: string;
    billName: string;
    amount: any;
    dueDate: string;
    hasAutoDraft: boolean;
}

export class Item {
    constructor(id: string, billName: string, amount: any, dueDate: string, hasAutoDraft: boolean) {
        this.id = id;
        this.billName = billName;
        this.amount = amount;
        this.dueDate = dueDate;
        this.hasAutoDraft = hasAutoDraft;
    }
}