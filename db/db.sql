CREATE TABLE tasks (
    id SERIAL PRIMARY KEY, -- Marco el campo como serial para que se autoincremente el id
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ,
    hidden BOOLEAN DEFAULT FALSE NOT NULL,
    do_mark BOOLEAN DEFAULT FALSE NOT NULL
);

INSERT INTO tasks (title, description, updated_at, hidden, do_mark) VALUES
('Comprar víveres', 'Comprar leche, pan, huevos y café en el supermercado.', NOW(), FALSE, FALSE),
('Enviar informe mensual', 'Redactar y enviar el informe de ventas del mes a la gerencia.', NOW(), FALSE, TRUE),
('Revisar correos electrónicos', 'Leer y responder correos pendientes en la bandeja de entrada.', NOW(), FALSE, FALSE),
('Pagar facturas', 'Realizar el pago de los servicios públicos antes de la fecha límite.', NOW(), FALSE, TRUE),
('Llamar al cliente', 'Confirmar con el cliente la fecha de entrega del pedido.', NOW(), FALSE, FALSE);

SELECT * FROM tasks;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
