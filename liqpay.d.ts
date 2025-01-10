declare module 'liqpay' {
    class LiqPay {
      constructor(publicKey: string, privateKey: string);
      api: (path: string, params: any, callback: (data: any) => void) => void;
    }
    export default LiqPay;
  }