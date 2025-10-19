import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdminPages = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('privacy');
  const [saving, setSaving] = useState(false);
  const [privacyData, setPrivacyData] = useState({ title: '', content: '' });
  const [consentData, setConsentData] = useState({ title: '', content: '' });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token !== 'yuriyadmin2025') {
      navigate('/admin');
      return;
    }
    
    let titleTag = document.querySelector('title');
    if (!titleTag) {
      titleTag = document.createElement('title');
      document.head.appendChild(titleTag);
    }
    titleTag.textContent = 'Редактирование страниц | Админка';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Панель управления страницами');

    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const privacyResponse = await fetch('https://functions.poehali.dev/360dca96-3120-4a36-8352-b6c30ba9ad85?type=privacy');
      const privacy = await privacyResponse.json();
      if (privacy && !privacy.error) {
        setPrivacyData({ title: privacy.title, content: privacy.content });
      }

      const consentResponse = await fetch('https://functions.poehali.dev/360dca96-3120-4a36-8352-b6c30ba9ad85?type=consent');
      const consent = await consentResponse.json();
      if (consent && !consent.error) {
        setConsentData({ title: consent.title, content: consent.content });
      }
    } catch (error) {
      console.error('Error loading pages:', error);
    }
  };

  const handleSave = async (type: 'privacy' | 'consent') => {
    setSaving(true);
    const token = localStorage.getItem('adminToken');
    const data = type === 'privacy' ? privacyData : consentData;

    try {
      const response = await fetch(`https://functions.poehali.dev/360dca96-3120-4a36-8352-b6c30ba9ad85?type=${type}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token || ''
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Страница успешно сохранена');
      } else {
        alert('Ошибка при сохранении');
      }
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Ошибка при сохранении');
    } finally {
      setSaving(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
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
              <span className="font-semibold">Назад в админку</span>
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-bold mb-8">Редактирование страниц</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="privacy">Политика конфиденциальности</TabsTrigger>
              <TabsTrigger value="consent">Согласие на обработку данных</TabsTrigger>
            </TabsList>

            <TabsContent value="privacy" className="space-y-6 mt-6">
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Заголовок</label>
                    <Input
                      value={privacyData.title}
                      onChange={(e) => setPrivacyData({ ...privacyData, title: e.target.value })}
                      placeholder="Заголовок страницы"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Содержание</label>
                    <ReactQuill
                      theme="snow"
                      value={privacyData.content}
                      onChange={(content) => setPrivacyData({ ...privacyData, content })}
                      modules={modules}
                      className="bg-white"
                    />
                  </div>

                  <Button onClick={() => handleSave('privacy')} disabled={saving}>
                    {saving ? 'Сохранение...' : 'Сохранить изменения'}
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="consent" className="space-y-6 mt-6">
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Заголовок</label>
                    <Input
                      value={consentData.title}
                      onChange={(e) => setConsentData({ ...consentData, title: e.target.value })}
                      placeholder="Заголовок страницы"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Содержание</label>
                    <ReactQuill
                      theme="snow"
                      value={consentData.content}
                      onChange={(content) => setConsentData({ ...consentData, content })}
                      modules={modules}
                      className="bg-white"
                    />
                  </div>

                  <Button onClick={() => handleSave('consent')} disabled={saving}>
                    {saving ? 'Сохранение...' : 'Сохранить изменения'}
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminPages;
