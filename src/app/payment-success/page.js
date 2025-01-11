'use client';
import Header from "@component/components/Header";
import Footer from "@component/components/Footer";
import { useRouter } from "next/navigation";

export default function PaymentSuccess() {

    const router = useRouter();

    const handleNavigate = () => {
        const queryString = window.location.search;
        const status = queryString.split('=')[1];
        if (status === 'success') {
            router.push('/preview')
        }
    };

    return (
        <div className="h-screen flex flex-col justify-between bg-white">
            <Header title={'ПОЗОВ НА РОЗЛУЧЕННЯ'} />
            <div className="flex flex-col bg-white w-4/5 mt-8 mx-auto">
                <div className="flex flex-col items-center justify-center text-gray-800">
                    <h1 className="text-3xl font-bold">Оплата успiшна!</h1>
                    <p className="text-lg mt-4">Дякуємо за оплату. Ви можете перейти до перегляду готового документу.</p>
                    <button
                        type="button"
                        className="w-1/5 mt-6 bg-mainBlue text-white px-4 py-2 rounded-2xl"
                        onClick={handleNavigate}
                    >
                        Далі
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
