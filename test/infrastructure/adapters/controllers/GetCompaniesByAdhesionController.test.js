const { GetCompaniesByAdhesionController } = require('../../../../src/Infrastructure/adapters/controllers/GetCompaniesByAdhesionController.js')
const { GetCompaniesByAdhesionService } = require('../../../../src/Application/services/GetCompaniesByAdhesionService.js')
const { DatabaseException } = require('../../../../src/domain/exceptions/DatabaseException.js')

describe('GetCompaniesByAdhesionController', () => {
  let controller
  let mockRequest
  let mockResponse

  beforeEach(() => {
    controller = new GetCompaniesByAdhesionController()

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  it('should return status 200 with companies that adhered last month ', async () => {
    await controller.handle(mockRequest, mockResponse)
    
    const responseData = mockResponse.json.mock.calls[0][0]

    expect(mockResponse.json).toHaveBeenCalled()
    expect(Array.isArray(responseData)).toBe(true)
    expect(responseData.length).toBe(4)
  })

  it('should return status 500 if a database error occurs', async () => {
    jest.spyOn(GetCompaniesByAdhesionService.prototype, 'findAdhesionsLastMonth')
      .mockRejectedValue(new DatabaseException())

    await controller.handle(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
  })
})
