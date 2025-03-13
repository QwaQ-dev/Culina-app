CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT 'Basic',
    sex VARCHAR(255) DEFAULT 'male',
    recipes_count VARCHAR(255) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    descr VARCHAR(255) NOT NULL,
    diff VARCHAR(255) NOT NULL,
    filters JSONB NOT NULL,
    imgs JSONB NOT NULL,
    author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    ingredients JSONB NOT NULL,
    steps JSONB NOT NULL,
    review_count INT DEFAULT 0, 
    avg_rating FLOAT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    review_text VARCHAR(255),
    rating_value INTEGER CHECK (rating_value BETWEEN 1 AND 5),
    author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);
