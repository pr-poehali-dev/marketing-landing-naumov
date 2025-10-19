import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate, useParams } from "react-router-dom";

const BlogArticle = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const article = {
    title: "Автоматизация маркетинга: с чего начать",
    date: "15 октября 2025",
    image: "https://cdn.poehali.dev/projects/1c1ab3b1-a350-4bc1-9741-82fbd13055e1/files/dbb2baf6-8ec7-47b6-8843-898649938032.jpg",
    content: `
      <p>Автоматизация маркетинга — это не просто модный тренд, а необходимость для современного бизнеса. В этой статье я поделюсь практическим опытом внедрения систем автоматизации в компаниях разного масштаба.</p>

      <h2>Почему автоматизация — это важно</h2>
      <p>За 20 лет работы в маркетинге я видел, как компании теряют клиентов и деньги из-за ручных процессов. Менеджеры забывают перезвонить, заявки теряются, аналитика строится на догадках. Автоматизация решает эти проблемы.</p>

      <h2>Основные этапы внедрения</h2>
      
      <h3>1. Аудит текущих процессов</h3>
      <p>Прежде чем автоматизировать, нужно понять, что именно автоматизировать. Я всегда начинаю с полного аудита:</p>
      <ul>
        <li>Как происходит обработка заявок</li>
        <li>Какие данные собираются</li>
        <li>Где теряются клиенты</li>
        <li>Какие отчеты нужны руководству</li>
      </ul>

      <h3>2. Выбор инструментов</h3>
      <p>На рынке десятки CRM-систем и инструментов аналитики. Важно выбрать то, что подходит именно вашему бизнесу. Я работал с различными системами — от простых до enterprise-решений.</p>

      <h3>3. Внедрение сквозной аналитики</h3>
      <p>Это один из ключевых этапов. Сквозная аналитика позволяет видеть весь путь клиента — от первого клика до покупки. Без этого невозможно принимать обоснованные управленческие решения.</p>

      <h3>4. Обучение команды</h3>
      <p>Самая совершенная система не работает, если команда не умеет ей пользоваться. Я всегда уделяю особое внимание обучению сотрудников и созданию понятных инструкций.</p>

      <h2>Реальный кейс</h2>
      <p>В одном из проектов для федерального агентства недвижимости мы внедрили комплексную систему автоматизации. Результат:</p>
      <ul>
        <li>Рост лидогенерации на 100%+</li>
        <li>Сокращение времени обработки заявки с 2 часов до 10 минут</li>
        <li>Полная прозрачность маркетинговых расходов</li>
        <li>Автоматические отчеты для руководства</li>
      </ul>

      <h2>С чего начать</h2>
      <p>Если вы задумываетесь об автоматизации маркетинга в своей компании, начните с малого:</p>
      <ol>
        <li>Выберите один процесс для автоматизации</li>
        <li>Протестируйте решение на небольшом объеме</li>
        <li>Соберите обратную связь от команды</li>
        <li>Масштабируйте на всю компанию</li>
      </ol>

      <h2>Заключение</h2>
      <p>Автоматизация маркетинга — это инвестиция, которая окупается в первые месяцы. Главное — правильно подойти к внедрению и не пытаться автоматизировать все сразу.</p>

      <p>Если у вас есть вопросы по автоматизации маркетинга в вашем бизнесе — свяжитесь со мной, обсудим ваш проект.</p>
    `
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => navigate('/blog')}
              className="font-bold text-lg md:text-xl text-foreground flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Icon name="ArrowLeft" size={20} />
              Блог
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <article className="container mx-auto max-w-3xl px-4">
          <div className="mb-8">
            <div className="text-sm text-muted-foreground mb-3">{article.date}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">{article.title}</h1>
            <div className="rounded-2xl overflow-hidden mb-8">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-6 prose-ul:my-6 prose-ol:my-6 prose-li:text-foreground/80"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-12 pt-8 border-t border-border">
            <Button 
              onClick={() => navigate('/blog')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Icon name="ArrowLeft" size={16} />
              Вернуться к списку статей
            </Button>
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogArticle;
