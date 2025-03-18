const { BadRequestException } = require('../../../src/domain/exceptions/BadRequestException.js')

describe('BadRequestException', () => {
  it('should create an instance of BadRequestException with default message and status', () => {
    const error = new BadRequestException()

    expect(error).toBeInstanceOf(BadRequestException)
    expect(error).toBeInstanceOf(Error) 
    expect(error.message).toBe('Bad Request') 
    expect(error.statusCode).toBe(400) 
  })

  it('should create an instance of BadRequestException with a custom message', () => {
    const error = new BadRequestException('Invalid data')

    expect(error.message).toBe('Invalid data') 
    expect(error.statusCode).toBe(400)
  })
})
