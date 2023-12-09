  import { useEffect, useState } from "react";
  import Modal from 'react-modal';
  import { AiOutlineClose } from "react-icons/ai";
  import { api } from "../../../services/api";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useParams } from "react-router-dom";
  import dayjs from "dayjs";

  Modal.setAppElement('#root');

  export const TabelaTreino = () => {

    const [handleSelectedExercicio, setHandleSelectedExercicio] = useState(null);
    const [modalAdicionarExercicio, setModalAdicionarExercicio] = useState(false);
    const [modalTabelaTreino, setModalTabelaTreino] = useState(false);
    const [modalTabelaTreinoUpdate, setModalTabelaTreinoUpdate] = useState(false);
    const [semanaInicioTabela, setSemanaInicioTabela] = useState("")
    const [semanaFimTabela, setSemanaFimTabela] = useState("")
    const [idTabelaTreino, setIdTabelaTreino] = useState(0)
    const [exercicios, setExercicios] = useState([]);
    const [semanaInicio, setSemanaInicio] = useState('');
    const [semanaFim, setSemanaFim] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const [diaSemana, setDiaSemana] = useState('segunda');
    const [musculoTrabalhado, setMusculoTrabalhado] = useState('');
    const [nomeExercicio, setNomeExercicio] = useState('');
    const [series, setSeries] = useState(0);
    const [kg, setKg] = useState(0);
    const [repeticao, setRepeticao] = useState(0);
    const [descanso, setDescanso] = useState(0);
    const [unidadeDescanso, setUnidadeDescanso] = useState("segundos");
    const [observacoes, setObservacoes] = useState("");

    
    const { id } = useParams();

    const notifySuccess = () => toast.success("Tabela de treino criada com Sucesso");
    const notifyError = (error) => toast.error(error.response.data);
    

    const openModalExercicio = (exercicio) => {
      setHandleSelectedExercicio(exercicio);
    };

    const closeModalExercicio = () => {
      setHandleSelectedExercicio(null);
      setIsUpdating(false);
    };

    const openModalTabelaTreino = () => {
      setModalTabelaTreino(true);
    };

    const closeModalTabelaTreino = () => {
      setModalTabelaTreino(false);
    };
    const openModalTabelaTreinoUpdate = () => {
      setSemanaInicio(semanaInicioTabela);
      setSemanaFim(semanaFimTabela);
      setModalTabelaTreinoUpdate(true);
    };

    const closeModalTabelaTreinoUpdate = () => {
      setModalTabelaTreinoUpdate(false);
    };
    const resetCamposTabelaTreino = () => {
      setSemanaInicio('');
      setSemanaFim('');
    }
    const resetCamposExercicio = () => {
      setDiaSemana('segunda');
      setMusculoTrabalhado('');
      setNomeExercicio('')
      setSeries(0)
      setKg(0)
      setRepeticao(0)
      setDescanso(0)
      setUnidadeDescanso('segundos')
      setObservacoes('')
    }
    const openModalAdicionarExercicio = () => {
      setModalAdicionarExercicio(true);
    };
    
    const closeModalAdicionarExercicio = () => {
      setModalAdicionarExercicio(false);
    };

    const fetchTabelaTreino = () => {
      api.get(`/personal/atleta/tabelaTreino/${id}`)
        .then((resp) => {
          setIdTabelaTreino(resp.data.id)
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

    const handleDeleteExercicio = () => {
      api.delete(`/personal/atleta/tabelaTreino/exercicio/${handleSelectedExercicio.id}`)
      .then(() => {
        setExercicios(exercicios.filter(exercicio => exercicio.id !== handleSelectedExercicio.id))
        toast.success("Exercício deletado com sucesso")
        closeModalExercicio()
        
      })
      .catch((err) => console.log(err))
    }
  
  const handleDeleteTabelaTreino = () => {
    api.delete(`personal/atleta/tabelaTreino/${id}`)
    .then(() => {
      fetchTabelaTreino();
      toast.success("Tabela de treino deletada com sucesso")
    })
    .catch(err => toast.error(err))
  }
  const handleUpdateTabelaTreino = (event) => {
    event.preventDefault();

    api.put(`personal/atleta/tabelaTreino/${id}`, {
      semanaInicio,
      semanaFim,
    })
    .then(() => {
      fetchTabelaTreino();
      closeModalTabelaTreinoUpdate()
      toast.success("Tabela de treino atualizada com sucesso")
    })
    .catch((err) =>{
      console.log(err);
      notifyError(err)
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    api.post('personal/atleta/tabelaTreino', {
        semanaInicio,
        semanaFim,
        atleta: id
    })
    .then(() => {
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

  const handleSubmitExercicio = (event) => {
    event.preventDefault();

    api.post(`/personal/atleta/tabelaTreino/exercicio`, {
      idTabela: idTabelaTreino,
      diaSemana,
      musculoTrabalhado,
      nomeExercicio,
      series,
      kg,
      repeticao,
      descanso,
      unidadeDescanso,
      observacoes
    })
    .then((resp) => {
      setExercicios([...exercicios, resp.data])
      resetCamposExercicio()
      closeModalAdicionarExercicio()
      toast.success("Exercício criado com sucesso")
    })
  }

  useEffect(() => {
    fetchTabelaTreino();
  }, []);
  
  const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const exerciciosPorDia = exercicios && diasDaSemana.map(dia => ({
    dia,
    exercicios: exercicios.filter(exercicio => exercicio.diaSemana.toLowerCase() === dia.toLowerCase()),
  }));

  const handleUpdateClick = () => {
    setIsUpdating(true);
  }

  const handleSaveClick = () => {
    console.log(musculoTrabalhado);
    api.put(`/personal/atleta/tabelaTreino/exercicio/${handleSelectedExercicio.id}`, {
      musculoTrabalhado: handleSelectedExercicio.musculoTrabalhado,
      nomeExercicio: handleSelectedExercicio.nomeExercicio,
      series: handleSelectedExercicio.series,
      kg: handleSelectedExercicio.kg,
      repeticao: handleSelectedExercicio.repeticao,
      descanso: handleSelectedExercicio.descanso,
      unidadeDescanso: handleSelectedExercicio.unidadeDescanso,
      observacoes: handleSelectedExercicio.observacoes
    })
    .then((resp) => {
      setHandleSelectedExercicio(resp.data);
      setExercicios(exercicios.map(exercicio => exercicio.id === resp.data.id ? resp.data : exercicio));
    })
    .catch((err) => console.log(err))
    setIsUpdating(false);
  }
  // Função para lidar com o clique no botão "Cancelar"
  const handleCancelClick = () => {
    setIsUpdating(false);
  }
  return (
    <>
      <ToastContainer position='top-center'/>
      <div className="flex flex-col">
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
            <span className="text-2xl text-custom-purple font-bold">{dayjs(semanaInicioTabela).format('DD/MM/YYYY')} | {dayjs(semanaFimTabela).format('DD/MM/YYYY')}</span>
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
            <button className="px-4 py-2 mt-3 bg-green-600 text-white rounded float-left hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={openModalAdicionarExercicio}>
              Adicionar Exercício
            </button>
            <button className="px-4 py-2 mt-3 bg-red-600 text-white rounded float-right hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={handleDeleteTabelaTreino}>
              Deletar Tabela
            </button>
            <button className="px-4 py-2 mt-3 mx-2 bg-orange-600 text-white rounded float-right hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500" onClick={openModalTabelaTreinoUpdate}>
              Atualizar Tabela
            </button>
            <Modal
              isOpen={modalTabelaTreinoUpdate}
              onRequestClose={closeModalTabelaTreinoUpdate}
              contentLabel="Modal para atualizar tabela de treino"
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
              <button onClick={closeModalTabelaTreinoUpdate} className="absolute right-3 top-3 hover:bg-custom-purple rounded">
                <AiOutlineClose size={20} />
              </button>
              <h2 className="text-2xl mb-4 text-center">Atualizar Tabela de Treino</h2>
              <form onSubmit={handleUpdateTabelaTreino}>
                <label className="block mb-4">
                  <span className="text-custom-purple">Semana de Início:</span>
                  <input type="date" name="semanaInicio" value={semanaInicio} onChange={e => setSemanaInicio(e.target.value)} className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-custom-purple focus:ring focus:ring-custom-purple focus:ring-opacity-50" />
                </label>
                <label className="block mb-4">
                  <span className="text-custom-purple">Semana Fim:</span>
                  <input type="date" name="semanaFim" value={semanaFim} onChange={e => setSemanaFim(e.target.value)} className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-custom-purple focus:ring focus:ring-custom-purple focus:ring-opacity-50" />
                </label>
                <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded">Atualizar</button>
              </form>
            </Modal>

            <Modal
              isOpen={modalAdicionarExercicio}
              onRequestClose={closeModalAdicionarExercicio}
              contentLabel="Modal para adicionar exercício"
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
              <button onClick={closeModalAdicionarExercicio} className="absolute right-3 top-3 hover:bg-custom-purple rounded">
                <AiOutlineClose size={20} />
              </button>
              <h2 className="text-2xl mb-4 text-center">Adicionar Exercício</h2>
              <form onSubmit={handleSubmitExercicio} className="grid grid-cols-2 gap-4">
                <label className="block mb-4">
                  <span className="text-custom-purple">Dia da Semana:</span>
                  <select name="diaDaSemana"  onChange={e => setDiaSemana(e.target.value)} className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-custom-purple focus:ring focus:ring-custom-purple focus:ring-opacity-50" value={"segunda"}>
                    <option value="segunda">Segunda</option>
                    <option value="terça">Terça</option>
                    <option value="quarta">Quarta</option>
                    <option value="quinta">Quinta</option>
                    <option value="sexta">Sexta</option>
                    <option value="sabado">Sábado</option>
                  </select>
                </label>
                <label className="block mb-4">
                  <span className="text-custom-purple">Músculo Trabalhado:</span>
                  <input type="text" name="musculoTrabalhado" onChange={e => setMusculoTrabalhado(e.target.value)} className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-custom-purple focus:ring focus:ring-custom-purple focus:ring-opacity-50" />
                </label>
                <label className="block mb-4">
                  <span className="text-custom-purple">Nome do Exercício:</span>
                  <input type="text" onChange={e => setNomeExercicio(e.target.value)} name="nomeExercicio" className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-custom-purple focus:ring focus:ring-custom-purple focus:ring-opacity-50" />
                </label>
                <label className="block mb-4">
                  <span className="text-custom-purple">Séries:</span>
                  <input type="number" name="series" onChange={e => setSeries(e.target.value)} className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-custom-purple focus:ring focus:ring-custom-purple focus:ring-opacity-50" />
                </label>
                <label className="block mb-4">
                  <span className="text-custom-purple">Kg:</span>
                  <input type="number" name="kg" onChange={e => setKg(e.target.value)} className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-custom-purple focus:ring focus:ring-custom-purple focus:ring-opacity-50" />
                </label>
                <label className="block mb-4">
                  <span className="text-custom-purple">Repetições:</span>
                  <input type="number" name="repeticao" onChange={e => setRepeticao(e.target.value)} className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-custom-purple focus:ring focus:ring-custom-purple focus:ring-opacity-50" />
                </label>
                <label className="block mb-4">
                  <span className="text-custom-purple">Descanso:</span>
                  <input type="number" name="descanso" onChange={e => setDescanso(e.target.value)} className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-custom-purple focus:ring focus:ring-custom-purple focus:ring-opacity-50" />
                </label>
                <label className="block mb-4">
                  <span className="text-custom-purple">Unidade de Descanso:</span>
                  <select name="unidadeDescanso" onChange={e => setUnidadeDescanso(e.target.value)} className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-custom-purple focus:ring focus:ring-custom-purple focus:ring-opacity-50">
                    <option value="segundos">Segundos</option>
                    <option value="minutos">Minutos</option>
                  </select>
                </label>
                <label className="block mb-4 col-span-2">
                  <span className="text-custom-purple">Observações:</span>
                  <textarea name="observacoes" onChange={e => setObservacoes(e.target.value)} className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-custom-purple focus:ring focus:ring-custom-purple focus:ring-opacity-50"></textarea>
                </label>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded col-span-2">Salvar</button>
              </form>
            </Modal>
          </div>
        </div>
      )}

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
          
          {isUpdating ? (
            <>
              <div className="flex justify-center">
                <input type="text" value={handleSelectedExercicio.nomeExercicio} onChange={e => setHandleSelectedExercicio({...handleSelectedExercicio, nomeExercicio: e.target.value})} className="text-2xl text-custom-purple text-center mb-4"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="text-black">Músculo Trabalhado:</label>
                <input type="text" value={handleSelectedExercicio.musculoTrabalhado} onChange={e => setHandleSelectedExercicio({...handleSelectedExercicio, musculoTrabalhado: e.target.value})} />
                <label className="text-black">Séries:</label>
                <input type="text" value={handleSelectedExercicio.series} onChange={e => setHandleSelectedExercicio({...handleSelectedExercicio, series: e.target.value})} />
                <label className="text-black">Repetições:</label>
                <input type="text" value={handleSelectedExercicio.repeticao} onChange={e => setHandleSelectedExercicio({...handleSelectedExercicio, repeticao: e.target.value})} />
                <label className="text-black">Kg:</label>
                <input type="text" value={handleSelectedExercicio.kg} onChange={e => setHandleSelectedExercicio({...handleSelectedExercicio, kg: e.target.value})} />
                <label className="text-black">Descanso:</label>
                <input type="text" value={handleSelectedExercicio.descanso} onChange={e => setHandleSelectedExercicio({...handleSelectedExercicio, descanso: e.target.value})} />
                <label className="text-black">Unidade de Descanso:</label>
                <input type="text" value={handleSelectedExercicio.unidadeDescanso} onChange={e => setHandleSelectedExercicio({...handleSelectedExercicio, unidadeDescanso: e.target.value})} />
                <label className="text-black">Observações:</label>
                <textarea name="observacoes" onChange={e => setHandleSelectedExercicio({...handleSelectedExercicio, observacoes: e.target.value})} className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-custom-purple focus:ring focus:ring-custom-purple focus:ring-opacity-50" value={handleSelectedExercicio.observacoes}></textarea>
              </div>
              <button onClick={handleSaveClick} className="px-4 py-2 mt-5 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Salvar
              </button>
              <button onClick={handleCancelClick} className="px-4 py-2 mt-5 ml-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Cancelar
              </button>
            </>
          ) : (
            <> 
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
              <button className="px-4 py-2 mt-5 bg-red-600 text-white rounded float-right hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={handleDeleteExercicio}>
                Deletar Exercício
              </button>

              <button className="px-4 py-2 mt-5 mr-2 bg-orange-600 text-white rounded float-right hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500" onClick={handleUpdateClick}>
                Atualizar Exercício
              </button>
            </>
          )}
        </Modal>
      )}
    </div>
  </>
  );
}