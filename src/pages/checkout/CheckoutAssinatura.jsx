import { useEffect } from "react";
import { api } from "../../services/api";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const notifySuccess = () => toast.success("Assinatura confirmada!");
const notifyError = (msg) => toast.error(msg);

export const CheckoutAssinatura = () => {
  
  const location = useLocation()
  const navigate = useNavigate()

  const { idCartao, idPlano } = location.state
  
  const [atleta, setAtleta] = useState({})
  const [cartao, setCartao] = useState({})
  const [plano, setPlano] = useState({})

  const storageUserId = localStorage.getItem("@Auth:user_id");

  useEffect(() => {
    api.get(`atleta/${storageUserId}`)
    .then((resp) => {
      setAtleta(resp.data.atleta)
      
    })

    api.get(`cartaoCredito/${idCartao}`)
    .then((resp) => {
      setCartao(resp.data)
    })

    api.get(`planos/${idPlano}`)
    .then((resp) => {
      setPlano(resp.data)
    })
  }, [])

  

  const handleConfirm = () => {
    api.post(`assinaturas`, { idPlano })
    .then(() => navigate(`/atleta/${storageUserId}`))
    .catch((err) => notifyError(err.response.data.descricao))


  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
       <ToastContainer position="top-center" />
      <div className="w-full md:w-1/2 p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Detalhes do Plano</h2>
        <p><strong>Plano:</strong> {plano.nome}</p>
        <p><strong>Valor:</strong> R$ {plano.valor},00</p>
        <img src="https://via.placeholder.com/150" alt="Imagem do Plano" className="mt-8"/>
      </div>

      <div className="w-full md:w-1/2 p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Dados do Atleta</h2>
        <p><strong>Nome:</strong> {atleta.nome} {atleta.sobrenome}</p>
        <p><strong>Email:</strong> {atleta.email}</p>
        <p><strong>CPF:</strong> {atleta.cpf}</p>

        <h2 className="text-2xl font-bold mb-4 text-center mt-8">Detalhes do Cartão</h2>
        <p><strong>Nome do Titular:</strong> {cartao.nomeTitular}</p>
        <p><strong>Bandeira:</strong> {cartao.bandeira}</p>
        <p><strong>Final do Cartão:</strong> {cartao.finalCartao}</p>

        <button onClick={handleConfirm} className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500 mt-8">Confirmar Assinatura</button>
      </div>
    </div>
  )
}