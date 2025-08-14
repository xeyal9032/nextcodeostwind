const puppeteer = require('puppeteer');
const path = require('path');

async function generateCVPDF() {
  try {
    console.log('CV PDF oluşturuluyor...');
    
    // Tarayıcıyı başlat
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // CV HTML dosyasını yükle
    const cvPath = path.join(__dirname, 'cv.html');
    await page.goto(`file://${cvPath}`, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Sayfanın tamamen yüklenmesini bekle
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // CV PDF oluştur
    const pdfPath = path.join(__dirname, 'Khayal-Jamilli-CV.pdf');
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
      preferCSSPageSize: true
    });
    
    console.log(`CV PDF başarıyla oluşturuldu: ${pdfPath}`);
    
    await browser.close();
    
  } catch (error) {
    console.error('CV PDF oluşturulurken hata:', error);
  }
}

generateCVPDF();



