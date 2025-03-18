const { GetCompaniesByAdhesionController } = require('../../../../src/Infrastructure/adapters/controllers/GetCompaniesByAdhesionController.js')
const { query } = require('../../../../src/Infrastructure/database/database.js')
const { DatabaseException } = require('../../../../src/domain/exceptions/DatabaseException.js')

jest.mock('../../../../src/Infrastructure/database/database.js', () => ({
  query: jest.fn()
}))

describe('GetCompaniesByAdhesionController', () => {
  let controller
  let mockRequest
  let mockResponse

  const mockCompanies = [
    { id: 1, name: 'Company A', cuit: 30123456781, adhesionDate: '2025-02-15T10:30:00.000Z' },
    { id: 2, name: 'Company B', cuit: 30876543219, adhesionDate: '2025-03-01T14:00:00.000Z' },
    { id: 3, name: 'Company C', cuit: 30112233445, adhesionDate: '2025-03-05T09:15:00.000Z' },
    { id: 4, name: 'Company D', cuit: 30556677883, adhesionDate: '2025-03-08T16:45:00.000Z' }
  ]

  beforeEach(() => {
    controller = new GetCompaniesByAdhesionController()

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  it('should return status 200 with companies that adhered last month', async () => {
    query.mockResolvedValueOnce(mockCompanies)

    await controller.handle(mockRequest, mockResponse)
    expect(mockResponse.json).toHaveBeenCalledWith(mockCompanies)
  })

  it('should return status 500 if a database error occurs', async () => {
    query.mockRejectedValueOnce(new DatabaseException())

    await controller.handle(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error retrieving companies that adhered last month' })
  })
})
