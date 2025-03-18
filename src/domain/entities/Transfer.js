const { BadRequestException }  = require('../exceptions/BadRequestException.js')
const { UnprocessableEntityException }  = require('../exceptions/UnprocessableEntityException.js')

class Transfer {
    constructor(id, companyId, amount, debitAccount, creditAccount, date) {
        this.id = id
        this.companyId = companyId
        this.amount = amount
        this.debitAccount = debitAccount
        this.creditAccount = creditAccount
        this.date = date
    }

    static fromPrimitives({ id, companyId, amount, debitAccount, creditAccount, date }) {
        if (!id || typeof id !== 'number') {
            throw new BadRequestException('Invalid transfer ID')
        }
        if (!companyId || typeof companyId !== 'number') {
            throw new BadRequestException('Invalid company ID')
        }
        if (typeof amount !== 'number' || amount <= 0) {
            throw new UnprocessableEntityException('Invalid transfer amount')
        }
        if (!debitAccount || typeof debitAccount !== 'string') {
            throw new UnprocessableEntityException('Invalid debit account')
        }
        if (!creditAccount || typeof creditAccount !== 'string') {
            throw new UnprocessableEntityException('Invalid credit account')
        }

        const parsedDate = new Date(date)
        if (isNaN(parsedDate.getTime())) {
            throw new UnprocessableEntityException('Invalid transfer date')
        }

        return new Transfer(id, companyId, amount, debitAccount, creditAccount, parsedDate)
    }

    toPrimitives() {
        return {
            id: this.id,
            companyId: this.companyId,
            amount: this.amount,
            debitAccount: this.debitAccount,
            creditAccount: this.creditAccount,
            date: this.date.toISOString()
        }
    }
}

module.exports = { Transfer }
