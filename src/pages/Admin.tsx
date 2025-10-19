import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'yuriyadmin2025') {
      setIsAuthenticated(true);
    }
    
    let titleTag = document.querySelector('title');
    if (!titleTag) {
      titleTag = document.createElement('title');
      document.head.appendChild(titleTag);
    }
    titleTag.textContent = 'Админка | Блог';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Панель управления блогом');
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === 'yuriy' && password === 'yuriyadmin2025') {
      localStorage.setItem('adminToken', 'yuriyadmin2025');
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Неверный логин или пароль");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-muted flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2">Админка блога</h1>
            <p className="text-muted-foreground">Войдите для управления статьями</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Логин</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="yuriy"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Пароль</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full">
              Войти
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-border z-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Icon name="Home" size={20} />
                <span className="font-semibold">На главную</span>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Администратор</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">Управление блогом</h1>
            <Button onClick={() => navigate('/admin/article/new')}>
              <Icon name="Plus" size={18} className="mr-2" />
              Новая статья
            </Button>
          </div>

          <ArticlesList />
        </div>
      </main>
    </div>
  );
};

const ArticlesList = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/360dca96-3120-4a36-8352-b6c30ba9ad85?drafts=true');
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить статью?')) return;

    const token = localStorage.getItem('adminToken');
    
    try {
      await fetch(`https://functions.poehali.dev/360dca96-3120-4a36-8352-b6c30ba9ad85?id=${id}`, {
        method: 'DELETE',
        headers: {
          'X-Auth-Token': token || ''
        }
      });
      
      loadArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Ошибка при удалении статьи');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Загрузка...</div>;
  }

  if (articles.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold mb-2">Статей пока нет</h3>
        <p className="text-muted-foreground mb-6">Создайте первую статью для блога</p>
        <Button onClick={() => navigate('/admin/article/new')}>
          <Icon name="Plus" size={18} className="mr-2" />
          Создать статью
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Card key={article.id} className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4 flex-1">
              {article.image_url && (
                <img 
                  src={article.image_url} 
                  alt={article.title}
                  className="w-32 h-24 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">{article.title}</h3>
                  {!article.published && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      Черновик
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{article.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Slug: {article.slug}</span>
                  <span>Создано: {new Date(article.created_at).toLocaleDateString('ru-RU')}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {article.published && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate(`/blog/${article.slug}`)}
                >
                  <Icon name="Eye" size={16} className="mr-2" />
                  Посмотреть
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`/admin/article/${article.id}`)}
              >
                <Icon name="Edit" size={16} className="mr-2" />
                Редактировать
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleDelete(article.id)}
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Admin;