const { CreateCompanyAdhesionController } = require('../../../../src/Infrastructure/adapters/controllers/CreateCompanyAdhesionController.js')

describe('CreateCompanyAdhesionController', () => {
  let controller
  let mockRequest
  let mockResponse

  beforeEach(() => {
    controller = new CreateCompanyAdhesionController()

    mockRequest = {
      body: {
        name: 'Empresa Test',
        cuit: 20123456789,
      },
    }
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    }
  })

  it('should return status 201 when company is created successfully', async () => {
    await controller.handle(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.send).toHaveBeenCalled()
  })

  it('should return status 400 when missing name or cuit', async () => {
    mockRequest.body = {}

    await controller.handle(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Missing required fields: name and cuit' })
  })

  it('should return status 409 when CUIT already exists', async () => {
    mockRequest.body = { ...mockRequest.body, cuit: 30123456781 },

    await controller.handle(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(409)
    expect(mockResponse.json).toHaveBeenCalledWith({ error: `Company with CUIT 30123456781 already exists` })
  })

  it('should return status 422 when CUIT is invalid', async () => {
    mockRequest.body = { ...mockRequest.body, cuit: 123 },
  
    await controller.handle(mockRequest, mockResponse)
  
    expect(mockResponse.status).toHaveBeenCalledWith(422)
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid CUIT format' })
  })
  
})
