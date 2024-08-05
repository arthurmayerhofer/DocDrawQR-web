// src/services/qrCodeService.tsx
import axios from 'axios';

export const generateQRCode = async (text: string, pdfFile: File | null) => {
  const formData = new FormData();
  formData.append('text', text);
  if (pdfFile) {
    formData.append('pdfFile', pdfFile);
  }

  try {
    const response = await axios.post('https://doc-draw-qr-api.vercel.app/api/qrcode', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const fileUrl = URL.createObjectURL(blob);
    return { fileUrl };
  } catch (error) {
    console.error('Erro ao gerar QR Code:', error);
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.error || 'Erro ao gerar QR Code';
      throw new Error(errorMessage);
    } else {
      throw new Error('Erro ao gerar QR Code');
    }
  }
};
