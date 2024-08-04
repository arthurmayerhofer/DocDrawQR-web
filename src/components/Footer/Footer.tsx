// src/components/Footer/index.tsx

const Footer: React.FC = () => {
    return (
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div id="about" className="mb-6 md:mb-0 md:w-1/3">
              <h2 className="text-2xl font-semibold mb-2">Sobre</h2>
              <p className="text-sm text-gray-400">
                Informações sobre a empresa ou o serviço oferecido.
              </p>
            </div>
            
            <div id="contact" className="mb-6 md:mb-0 md:w-1/3">
              <h2 className="text-2xl font-semibold mb-2">Contato</h2>
              <p className="text-sm text-gray-400">
                Informações de contato e formulário.
              </p>
            </div>
          </div>
          
          <div className="mt-4 border-t border-gray-700 pt-4">
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Política de Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Termos de Uso</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Contato</a>
            </div>
            <p className="mt-4 text-xs text-gray-500">© {new Date().getFullYear()} Seu Nome ou Empresa. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  