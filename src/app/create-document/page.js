import Header from "@component/components/Header";
import Footer from "@component/components/Footer";

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
          <main className="flex-1 p-8">
            <h2 className="text-lg font-bold mb-4">ПІБ Відповідача</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Ім'я"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Прізвище"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="По батькові"
                  className="border p-2 rounded"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Рік"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Місяць"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="День"
                  className="border p-2 rounded"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="СЕРІЯ"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Номер Паспорту"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Ідентифікаційний номер"
                  className="border p-2 rounded"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Індекс"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Місто"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Вулиця"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Будинок"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Квартира"
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label>Співпадає з фактичною адресою проживання</label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Індекс"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Місто"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Вулиця"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Будинок"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Квартира"
                  className="border p-2 rounded"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Номер телефону"
                  className="border p-2 rounded"
                />
                <input
                  type="email"
                  placeholder="Електронна пошта"
                  className="border p-2 rounded"
                />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Далі
              </button>
            </form>
          </main>
        </div>
        <Footer />
      </div>
    )
};

export default CreateDocument;