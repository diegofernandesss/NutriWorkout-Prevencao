import { useState } from "react";
import Cards from 'react-credit-cards';
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import 'react-credit-cards/es/styles-compiled.css';
import { api } from "../../services/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from "react-router-dom";

const CARD_ELEMENT_OPTIONS = {
  hidePostalCode: true,
}

export const CreditCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const notifyError = (error) => toast.error(error.response.data.descricao);
  const notifySuccess = () => toast.success("Cartão cadastrado");
  
  const navigate = useNavigate()
  const location = useLocation()

  const { idPlano } = location.state

  const [cardInfo, setCardInfo] = useState({
    cardHolder: '',
    cardNumber: '',
    cardMonth: '',
    cardYear: '',
    cardCVV: '',
  });

  const handleInputChange = (event) => {
    setCardInfo({
      ...cardInfo,
      [event.target.name]: event.target.value,
    });
  };

  const submitCardCredit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const {error, token} = await stripe.createToken(cardElement, {name: cardInfo.cardHolder});
      
    await api.post(`cartaoCredito`, {token: token.id})
    .then((resp) => navigate(`/assinatura`, {state: {idCartao: resp.data.id, idPlano }}))
    .catch((error) => console.log(error))
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
    <div className="w-96 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Informações do Cartão de Crédito</h2>
      <Cards
        cvc={cardInfo.cardCVV}
        expiry={cardInfo.cardMonth + cardInfo.cardYear}
        name={cardInfo.cardHolder}
        number={cardInfo.cardNumber}
      />
      <input
        type="text"
        name="cardHolder"
        placeholder="Nome do titular"
        className="w-full p-2 mb-3 mt-3 border rounded"
        onChange={handleInputChange}
        required
      />
      <CardElement 
        className="w-full p-2 mb-3 border rounded"
        options={CARD_ELEMENT_OPTIONS}
      />
      <div className="flex justify-between">
      </div>
      <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={submitCardCredit}>Cadastrar</button>
    </div>
  </div>
  );
};
