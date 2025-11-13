import Icon from '@/components/ui/icon';

const Maintenance = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center px-4">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Construction" size={48} className="text-primary" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Сайт на техническом обслуживании
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Мы проводим плановые работы. Скоро вернёмся!
        </p>
        
        <div className="flex justify-center gap-2 text-primary">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
