const { Company } = require('../../../src/domain/entities/Company.js')
const { BadRequestException } = require('../../../src/domain/exceptions/BadRequestException.js')
const { UnprocessableEntityException } = require('../../../src/domain/exceptions/UnprocessableEntityException.js')

describe('Company Entity', () => {
    const createValidCompanyData = (overrides = {}) => ({
        id: 1,
        name: 'Tech Corp',
        cuit: '12345678901',
        adhesionDate: '2025-03-01T00:00:00.000Z',
        ...overrides
    })

    describe('fromPrimitives', () => {
        it('should create a Company instance with valid data', () => {
            const data = createValidCompanyData()
            const company = Company.fromPrimitives(data)

            expect(company).toBeInstanceOf(Company)
            expect(company.id).toBe(data.id)
            expect(company.name).toBe(data.name)
            expect(company.cuit).toBe(data.cuit)
            expect(company.adhesionDate.toISOString()).toBe(data.adhesionDate)
        })

        it('should throw BadRequestException for invalid ID', () => {
            const data = createValidCompanyData({ id: 0 })
            expect(() => Company.fromPrimitives(data)).toThrow(BadRequestException)
        })

        it('should throw BadRequestException for invalid name', () => {
            const data = createValidCompanyData({ name: '' })
            expect(() => Company.fromPrimitives(data)).toThrow(BadRequestException)
        })

        it('should throw UnprocessableEntityException for invalid CUIT', () => {
            const data = createValidCompanyData({ cuit: '12345' })
            expect(() => Company.fromPrimitives(data)).toThrow(UnprocessableEntityException)
        })

        it('should throw UnprocessableEntityException for invalid adhesionDate', () => {
            const data = createValidCompanyData({ adhesionDate: 'invalid-date' })
            expect(() => Company.fromPrimitives(data)).toThrow(UnprocessableEntityException)
        })
    })

    describe('toPrimitives', () => {
        it('should return a plain object representation of Company', () => {
            const data = createValidCompanyData()
            const company = Company.fromPrimitives(data)
            expect(company.toPrimitives()).toEqual(data)
        })
    })

    describe('isValidCuit', () => {
        it('should return true for valid CUIT', () => {
            expect(Company.isValidCuit('12345678901')).toBe(true)
        })

        it('should return false for invalid CUIT', () => {
            expect(Company.isValidCuit('12345')).toBe(false)
            expect(Company.isValidCuit('abcd5678901')).toBe(false)
        })
    })
})
