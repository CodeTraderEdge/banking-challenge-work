const { query } = require('../database/database.js')
const { DatabaseException } = require('../../../src/domain/exceptions/DatabaseException')

class TransfersRepository {
    async findByDateRange(startDate, endDate) {
        try {
            const result = await query(
                'SELECT * FROM transfers WHERE date BETWEEN $1 AND $2',
                [startDate, endDate]
            )

            return result.map(row => ({
                ...row,
                amount: parseFloat(row.amount)
            }))
        } catch (error) {
            console.log(error);
            throw new DatabaseException()
        }
    }
}

module.exports = { TransfersRepository }
