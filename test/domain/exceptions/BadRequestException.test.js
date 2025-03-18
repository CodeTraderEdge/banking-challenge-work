const { BadRequestException } = require('../../../src/domain/exceptions/BadRequestException.js')

describe('BadRequestException', () => {
  it('should create an instance of BadRequestException with default message and status', () => {
    const error = new BadRequestException()

    expect(error).toBeInstanceOf(BadRequestException)
    expect(error).toBeInstanceOf(Error) // Asegura que extiende de Error
    expect(error.message).toBe('Bad Request') // Mensaje por defecto
    expect(error.statusCode).toBe(400) // Código de estado HTTP
  })

  it('should create an instance of BadRequestException with a custom message', () => {
    const error = new BadRequestException('Invalid data')

    expect(error.message).toBe('Invalid data') // Mensaje personalizado
    expect(error.statusCode).toBe(400)
  })
})
