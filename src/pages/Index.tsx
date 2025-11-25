import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HomePage from '@/components/HomePage';
import ShopPage from '@/components/ShopPage';
import { CoursesPage, CommunityPage } from '@/components/CoursesAndCommunity';
import SupportPage from '@/components/SupportPage';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} cartCount={cartCount} />

      {activeTab === 'home' && <HomePage setActiveTab={setActiveTab} />}

      {activeTab === 'shop' && <ShopPage products={products} addToCart={addToCart} />}

      {activeTab === 'community' && <CommunityPage communityPosts={communityPosts} />}

      {activeTab === 'courses' && <CoursesPage products={products} addToCart={addToCart} />}

      {activeTab === 'support' && (
        <SupportPage 
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          isLiveSupport={isLiveSupport}
          setIsLiveSupport={setIsLiveSupport}
          faqData={faqData}
        />
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
