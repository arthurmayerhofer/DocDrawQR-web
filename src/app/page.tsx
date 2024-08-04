// /app/page.tsx
"use client"; // Adicionando esta linha para marcar o arquivo como Client Component

import { useState } from 'react';
import QRCodeForm from '../components/QRCodeForm';
import { generateQRCode } from '../services/qrCodeService';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa Font Awesome


const HomePage: React.FC = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFormSubmit = async (text: string, pdfFile: File | null) => {
    try {
      const result = await generateQRCode(text, pdfFile);
      if (result && 'fileUrl' in result) {
        setFileUrl(result.fileUrl);
        console.log('Pdf Modificado com sucesso: ', result.fileUrl);
      }
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 sm:px-6 lg:px-8 my-5">
      <div className="w-full max-w-md p-4 space-y-6 bg-white rounded-lg shadow-lg">
        <QRCodeForm onSubmit={handleFormSubmit} />
        {fileUrl && (
          <a
            href={fileUrl}
            download="modified_qr.pdf"
            className="inline-flex items-center justify-center w-full px-4 py-2 mt-4 font-medium text-white bg-blue-800 rounded-lg shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Baixar PDF
          </a>
        )}
      </div>
    </main>
  );
}

export default HomePage;
