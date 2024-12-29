import IdCheckIcon from "@component/assets/icons/idCheckIcon";
import LiqPayIcon from "@component/assets/icons/liqPayIcon";
import McAfeeIcon from "@component/assets/icons/mcAfeeIcon";
import NortonSecuredIcon from "@component/assets/icons/nortonSecuredIcon";
import VisaIcon from "@component/assets/icons/visaIcon";

const PaymentForm = ({ progressIndex, handleSetIndex }) => {
    
    return (
        <div className='flex flex-col gap-16'>
            <div className='flex flex-col items-center gap-6 mt-8'>
                <div className='w-full md:w-4/5 lg:w-2/5 mr-6 text-gray-700'>
                    <h1 className='text-center text-3xl text-gray-700 font-medium'>Ваша позовна заява готова!</h1>
                    <p className='text-center mt-6 text-m'>Щоб отримати доступ до документу та інструкцій щодо подальших дій, оплатіть зазначену суму послуги.</p>
                    <div className='mt-6 flex flex-col gap-5'>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row gap-2 items-center'>
                                <input 
                                    type="checkbox" 
                                    className="mr-2" 
                                />
                                <label>Позов на розлучення</label>
                            </div>
                            <h2 className='text-l'>199 ₴</h2>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row gap-2 items-center'>
                                <input 
                                    type="checkbox" 
                                    className="mr-2" 
                                />
                                <label>Супровід справи адвокатом без вашої участі*</label>
                            </div>
                            <h2 className='text-l'>1000 ₴</h2>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-2/6 bg-mainBlue p-3 rounded'>
                    <h1 className='text-l font-bold'>Оплата послуг:</h1>
                    <div className='mt-4 flex flex-row justify-between'>
                        <p>Позов на розлучення</p>
                        <p>199 ₴</p>
                    </div>
                    <div id='payment_window' className='mt-4 border border-white max-h-44 overflow-y-scroll'>
                        <p className='p-1'>Якщо якісь із вищезгаданих обставин (наявність свідоцтва про шлюб, нерухомого майна тощо), необхідно додати до позову докази, що підтверджують їх (документи, довідки, витяги з реєстру нерухомого майна, свідоцтво про реєстрацію автомобіля тощо) .).</p>
                    </div>
                    <div className='border border-t-0 border-white p-2 whitespace-nowrap overflow-hidden'>
                        <input 
                            type="checkbox" 
                            className="mr-2" 
                        />
                        <label className='text-s'>Согласие на обработку персональных данных</label>
                    </div>
                    <button type="button" onClick={() => handleSetIndex(progressIndex + 1)} className="w-full mt-6 bg-white text-mainBlue px-4 py-2">
                        Сплатити
                    </button>
                </div>
            </div>

            <div className='w-full flex flex-row justify-between opacity-50'>
                <LiqPayIcon />
                <VisaIcon />
                <IdCheckIcon />
                <NortonSecuredIcon />
                <McAfeeIcon />
            </div>
        </div>
    );
};

export default PaymentForm;