const { GetTransfersByDateController } = require('../../../../src/Infrastructure/adapters/controllers/GetTransfersByDateController.js')
const { query } = require('../../../../src/Infrastructure/database/database.js')
const { DatabaseException } = require('../../../../src/domain/exceptions/DatabaseException.js')

jest.mock('../../../../src/Infrastructure/database/database.js', () => ({
  query: jest.fn()
}))

describe('GetTransfersByDateController', () => {
  let controller
  let mockRequest
  let mockResponse

  const mockTransfers = [
    { id: 2, companyId: 1, debitAccount: '111-222-333', creditAccount: '999-888-777', amount: 3200.75, date: '2025-03-01T14:45:20.000Z' },
    { id: 3, companyId: 1, debitAccount: '555-666-777', creditAccount: '222-333-444', amount: 750.00, date: '2025-03-05T09:15:10.000Z' },
    { id: 4, companyId: 1, debitAccount: '444-555-666', creditAccount: '111-222-333', amount: 2000.00, date: '2025-03-08T16:30:45.000Z' },
    { id: 5, companyId: 1, debitAccount: '999-888-777', creditAccount: '555-666-777', amount: 5000.25, date: '2025-03-10T22:10:05.000Z' },
  ]

  beforeEach(() => {
    controller = new GetTransfersByDateController()

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  it('should return transfers within the date range with status 200', async () => {
    mockRequest = { query: { startDate: '2025-03-01', endDate: '2025-03-10' } }

    query.mockResolvedValueOnce(mockTransfers)

    await controller.handle(mockRequest, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith(mockTransfers)
  })

  it('should return status 400 if startDate or endDate is missing', async () => {
    mockRequest = { query: { startDate: '2025-03-01' } }

    await controller.handle(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Missing required parameters: startDate and endDate' })
  })

  it('should return status 500 if a database error occurs', async () => {
    mockRequest = { query: { startDate: '2025-03-01', endDate: '2025-03-10' } }

    query.mockRejectedValue(new DatabaseException('Internal Server Error'))

    await controller.handle(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
  })
})