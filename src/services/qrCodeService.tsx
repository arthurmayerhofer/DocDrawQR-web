// /services/qrCodeService.ts
import axios from 'axios';

export const generateQRCode = async (text: string, pdfFile: File | null) => {
  if (!pdfFile) {
    throw new Error('Nenhum arquivo PDF enviado');
  }

  const formData = new FormData();
  formData.append('text', text);
  formData.append('pdfFile', pdfFile);

  const response = await fetch('http://doc-draw-qr-api.vercel.app/api/qrcode', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Erro ao gerar QR Code');
  }

  const blob = await response.blob();
  const fileUrl = URL.createObjectURL(blob);
  return { fileUrl };
};
