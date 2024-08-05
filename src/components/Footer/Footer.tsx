const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div id="about" className="mb-6 md:mb-0 md:w-1/3">
            <h2 className="text-2xl font-semibold mb-2">Sobre</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              DocDrawQR é uma ferramenta para geração de QR Codes para integração em documentos PDF. Nosso serviço facilita a criação e uso de QR Codes em diversos contextos, proporcionando uma experiência prática e eficiente.
            </p>
          </div>
          
          <div id="contact" className="mb-6 md:mb-0 md:w-1/3">
            <h2 className="text-2xl font-semibold mb-2">Contato</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Email: <a href="mailto:contato@qrcodepdf.com" className="hover:text-white transition duration-300">contato@qrcodepdf.com</a><br />
              Telefone: <a href="tel:+551112345678" className="hover:text-white transition duration-300">(11) 1234-5678</a><br />
              Endereço: Rua Exemplo, 123, São Paulo, SP
            </p>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-4">
          <div className="flex justify-center space-x-8">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Política de Privacidade</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Termos de Uso</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Contato</a>
          </div>
          <p className="mt-4 text-xs text-gray-500 text-center">© {new Date().getFullYear()} DocDrawQR. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
