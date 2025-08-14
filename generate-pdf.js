const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
  try {
    console.log('Modern PDF oluşturuluyor...');
    
    // Tarayıcıyı başlat
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Yeni modern HTML dosyasını yükle
    const htmlPath = path.join(__dirname, 'portfolio-pdf.html');
    await page.goto(`file://${htmlPath}`, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Sayfanın tamamen yüklenmesini bekle
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // PDF oluştur
    const pdfPath = path.join(__dirname, 'Khayal-Jamilli-Portfolio.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '15mm',
        right: '15mm',
        bottom: '15mm',
        left: '15mm'
      },
      displayHeaderFooter: false,
      preferCSSPageSize: true,
      scale: 1.0
    });
    
    console.log(`Modern PDF başarıyla oluşturuldu: ${pdfPath}`);
    await browser.close();
    
  } catch (error) {
    console.error('PDF oluşturulurken hata:', error);
  }
}

generatePDF();
