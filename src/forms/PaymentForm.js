import IdCheckIcon from "@component/assets/icons/idCheckIcon";
import LiqPayIcon from "@component/assets/icons/liqPayIcon";
import McAfeeIcon from "@component/assets/icons/mcAfeeIcon";
import NortonSecuredIcon from "@component/assets/icons/nortonSecuredIcon";
import VisaIcon from "@component/assets/icons/visaIcon";
import crypto from 'crypto';

const liqPayPublicKey = process.env.NEXT_PUBLIC_LIQPAY_PUBLIC_KEY;
const liqPayPrivateKey = process.env.NEXT_PUBLIC_LIQPAY_PRIVATE_KEY;

const generateLiqPayData = (params) => {
    if (!liqPayPublicKey || !liqPayPrivateKey) {
        alert("Помилка: Не знайдено LiqPay ключі. Перевірте .env файл.");
        return {};
    }

    const data = Buffer.from(JSON.stringify(params)).toString('base64');
    const signature = crypto
        .createHash('sha1')
        .update(liqPayPrivateKey + data + liqPayPrivateKey)
        .digest('base64');
    return { data, signature };
};

const payment = () => {
    const params = {
        action: "pay",
        amount: 1999,
        currency: "UAH",
        description: "Оплата за юридические услуги",
        order_id: `order_${Date.now()}`,
        version: 3,
        sandbox: 1,
        public_key: liqPayPublicKey
    };

    const { data, signature } = generateLiqPayData(params);

    if (!data || !signature) return;

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://www.liqpay.ua/api/3/checkout';
    form.innerHTML = `
        <input type="hidden" name="data" value="${data}" />
        <input type="hidden" name="signature" value="${signature}" />
    `;
    document.body.appendChild(form);
    form.submit();
};

const PaymentForm = ({ progressIndex, handleSetIndex }) => {
    return (
        <div className='flex flex-col gap-16'>
            <div className='flex flex-col items-center gap-6 mt-8'>
                <div className='w-full md:w-4/5 lg:w-2/5 text-gray-700'>
                    <h1 className='text-center text-3xl font-medium'>Ваша позовна заява готова!</h1>
                    <p className='text-center mt-6'>Щоб отримати доступ до документу, оплатіть зазначену суму.</p>
                    <div className='mt-6 flex flex-col gap-5'>
                        <div className='flex flex-row justify-between'>
                            <label>Позов на розлучення</label>
                            <h2><b>199 ₴</b></h2>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <label>Супровід справи адвокатом</label>
                            <h2><b>1000 ₴</b></h2>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <h1 className='text-xl'><b>До сплати</b></h1>
                            <h1 className='text-xl'><b>1999 ₴</b></h1>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-4/5 lg:w-2/5 border-2 border-mainBlue p-3 rounded-xl'>
                    <p className='text-gray-800'>Детали условий...</p>
                </div>
                <div className='w-full md:w-4/5 lg:w-2/5'>
                    <input type="checkbox" className="mr-2" />
                    <label>Согласие на обработку персональных данных</label>
                </div>
                <button 
                    className='w-full md:w-4/5 lg:w-2/5 py-2 rounded-xl bg-mainBlue text-white'
                    onClick={payment}
                >
                    Оплатити
                </button>
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
