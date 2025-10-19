-- Create pages table for static pages like privacy and consent
CREATE TABLE IF NOT EXISTS pages (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default pages
INSERT INTO pages (type, title, content)
VALUES 
  ('privacy', 'Политика конфиденциальности', '<h2>Политика конфиденциальности</h2><p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта.</p>'),
  ('consent', 'Согласие на обработку персональных данных', '<h2>Согласие на обработку персональных данных</h2><p>Заполняя форму обратной связи на данном сайте, я подтверждаю свое согласие на обработку персональных данных.</p>')
ON CONFLICT (type) DO NOTHING;