const downloadPDF = (language) => {
    const link = document.createElement('a');
    let filePath = '';

    if (language === 'vi') {
        filePath = '../../assets/pdf/nguyen_minh_trung_nghia_CV_vi.pdf';
    } else {
        filePath = '../../assets/pdf/nguyen_minh_trung_nghia_CV_en.pdf';
    }

    link.href = filePath;
    link.download = filePath.substring(filePath.lastIndexOf('/') + 1);
    link.click();
}

const buttonVi = document.getElementById('download_pdf_vi');
const buttonEn = document.getElementById('download_pdf');

buttonVi.onclick = () => downloadPDF('vi');
buttonEn.onclick = () => downloadPDF('en');