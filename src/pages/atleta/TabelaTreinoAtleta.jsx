import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { AiOutlineClose } from "react-icons/ai";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import 'react-toastify/dist/ReactToastify.css';
import { api } from "../../services/api";
import { ToastContainer } from "react-toastify";

export const TabelaTreinoAtleta = () => {

  const [tabelaTreino, setTabelaTreino] = useState({})
  const [handleSelectedExercicio, setHandleSelectedExercicio] = useState(null);

  const openModalExercicio = (exercicio) => {
    setHandleSelectedExercicio(exercicio);
  };

  const closeModalExercicio = () => {
    setHandleSelectedExercicio(null);
  };

  const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const exerciciosPorDia = tabelaTreino.exercicios ? diasDaSemana.map(dia => ({
    dia,
    exercicios: tabelaTreino.exercicios.filter(exercicio => exercicio.diaSemana.toLowerCase() === dia.toLowerCase()),
  })) : [];

  useEffect(() => {
    api.get(`/atleta/tabelaTreino`)
    .then((resp) => setTabelaTreino(resp.data))
    .catch((err) => console.log(err));
  }, [])
  return (
    <>
      <ToastContainer position='top-center'/>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="text-center my-4">
            <span className="text-2xl text-custom-purple font-bold">{dayjs(tabelaTreino.semanaInicio).format('DD/MM/YYYY')} | {dayjs(tabelaTreino.semanaFimTabela).format('DD/MM/YYYY')}</span>
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
                {exerciciosPorDia[0] && exerciciosPorDia[0].exercicios.map((_, i) => (
                  <tr key={i}>
                    {exerciciosPorDia.map((dia) => (
                      <td key={dia.dia} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dia.exercicios[i] && (
                          <button onClick={() => openModalExercicio(dia.exercicios[i])}  className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
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
          </div>
        </div>
      </div>
      {handleSelectedExercicio && (
        <Modal
          isOpen={true}
          onRequestClose={closeModalExercicio}
          contentLabel="Detalhes do Exercício"
          className="p-4 bg-white rounded shadow-xl relative w-[540px]"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <button className="absolute top-2 right-2 text-red-500 hover:text-red-700" onClick={closeModalExercicio}>
            <AiOutlineClose size={20} />
          </button>
          <h2 className="text-2xl text-custom-purple text-center mb-4">{handleSelectedExercicio.nomeExercicio}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-black">Músculo Trabalhado:</div>
              <div className="text-gray-500">{handleSelectedExercicio.musculoTrabalhado}</div>
              <div className="text-black">Séries:</div>
              <div className="text-gray-500">{handleSelectedExercicio.series}</div>
              <div className="text-black">Repetições:</div>
              <div className="text-gray-500">{handleSelectedExercicio.repeticao}</div>
              <div className="text-black">Kg:</div>
              <div className="text-gray-500">{handleSelectedExercicio.kg}</div>
              <div className="text-black">Descanso:</div>
              <div className="text-gray-500">{handleSelectedExercicio.descanso} {handleSelectedExercicio.unidadeDescanso}</div>
              <div className="text-black">Observações:</div>
              <div className="text-gray-500">{handleSelectedExercicio.observacoes ? handleSelectedExercicio.observacoes: "Sem observações"}</div>
            </div>
        </Modal>
      )}
    </>
  )
}