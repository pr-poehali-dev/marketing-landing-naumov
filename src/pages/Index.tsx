import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const experiences = [
    {
      year: "2023-2024",
      company: "ООО «ВТ»",
      role: "Менеджер проектов",
      achievements: ["Запуск сайта и системы аналитики", "Сотрудничество с партнёрами в ОАЭ", "SEO-оптимизация и подбор персонала"]
    },
    {
      year: "2022-2023",
      company: "ООО «Жилфонд»",
      role: "Руководитель отдела маркетинга",
      achievements: ["Рост трафика в 2,8 раза", "Внедрение CRM-модулей", "Запуск сквозной аналитики", "Франшизы B2B"]
    },
    {
      year: "2020-2022",
      company: "ГК «Ярко»",
      role: "Маркетолог",
      achievements: ["Рост продаж свыше 2 раз", "Привлечение инвестиций", "Запуск франшиз"]
    },
    {
      year: "2018-2020",
      company: "Стоматология «Дантист Сибири»",
      role: "Маркетолог",
      achievements: ["Рост базы пациентов", "Увеличение посещаемости", "Разработка сайта"]
    },
    {
      year: "2016-2018",
      company: "Sky Lift / Строительная компания",
      role: "Маркетолог",
      achievements: ["Позиционирование проекта", "Оптимизация рекламы"]
    },
    {
      year: "2014-2016",
      company: "Neomed Prod",
      role: "Руководитель стратегического маркетинга",
      achievements: ["CRM с нуля", "Продвижение 5 препаратов"]
    },
    {
      year: "2012-2014",
      company: "УзCarlsberg",
      role: "Менеджер по маркетингу",
      achievements: ["Запуск бренда «Хлебный край»", "Программы мотивации"]
    },
    {
      year: "2004-2012",
      company: "Avesta / Центр содействия эконом. развитию",
      role: "Аналитик / Консультант",
      achievements: ["ТЭО и бизнес-планы", "Исследования рынка", "Тренинги"]
    }
  ];

  const competencies = [
    { icon: "TrendingUp", title: "Маркетинговая аналитика", description: "Big Data, BI, Data Analysis" },
    { icon: "Target", title: "Стратегии", description: "Разработка и реализация" },
    { icon: "Search", title: "SEO / Digital", description: "Системное продвижение" },
    { icon: "Users", title: "Управление", description: "Найм и развитие команд" },
    { icon: "Zap", title: "Автоматизация", description: "ИИ-инструменты, процессы" },
    { icon: "Database", title: "CRM-системы", description: "Внедрение и развитие" },
    { icon: "UserPlus", title: "Лидогенерация", description: "Привлечение клиентов" },
    { icon: "Globe", title: "Английский C2", description: "Свободно в работе" }
  ];

  const metrics = [
    { value: "20+", label: "лет опыта" },
    { value: "4x", label: "рост трафика" },
    { value: "67%", label: "рост продаж" },
    { value: "10+ млн", label: "привлечено инвестиций" },
    { value: "41", label: "публикация" },
    { value: "$200K+", label: "кредиты по проектам" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-muted px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
                  Наумов Юрий<br />Валентинович
                </h1>
                <p className="text-xl text-muted-foreground mb-2">
                  Руководитель отдела маркетинга и рекламы
                </p>
                <p className="text-lg text-secondary">
                  20+ лет опыта • Digital • SEO • Аналитика
                </p>
              </div>
              
              <p className="text-lg leading-relaxed text-foreground/80">
                Эксперт в комплексном маркетинге и аналитике с уникальной компетенцией в IT-интеграции 
                и автоматизации бизнес-процессов. Сочетаю стратегическое мышление с hands-on опытом 
                по росту брендов и запуску новых продуктов.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="text-lg px-8">
                  <Icon name="Mail" className="mr-2" size={20} />
                  Связаться
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Icon name="Download" className="mr-2" size={20} />
                  Скачать резюме PDF
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>Новосибирск, Россия</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Plane" size={16} />
                  <span>Готов к переезду</span>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://cdn.poehali.dev/projects/1c1ab3b1-a350-4bc1-9741-82fbd13055e1/files/1e3fa821-9ba4-4558-bc48-9f52e57e9210.jpg" 
                  alt="Наумов Юрий Валентинович" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
            Ключевые достижения
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {metrics.map((metric, index) => (
              <Card 
                key={index} 
                className="p-6 text-center hover:shadow-lg transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
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

      <section className="py-20 bg-muted/30">
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
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{exp.company}</h3>
                        <p className="text-lg text-muted-foreground">{exp.role}</p>
                      </div>
                      <div className="text-sm font-semibold text-primary mt-2 md:mt-0">{exp.year}</div>
                    </div>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                          <Icon name="CheckCircle2" className="text-primary mt-0.5 flex-shrink-0" size={16} />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
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
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input 
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
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
                <Button type="submit" size="lg" className="flex-1">
                  <Icon name="Send" className="mr-2" size={18} />
                  Отправить запрос
                </Button>
                <Button type="button" size="lg" variant="outline" className="flex-1">
                  <Icon name="Mail" className="mr-2" size={18} />
                  yuriy.naumov@gmail.com
                </Button>
              </div>
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
                  <Icon name="MapPin" size={16} />
                  <span>Новосибирск</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Образование</h4>
              <p className="text-sm text-white/70">
                2 высших образования:<br />
                ТГУ СУР • ТИИМ (менеджмент, прикладная информатика)
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
