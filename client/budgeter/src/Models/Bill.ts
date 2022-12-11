export interface Bill {
    billName: string;
    amount: any;
    hasAutoDraft: boolean;
    picked?: string;
    dueDate: string;
}