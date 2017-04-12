export class Expense {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public amount?: number,
        public type?: string,
        public date?: any,
        public userId?: number,
    ) {
    }
}
