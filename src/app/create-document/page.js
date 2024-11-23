
import Header from "@component/components/Header";
import Footer from "@component/components/Footer";
import PersonalDataForm from "@component/forms/PersonalDataForm";

const CreateDocument = () => {
    return (
      <div className='min-h-screen flex flex-col items-center bg-white'>
        <Header title={'ПОЗОВ НА РОЗЛУЧЕННЯ'} />
        <div className="flex flex-col min-h-screen bg-white w-3/5 mt-8 mx-auto">
          <nav className="h-12 flex flex-row gap-3">
              <button className="flex items-center justify-between w-full p-2 text-left border  border-blue-500 rounded text-blue-500">
                <span>1 ТИП ПОЗОВУ</span>
                <span>✓</span>
              </button>
              <button className="flex items-center justify-between w-full p-2 text-left border border-blue-500 rounded text-blue-500">
                <span>2 Персональні дані</span>
                <span>✓</span>
              </button>
              <button className="flex items-center justify-between w-full p-2 text-left border rounded">
                <span>3 Деталі справи</span>
              </button>
              <button className="flex items-center justify-between w-full p-2 text-left border rounded">
                <span>4 Онлайн-оплата</span>
              </button>
              <button className="flex items-center justify-between w-full p-2 text-left border rounded">
                <span>5 Готовий позов</span>
              </button>
          </nav>
          <main className="flex-1">
            <PersonalDataForm />
          </main>
        </div>
        <Footer />
      </div>
    )
};

export default CreateDocument;