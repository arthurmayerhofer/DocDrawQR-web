import { useState, ChangeEvent, FormEvent, DragEvent } from "react";

interface QRCodeFormProps {
  onSubmit: (text1: string, text2: string, pdfFile: File | null) => void;
}

const QRCodeForm: React.FC<QRCodeFormProps> = ({ onSubmit }) => {
  const [text1, setText1] = useState<string>("");
  const [text2, setText2] = useState<string>("");

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(text1,text2, pdfFile);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPdfFile(event.target.files[0]);
    }
  };

  const handleDrag = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setPdfFile(event.dataTransfer.files[0]);
    }
  };

  return (
    <form
      className="bg-white space-y-3 mx-auto max-w-3xl"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Gerador de QR Code para PDF</h2>
      <p className="text-sm  text-gray-600 mb-4">
        Preencha os endereços dos links para gerar os QR Code's a serem inseridos no arquivo PDF de sua escolha. 
      </p>
      {/* Nossa ferramenta oferece uma integração fácil e prática. */}
      <div className="flex flex-col space-y-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Link 1:</label>
          <input
            type="text"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            required
            placeholder="https://example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-black-300  focus:ring-clack-500 transition-all duration-300 ease-in-out"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Link 2:</label>
          <input
            type="text"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            required
            placeholder="https://example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-black-300  focus:ring-clack-500 transition-all duration-300 ease-in-out"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Arquivo PDF:</label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
              dragActive ? "border-black-500 bg-black-500 shadow-lg" : "border-gray-300 bg-gray-100"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
              className="hidden"
              id="pdfFileInput"
            />
            <label
              htmlFor="pdfFileInput"
              className="flex flex-col items-center justify-center cursor-pointer text-center w-full h-full"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full shadow-lg text-white mb-4 transition-transform transform hover:scale-110 duration-300 ease-in-out">
                <i className="fas fa-paperclip text-3xl"></i>
              </div>
              <span className="text-gray-500 mb-2 text-sm font-medium">
                Arraste o arquivo PDF ou clique para selecionar
              </span>
              {pdfFile && (
                <span className="text-gray-700 mt-2 text-sm font-medium">{pdfFile.name}</span>
              )}
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out"
      >
        Enviar
      </button>
    </form>
  );
};

export default QRCodeForm;
