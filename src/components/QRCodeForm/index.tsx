import { useState, ChangeEvent, FormEvent, DragEvent } from "react";

interface QRCodeFormProps {
  onSubmit: (text: string, pdfFile: File | null) => void;
}

const QRCodeForm: React.FC<QRCodeFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState<string>("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(text, pdfFile);
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
      className="space-y-5 bg-white rounded-lg shadow-lg mt-3"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-semibold text-gray-700 mt-5">
        Gerador de QR Code para PDF
      </h2>
      <p className="text-sm text-gray-500">
        Insira um link e um arquivo PDF para gerar um QR Code integrado ao
        documento.
      </p>

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700">Link:</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          placeholder="https://example.com"
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition-all duration-300 focus:border-black focus:ring-0 text-black"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Arquivo PDF:
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-10 ${
            dragActive ? "border-blue-500" : "border-gray-300"
          } transition-all duration-300`}
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
            className="flex flex-col items-center justify-center h-full cursor-pointer"
          >
            <i className="fas fa-paperclip text-gray-500 mb-2 text-2xl"></i>
            <span className="text-gray-500">
              Arraste o arquivo ou clique para selecionar
            </span>
            {pdfFile && (
              <span className="text-gray-700 mt-2">{pdfFile.name}</span>
            )}
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 font-medium text-white bg-green-700 rounded-lg shadow-sm hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
      >
        Enviar
      </button>
    </form>
  );
};

export default QRCodeForm;
