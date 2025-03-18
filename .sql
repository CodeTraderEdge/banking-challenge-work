CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    cuit VARCHAR(12) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    adhesion_date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE transfers (
    id SERIAL PRIMARY KEY,
    company_id INT NOT NULL,
    amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
    debit_account VARCHAR(20) NOT NULL,
    credit_account VARCHAR(20) NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_transfers_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

--

INSERT INTO companies (id, name, cuit, adhesion_date) VALUES
    (1, 'Company A', '30123456781', '2025-02-15T10:30:00.000Z'),
    (2, 'Company B', '30876543219', '2025-03-01T14:00:00.000Z'),
    (3, 'Company C', '30112233445', '2025-03-05T09:15:00.000Z'),
    (4, 'Company D', '30556677883', '2025-03-08T16:45:00.000Z'),
    (5, 'Company E', '30998877662', '2025-03-15T12:20:00.000Z'),
    (6, 'Company F', '30443322110', '2025-03-20T08:10:00.000Z'),
    (7, 'Company G', '30667788991', '2025-04-01T15:45:00.000Z');

INSERT INTO transfers (id, company_id, debit_account, credit_account, amount, date) VALUES
    (1, 1, '123-456-789', '987-654-321', 1500.50, '2025-02-15T10:30:00.000Z'),
    (2, 1, '111-222-333', '999-888-777', 3200.75, '2025-03-01T14:45:20.000Z'),
    (3, 1, '555-666-777', '222-333-444', 750.00, '2025-03-05T09:15:10.000Z'),
    (4, 1, '444-555-666', '111-222-333', 2000.00, '2025-03-08T16:30:45.000Z'),
    (5, 1, '999-888-777', '555-666-777', 5000.25, '2025-03-10T22:10:05.000Z'),
    (6, 2, '222-333-444', '123-456-789', 1750.60, '2025-03-15T12:00:00.000Z'),
    (7, 2, '333-444-555', '444-555-666', 900.30, '2025-03-20T08:20:30.000Z'),
    (8, 2, '555-666-777', '999-888-777', 1250.90, '2025-03-25T18:45:50.000Z'),
    (9, 3, '987-654-321', '222-333-444', 2800.40, '2025-04-01T07:05:15.000Z'),
    (10, 3, '111-222-333', '333-444-555', 350.75, '2025-04-05T11:55:40.000Z');
