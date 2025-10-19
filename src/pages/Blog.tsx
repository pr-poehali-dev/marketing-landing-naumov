import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: "marketing-automation",
      title: "Автоматизация маркетинга: с чего начать",
      date: "15 октября 2025",
      excerpt: "Практическое руководство по внедрению систем автоматизации в маркетинг компании",
      image: "https://cdn.poehali.dev/projects/1c1ab3b1-a350-4bc1-9741-82fbd13055e1/files/dbb2baf6-8ec7-47b6-8843-898649938032.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => navigate('/')}
              className="font-bold text-lg md:text-xl text-foreground flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Icon name="ArrowLeft" size={20} />
              Юрий Наумов
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-fade-in">Блог</h1>
          <p className="text-lg text-muted-foreground mb-12 animate-fade-in">Статьи о маркетинге, аналитике и автоматизации</p>

          <div className="space-y-6">
            {articles.map((article, index) => (
              <Card 
                key={article.id}
                className="overflow-hidden hover:shadow-lg transition-all animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/blog/${article.id}`)}
              >
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-1 h-48 md:h-auto overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="md:col-span-2 p-6">
                    <div className="text-sm text-muted-foreground mb-2">{article.date}</div>
                    <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">{article.title}</h2>
                    <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                    <Button variant="link" className="p-0 h-auto">
                      Читать далее
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
