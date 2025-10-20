import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Курс "FULL SELLER"',
    price: 155900,
    image: 'https://cdn.poehali.dev/files/82ec2ea4-8930-4c48-9222-81f2556faa7e.png',
    description: 'Освой пошаговую стратегию действий для выхода на Wildberries "С НУЛЯ", длительность 3 месяца (12 недель)',
    ingredients: ['5 модулей', '20 уроков', 'Поддержка 3 месяца', 'Сертификат']
  },
  {
    id: 2,
    name: 'Курс "FULL MANAGER WB"',
    price: 75000,
    image: 'https://cdn.poehali.dev/files/7c85a88e-3e6f-44eb-bd22-2f74e22b2c6b.png',
    description: 'Освой профессию менеджера Wildberries, длительность 6 недель',
    ingredients: ['10 модулей', '50 уроков', 'Поддержка 6 месяцев', 'Личный куратор']
  },
  {
    id: 3,
    name: 'Консультация 1:1',
    price: 15000,
    image: 'https://cdn.poehali.dev/files/388d4298-f403-458c-b2d1-979bc832ae7b.png',
    description: 'Персональная консультация с экспертом',
    ingredients: ['2 часа', 'Zoom встреча', 'План действий', 'Запись встречи']
  },
  {
    id: 4,
    name: 'Аудит магазина',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    description: 'Детальный аудит вашего магазина на WB',
    ingredients: ['Анализ 50+ метрик', 'Отчет 30+ страниц', 'Рекомендации', '2 недели поддержки']
  }
];

