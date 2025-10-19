import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Privacy = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let titleTag = document.querySelector('title');
    if (!titleTag) {
      titleTag = document.createElement('title');
      document.head.appendChild(titleTag);
    }
    titleTag.textContent = 'Политика конфиденциальности | Юрий Наумов';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Политика конфиденциальности сайта');

    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/360dca96-3120-4a36-8352-b6c30ba9ad85?type=privacy');
      const data = await response.json();
      
      if (data && !data.error) {
        setContent(data.content || getDefaultPrivacy());
      } else {
        setContent(getDefaultPrivacy());
      }
    } catch (error) {
      console.error('Error loading privacy:', error);
      setContent(getDefaultPrivacy());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultPrivacy = () => {
    return `
      <h2>Политика конфиденциальности</h2>
      
      <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта.</p>
      
      <h3>1. Общие положения</h3>
      <p>1.1. Настоящая Политика конфиденциальности является неотъемлемой частью пользовательского соглашения и действует в отношении всех данных, которые сайт может получить о пользователе.</p>
      <p>1.2. Использование сайта означает безоговорочное согласие пользователя с настоящей Политикой и указанными в ней условиями обработки его персональной информации.</p>
      
      <h3>2. Персональные данные пользователей</h3>
      <p>2.1. В рамках настоящей Политики под "персональными данными пользователя" понимаются:</p>
      <ul>
        <li>Персональные данные, которые пользователь предоставляет самостоятельно при заполнении форм обратной связи: имя, номер телефона, адрес электронной почты</li>
        <li>Данные, которые автоматически передаются в процессе использования сайта: IP-адрес, информация из cookies, информация о браузере</li>
      </ul>
      
      <h3>3. Цели обработки персональных данных</h3>
      <p>3.1. Персональные данные пользователя используются в целях:</p>
      <ul>
        <li>Связи с пользователем для предоставления консультаций</li>
        <li>Улучшения качества предоставляемых услуг</li>
        <li>Проведения статистических исследований</li>
      </ul>
      
      <h3>4. Условия обработки персональных данных</h3>
      <p>4.1. Обработка персональных данных осуществляется с согласия пользователя на обработку его персональных данных.</p>
      <p>4.2. Сайт обязуется не передавать полученную персональную информацию третьим лицам, за исключением случаев, предусмотренных законодательством.</p>
      
      <h3>5. Изменение Политики конфиденциальности</h3>
      <p>5.1. Сайт имеет право вносить изменения в настоящую Политику конфиденциальности. Новая редакция Политики вступает в силу с момента ее размещения.</p>
      
      <h3>6. Контактная информация</h3>
      <p>По вопросам, связанным с обработкой персональных данных, вы можете обратиться по адресу: yuriy.naumov@gmail.com</p>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Политика конфиденциальности</h1>
          
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-6 prose-ul:my-6 prose-ol:my-6 prose-li:text-foreground/80"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </main>
    </div>
  );
};

export default Privacy;
