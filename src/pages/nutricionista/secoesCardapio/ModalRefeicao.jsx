import { useFormik } from 'formik';
import * as yup from "yup";
import { api } from '../../../services/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ModalRefeicao = ({ cardapio, setShowAddModal, setCardapio }) => {
    const LISTA_DIAS_SEMANAS = [
        {id: 1,nome: "segunda", nome1: "Segunda-Feira"}, 
        {id: 2,nome: "terça",   nome1: "Terça-Feira"}, 
        {id: 3,nome: "quarta",  nome1: "Quarta-Feira"}, 
        {id: 4,nome: "quinta",  nome1: "Quinta-Feira"}, 
        {id: 5,nome: "sexta",   nome1: "Sexta-Feira"}, 
        {id: 6,nome: "sabado",  nome1: "Sábado"}, 
        {id: 7,nome: "domingo", nome1: "Domingo"}
    ]

    const LISTA_TIPO_REFEICAO = [
        {id: 1, nome: "cafeManha",   nome1: "Café da Manhã"}, 
        {id: 2, nome: "lancheManha", nome1: "Lanche da Manhã"}, 
        {id: 3, nome: "almoco",      nome1: "Almoço"}, 
        {id: 4, nome: "lancheTarde", nome1: "Lanche da Tarde"}, 
        {id: 5, nome: "janta",       nome1: "Janta"}, 
        {id: 6, nome: "lancheNoite", nome1: "Lanche da Noite"}, 
     ]

    const validationSchema = yup.object({
        idDiaDaSemana: yup
            .string()
            .trim()
            .required("Campo obrigatório"),
        idRefeicao: yup
            .string()
            .trim()
            .required("Campo obrigatório"),
        nome: yup
            .string()
            .trim()
            .required("Campo obrigatório")
            .matches(/^[A-Z].*$/, "O nome do cardápio deve começar com letra maiúscula")
            .matches(/(?=.{3})/, "O nome do cardápio deve possuir no mínimo 3 caracteres")
      });
      
    const notifyError = (error) => toast.error(error.response.data.descricao);
    const notifyWarning = () => toast.warn("Primeiro Cadastrar Cardápio")
    const notifySuccess = () => toast.success("Refeição Cadastrado com Sucesso")

    const onSubmit = async (values, { resetForm }) => {
        const information = {
          nome: values.nome,
          diaSemana: values.idDiaDaSemana,
          tipoRefeicao: values.idRefeicao
        };
      
        const cardapioId = cardapio.map((cardapio) => cardapio.id);
      
        try {
          if (cardapioId.length > 0) {
            const response = await api.post(`/nutricionista/atleta/refeicao/${cardapioId}`, information);
            const updatedCardapio = cardapio.map((item) => {
              if (item.id === cardapioId[0]) {
                return {
                  ...item,
                  refeicoes: [...item.refeicoes, response.data]
                };
              } else {
                return item;
              }
            });
            setCardapio(updatedCardapio);
            notifySuccess();
            resetForm();
            setShowAddModal(false);
          } else{
            notifyWarning();
          }
          
        } catch (error) {
          notifyError(error);
        }
      };

    const formik = useFormik({
        initialValues: {
            idDiaDaSemana: "",
            idRefeicao: "",
            nome: "",
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
        });

    return (
        <>
        <ToastContainer position='top-center'/>
            <div className="transition-opacity duration-300 py-12 bg-gray-900 bg-opacity-50 absolute top-0 right-0 bottom-0 left-0 modal-backdrop">
                <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <form onSubmit={formik.handleSubmit} >
                        <div>
                        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Dia da Semana</label>
                            <select  
                            id="idDiaDaSemana" 
                            label="Selecione o dia da Semana"
                            onChange={(e) => {formik.handleChange(e)}}
                            value={formik.values.idDiaDaSemana}
                            onBlur={formik.handleBlur}
                            className="bg-gray-50 border border-violet-300 text-gray-900 text-sm rounded-lg focus:border focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:focus:ring-violet-500  mb-2 mt-2"
                            >
                            <option hidden>Selecione uma Opção</option>
                            {LISTA_DIAS_SEMANAS.map((dias_semana) => (
                                    <option key={dias_semana.id} value={dias_semana.nome}>{dias_semana.nome1}</option>
                            ))}
                        </select>
                        <span className="text-sm leading-6 text-red-600">
                            {formik.touched.idDiaDaSemana && formik.errors.idDiaDaSemana ? formik.errors.idDiaDaSemana : ""}
                        </span>
                        </div>
                        <div>
                        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Tipo Refeição</label>
                            <select  
                            id="idRefeicao" 
                            label="Selecione o dia da Semana"
                            onChange={(e) => {formik.handleChange(e)}}
                            value={formik.values.idRefeicao}
                            onBlur={formik.handleBlur}
                            className="bg-gray-50 border border-violet-300 text-gray-900 text-sm rounded-lg focus:border focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:focus:ring-violet-500  mb-2 mt-2"
                            >
                            <option hidden>Selecione uma Opção</option>
                            {LISTA_TIPO_REFEICAO.map((refeicao) => (
                                    <option key={refeicao.id} value={refeicao.nome}>{refeicao.nome1}</option>
                            ))}
                        </select>
                        <span className="text-sm leading-6 text-red-600">
                            {formik.touched.idRefeicao && formik.errors.idRefeicao ? formik.errors.idRefeicao : ""}
                        </span>
                        </div>
                       
                        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Nome da Refeição</label>
                            <input
                                id="nome"
                                className="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-violet-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                placeholder="Insira o Nome da Refeição"
                                type="nome"
                                onChange={(e) => {formik.handleChange(e)}}
                                value={formik.values.nome}
                                onBlur={formik.handleBlur}
                                required
                            />
                            <span className="text-sm leading-6 text-red-600 flex flex-1 mb-3">
                                {formik.touched.nome && formik.errors.nome ? formik.errors.nome : ""}
                            </span>
                        <div className="flex items-center justify-start w-full">
                            <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-700 transition duration-150 ease-in-out hover:bg-violet-600 bg-violet-700 rounded text-white px-8 py-2 text-sm" type='submit'>Cadastrar</button>
                            <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" type='button' onClick={() => setShowAddModal(false)}>Cancelar</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}