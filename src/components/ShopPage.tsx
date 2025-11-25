import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: 'seeds' | 'course';
  image: string;
}

interface ShopPageProps {
  products: Product[];
  addToCart: () => void;
}

const ShopPage = ({ products, addToCart }: ShopPageProps) => {
  return (
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
  );
};

export default ShopPage;