const reviews = [
  { id: 1, author: 'Анна Петрова', text: 'Благодаря курсу увеличила продажи в 3 раза за 2 месяца!', rating: 5 },
  { id: 2, author: 'Дмитрий Иванов', text: 'Отличная структура материала, все понятно и по делу', rating: 5 },
  { id: 3, author: 'Елена Смирнова', text: 'Наставник всегда на связи, помогает решать любые вопросы', rating: 5 }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('catalog');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#221F3B] to-[#2D1F4A]">
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[#1A1F2C]/80 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold font-heading bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent">
                FULL WB
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => setActiveSection('catalog')} className="text-white/80 hover:text-white transition-colors">
                Каталог
              </button>
              <button onClick={() => setActiveSection('content')} className="text-white/80 hover:text-white transition-colors">
                Содержание
              </button>
              <button onClick={() => setActiveSection('about')} className="text-white/80 hover:text-white transition-colors">
                О наставнике
              </button>
              <button onClick={() => setActiveSection('reviews')} className="text-white/80 hover:text-white transition-colors">
                Отзывы
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="md:hidden border-white/20 hover:bg-white/10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] z-40 bg-[#1A1F2C]/95 backdrop-blur-lg animate-fade-in">
          <div className="container mx-auto px-4 py-8 space-y-4">
            <button
              onClick={() => {
                setActiveSection('catalog');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-xl text-white/80 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
            >
              Каталог
            </button>
            <button
              onClick={() => {
                setActiveSection('content');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-xl text-white/80 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
            >
              Содержание
            </button>
            <button
              onClick={() => {
                setActiveSection('about');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-xl text-white/80 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
            >
              О наставнике
            </button>
            <button
              onClick={() => {
                setActiveSection('reviews');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-xl text-white/80 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
            >
              Отзывы
            </button>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'home' && (
          <section className="mb-24">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 bg-gradient-to-r from-white via-[#D6BCFA] to-[#8B5CF6] bg-clip-text text-transparent">
                Освой пошаговую стратегию действий для выхода на Wildberries
              </h1>
              <p className="text-xl text-white/70 mb-4">
                Старт четвертого потока курса 24.11.2025 года
              </p>
              <p className="text-white/60 mb-8">
                Онлайн-формат, еженедельные вебинары с наставником<br />
                Длительность 3-5 месяцев в зависимости от тарифа
              </p>
              <div className="flex items-center justify-center gap-2 mb-8">
                <Icon name="Tag" size={20} className="text-[#8B5CF6]" />
                <p className="text-2xl font-bold text-white">
                  от 60000 <span className="text-lg">₽</span>
                </p>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:opacity-90 text-lg px-8 py-6 h-auto"
                onClick={() => setActiveSection('catalog')}
              >
                Записаться сейчас
              </Button>
            </div>

            <div className="relative h-64 md:h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#D946EF]/20 backdrop-blur animate-slide-up">
              <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#D946EF" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,200 Q100,150 200,180 T400,200 T600,150 T800,180 L800,400 L0,400 Z"
                  fill="url(#gradient)"
                  className="animate-chart-draw"
                  style={{ strokeDasharray: 1000, strokeDashoffset: 0 }}
                />
                <polyline
                  points="0,200 100,150 200,180 300,160 400,200 500,170 600,150 700,160 800,180"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="3"
                  className="animate-chart-draw"
                  style={{ strokeDasharray: 1000 }}
                />
              </svg>
              <div className="absolute top-4 left-4 text-white/60 text-sm">
                График роста продаж
              </div>
            </div>
          </section>
        )}

        {activeSection === 'catalog' && (
          <section className="mb-24 animate-fade-in">
            <h2 className="text-4xl font-bold font-heading text-white mb-12 text-center">Каталог</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <Card key={product.id} className="bg-white/5 border-white/10 overflow-hidden hover:bg-white/10 transition-all hover:scale-105">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-white/60 text-sm mb-4">{product.description}</p>
                    <p className="text-2xl font-bold text-[#8B5CF6] mb-4">{product.price.toLocaleString()} ₽</p>
                    <div className="space-y-2">
                      <Button
                        className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:opacity-90"
                        onClick={() => {
                          if (product.id === 1) {
                            window.open('https://qr.nspk.ru/AD10006PTORDPC5D98HPT12HV37MMQ6G?type=02&bank=100000000284&sum=15590000&cur=RUB&crc=4C8A', '_blank');
                          } else if (product.id === 2) {
                            window.open('https://qr.nspk.ru/AD100014GSGC6EI888GPM4QV04MQ2EV6?type=02&bank=100000000284&sum=7500000&cur=RUB&crc=E7FF', '_blank');
                          }
                        }}
                      >
                        Оплатить полностью
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
                        onClick={() => {
                          if (product.id === 1) {
                            window.open('https://link.tinkoff.ru/WHik9e7734', '_blank');
                          } else if (product.id === 2) {
                            window.open('https://link.tinkoff.ru/AsN8cMkEe12', '_blank');
                          }
                        }}
                      >
                        {product.id === 1 ? 'РАССРОЧКА на 9 месяцев, без первоначального взноса' : product.id === 2 ? 'РАССРОЧКА на 6 месяцев, без первоначального взноса' : 'Оплатить в рассрочку'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'content' && (
          <section className="mb-24 animate-fade-in">
            <h2 className="text-4xl font-bold font-heading text-white mb-12 text-center">Содержание продуктов</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {products.map(product => (
                <Card key={product.id} className="bg-white/5 border-white/10 p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">{product.name}</h3>
                  <p className="text-white/70 mb-4">{product.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((item, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-[#8B5CF6]/20 text-[#D6BCFA] border-[#8B5CF6]/30">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="mb-24 animate-fade-in">
            <h2 className="text-4xl font-bold font-heading text-white mb-12 text-center">О наставнике</h2>
            <Card className="bg-white/5 border-white/10 max-w-4xl mx-auto p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <img
                  src="https://cdn.poehali.dev/files/76a29704-62db-4b64-ba57-270f3642cdad.jpg"
                  alt="Наставник"
                  className="w-48 h-48 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">Анастасия Яхудина</h3>
                  <p className="text-white/70 mb-4 leading-relaxed">
                    Эксперт по продажам на маркетплейсах с опытом более 5 лет. 
                    Помогла запустить более 200 успешных магазинов на Wildberries.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-[#8B5CF6]/20 rounded-lg p-4">
                      <p className="text-3xl font-bold text-[#8B5CF6]">200+</p>
                      <p className="text-white/60">Учеников</p>
                    </div>
                    <div className="bg-[#8B5CF6]/20 rounded-lg p-4">
                      <p className="text-3xl font-bold text-[#8B5CF6]">5 лет</p>
                      <p className="text-white/60">Опыт</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {activeSection === 'reviews' && (
          <section className="mb-24 animate-fade-in">
            <h2 className="text-4xl font-bold font-heading text-white mb-12 text-center">Отзывы</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {reviews.map(review => (
                <Card key={review.id} className="bg-white/5 border-white/10 p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="text-[#8B5CF6] fill-[#8B5CF6]" />
                    ))}
                  </div>
                  <p className="text-white/80 mb-4">{review.text}</p>
                  <p className="text-white/60 font-semibold">{review.author}</p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'offer' && (
          <section className="mb-24 animate-fade-in">
            <h2 className="text-4xl font-bold font-heading text-white mb-12 text-center">Публичная оферта</h2>
            <Card className="bg-white/5 border-white/10 max-w-4xl mx-auto p-8">
              <div className="prose prose-invert max-w-none">
                <div className="space-y-6 text-white/70">
                  <h3 className="text-2xl font-bold text-white">1. Общие положения</h3>
                  <p>
                    Настоящая публичная оферта (далее - Оферта) является официальным предложением FULL WB 
                    (далее - Исполнитель) заключить договор на оказание информационно-консультационных услуг 
                    и продажу цифровых продуктов (далее - Договор).
                  </p>

                  <h3 className="text-2xl font-bold text-white">2. Предмет договора</h3>
                  <p>
                    Исполнитель обязуется оказать Заказчику информационно-консультационные услуги в области 
                    продаж на маркетплейсах, а также предоставить доступ к цифровым продуктам согласно выбранному 
                    тарифу, а Заказчик обязуется оплатить эти услуги.
                  </p>

                  <h3 className="text-2xl font-bold text-white">3. Стоимость и порядок оплаты</h3>
                  <p>
                    Стоимость услуг определяется согласно выбранному тарифу и указывается на сайте. 
                    Оплата производится в полном объеме до начала оказания услуг посредством электронных платежных систем.
                  </p>

                  <h3 className="text-2xl font-bold text-white">4. Права и обязанности сторон</h3>
                  <p>
                    Исполнитель обязуется предоставить доступ к материалам в течение 24 часов с момента оплаты. 
                    Заказчик обязуется не распространять полученные материалы третьим лицам.
                  </p>

                  <h3 className="text-2xl font-bold text-white">5. Возврат средств</h3>
                  <p>
                    Возврат денежных средств осуществляется в случае невозможности предоставления услуг по вине Исполнителя. 
                    После предоставления доступа к цифровым материалам возврат не производится.
                  </p>

                  <h3 className="text-2xl font-bold text-white">6. Ответственность сторон</h3>
                  <p>
                    Исполнитель не несет ответственности за результаты применения Заказчиком полученной информации. 
                    Все рекомендации носят информационный характер.
                  </p>
                </div>
              </div>
            </Card>
          </section>
        )}

        {activeSection === 'privacy' && (
          <section className="mb-24 animate-fade-in">
            <h2 className="text-4xl font-bold font-heading text-white mb-12 text-center">Политика конфиденциальности</h2>
            <Card className="bg-white/5 border-white/10 max-w-4xl mx-auto p-8">
              <div className="prose prose-invert max-w-none">
                <div className="space-y-6 text-white/70">
                  <h3 className="text-2xl font-bold text-white">1. Общие положения</h3>
                  <p>
                    Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных 
                    пользователей сервиса FULL WB.
                  </p>

                  <h3 className="text-2xl font-bold text-white">2. Собираемые данные</h3>
                  <p>
                    Мы собираем следующие персональные данные: имя, адрес электронной почты, номер телефона, 
                    данные платежей. Эти данные необходимы для предоставления услуг и связи с вами.
                  </p>

                  <h3 className="text-2xl font-bold text-white">3. Цели обработки данных</h3>
                  <p>
                    Персональные данные используются для: предоставления доступа к услугам, обработки платежей, 
                    информирования об обновлениях и новых предложениях, улучшения качества сервиса.
                  </p>

                  <h3 className="text-2xl font-bold text-white">4. Защита данных</h3>
                  <p>
                    Мы применяем современные технологии защиты информации, включая шифрование данных при передаче 
                    и хранении. Доступ к персональным данным имеют только уполномоченные сотрудники.
                  </p>

                  <h3 className="text-2xl font-bold text-white">5. Передача данных третьим лицам</h3>
                  <p>
                    Персональные данные могут быть переданы платежным системам для обработки платежей. 
                    Мы не продаем и не передаем ваши данные третьим лицам в маркетинговых целях.
                  </p>

                  <h3 className="text-2xl font-bold text-white">6. Права пользователей</h3>
                  <p>
                    Вы имеете право на доступ к своим персональным данным, их исправление или удаление. 
                    Для этого свяжитесь с нами через форму обратной связи.
                  </p>

                  <h3 className="text-2xl font-bold text-white">7. Cookies</h3>
                  <p>
                    Мы используем файлы cookies для улучшения работы сайта и анализа посещаемости. 
                    Вы можете отключить cookies в настройках браузера.
                  </p>

                  <h3 className="text-2xl font-bold text-white">8. Изменения в политике</h3>
                  <p>
                    Мы оставляем за собой право вносить изменения в данную Политику конфиденциальности. 
                    Актуальная версия всегда доступна на этой странице.
                  </p>
                </div>
              </div>
            </Card>
          </section>
        )}
      </main>

      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <p className="text-white/60">&copy; 2025 FULL WB. Все права защищены.</p>
            <div className="flex gap-6">
              <button
                onClick={() => setActiveSection('offer')}
                className="text-white/60 hover:text-white transition-colors"
              >
                Оферта
              </button>
              <button
                onClick={() => setActiveSection('privacy')}
                className="text-white/60 hover:text-white transition-colors"
              >
                Политика конфиденциальности
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}