import React from "react";

class PaymentButton extends React.Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src =
      "https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/khalti-checkout.iffe.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      this.initializeKhaltiCheckout();
    };
  }

  initializeKhaltiCheckout = () => {
    const config = {
      // replace the publicKey with yours
      publicKey: "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
      productIdentity: "1234567890",
      productName: "Dragon",
      productUrl: "http://gameofthrones.wikia.com/wiki/Dragons",
      paymentPreference: [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT",
      ],
      eventHandler: {
        onSuccess: (payload) => {
          // hit merchant api for initiating verfication
          console.log(payload);
        },
        onError: (error) => {
          console.log(error);
        },
        onClose: () => {
          console.log("widget is closing");
        },
      },
    };

    this.checkout = new window.KhaltiCheckout(config);
  };

  handlePaymentClick = () => {
    // minimum transaction amount must be 10, i.e 1000 in paisa.
    this.checkout.show({ amount: 1500 });
  };

  render() {
    return (
      <button
        id="payment-button"
        onClick={this.handlePaymentClick}
        type="submit"
      >
        Book with Khalti
      </button>
    );
  }
}

export default PaymentButton;
