"use client"; // Adicionando esta linha para marcar o arquivo como Client Component

import { useState } from 'react';
import QRCodeForm from '../components/QRCodeForm';
import { generateQRCode } from '../services/qrCodeService';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa Font Awesome

const HomePage: React.FC = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [formKey, setFormKey] = useState<number>(0); // Usado para forçar a recarga do formulário
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  const handleFormSubmit = async (text: string, pdfFile: File | null) => {
    try {
      const result = await generateQRCode(text, pdfFile);
      if (result && 'fileUrl' in result) {
        setFileUrl(result.fileUrl);
        setButtonClicked(false); // Mostrar o botão novamente após gerar o PDF
        setFormKey(prevKey => prevKey + 1); // Recarregar o formulário
      }
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    }
  };

  const handleDownloadClick = () => {
    setButtonClicked(true); // Ocultar o botão quando o PDF é baixado
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 sm:px-6 lg:px-8 my-5">
      <div className="w-full max-w-md p-4 space-y-6 bg-white rounded-lg shadow-lg">
        <QRCodeForm key={formKey} onSubmit={handleFormSubmit} />
        {fileUrl && !buttonClicked && (
          <a
            href={fileUrl}
            download="modified_qr.pdf"
            className="inline-flex items-center justify-center w-full px-4 py-2 mt-4 font-medium text-white bg-blue-800 rounded-lg shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={handleDownloadClick} // Ocultar botão ao clicar para baixar
          >
            Baixar PDF
          </a>
        )}
      </div>
    </main>
  );
}

export default HomePage;
