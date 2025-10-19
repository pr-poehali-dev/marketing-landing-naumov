import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Consent = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let titleTag = document.querySelector('title');
    if (!titleTag) {
      titleTag = document.createElement('title');
      document.head.appendChild(titleTag);
    }
    titleTag.textContent = 'Согласие на обработку персональных данных | Юрий Наумов';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Согласие на обработку персональных данных');

    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/360dca96-3120-4a36-8352-b6c30ba9ad85?type=consent');
      const data = await response.json();
      
      if (data && !data.error) {
        setContent(data.content || getDefaultConsent());
      } else {
        setContent(getDefaultConsent());
      }
    } catch (error) {
      console.error('Error loading consent:', error);
      setContent(getDefaultConsent());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultConsent = () => {
    return `
      <h2>Согласие на обработку персональных данных</h2>
      
      <p>Заполняя форму обратной связи на данном сайте, я подтверждаю, что:</p>
      
      <h3>1. Предоставление данных</h3>
      <p>Я добровольно предоставляю свои персональные данные (имя, номер телефона, адрес электронной почты, содержание сообщения) для связи со мной и предоставления консультационных услуг.</p>
      
      <h3>2. Цели обработки</h3>
      <p>Я согласен на обработку моих персональных данных в следующих целях:</p>
      <ul>
        <li>Связь со мной для ответа на мой запрос</li>
        <li>Предоставление консультационных услуг</li>
        <li>Информирование об услугах и специальных предложениях (с возможностью отказа)</li>
      </ul>
      
      <h3>3. Способы обработки</h3>
      <p>Я согласен, что мои персональные данные могут обрабатываться следующими способами:</p>
      <ul>
        <li>Сбор, запись, систематизация, накопление, хранение</li>
        <li>Уточнение (обновление, изменение)</li>
        <li>Использование для связи со мной</li>
        <li>Удаление по моему требованию</li>
      </ul>
      
      <h3>4. Срок действия согласия</h3>
      <p>Настоящее согласие действует с момента предоставления данных и до момента его отзыва.</p>
      
      <h3>5. Право на отзыв</h3>
      <p>Я понимаю, что могу отозвать настоящее согласие в любое время, направив уведомление на адрес электронной почты: yuriy.naumov@gmail.com</p>
      
      <h3>6. Защита данных</h3>
      <p>Я ознакомлен с тем, что администрация сайта принимает необходимые меры для защиты моих персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.</p>
      
      <h3>7. Законодательство</h3>
      <p>Настоящее согласие дано в соответствии с Федеральным законом РФ №152-ФЗ "О персональных данных".</p>
    `;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => navigate('/')}
              className="font-bold text-lg md:text-xl text-foreground flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Icon name="ArrowLeft" size={20} />
              Назад
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <article className="container mx-auto max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Согласие на обработку персональных данных</h1>
          
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-6 prose-ul:my-6 prose-ol:my-6 prose-li:text-foreground/80"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </main>
    </div>
  );
};

export default Consent;
