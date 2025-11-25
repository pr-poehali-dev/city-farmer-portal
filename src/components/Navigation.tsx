import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
}

const Navigation = ({ activeTab, setActiveTab, cartCount }: NavigationProps) => {
  return (
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
  );
};

export default Navigation;
