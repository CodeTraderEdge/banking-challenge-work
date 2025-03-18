class TransfersRepository {
    constructor() {
        this.mockTransfers = [
            { id: 1, companyId: 1, debitAccount: '123-456-789', creditAccount: '987-654-321', amount: 1500.50, date: '2025-02-15T10:30:00.000Z' },
            { id: 2, companyId: 2, debitAccount: '111-222-333', creditAccount: '999-888-777', amount: 3200.75, date: '2025-03-01T14:45:20.000Z' },
            { id: 3, companyId: 3, debitAccount: '555-666-777', creditAccount: '222-333-444', amount: 750.00, date: '2025-03-05T09:15:10.000Z' },
            { id: 4, companyId: 4, debitAccount: '444-555-666', creditAccount: '111-222-333', amount: 2000.00, date: '2025-03-08T16:30:45.000Z' },
            { id: 5, companyId: 5, debitAccount: '999-888-777', creditAccount: '555-666-777', amount: 5000.25, date: '2025-03-10T22:10:05.000Z' },
            { id: 6, companyId: 6, debitAccount: '222-333-444', creditAccount: '123-456-789', amount: 1750.60, date: '2025-03-15T12:00:00.000Z' },
            { id: 7, companyId: 7, debitAccount: '333-444-555', creditAccount: '444-555-666', amount: 900.30, date: '2025-03-20T08:20:30.000Z' },
            { id: 8, companyId: 8, debitAccount: '555-666-777', creditAccount: '999-888-777', amount: 1250.90, date: '2025-03-25T18:45:50.000Z' },
            { id: 9, companyId: 9, debitAccount: '987-654-321', creditAccount: '222-333-444', amount: 2800.40, date: '2025-04-01T07:05:15.000Z' },
            { id: 10, companyId: 10, debitAccount: '111-222-333', creditAccount: '333-444-555', amount: 350.75, date: '2025-04-05T11:55:40.000Z' }
        ]
    }

    async findByDateRange(startDate, endDate) {
        const start = new Date(startDate)
        const end = new Date(endDate)

        return this.mockTransfers.filter(transfer => {
            const transferDate = new Date(transfer.date)
            return transferDate >= start && transferDate <= end
        })
    }
}

module.exports = { TransfersRepository }