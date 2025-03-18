const { TransfersRepository }  = require('../../Infrastructure/repositories/TransfersRepository.js')
const { Transfer }  = require('../../domain/entities/Transfer.js')

class GetTransfersByDateService {
    constructor() {}

    async findByDate(startDate, endDate) {
        const transfersRepository = new TransfersRepository()
        const rawTransfers = await transfersRepository.findByDateRange(startDate, endDate)

        const transfers = rawTransfers.map(transfer => Transfer.fromPrimitives(transfer))
        return transfers
    }
}

module.exports = { GetTransfersByDateService }