import { ModalRefeicao } from "./ModalRefeicao"
import { useEffect, useState } from 'react';
import { api } from "../../../services/api";
import { ListagemIngredientes } from "./ListagemIngredientes";

export const Refeicao = ({ cardapio, setCardapio }) => {
    const TABLE_HEAD_REFEICAO = ["", "Dia da Semana", "Tipo de Refeição" , "Nome da Refeição" , "Ações"];

    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [showAddModalIngredientes, setShowAddModalIngredientes] = useState(false);
    const [ingredientes, setIngredientes] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totIngredienteNutri, setTotIngredienteNutri] = useState(0)
    const [currentId, setCurrentId] = useState(null);
    const max_items = 2;

    const handleAddModal = async () => {
      setShowAddModal(!showAddModal);
    };

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

    const deleteCardapioAtleta = async (id) => {
      try {
        await api.delete(`/nutricionista/atleta/refeicao/${cardapio[0].id}/${id}`);
        setCardapio((prevCardapio) => {
          const updatedCardapio = prevCardapio.map((item) => {
            if (item.id === cardapio[0].id) {
              return {
                ...item,
                refeicoes: item.refeicoes.filter((refeicao) => refeicao.id !== id)
              };
            } else {
              return item;
            }
          });
          return updatedCardapio;
        });
      } catch (error) {
        console.error("Error ao Deletar Cardápio", error);
      }
    };

    const handlePageChange = (pageNumber) => {
      getIngredientesNutri(currentId, pageNumber);
      window.scrollTo(0, 0);
    }
    
    const showModal = (id) => {
      setShowAddModalIngredientes(!showAddModalIngredientes);
      getIngredientesNutri(id, 1);
    }
    
    const getIngredientesNutri = async (id, pageNumber) => {
      try {
        const response = await api.get(`/nutricionista/atleta/ingrediente/${cardapio[0].id}/${id}/${pageNumber}/${max_items}`);
        setTotIngredienteNutri(response.data.total)
        setIngredientes(response.data.ingredientes);
        setActivePage(pageNumber);
        setCurrentId(id);
      } catch (error) {
        console.error(error);
      } 
    };

      const formatTipoRefeicao = (tipoRefeicao) => {
        switch (tipoRefeicao) {
          case 'cafeManha':
            return 'Café da Manhã';
          case 'lancheManha':
            return 'Lanche da Manhã';
          case 'almoco':
            return 'Almoço';
          case 'lancheTarde':
            return 'Lanche da Tarde';
          case 'janta':
            return 'Janta';
          case 'lancheNoite':
            return 'Lanche da Noite';
          default:
            return tipoRefeicao;
        }
      };

      const formatDiaSemana = (diaSemana) => {
        switch (diaSemana) {
          case 'segunda':
            return 'Segunda-Feira';
          case 'terça':
            return 'Terça-Feira';
          case 'quarta':
            return 'Quarta-Feira';
          case 'quinta':
            return 'Quinta-Feira';
          case 'sexta':
            return 'Sexta-Feira';
          case 'sabado':
            return 'Sábado';
          case 'domingo':
            return 'Domingo';
          default:
            return diaSemana;
        }
      };

    return(
        <>
             <div className="flex justify-between items-start mb-4 mt-4">
                      <div className="font-medium text-xl">Refeição</div>
                  </div>

                  <table className="mt-4 w-full text-sm text-left rtl:text-right text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                          {TABLE_HEAD_REFEICAO.map((head) => (
                            <th key={head} scope="col" className="px-2 py-3">
                              {head}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                      {cardapio.map((refeicao) => (
                            refeicao.refeicoes.length > 0 ? (
                              refeicao.refeicoes.map((ref) => (
                                <tr key={ref.id} className="bg-white border-b hover:bg-gray-100">
                                  <td className="w-4 p-4"></td>
                                  <td className="px-2 py-4">
                                    {formatDiaSemana(ref.diaSemana)}
                                  </td>
                                  <td className="px-2 py-4">
                                    {formatTipoRefeicao(ref.tipoRefeicao)}
                                  </td>
                                  <td className="px-2 py-4">
                                    {ref.nome}
                                  </td>
                                  <td className="px-2 py-4 flex flex-row gap-4">
                                    <button onClick={() => showModal(ref.id)} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition duration-150 ease-in-out hover:bg-green-600 bg-green-700 rounded text-white px-8 py-2 text-sm  focus:border-green-700" >Detalhes Ingredientes</button>
                                    <button onClick={() => handleDeleteClick(ref.id)}  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 transition duration-150 ease-in-out hover:bg-red-600 bg-red-700 rounded text-white px-8 py-2 text-sm  focus:border-red-700" >Deletar Refeição</button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr key={refeicao.id} className="bg-white border-b hover:bg-gray-100">
                                <td className="w-4 p-4"></td>
                                <td className="px-2 py-4" colSpan={TABLE_HEAD_REFEICAO.length}>
                                  <div className='flex justify-center items-center'>
                                    <div className='text-gray-400 font-bold text-xl'>Refeição não cadastrada</div>
                                  </div>
                                </td>
                              </tr>
                            )
                          ))}
                      </tbody> 
                    </table>
                    <button className="mt-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-700 transition duration-150 ease-in-out hover:bg-violet-600 bg-violet-700 rounded text-white px-8 py-2 text-sm focus:border-violet-700" onClick={() => handleAddModal()}> Cadastrar </button>

                    {showAddModal && (
                      <ModalRefeicao 
                        cardapio={cardapio}
                        setShowAddModal={setShowAddModal}
                        setCardapio={setCardapio}
                      />
                    )}

                    {showAddModalIngredientes && (
                      <ListagemIngredientes 
                        cardapio={cardapio}
                        setIngredientes={setIngredientes}
                        currentId={currentId}
                        setShowAddModalIngredientes={setShowAddModalIngredientes}
                        ingredientes={ingredientes}
                        activePage={activePage}
                        max_items={max_items}
                        totIngredienteNutri={totIngredienteNutri}
                        handlePageChange={handlePageChange}
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
        </>
    )
}