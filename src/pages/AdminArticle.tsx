import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdminArticle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    seo_title: '',
    seo_description: '',
    published: false
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token !== 'yuriyadmin2025') {
      navigate('/admin');
      return;
    }

    if (!isNew && id) {
      loadArticle();
    }
  }, [id, isNew, navigate]);

  const loadArticle = async () => {
    try {
      const response = await fetch(`https://functions.poehali.dev/360dca96-3120-4a36-8352-b6c30ba9ad85/${id}`);
      const article = await response.json();
      
      if (article && !article.error) {
        setFormData(article);
      }
    } catch (error) {
      console.error('Error loading article:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    const translit: Record<string, string> = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
      'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
      'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
      'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    };

    return title
      .toLowerCase()
      .split('')
      .map(char => translit[char] || char)
      .join('')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: isNew ? generateSlug(value) : prev.slug,
      seo_title: !prev.seo_title ? value : prev.seo_title
    }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug || !formData.content) {
      alert('Заполните обязательные поля: заголовок, slug и содержание');
      return;
    }

    setSaving(true);
    const token = localStorage.getItem('adminToken');

    try {
      const url = isNew 
        ? 'https://functions.poehali.dev/360dca96-3120-4a36-8352-b6c30ba9ad85'
        : `https://functions.poehali.dev/360dca96-3120-4a36-8352-b6c30ba9ad85/${id}`;
      
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token || ''
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/admin');
      } else {
        const error = await response.json();
        alert(`Ошибка: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Ошибка при сохранении статьи');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Загрузка...</div>
      </div>
    );
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    setUploading(true);
    const token = localStorage.getItem('adminToken');

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        
        const response = await fetch('https://functions.poehali.dev/115acf40-3abe-490e-ae08-dababd268c54', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token || ''
          },
          body: JSON.stringify({ image: base64 })
        });

        if (response.ok) {
          const data = await response.json();
          setFormData(prev => ({ ...prev, image_url: data.url }));
        } else {
          alert('Ошибка загрузки изображения');
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Ошибка загрузки изображения');
      setUploading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-border z-50">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Icon name="ArrowLeft" size={20} />
              <span className="font-semibold">Назад к списку</span>
            </button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setFormData(prev => ({ ...prev, published: false }));
                  setTimeout(handleSave, 100);
                }}
                disabled={saving}
              >
                Сохранить черновик
              </Button>
              <Button
                onClick={() => {
                  setFormData(prev => ({ ...prev, published: true }));
                  setTimeout(handleSave, 100);
                }}
                disabled={saving}
              >
                {saving ? 'Сохранение...' : 'Опубликовать'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-bold mb-8">
            {isNew ? 'Новая статья' : 'Редактирование статьи'}
          </h1>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Основная информация</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Заголовок <span className="text-destructive">*</span>
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Введите заголовок статьи"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    URL (slug) <span className="text-destructive">*</span>
                  </label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="url-статьи"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Будет доступна по адресу: /blog/{formData.slug}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Краткое описание</label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Краткое описание для списка статей"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Изображение</label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="flex-1"
                      />
                      {uploading && (
                        <span className="text-sm text-muted-foreground flex items-center">
                          Загрузка...
                        </span>
                      )}
                    </div>
                    <Input
                      value={formData.image_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                      placeholder="или вставьте URL: https://cdn.poehali.dev/..."
                    />
                    {formData.image_url && (
                      <div className="mt-3">
                        <img 
                          src={formData.image_url} 
                          alt="Preview"
                          className="w-full max-w-md h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Содержание статьи <span className="text-destructive">*</span>
              </h2>
              <div className="quill-editor">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                  modules={modules}
                  className="bg-white"
                />
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">SEO</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">SEO заголовок</label>
                  <Input
                    value={formData.seo_title}
                    onChange={(e) => setFormData(prev => ({ ...prev, seo_title: e.target.value }))}
                    placeholder="Заголовок для поисковых систем"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Длина: {formData.seo_title.length} символов (рекомендуется 50-60)
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">SEO описание</label>
                  <Textarea
                    value={formData.seo_description}
                    onChange={(e) => setFormData(prev => ({ ...prev, seo_description: e.target.value }))}
                    placeholder="Описание для поисковых систем"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Длина: {formData.seo_description.length} символов (рекомендуется 150-160)
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminArticle;