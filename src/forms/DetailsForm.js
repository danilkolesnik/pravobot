
const DetailsForm = ({ progressIndex, handleSetIndex }) => {
    
    return (
        <div className='flex flex-row gap-8 mt-8'>
            <nav className='w-3/5 flex flex-col gap-2 items-left'>
                <button className='p-2 text-left bg-mainBlue'>2.1 ДАННI ПОЗИВАЧА</button>
                <button className='p-2 text-left text-gray-500 border border-gray-400'>2.2 ДАННI ВIДПОВIДАЧА</button>
            </nav>

            <form className="w-full">
                {/* [MOCKUP] Деталi Шлюбу */}
                <div className="flex flex-wrap gap-3">
                    <label className='text-l text-black'><span style={{color: 'red'}}>* </span>Деталi Шлюбу</label>
                    <input
                    type="text"
                    placeholder="Місце реєстрації шлюбу (РАКС)"
                    className="w-full border p-2 rounded"
                    />
                    <input
                    type="text"
                    placeholder="Рiк"
                    className="w-1/4 grow border p-2 rounded"
                    />
                    <input
                    type="text"
                    placeholder="Мiсяць"
                    className="w-1/4 grow border p-2 rounded"
                    />
                    <input
                    type="text"
                    placeholder="День"
                    className="w-1/4 grow border p-2 rounded"
                    />
                </div>

                {/* [MOCKUP] Чи згоден відповідач на розірвання шлюбу? */}
                <div className="mt-6 flex flex-wrap gap-3">
                    <label className='text-l text-black'><span style={{color: 'red'}}>* </span>Чи згоден відповідач на розірвання шлюбу?</label>
                    <select
                        className="w-full border p-2 rounded"
                    >
                        <option>Так</option>
                        <option>Нi</option>
                    </select>
                </div>

                {/* [MOCKUP] Чи є сумісні діти у шлюбі?  */}
                <div className="mt-6 flex flex-wrap gap-3">
                    <label className='text-l text-black'><span style={{color: 'red'}}>* </span>Чи є сумісні діти у шлюбі?</label>
                    <select
                        className="w-full border p-2 rounded"
                    >
                        <option>Так</option>
                        <option>Нi</option>
                    </select>
                </div>

                <button type="button" onClick={() => handleSetIndex(progressIndex + 1)} className="w-full mt-6 bg-mainBlue text-white px-4 py-2 rounded">
                    Далі
                </button>

            </form>
        </div>
    );
};

export default DetailsForm;