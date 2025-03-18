/*
    Esta lógica esta mockeada, pero una vez desarrollado la conexión con la base de datos se puede
    agregar un try catch para empezar a controlar errores siempre y van a terminar en el controlador 
    donde el mismo es agarrado y manejado de forma correcta.
    Aca te va a dejar siempre agregar porque el problema es que no estamos usando una instancia de esta clase entonces
    cada vez que se ejecuta una llamda api de nuevo la instacia misma se ejecuta y vuelve  a utilizar el constructor
*/
class CompaniesRepository {
    constructor() {
        this.mockCompanies = [
            { id: 1, name: 'Company A', cuit: 30123456781, adhesionDate: '2025-02-15T10:30:00.000Z' },
            { id: 2, name: 'Company B', cuit: 30876543219, adhesionDate: '2025-03-01T14:00:00.000Z' },
            { id: 3, name: 'Company C', cuit: 30112233445, adhesionDate: '2025-03-05T09:15:00.000Z' },
            { id: 4, name: 'Company D', cuit: 30556677883, adhesionDate: '2025-03-08T16:45:00.000Z' },
            { id: 5, name: 'Company E', cuit: 30998877662, adhesionDate: '2025-03-15T12:20:00.000Z' },
            { id: 6, name: 'Company F', cuit: 30443322110, adhesionDate: '2025-03-20T08:10:00.000Z' },
            { id: 7, name: 'Company G', cuit: 30667788991, adhesionDate: '2025-04-01T15:45:00.000Z' }
        ]        
    }

    async findByCuit(cuit) {    
        return this.mockCompanies.find(company => company.cuit === cuit) || null
    }

    async findAdhesionsLastMonth() {
        const now = new Date()
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

        return this.mockCompanies.filter(company => {
            const adhesionDate = new Date(company.adhesionDate)
            return adhesionDate >= lastMonth && adhesionDate <= now
        })
    }

    /*
        INFO: En esta lógica, lo que haría aca es hacer el llamado a la base de datos 
        usando un ORM o el SDK de SQL o NoSQL, a modo de demostración esta hecho 
        así simulando una base de datos este repositorio.
    */
    async addCompany({ name, cuit }) { 
        const lastId = Math.max(...this.mockCompanies.map(c => c.id))

        const newCompany = {
            id: lastId + 1,
            name,
            cuit,
            adhesionDate: new Date().toISOString()
        }

        this.mockCompanies.push(newCompany)
        return newCompany
    }
}

module.exports = { CompaniesRepository }