const { query } = require('../database/database.js')
const { DatabaseException } = require('../../../src/domain/exceptions/DatabaseException')

class CompaniesRepository {
    async findByCuit(cuit) {
        try {
            const result = await query('SELECT * FROM companies WHERE cuit = $1 LIMIT 1', [cuit])
            return result
        } catch (error) {
            throw new DatabaseException('Error retrieving company by CUIT from the database')
        }
    }

    async findAdhesionsLastMonth() {
        try {
            const now = new Date()
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

            const result = await query(
                'SELECT * FROM companies WHERE "adhesionDate" BETWEEN $1 AND $2',
                [lastMonth, now]
            )
            return result
        } catch (error) {
            throw new DatabaseException('Error retrieving companies that adhered last month')
        }
    }

    async addCompany({ name, cuit }) {
        try {
            const result = await query(
                'INSERT INTO companies (name, cuit) VALUES ($1, $2) RETURNING *',
                [name, cuit]
            )
            return result[0]
        } catch (error) {
            throw new DatabaseException('Error adding new company to the database')
        }
    }
}

module.exports = { CompaniesRepository }
