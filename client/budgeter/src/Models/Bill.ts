export interface Bill {
    id?: string;
    billName: string;
    amount: any;
    hasAutoDraft: boolean;
    dueDate: string;
}