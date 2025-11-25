import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
}

const HomePage = ({ setActiveTab }: HomePageProps) => {
  return (
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
  );
};

export default HomePage;
