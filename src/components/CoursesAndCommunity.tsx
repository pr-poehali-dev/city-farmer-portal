import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

interface CoursesAndCommunityProps {
  activeTab: string;
  products: Product[];
  communityPosts: Post[];
  addToCart: () => void;
}

export const CoursesPage = ({ products, addToCart }: { products: Product[], addToCart: () => void }) => {
  return (
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
  );
};

export const CommunityPage = ({ communityPosts }: { communityPosts: Post[] }) => {
  return (
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
  );
};
