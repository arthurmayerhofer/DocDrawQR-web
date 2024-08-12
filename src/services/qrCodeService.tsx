// /services/qrCodeService.ts
export const generateQRCode = async (text1: string, text2: string, pdfFile: File | null) => {
  if (!pdfFile) {
    throw new Error('Nenhum arquivo PDF enviado');
  }
  const prodUrl = 'https://doc-draw-qr-api.vercel.app/api/qrcode';
  const devUrl =  'http://localhost:3000/api/qrcode';

  const formData = new FormData();
  formData.append('text1', text1);
  formData.append('text2', text2);

  formData.append('pdfFile', pdfFile);

  const response = await fetch(devUrl, {
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
