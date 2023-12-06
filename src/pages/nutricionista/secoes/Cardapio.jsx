import { useParams } from "react-router-dom";
import { api } from '../../../services/api';
import { useState, useEffect } from 'react';
import { ModalCardapio } from "./ModalCardapio";
import { Refeicao } from "./Refeicao";

export const Cardapio = () => {
  const { id2, nome } = useParams();

  const TABLE_HEAD = ["", "Nome do Cardápio", "Ações"];

  const [cardapio, setCardapio] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteClick = (id) => {
    setShowDeleteModal(true);
    setDeletingId(id);
  };

  const handleCancelDelete = () => setShowDeleteModal(false);
  
    const handleConfirmDelete = () => {
      if (deletingId) {
        deleteCardapioAtleta(deletingId);
        setShowDeleteModal(false);
      }
    };

  const getCardapioAtleta = async () => {
    try {
      const response = await api.get(`/nutricionista/atleta/cardapio/${id2}`);
      setCardapio(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    getCardapioAtleta();
  }, []);

  const deleteCardapioAtleta = async (id) => {
    try {
      await api.delete(`/nutricionista/atleta/cardapio/${id2}`);
      setCardapio((prevData) => prevData.filter((cardapio) => cardapio.id !== id));
    } catch (error) {
      console.error("Error ao Deletar Cardápio", error);
    }
  };

  const handleAddModal = async () => {
    setShowAddModal(!showAddModal);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className="bg-white border border-gray-100 shadow-md shadow-black/10 p-6 rounded-md">
          <div className="flex justify-between items-start mb-4">
            <div className="font-medium text-xl">Cardápio {nome}</div>
          </div>

          <table className="mt-4 w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} scope="col" className="px-2 py-3">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cardapio.map((cardapio) => (
                <tr key={cardapio.id} className="bg-white border-b hover:bg-gray-100">
                  <td className="w-4 p-4"></td>
                  <td className="px-2 py-4">
                    {cardapio.nome}
                  </td>
                  <td className="px-2 py-4 flex flex-row gap-4">
                    <button onClick={() => handleDeleteClick(cardapio.id)} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 transition duration-150 ease-in-out hover:bg-red-600 bg-red-700 rounded text-white px-8 py-2 text-sm focus:border-red-700" >Excluir Cardápio</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {cardapio.length === 0 && (
            <div className='flex justify-center items-center mt-5'>
              <div className='text-gray-400 font-bold text-xl'>Cardápio não cadastrado</div>
            </div>
          )}
          <button className="mt-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-700 transition duration-150 ease-in-out hover:bg-violet-600 bg-violet-700 rounded text-white px-8 py-2 text-sm focus:border-violet-700" onClick={() => handleAddModal()}> Cadastrar</button>

          <div>
            <Refeicao
              cardapio={cardapio}
            />
          </div>
        </div>

        {showAddModal && (
          <ModalCardapio
            id2={id2}
            cardapio={cardapio}
            setShowAddModal={setShowAddModal}
            setCardapio={setCardapio}
          />
        )}

        {showDeleteModal && (
          <>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="modal-overlay fixed inset-0 bg-gray-900 transition-opacity bg-opacity-50"></div>
              <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50">
                <div className="modal-content py-4 px-6">
                  <h3 className="text-xl font-sembold mb-2">Confirmar exclusão</h3>
                  <p className="text-gray-700 mb-4">
                    Você deseja realmente <span className="font-bold">EXCLUIR?</span>
                  </p>
                  <div className="modal-buttons flex justify-end">
                    <button
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm mr-2" type="button"
                    onClick={handleCancelDelete}
                    >
                      Cancelar
                    </button>
                    <button
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-150 ease-in-out hover:bg-red-500 bg-red-600 rounded text-white px-8 py-2 text-sm" type="button"
                    onClick={handleConfirmDelete}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
