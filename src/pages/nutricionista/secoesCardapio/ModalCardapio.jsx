import { useFormik } from 'formik';
import * as yup from "yup";
import { api } from '../../../services/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

export const ModalCardapio = ({ setShowAddModal, setCardapio, id2, cardapio, setCardap, cardap }) => {
    
    const validationSchema = yup.object({
        nome: yup
            .string()
            .trim()
            .required("Campo obrigatório")
            .matches(/^[A-Z].*$/, "O nome do cardápio deve começar com letra maiúscula")
            .matches(/(?=.{3})/, "O nome do cardápio deve possuir no mínimo 3 caracteres"),
      });

    const notifyError = (error) => toast.error(error.response.data.descricao);

    const onSubmit = async (values, { resetForm }) => {
        const information = {
            nome: values.nome,
            idAtleta: id2,
        };
    
        const information2 = {
            nome: values.nome
        };
    
        try {
            if (cardap.length > 0 && cardap[0].id) {
                const response = await api.put(`/nutricionista/atleta/cardapio/${id2}`, information2);
                setCardapio((state) => state.map((cardapioState) => cardapioState.id === cardap[0].id ? response.data : cardapioState));
            } else {
                const response = await api.post(`/nutricionista/atleta/cardapio`, information);
                setCardapio([...cardapio, response.data]);
            }
            setCardap({});
            setShowAddModal(false);
            resetForm();
        } catch (error) {
            notifyError(error);
        }
    }

    const onClose = () => {
        formik.resetForm()
        setShowAddModal(false)
        setCardap({});
      }

    const formik = useFormik({
        initialValues: {
            nome: "",
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
        });

        useEffect(() => {
            if (cardap.length > 0 && cardap[0].id) {
                formik.setFieldValue("nome", cardap[0].nome)
            }
        }, [cardap]);

    return (
        <>
        <div className="transition-opacity duration-300 py-12 bg-gray-900 bg-opacity-50 absolute top-0 right-0 bottom-0 left-0 modal-backdrop">
                <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <form onSubmit={formik.handleSubmit} >
                            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Nome do Cardápio</label>
                                <input
                                    id="nome"
                                    className="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-violet-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                    placeholder="Insira o Nome do Cardápio"
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
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-700 transition duration-150 ease-in-out hover:bg-violet-600 bg-violet-700 rounded text-white px-8 py-2 text-sm" type='submit'>
                                    
                                {cardap.length > 0 && cardap[0].id ? "Atualizar" : "Adicionar"}                                    
                                    </button>
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" type='button' onClick={() => onClose()}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
