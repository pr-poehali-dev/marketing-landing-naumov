-- Create articles table for blog
CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    image_url TEXT,
    seo_title VARCHAR(500),
    seo_description TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster slug lookups
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_published ON articles(published);

-- Insert initial test article
INSERT INTO articles (slug, title, excerpt, content, image_url, seo_title, seo_description, published)
VALUES (
    'marketing-automation',
    'Автоматизация маркетинга: с чего начать',
    'Практическое руководство по внедрению систем автоматизации в маркетинг компании',
    '<p>Автоматизация маркетинга — это не просто модный тренд, а необходимость для современного бизнеса. В этой статье я поделюсь практическим опытом внедрения систем автоматизации в компаниях разного масштаба.</p><h2>Почему автоматизация — это важно</h2><p>За 20 лет работы в маркетинге я видел, как компании теряют клиентов и деньги из-за ручных процессов. Менеджеры забывают перезвонить, заявки теряются, аналитика строится на догадках. Автоматизация решает эти проблемы.</p><h2>Основные этапы внедрения</h2><h3>1. Аудит текущих процессов</h3><p>Прежде чем автоматизировать, нужно понять, что именно автоматизировать. Я всегда начинаю с полного аудита:</p><ul><li>Как происходит обработка заявок</li><li>Какие данные собираются</li><li>Где теряются клиенты</li><li>Какие отчеты нужны руководству</li></ul><h3>2. Выбор инструментов</h3><p>На рынке десятки CRM-систем и инструментов аналитики. Важно выбрать то, что подходит именно вашему бизнесу. Я работал с различными системами — от простых до enterprise-решений.</p>',
    'https://cdn.poehali.dev/projects/1c1ab3b1-a350-4bc1-9741-82fbd13055e1/files/dbb2baf6-8ec7-47b6-8843-898649938032.jpg',
    'Автоматизация маркетинга: с чего начать | Юрий Наумов',
    'Практическое руководство по внедрению систем автоматизации маркетинга. Опыт 20+ лет в digital-маркетинге.',
    true
);
