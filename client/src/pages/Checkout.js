import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddressChecker from "../components/checkoutmanager/AddressChecker";
import CheckoutSummary from "../components/checkoutmanager/CheckoutSummary";
import { useUserContext } from "../context & data/UserContext";

const Checkout = () => {
  const { state } = useUserContext();
  const [data, setData] = useState({});
  const [step, setStep] = useState("addressChecker");
  const navigate = useNavigate();

  useEffect(() => {
    if (state.cart.data.length <= 0) {
      navigate(-1);
    }
  }, [navigate, state.cart.data]);

  const putAddress = (data) => {
    setData((prev) => ({ ...prev, address: data }));
  };

  const nextStep = () => {
    setStep((prev) => (prev === "summary" ? "final" : "summary"));
  };

  const prevStep = () => {
    setStep((prev) => (prev === "summary" ? "addressChecker" : "summary"));
  };

  return (
    <div className="section checkout">
      <div className="container">
        <h2 className="heading">Cart</h2>
        {step === "addressChecker" && (
          <AddressChecker
            addresses={state.userData.address}
            setData={putAddress}
            current={data.address?._id}
          />
        )}
        {step === "summary" && <CheckoutSummary cart={state.cart.data} />}
        {step === "final" && (
          <h2 className="heading">Payment Integration Comin Soon...😎</h2>
        )}
        <div className="navigateButtonsCheckout">
          <button
            className="btn btn--pri"
            disabled={step === "addressChecker"}
            onClick={prevStep}
          >
            Back
          </button>
          <button
            className="btn btn--pri"
            disabled={step === "final"}
            onClick={nextStep}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
