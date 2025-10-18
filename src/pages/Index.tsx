import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10 || cleaned.length > 11) {
      setPhoneError('Введите корректный номер телефона (10-11 цифр)');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const formatPhone = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (!match) return value;
    
    const [, country, area, first, second, third] = match;
    let formatted = '';
    
    if (country) formatted += '+' + country;
    if (area) formatted += ' ' + area;
    if (first) formatted += ' ' + first;
    if (second) formatted += ' ' + second;
    if (third) formatted += ' ' + third;
    
    return formatted.trim();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData({...formData, phone: formatted});
    if (phoneError) validatePhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    if (!validatePhone(formData.phone)) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/774b2c6c-2680-4f32-b4dd-739deea8c634', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: "", phone: "", message: "" });
        setPhoneError('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const experiences = [
    {
      year: "октябрь 2025 — н.в.",
      company: "Торговая компания",
      role: "Руководитель отдела маркетинга",
      description: "Продажа промышленного оборудования"
    },
    {
      year: "2019-2025",
      company: "Федеральное агентство недвижимости",
      role: "Руководитель отделов маркетинга и цифрового маркетинга",
      description: ""
    },
    {
      year: "2018",
      company: "Рекламное агентство",
      role: "Руководитель отдела маркетинга",
      description: ""
    },
    {
      year: "2014-2017",
      company: "Производственное предприятие",
      role: "Руководитель отдела стратегического маркетинга",
      description: ""
    },
    {
      year: "2009-2013",
      company: "Консалтинговая компания",
      role: "Заместитель директора",
      description: ""
    },
    {
      year: "2007-2009",
      company: "Телекоммуникационная компания",
      role: "Руководитель отдела маркетинга",
      description: ""
    },
    {
      year: "2005-2007",
      company: "Исследовательская организация",
      role: "Руководитель отдела",
      description: ""
    },
    {
      year: "2002-2004",
      company: "Научно-исследовательский центр по вопросам экономики",
      role: "Научный сотрудник",
      description: ""
    }
  ];

  const competencies = [
    { icon: "Target", title: "Стратегии", description: "Разработка и реализация маркетинговых стратегий и планов" },
    { icon: "Workflow", title: "Управление маркетингом", description: "От планирования до реализации" },
    { icon: "UserPlus", title: "Лидогенерация", description: "Привлечение клиентов" },
    { icon: "TrendingUp", title: "Маркетинговая аналитика", description: "Программный анализ данных, web аналитика, Big Data, BI, Data Analysis" },
    { icon: "Search", title: "SEO / Digital", description: "Системное продвижение компании, товаров и услуг в интернете" },
    { icon: "Users", title: "Управление", description: "Найм и развитие команд" },
    { icon: "Zap", title: "Автоматизация", description: "Внедрение CRM систем, ИИ-инструменты, процессы" },
    { icon: "Database", title: "CRM-системы", description: "Внедрение и развитие" }
  ];

  const achievements = [
    { 
      icon: "Building2", 
      title: "Построил системный маркетинг в компаниях из сферы услуг и производства",
      description: "Стратегия, аналитика, лидогенерация, бренд"
    },
    { 
      icon: "TrendingUp", 
      title: "Увеличил число лидов на 100+%",
      description: "Повысил лидогенерацию в крупной компании недвижимости"
    },
    { 
      icon: "Workflow", 
      title: "Автоматизировал маркетинговые процессы",
      description: "Внедрил сквозную аналитику для управленческих решений"
    },
    { 
      icon: "Rocket", 
      title: "Успешно запустил франшизу",
      description: "Привлёк 10 млн руб. инвестиций, удвоил продажи рекламных услуг"
    },
    { 
      icon: "ShoppingCart", 
      title: "Внедрил CRM и стратегию продвижения",
      description: "Для фармкомпании, обеспечив рост новых продуктов"
    },
    { 
      icon: "DollarSign", 
      title: "Реализовал проекты с многомиллионным бюджетом",
      description: "Бизнес-планы, получение инвестиций и консалтинг"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
              <div className="font-bold text-lg md:text-xl text-foreground">Юрий Наумов</div>
              <div className="hidden sm:flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Icon name="MapPin" size={14} />
                <span>Новосибирск, Россия</span>
              </div>
            </div>
            <nav className="hidden lg:flex items-center gap-6">
              <a href="tel:+79833021961" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Phone" size={16} />
                +7 983 302 19 61
              </a>
              <button 
                onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Главная
              </button>
              <button 
                onClick={() => document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Достижения
              </button>
              <button 
                onClick={() => document.getElementById('competencies')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Компетенции
              </button>
              <button 
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Опыт
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Контакты
              </button>
            </nav>
            <div className="flex items-center gap-2">
              <a href="tel:+79833021961" className="lg:hidden">
                <Button size="sm" variant="ghost">
                  <Icon name="Phone" size={18} />
                </Button>
              </a>
              <Button 
                size="sm"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="hidden lg:flex"
              >
                Связаться
              </Button>
              <Button 
                size="sm"
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden"
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
              </Button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-border py-4 animate-fade-in">
              <nav className="flex flex-col gap-4">
                <button 
                  onClick={() => {
                    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Главная
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Достижения
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('competencies')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Компетенции
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Опыт
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Контакты
                </button>
                <a 
                  href="tel:+79833021961" 
                  className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors py-2"
                >
                  <Icon name="Phone" size={16} />
                  +7 983 302 19 61
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-muted px-4 py-20 pt-32">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
                  Наумов Юрий<br />Валентинович
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-2">
                  Директор по маркетингу, аналитик
                </p>
                <p className="text-base sm:text-lg text-secondary">
                  20+ лет опыта • Digital • SEO • Аналитика
                </p>
              </div>
              
              <p className="text-base sm:text-lg leading-relaxed text-foreground/80">
                Эксперт в комплексном маркетинге и аналитике с уникальной компетенцией в IT-интеграции 
                и автоматизации бизнес-процессов. Сочетаю стратегическое мышление с практическим опытом 
                по лидогенерации и аналитике данных.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Button 
                  size="lg" 
                  className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Icon name="Mail" className="mr-2" size={20} />
                  Связаться
                </Button>
              </div>


            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://cdn.poehali.dev/files/09a3cb1b-590e-47da-8b69-d71471605ae1.jpg" 
                  alt="Наумов Юрий Валентинович" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="achievements" className="py-20 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
            Ключевые достижения
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <Card 
                key={index} 
                className="p-8 hover:shadow-xl transition-all hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                  <Icon name={achievement.icon} className="text-primary" size={28} />
                </div>
                <h3 className="font-bold text-lg mb-3 text-foreground">{achievement.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="competencies" className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
            Ключевые компетенции
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competencies.map((comp, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name={comp.icon} className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{comp.title}</h3>
                <p className="text-sm text-muted-foreground">{comp.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
            Опыт работы
          </h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block"></div>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className="relative pl-0 md:pl-20 animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="hidden md:block absolute left-6 top-6 w-5 h-5 bg-primary rounded-full border-4 border-white shadow"></div>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{exp.company}</h3>
                        <p className="text-lg text-muted-foreground">{exp.role}</p>
                      </div>
                      <div className="text-sm font-semibold text-primary mt-2 md:mt-0">{exp.year}</div>
                    </div>
                    {exp.description && (
                      <p className="text-sm text-foreground/70 mt-2">{exp.description}</p>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-fade-in">
            Готов обсудить сотрудничество
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-12">
            Свяжитесь со мной для обсуждения возможностей
          </p>
          
          <Card className="p-8 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Имя</label>
                <Input 
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Телефон</label>
                <Input 
                  type="tel"
                  placeholder="+7 900 123 45 67"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                  className={phoneError ? 'border-red-500' : ''}
                />
                {phoneError && (
                  <p className="text-sm text-red-600 mt-1">{phoneError}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Сообщение</label>
                <Textarea 
                  placeholder="Расскажите о вашей компании и позиции..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
                  <Icon name="Send" className="mr-2" size={18} />
                  {isSubmitting ? 'Отправка...' : 'Отправить запрос'}
                </Button>
                <Button type="button" size="lg" variant="outline" className="flex-1">
                  <Icon name="Mail" className="mr-2" size={18} />
                  yuriy.naumov@gmail.com
                </Button>
              </div>
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  ✅ Сообщение успешно отправлено! Юрий свяжется с вами в ближайшее время.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  ❌ Ошибка отправки. Пожалуйста, напишите напрямую на yuriy.naumov@gmail.com
                </div>
              )}
            </form>
          </Card>
        </div>
      </section>

      <footer className="py-12 bg-foreground text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Наумов Юрий Валентинович</h3>
              <p className="text-sm text-white/70">
                Руководитель отдела маркетинга и рекламы<br />
                Новосибирск, Россия
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>yuriy.naumov@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <a href="tel:+79833021961" className="hover:text-white transition-colors">+7 983 302 19 61</a>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>Новосибирск</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Образование</h4>
              <p className="text-sm text-white/70">
                2 высших образования:<br />
                ТУСУР • ТИИМ (менеджмент, прикладная информатика)
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-sm text-white/50">
            <p>© 2024 Наумов Юрий Валентинович. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;