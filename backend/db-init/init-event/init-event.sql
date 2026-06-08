
CREATE TABLE event (
    event_id UUID PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    creator_id UUID NOT NULL,
    icon_id VARCHAR(255) NOT NULL,
    isFinished BOOLEAN DEFAULT FALSE
);

CREATE TABLE users_event (
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    PRIMARY KEY (user_id, event_id),
    FOREIGN KEY (event_id) REFERENCES event(event_id) ON DELETE CASCADE
);


-- Таблица расходов
CREATE TABLE expense (
    expense_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    payer_id UUID NOT NULL,
    event_id UUID NOT NULL,
    date_of_payment DATE NOT NULL,
    total_cost DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (event_id) REFERENCES event(event_id) ON DELETE CASCADE
);

-- Таблица связи пользователей с расходами (долги/разделение)
CREATE TABLE users_expense (
    expense_id UUID NOT NULL,
    user_id UUID NOT NULL,
    personal_cost DECIMAL(15, 2) NOT NULL,
    is_paid BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (expense_id, user_id),
    FOREIGN KEY (expense_id) REFERENCES expense(expense_id) ON DELETE CASCADE
);

