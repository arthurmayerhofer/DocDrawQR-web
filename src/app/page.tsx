"use client"; // Adicionando esta linha para marcar o arquivo como Client Component

import { useState } from "react";
import QRCodeForm from "../components/QRCodeForm";
import { generateQRCode } from "../services/qrCodeService";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Importa Font Awesome

const HomePage: React.FC = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [formKey, setFormKey] = useState<number>(0);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleFormSubmit = async (
    text1: string,
    text2: string,
    pdfFile: File | null
  ) => {
    try {
      const result = await generateQRCode(text1, text2, pdfFile);
      if (result && "fileUrl" in result) {
        setFileUrl(result.fileUrl);
        setButtonClicked(false);
        setFormKey((prevKey) => prevKey + 1);
        setErrorMessage(null);
        setShowPopup(true); // Mostrar o pop-up após gerar o PDF
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "Ocorreu um erro ao gerar o QR Code.");
      } else {
        setErrorMessage("Ocorreu um erro desconhecido.");
      }
    }
  };

  const handleDownloadClick = () => {
    setButtonClicked(true); // Ocultar o botão quando o PDF é baixado
    setShowPopup(false); // Fechar o pop-up após baixar o PDF
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 sm:px-6 lg:px-8 my-9">
      <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Esquerda: Título Chamativo e Passo a Passo Interativo com Cards */}
        <div className="flex flex-col justify-center w-1/2 p-8 bg-blue-800 text-white space-y-3">
          <h1 className="text-4xl font-bold">DocDraw QR é  <br></br> Prático e Eficiente</h1>
          <h2 className="text-2x1 font-semibold mb-5">Otimize seu Criativo:</h2>

          <div className="space-y-5 mt-5">
            <div className="space-y-3 mt-3">
              {[
                "Informe o link dos QR Codes a serem gerados nos campos apropriados.",
                "Selecione o arquivo PDF que deseja modificar.",
                "Clique em 'Enviar' para gerar o PDF com os QR Codes e links clicáveis.",
                "Aguarde o processamento e, em seguida, clique no botão 'Baixar PDF' para baixar o arquivo.",
              ].map((step, index) => (
                <div
                  key={index}
                  className="relative p-3 bg-white text-gray-800 rounded-lg shadow-md transform transition duration-500 hover:scale-105 hover:shadow-lg cursor-pointer"
                >
                  <span className="absolute top-0 left-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-600 text-white font-bold -translate-y-1/2 -translate-x-1/2">
                    {index + 1}
                  </span>
                  <p className="ml-10">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Direita: Formulário */}
        <div className="w-1/2 p-8">
          <div className="space-y-4">
            <QRCodeForm key={formKey} onSubmit={handleFormSubmit} />
            {errorMessage && (
              <div className="mt-4 p-2 text-red-600 bg-red-100 rounded">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pop-up interativo */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg space-y-4 text-center">
            <h3 className="text-2xl font-semibold text-gray-800">Seu PDF está pronto!</h3>
            <p className="text-gray-600">Clique no botão abaixo para baixar seu arquivo.</p>
            <a
              href={fileUrl || "#"}
              download="Seu-DocDrawQR.pdf"
              className="inline-flex items-center justify-center px-4 py-2 font-medium text-white bg-blue-800 rounded-lg shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={handleDownloadClick}
            >
              Baixar PDF
            </a>
            <button
              className="mt-4 px-4 ml-3 py-2 text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300"
              onClick={() => setShowPopup(false)} // Fechar o pop-up ao clicar no botão de fechar
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;
