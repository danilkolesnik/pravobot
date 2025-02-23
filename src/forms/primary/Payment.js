'use client';
import { useState, useEffect } from "react";
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

const payment = (price) => {
    const params = {
        action: "pay",
        amount: price,
        currency: "UAH",
        description: "Оплата за юридические услуги",
        order_id: `order_${Date.now()}`,
        version: 3,
        sandbox: 1,
        public_key: liqPayPublicKey,
        result_url: `${window.location.origin}/preview`,
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

const PaymentForm = ({ documentData, progressIndex, handleSetIndex }) => {

    const [terms] = useState(() => {
        const pageData = JSON.parse(localStorage.getItem('page_data')) || [];
        return pageData.find(page => page.URL === 'terms');
    });
    const [isChecked, setIsChecked] = useState(false);
    const [totalPrice, setTotalPrice] = useState(Number(documentData.ScenarioPrice) || 0);
    const [selectedServices, setSelectedServices] = useState([]);

    const handleServiceChange = (service, isChecked) => {
        const servicePrice = Number(service.ServicePrice);

        setTotalPrice((prevTotal) =>
            isChecked ? prevTotal + servicePrice : prevTotal - servicePrice
        );

        setSelectedServices((prevSelected) =>
            isChecked
                ? [...prevSelected, service]
                : prevSelected.filter((s) => s.id !== service.id)
        );
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.get('status') === 'success') {
            handleSetIndex(progressIndex + 1);
        }
    }, [progressIndex, handleSetIndex]);
    
    return (
        <div className='flex flex-col gap-16'>
            <div className='flex flex-col items-center gap-6 mt-5'>
                <div className='w-full md:w-4/5 lg:w-2/5 text-gray-700'>
                    <h1 className='text-left text-3xl font-medium'>Ваша позовна заява готова!</h1>
                    <p className='text-left mt-4'>Щоб отримати доступ до документу та інструкцій щодо подальших дій, оплатіть зазначену суму послуги.</p>
                    <div className='mt-6 flex flex-col gap-2 bg-white rounded-2xl p-6'>
                        <div className='flex flex-row justify-between mb-2'>
                            <h1 className='text-xl'><b>До сплати</b></h1>
                            <h1 className='text-xl'><b>{totalPrice}.00 грн</b></h1>
                        </div>
                        {documentData && (
                            <>
                                <div className='flex flex-row justify-between'>
                                    <label>{documentData.ScenarioTitle}</label>
                                    <h2><b>{documentData.ScenarioPrice}.00 грн</b></h2>
                                </div>
                                <div>
                                    {selectedServices.length > 0 && (
                                        selectedServices.map((service) => (
                                            <div key={service.id} className="flex flex-row justify-between">
                                                <label>{service.ServiceName}</label>
                                                <h2><b>{service.ServicePrice} грн</b></h2>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </>
                        )}
                        {documentData &&
                            documentData.servicesSlider?.map((service) => (
                                <div key={service.id} className='flex flex-row justify-between bg-blue-100 border border-mainBlue p-4 rounded-2xl'>
                                    <div className='flex flex-row gap-2'>
                                        <input
                                            type='checkbox'
                                            id={`service-${service.id}`}
                                            onChange={(e) =>
                                                handleServiceChange(service, e.target.checked)
                                            }
                                        />
                                        <div className='flex flex-col ml-2'>
                                            <label htmlFor={`service-${service.id}`}>{service.ServiceName}</label>
                                            <h2><b>{service.ServicePrice}.00 грн</b></h2>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div className='w-full md:w-4/5 lg:w-2/5'>
                    <h1 className='text-xl text-left text-gray-800 mb-2'><b>Умови обробки персональної інформації*</b></h1>
                    <div id='payment_window' className='w-full border-2 border-mainBlue h-60 p-3 overflow-y-scroll rounded-xl'>
                        <p className='text-gray-800'>
                            {terms && terms.PageContent}
                        </p>
                    </div>
                </div>
                <div className='w-full md:w-4/5 lg:w-2/5 text-gray-800'>
                    <input 
                        type="checkbox" 
                        className="mr-2"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                    />
                    <label>Я погоджуюсь на обробку персональних даних</label>
                </div>
                <button
                    className={`w-full md:w-4/5 lg:w-2/5 py-3 rounded-3xl text-white ${
                        isChecked ? 'bg-mainBlue' : 'bg-mainBlue opacity-20 cursor-default'
                    }`}
                    onClick={() => isChecked && payment(totalPrice)}
                    disabled={!isChecked}
                >
                    Оплатити
                </button>
            </div>
        </div>
    );
};

export default PaymentForm;
