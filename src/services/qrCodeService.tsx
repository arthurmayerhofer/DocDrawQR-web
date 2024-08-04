// /services/qrCodeService.ts
import axios from 'axios';

export const generateQRCode = async (text: string, file: File | null) => {
  try {
    const formData = new FormData();
    formData.append('text', text);
    if (file) {
      formData.append('pdfFile', file);
    }

    const response = await axios.post('http://localhost:3000/api/qrcode', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao gerar QR Code:', error);
    throw error;
  }
};
