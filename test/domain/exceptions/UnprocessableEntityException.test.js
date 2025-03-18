const { UnprocessableEntityException } = require('../../../src/domain/exceptions/UnprocessableEntityException.js')

describe('UnprocessableEntityException', () => {
  it('should create an instance with default message and status', () => {
    const error = new UnprocessableEntityException()

    expect(error).toBeInstanceOf(UnprocessableEntityException)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('Unprocessable Entity')
    expect(error.statusCode).toBe(422)
  })

  it('should create an instance with a custom message', () => {
    const error = new UnprocessableEntityException('Invalid payload')

    expect(error.message).toBe('Invalid payload')
    expect(error.statusCode).toBe(422)
  })
})
