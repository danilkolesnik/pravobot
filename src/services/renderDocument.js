
export const renderDocument = (data) => {

    const text = typeof data === 'string' ? data : JSON.stringify(data);

    const formattedText = text
        .replace(/\n/g, '<br>')
        .replace(/<right>/g, '<div style="text-align: right;">')
        .replace(/<\/right>/g, '</div>')
        .replace(/<center>/g, '<div style="text-align: center;">')
        .replace(/<\/center>/g, '</div>')
        .replace(/<left>/g, '<div style="text-align: left;">')
        .replace(/<\/left>/g, '</div>');

    return formattedText;
};

