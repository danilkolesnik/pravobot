import { renderDocument } from "@component/services/renderDocument";

const DocumentPreview = ({ documentData }) => {

    return (
        <div className="flex flex-col items-center gap-8 mt-8">
            <div className="text-center">
                <h1 className="text-3xl text-gray-800">Дякуємо!</h1>
                <p className="text-gray-800 mt-2">Ваш позов на розлучення готовий</p>
            </div>
            <div
                className="w-full border border-black p-4 text-gray-900"
                dangerouslySetInnerHTML={{ __html: renderDocument(documentData.Sample) }}
            ></div>
        </div>
    );
};

export default DocumentPreview;
