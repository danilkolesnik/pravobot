'use client';
import Header from "@component/components/Header";
import Footer from "@component/components/Footer";
import DocumentPreview from "@component/forms/primary/DocumentPreview";

const Preview = () => {
    return (
        <div className="min-h-screen flex flex-col items-center">
            <Header title={'ПОЗОВ НА РОЗЛУЧЕННЯ'} />
            <div className="flex flex-col min-h-screen w-4/5 mt-8 mb-8 mx-auto">
                <DocumentPreview />
            </div>
            <Footer />
        </div>
    )
}

export default Preview;