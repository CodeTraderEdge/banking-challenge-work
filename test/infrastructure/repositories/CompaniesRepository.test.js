const { CompaniesRepository } = require('../../../src/Infrastructure/repositories/CompaniesRepository')
const { query } = require('../../../src/Infrastructure/database/database')
const { DatabaseException } = require('../../../src/domain/exceptions/DatabaseException')

jest.mock('../../../src/Infrastructure/database/database', () => ({
  query: jest.fn()
}))

describe('CompaniesRepository', () => {
  let repository

  beforeEach(() => {
    repository = new CompaniesRepository()
    jest.clearAllMocks()
  })

  it('should return an empty result if no company is found by CUIT', async () => {
    query.mockResolvedValue([])

    const result = await repository.findByCuit(30123456789)

    expect(result).toEqual([])
  })

  it('should throw a DatabaseException if an error occurs in findByCuit', async () => {
    query.mockRejectedValue(new Error('Database error'))

    await expect(repository.findByCuit(30123456789)).rejects.toThrow(DatabaseException)
  })

  it('should throw a DatabaseException if an error occurs in addCompany', async () => {
    query.mockRejectedValue(new Error('Database error'))

    await expect(repository.addCompany({ name: 'Test Company', cuit: 30123456789 }))
      .rejects.toThrow(DatabaseException)
  })
})
