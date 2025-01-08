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
                            <h2 className='text-l'><b>199 ₴</b></h2>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row gap-2 items-center'>
                                <input 
                                    type="checkbox" 
                                    className="mr-2" 
                                />
                                <label>Супровід справи адвокатом без вашої участі*</label>
                            </div>
                            <h2 className='text-l'><b>1000 ₴</b></h2>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <h1 className='text-xl'><b>До сплати</b></h1>
                            <h1 className='text-xl'><b>1999 ₴</b></h1>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-4/5 lg:w-2/5 border-2 border-mainBlue p-3 rounded-xl'>
                    <div id='payment_window' className='border border-white max-h-44 overflow-y-scroll'>
                        <p className='p-1 text-gray-800'>Якщо якісь із вищезгаданих обставин (наявність свідоцтва про шлюб, нерухомого майна тощо), необхідно додати до позову докази, що підтверджують їх (документи, довідки, витяги з реєстру нерухомого майна, свідоцтво про реєстрацію автомобіля тощо Якщо якісь із вищезгаданих обставин (наявність свідоцтва про шлюб, нерухомого майна тощо), необхідно додати до позову докази, що підтверджують їх (документи, довідки, витяги з реєстру нерухомого майна, свідоцтво про реєстрацію автомобіля тощо) .).) .).</p>
                    </div>
                </div>
                <div className='w-full md:w-4/5 lg:w-2/5 text-gray-800 border border-t-0 border-white whitespace-nowrap overflow-hidden'>
                    <input 
                        type="checkbox" 
                        className="mr-2" 
                    />
                    <label className='text-s'>Согласие на обработку персональных данных</label>
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