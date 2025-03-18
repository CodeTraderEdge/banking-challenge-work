const { GetTransfersByDateController } = require('../../../../src/Infrastructure/adapters/controllers/GetTransfersByDateController.js')
const { GetTransfersByDateService } = require('../../../../src/Application/services/GetTransfersByDateService.js')
const { DatabaseException } = require('../../../../src/domain/exceptions/DatabaseException.js')

describe('GetTransfersByDateController', () => {
  let controller
  let service
  let mockRequest
  let mockResponse

  beforeEach(() => {
    service = new GetTransfersByDateService()
    controller = new GetTransfersByDateController()

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  it('should return transfers within the date range with status 200', async () => {
    mockRequest = { query: { startDate: '2025-03-01', endDate: '2025-03-10' } }

    jest.spyOn(service, 'findByDate').mockResolvedValue([
      { id: 2, amount: 3200.75 },
      { id: 3, amount: 750.00 },
      { id: 4, amount: 2000.00 },
      { id: 5, amount: 5000.25 },
    ])

    await controller.handle(mockRequest, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Array))
    expect(mockResponse.json.mock.calls[0][0].length).toBe(3)
  })

  it('should return status 400 if startDate or endDate is missing', async () => {
    mockRequest = { query: { startDate: '2025-03-01' } }

    await controller.handle(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Missing required parameters: startDate and endDate' })
  })

  it('should return status 500 if a database error occurs', async () => {
    mockRequest = { query: { startDate: '2025-03-01', endDate: '2025-03-10' } }

    jest.spyOn(GetTransfersByDateService.prototype, 'findByDate')
      .mockRejectedValue(new DatabaseException('Internal Server Error'))

    await controller.handle(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
  })
})
