import { jsPDF } from "jspdf";

const downloadPDFDocument = () => {
    // Получаем содержимое элемента с ID 'document_preview'
    const content = document.getElementById('document_preview').innerHTML;

    // Создаем экземпляр jsPDF
    const pdf = new jsPDF();

    // Устанавливаем шрифт Times New Roman
    pdf.setFont("times", "normal");
    pdf.setTextColor(0, 0, 0); // Устанавливаем черный цвет текста

    // Генерируем PDF на основе HTML содержимого
    pdf.html(
        `<div style="font-family: Times, Serif; font-size: 12pt; color: black;">${content}</div>`,
        {
            callback: function (doc) {
                // Сохраняем PDF с именем файла
                doc.save("document.pdf");
            },
            x: 10,
            y: 10,
            width: 180, // Ширина контента
            windowWidth: 800, // Для рендера больших страниц
        }
    );
};

export default downloadPDFDocument;
