import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

interface SupportPageProps {
  chatMessages: Message[];
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  chatInput: string;
  setChatInput: React.Dispatch<React.SetStateAction<string>>;
  isLiveSupport: boolean;
  setIsLiveSupport: React.Dispatch<React.SetStateAction<boolean>>;
  faqData: Array<{ q: string; a: string }>;
}

const SupportPage = ({ 
  chatMessages, 
  setChatMessages, 
  chatInput, 
  setChatInput, 
  isLiveSupport, 
  setIsLiveSupport,
  faqData
}: SupportPageProps) => {
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
  );
};

export default SupportPage;
