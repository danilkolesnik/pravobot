
const downloadDocument = () => {
    // Получаем содержимое элемента document_preview
    const element = document.getElementById('document_preview');
    if (!element) {
        console.error('Element with id "document_preview" not found.');
        return;
    }

    const content = element.innerHTML;

    // Генерируем HTML-документ для Word
    const documentContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                /* Добавьте любые нужные стили */
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                }
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `;

    // Создаем Blob-объект с содержимым документа
    const blob = new Blob(['\uFEFF', documentContent], { type: 'application/msword' });

    // Создаем ссылку для скачивания
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.doc'; // Имя файла

    // Кликаем по ссылке для скачивания файла
    document.body.appendChild(link);
    link.click();

    // Удаляем ссылку после скачивания
    document.body.removeChild(link);
}

export default downloadDocument;