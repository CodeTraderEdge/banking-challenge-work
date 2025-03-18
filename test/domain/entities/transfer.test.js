const { Transfer } = require('../../../src/domain/entities/Transfer.js')
const { BadRequestException } = require('../../../src/domain/exceptions/BadRequestException.js')
const { UnprocessableEntityException } = require('../../../src/domain/exceptions/UnprocessableEntityException.js')

describe('Transfer Entity', () => {
    const createValidTransferData = (overrides = {}) => ({
        id: 1,
        companyId: 100,
        amount: 1500.75,
        debitAccount: '123-456-789',
        creditAccount: '987-654-321',
        date: '2025-03-15T12:00:00.000Z',
        ...overrides
    })

    it('should create a valid Transfer entity', () => {
        const data = createValidTransferData()
        const transfer = Transfer.fromPrimitives(data)

        expect(transfer).toBeInstanceOf(Transfer)
        expect(transfer.id).toBe(data.id)
        expect(transfer.companyId).toBe(data.companyId)
        expect(transfer.amount).toBe(data.amount)
        expect(transfer.debitAccount).toBe(data.debitAccount)
        expect(transfer.creditAccount).toBe(data.creditAccount)
        expect(transfer.date.toISOString()).toBe(data.date)
    })

    it('should throw BadRequestException for invalid transfer ID', () => {
        const data = createValidTransferData({ id: null })
        expect(() => Transfer.fromPrimitives(data)).toThrow(BadRequestException)
    })

    it('should throw BadRequestException for invalid company ID', () => {
        const data = createValidTransferData({ companyId: 'invalid' })
        expect(() => Transfer.fromPrimitives(data)).toThrow(BadRequestException)
    })

    it('should throw UnprocessableEntityException for invalid amount', () => {
        const data = createValidTransferData({ amount: -100 })
        expect(() => Transfer.fromPrimitives(data)).toThrow(UnprocessableEntityException)
    })

    it('should throw UnprocessableEntityException for invalid debit account', () => {
        const data = createValidTransferData({ debitAccount: null })
        expect(() => Transfer.fromPrimitives(data)).toThrow(UnprocessableEntityException)
    })

    it('should throw UnprocessableEntityException for invalid credit account', () => {
        const data = createValidTransferData({ creditAccount: '' })
        expect(() => Transfer.fromPrimitives(data)).toThrow(UnprocessableEntityException)
    })

    it('should throw UnprocessableEntityException for invalid transfer date', () => {
        const data = createValidTransferData({ date: 'invalid-date' })
        expect(() => Transfer.fromPrimitives(data)).toThrow(UnprocessableEntityException)
    })

    it('should convert a Transfer entity to primitives', () => {
        const data = createValidTransferData()
        const transfer = Transfer.fromPrimitives(data)

        expect(transfer.toPrimitives()).toEqual(data)
    })
})
