import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: 'seeds' | 'course';
  image: string;
}

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  image: string;
  likes: number;
}

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Набор "Зелёный старт"',
    price: 1990,
    description: 'Базовый набор семян для начинающих: салат, базилик, петрушка, укроп',
    category: 'seeds',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Набор "Витаминный"',
    price: 2490,
    description: 'Микрозелень: брокколи, редис, кресс-салат, горох',
    category: 'seeds',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Курс "Основы сити-фермерства"',
    price: 4990,
    description: '4 недели обучения выращиванию растений дома',
    category: 'course',
    image: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Курс "Микрозелень PRO"',
    price: 7990,
    description: 'Профессиональное выращивание микрозелени на продажу',
    category: 'course',
    image: '/placeholder.svg'
  }
];

const communityPosts: Post[] = [
  {
    id: 1,
    author: 'Анна К.',
    avatar: '/placeholder.svg',
    content: 'Первый урожай базилика! Спустя 3 недели наконец-то собрала свой микро-огород. Запах невероятный! 🌱',
    image: '/placeholder.svg',
    likes: 24
  },
  {
    id: 2,
    author: 'Дмитрий М.',
    avatar: '/placeholder.svg',
    content: 'Совет новичкам: не переувлажняйте почву! Я потерял первую партию из-за этого, но теперь всё растёт отлично',
    image: '/placeholder.svg',
    likes: 18
  }
];

