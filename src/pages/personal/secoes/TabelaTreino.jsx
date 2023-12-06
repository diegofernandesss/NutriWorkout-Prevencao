import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { AiOutlineClose } from "react-icons/ai";
import { api } from "../../../services/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";

Modal.setAppElement('#root');

export const TabelaTreino = () => {

  const [modalExercicio, setModalExercicio] = useState(null);
  const [modalTabelaTreino, setModalTabelaTreino] = useState(false);
  const [semanaInicioTabela, setSemanaInicioTabela] = useState("")
  const [semanaFimTabela, setSemanaFimTabela] = useState("")
  const [exercicios, setExercicios] = useState([]);
  const [semanaInicio, setSemanaInicio] = useState('');
  const [semanaFim, setSemanaFim] = useState('');
  const [atleta, setAtleta] = useState('');
  
  const { id } = useParams();

  const notifySuccess = () => toast.success("Tabela de treino criada com Sucesso");
  const notifyError = (error) => toast.error(error.response.data.descricao);
  

  const openModalExercicio = (exercicio) => {
    setModalExercicio(exercicio);
  };

  const closeModalExercicio = () => {
    setModalExercicio(null);
  };

  const openModalTabelaTreino = () => {
    setModalTabelaTreino(true);
  };

  const closeModalTabelaTreino = () => {
    setModalTabelaTreino(false);
  };
  const resetCamposTabelaTreino = () => {
    setSemanaInicio('');
    setSemanaFim('');
    setAtleta('');
  }

  const fetchTabelaTreino = () => {
    api.get(`/personal/atleta/tabelaTreino/${id}`)
      .then((resp) => {
        setExercicios(resp.data.exercicios)
        setSemanaInicioTabela(resp.data.semanaInicio)
        setSemanaFimTabela(resp.data.semanaFim)
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setExercicios(null);
        } else {
          console.log(err);
        }
      });
  };
  
  const handleDeleteTabelaTreino = () => {
    api.delete(`personal/atleta/tabelaTreino/${id}`)
    .then(() => {
      fetchTabelaTreino();
      toast.success("Tabela de treino deletada com sucesso")
    })
    .catch(err => toast.error(err))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    api.post('personal/atleta/tabelaTreino', {
        semanaInicio,
        semanaFim,
        atleta: id
    })
    .then((data) => {
      // setTabelaTreinoUpdated(!tabelaTreinoUpdated)
      fetchTabelaTreino();
      resetCamposTabelaTreino()
      closeModalTabelaTreino()
      notifySuccess()
    })
    .catch(error => {
      console.log(error);
      notifyError(error)
    });
}

  useEffect(() => {
    fetchTabelaTreino();
  }, []);
  
  const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const exerciciosPorDia = exercicios && diasDaSemana.map(dia => ({
    dia,
    exercicios: exercicios.filter(exercicio => exercicio.diaSemana.toLowerCase() === dia.toLowerCase()),
  }));
  
  return (
    <div className="flex flex-col">
      <ToastContainer position='top-center'/>
      {exercicios === null ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl mb-4">O atleta não tem uma tabela de treino.</h2>
          <button onClick={openModalTabelaTreino} className="px-4 py-2 bg-green-600 text-white rounded">Criar Tabela de Treino</button>

          <Modal
            isOpen={modalTabelaTreino}
            onRequestClose={closeModalTabelaTreino}
            contentLabel="Modal para criar tabela de treino"
            style={{
              content: {
                position: 'relative',
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#F3F4F6',
                borderRadius: '0.375rem',
                padding: '2rem',
                width: '80%',
                maxWidth: '500px'
              }
            }}
          >
            <button onClick={closeModalTabelaTreino} className="absolute right-3 top-3 hover:bg-custom-purple rounded">
              <AiOutlineClose size={20} />
            </button>
            <h2 className="text-2xl mb-4 text-center text-custom-purple">Criar Tabela de Treino</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-4">
                  <span className="text-custom-purple">Semana de Início:</span>
                  <input type="date" name="semanaInicio" onChange={e => setSemanaInicio(e.target.value)} className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-custom-purple focus:ring focus:ring-custom-purple focus:ring-opacity-50" />
              </label>
              <label className="block mb-4">
                  <span className="text-custom-purple">Semana Fim:</span>
                  <input type="date" name="semanaFim" onChange={e => setSemanaFim(e.target.value)} className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-custom-purple focus:ring focus:ring-custom-purple focus:ring-opacity-50" />
              </label>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Salvar</button>
            </form>
          </Modal>
        </div>
      ) : (
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="text-center my-4">
            <span className="text-xl">{semanaInicioTabela} / {semanaFimTabela}</span>
          </div>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {exerciciosPorDia.map((dia) => (
                    <th key={dia.dia} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {dia.dia}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {exerciciosPorDia[0].exercicios.map((_, i) => (
                  <tr key={i}>
                    {exerciciosPorDia.map((dia) => (
                      <td key={dia.dia} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dia.exercicios[i] && (
                          <button onClick={() => openModalExercicio(dia.exercicios[i])}>
                            {dia.exercicios[i].nomeExercicio}
                          </button>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="px-4 py-2 mt-3 bg-red-600 text-white rounded float-right hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={handleDeleteTabelaTreino}>
            Deletar Tabela de Treino
          </button>
        </div>
      </div>
    )}

    {modalExercicio && (
      <Modal
        isOpen={true}
        onRequestClose={closeModalExercicio}
        contentLabel="Detalhes do Exercício"
        className="p-4 bg-white rounded shadow-xl relative"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <button className="absolute top-2 right-2 text-red-500 hover:text-red-700" onClick={closeModalExercicio}>
          <AiOutlineClose size={20} />
        </button>
        <h2 className="text-2xl text-blue-500 text-center mb-4">{modalExercicio.nomeExercicio}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-black">Músculo Trabalhado:</div>
          <div className="text-gray-500">{modalExercicio.musculoTrabalhado}</div>
          <div className="text-black">Séries:</div>
          <div className="text-gray-500">{modalExercicio.series}</div>
          <div className="text-black">Repetições:</div>
          <div className="text-gray-500">{modalExercicio.repeticao}</div>
          <div className="text-black">Kg:</div>
          <div className="text-gray-500">{modalExercicio.kg}</div>
          <div className="text-black">Descanso:</div>
          <div className="text-gray-500">{modalExercicio.descanso} {modalExercicio.unidadeDescanso}</div>
          <div className="text-black">Observações:</div>
          <div className="text-gray-500">{modalExercicio.observacoes} {modalExercicio.unidadeDescanso}</div>
        </div>
      </Modal>
    )}
  </div>
  );
}