const faqData = [
  { q: 'Как часто поливать?', a: 'Зависит от растения. Микрозелень - 1-2 раза в день, базилик - когда почва подсыхает' },
  { q: 'Сколько света нужно?', a: 'Минимум 6-8 часов света в день. Можно использовать фитолампы' },
  { q: 'Когда доставка?', a: 'Доставка по Москве - 1-2 дня, по России - 3-7 дней' }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [cartCount, setCartCount] = useState(0);
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { id: 1, text: 'Привет! Я бот-помощник сити-фермера. Чем могу помочь?', isBot: true }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isLiveSupport, setIsLiveSupport] = useState(false);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;

    const userMessage: Message = {
      id: chatMessages.length + 1,
      text: chatInput,
      isBot: false
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    setTimeout(() => {
      const question = chatInput.toLowerCase();
      let botResponse = '';
      let needsLiveSupport = false;

      const faqMatch = faqData.find(item => 
        question.includes(item.q.toLowerCase().split(' ')[0])
      );

      if (faqMatch) {
        botResponse = faqMatch.a;
      } else {
        botResponse = 'Не нашёл ответ на ваш вопрос. Переключаю на живого оператора...';
        needsLiveSupport = true;
      }

      const botMessage: Message = {
        id: chatMessages.length + 2,
        text: botResponse,
        isBot: true
      };

      setChatMessages(prev => [...prev, botMessage]);

      if (needsLiveSupport) {
        setTimeout(() => {
          setIsLiveSupport(true);
          setChatMessages(prev => [...prev, {
            id: prev.length + 1,
            text: 'Оператор Мария на связи. Чем могу помочь?',
            isBot: true
          }]);
        }, 1500);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-green-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full gradient-green-purple flex items-center justify-center">
                <Icon name="Sprout" className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold gradient-text">Сити-Фермер</span>
            </div>
            
            <div className="hidden md:flex gap-6">
              <Button variant="ghost" onClick={() => setActiveTab('home')}>Главная</Button>
              <Button variant="ghost" onClick={() => setActiveTab('shop')}>Магазин</Button>
              <Button variant="ghost" onClick={() => setActiveTab('community')}>Сообщество</Button>
              <Button variant="ghost" onClick={() => setActiveTab('courses')}>Курсы</Button>
              <Button variant="ghost" onClick={() => setActiveTab('support')}>Поддержка</Button>
            </div>

            <Button className="gradient-green-purple text-white relative">
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </nav>

      {activeTab === 'home' && (
        <div>
          <section className="relative overflow-hidden py-20 md:py-32">
            <div className="absolute inset-0 gradient-green-purple opacity-10"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
                  Выращивай свежесть дома
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Начни своё путешествие в мир городского фермерства. Свежие овощи и зелень круглый год прямо на твоём подоконнике.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="gradient-green-purple text-white text-lg px-8"
                    onClick={() => setActiveTab('shop')}
                  >
                    <Icon name="ShoppingBag" className="mr-2" size={20} />
                    В магазин
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8"
                    onClick={() => setActiveTab('courses')}
                  >
                    <Icon name="GraduationCap" className="mr-2" size={20} />
                    Курсы
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover-scale border-2 border-green-100 hover:border-green-300 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-4">
                    <Icon name="Leaf" className="text-white" size={24} />
                  </div>
                  <CardTitle>Эко-наборы</CardTitle>
                  <CardDescription>Готовые наборы семян для быстрого старта</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover-scale border-2 border-purple-100 hover:border-purple-300 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-violet-600 flex items-center justify-center mb-4">
                    <Icon name="Users" className="text-white" size={24} />
                  </div>
                  <CardTitle>Сообщество</CardTitle>
                  <CardDescription>Делись опытом с тысячами фермеров</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover-scale border-2 border-blue-100 hover:border-blue-300 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center mb-4">
                    <Icon name="BookOpen" className="text-white" size={24} />
                  </div>
                  <CardTitle>Обучение</CardTitle>
                  <CardDescription>Профессиональные курсы от экспертов</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'shop' && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-4xl font-bold mb-8 gradient-text">Магазин</h2>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">Всё</TabsTrigger>
              <TabsTrigger value="seeds">Наборы семян</TabsTrigger>
              <TabsTrigger value="course">Курсы</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <Card key={product.id} className="hover-scale overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-green-100 to-purple-100 flex items-center justify-center">
                      <Icon name="Package" size={64} className="text-green-600" />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{product.name}</CardTitle>
                        <Badge variant={product.category === 'seeds' ? 'default' : 'secondary'}>
                          {product.category === 'seeds' ? 'Семена' : 'Курс'}
                        </Badge>
                      </div>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <span className="text-2xl font-bold text-green-600">{product.price} ₽</span>
                      <Button onClick={addToCart} className="gradient-green-purple text-white">
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="seeds">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => p.category === 'seeds').map(product => (
                  <Card key={product.id} className="hover-scale overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                      <Icon name="Sprout" size={64} className="text-green-600" />
                    </div>
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <span className="text-2xl font-bold text-green-600">{product.price} ₽</span>
                      <Button onClick={addToCart} className="gradient-green-purple text-white">
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="course">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => p.category === 'course').map(product => (
                  <Card key={product.id} className="hover-scale overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center">
                      <Icon name="GraduationCap" size={64} className="text-purple-600" />
                    </div>
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <span className="text-2xl font-bold text-purple-600">{product.price} ₽</span>
                      <Button onClick={addToCart} className="gradient-green-purple text-white">
                        Купить курс
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {activeTab === 'community' && (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 gradient-text">Сообщество</h2>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Поделись своим опытом</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea placeholder="Расскажи о своём урожае..." rows={3} />
                <div className="flex justify-between items-center">
                  <Button variant="outline">
                    <Icon name="Image" className="mr-2" size={18} />
                    Добавить фото
                  </Button>
                  <Button className="gradient-green-purple text-white">Опубликовать</Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {communityPosts.map(post => (
                <Card key={post.id} className="hover-scale">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{post.author}</p>
                        <p className="text-sm text-gray-500">2 часа назад</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{post.content}</p>
                    <div className="h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                      <Icon name="Image" size={48} className="text-green-300" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm">
                      <Icon name="Heart" className="mr-2" size={18} />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="MessageCircle" className="mr-2" size={18} />
                      Комментарии
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'courses' && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-4xl font-bold mb-8 gradient-text">Курсы</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {products.filter(p => p.category === 'course').map(course => (
              <Card key={course.id} className="hover-scale">
                <div className="h-64 bg-gradient-to-br from-purple-200 to-violet-300 flex items-center justify-center">
                  <Icon name="BookOpen" size={80} className="text-white" />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{course.name}</CardTitle>
                  <CardDescription className="text-base">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={18} className="text-green-600" />
                      <span>4 недели обучения</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Video" size={18} className="text-green-600" />
                      <span>20+ видеоуроков</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Award" size={18} className="text-green-600" />
                      <span>Сертификат по окончании</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-purple-600">{course.price} ₽</span>
                  <Button size="lg" className="gradient-green-purple text-white" onClick={addToCart}>
                    Записаться
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'support' && (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 gradient-text">Техподдержка</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MessageSquare" size={24} />
                    {isLiveSupport ? 'Чат с оператором' : 'Чат-бот'}
                  </CardTitle>
                  <CardDescription>
                    {isLiveSupport ? 'Вы общаетесь с живым оператором' : 'Задайте вопрос, и я постараюсь помочь'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ScrollArea className="flex-1 pr-4 mb-4">
                    <div className="space-y-4">
                      {chatMessages.map(msg => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              msg.isBot
                                ? 'bg-gradient-to-br from-green-100 to-emerald-100 text-gray-800'
                                : 'bg-gradient-to-br from-purple-500 to-violet-600 text-white'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Введите сообщение..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                    />
                    <Button onClick={handleChatSend} className="gradient-green-purple text-white">
                      <Icon name="Send" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Часто задаваемые вопросы</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {faqData.map((item, index) => (
                      <div key={index} className="border-b pb-3 last:border-b-0">
                        <p className="font-semibold text-green-700 mb-2">{item.q}</p>
                        <p className="text-gray-600">{item.a}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Контакты</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Icon name="Mail" className="text-green-600" size={20} />
                      <span>support@city-farmer.ru</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" className="text-green-600" size={20} />
                      <span>+7 (495) 123-45-67</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Clock" className="text-green-600" size={20} />
                      <span>Пн-Пт: 9:00 - 21:00</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full gradient-green-purple flex items-center justify-center">
                  <Icon name="Sprout" className="text-white" size={24} />
                </div>
                <span className="text-xl font-bold">Сити-Фермер</span>
              </div>
              <p className="text-gray-400">Выращивай свежесть дома</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Магазин</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Наборы семян</li>
                <li>Курсы</li>
                <li>Оборудование</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-gray-400">
                <li>О нас</li>
                <li>Сообщество</li>
                <li>Блог</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Поддержка</h3>
              <ul className="space-y-2 text-gray-400">
                <li>FAQ</li>
                <li>Доставка</li>
                <li>Контакты</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Сити-Фермер. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
