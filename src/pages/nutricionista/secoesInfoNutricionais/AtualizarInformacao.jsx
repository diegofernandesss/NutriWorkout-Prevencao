import { useFormik } from 'formik';
import * as yup from "yup";
import { api } from '../../../services/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputMask from 'react-input-mask';
import { useEffect } from 'react';

export const AtualizarInformacao = ({ setShowAddModal, id3, setinfoNutri, infoNutri }) => {

    const validationSchema = yup.object({
        massaMagra: yup
          .string()
          .trim()
          .required('Campo obrigatório'),
        massaGorda: yup
          .string()
          .trim()
          .required('Campo obrigatório'),
        altura: yup
          .string()
          .trim()
          .required('Campo obrigatório'),
        peso: yup
          .string()
          .trim()
          .required('Campo obrigatório')
      });

      const notifyError = (error) => toast.error(error.response.data.descricao);
      const notifySuccess = () => toast.success("Atualizado com sucesso");

      const onSubmit = async (values, { resetForm }) => {
        const information = {
          massaMagra: values.massaMagra,
          massaGorda: values.massaGorda,
          altura: values.altura,
          peso: values.peso
        };

        try {
            const response = await api.put(`/nutricionista/atleta/${id3}`, information);
            setinfoNutri(response.data)
            notifySuccess()
            resetForm();
            setShowAddModal(false);
        } catch (error) {
            notifyError(error);
        }
    }
    
    const formik = useFormik({
        initialValues: {
            massaMagra: "",
            massaGorda: "",
            altura: "",
            peso: ""
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
        });


        useEffect(() => {
            if (id3) {
                formik.setFieldValue("massaMagra", infoNutri.massaMagra);
                formik.setFieldValue("massaGorda", infoNutri.massaGorda);
                formik.setFieldValue("altura", infoNutri.altura);
                formik.setFieldValue("peso", infoNutri.peso);
            }
        }, [id3]);

    return (
        <>
        <ToastContainer position='top-center'/>
            <div className="transition-opacity duration-300 py-12 bg-gray-900 bg-opacity-50 absolute top-0 right-0 bottom-0 left-0 modal-backdrop">
                <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <h1 className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Atualizar Informações Nutricionais</h1>
                        <form className="mt-5" onSubmit={formik.handleSubmit}>
                            <label className=" text-gray-800 text-sm font-semibold leading-tight tracking-normal">Massa Magra</label>
                                <InputMask
                                    mask="99.99"
                                    id="massaMagra"
                                    className="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-violet-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                    placeholder="Insira a Massa Magra"
                                    type="massaMagra"
                                    onChange={(e) => {formik.handleChange(e)}}
                                    value={formik.values.massaMagra}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <span className="text-sm leading-6 text-red-600 flex flex-1 mb-3">
                                    {formik.touched.massaMagra && formik.errors.massaMagra ? formik.errors.massaMagra : ""}
                                </span>
                                <label className=" text-gray-800 text-sm font-semibold leading-tight tracking-normal">Massa Gorda</label>
                                <InputMask
                                    mask="99.99"
                                    id="massaGorda"
                                    className="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-violet-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                    placeholder="Insira a Massa Gorda"
                                    type="massaGorda"
                                    onChange={(e) => {formik.handleChange(e)}}
                                    value={formik.values.massaGorda}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <span className="text-sm leading-6 text-red-600 flex flex-1 mb-3">
                                    {formik.touched.massaGorda && formik.errors.massaGorda ? formik.errors.massaGorda : ""}
                                </span>
                                <label className=" text-gray-800 text-sm font-semibold leading-tight tracking-normal">Altura</label>
                                <InputMask
                                    mask="9.99"
                                    id="altura"
                                    className="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-violet-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                    placeholder="Insira a Altura"
                                    type="altura"
                                    onChange={(e) => {formik.handleChange(e)}}
                                    value={formik.values.altura}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <span className="text-sm leading-6 text-red-600 flex flex-1 mb-3">
                                    {formik.touched.altura && formik.errors.altura ? formik.errors.altura : ""}
                                </span>
                                <label className=" text-gray-800 text-sm font-semibold leading-tight tracking-normal">Peso</label>
                                <InputMask
                                    mask="999.99"
                                    id="peso"
                                    className="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-violet-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                    placeholder="Insira o seu Peso"
                                    type="peso"
                                    onChange={(e) => {formik.handleChange(e)}}
                                    value={formik.values.peso}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <span className="text-sm leading-6 text-red-600 flex flex-1 mb-3">
                                    {formik.touched.peso && formik.errors.peso ? formik.errors.peso : ""}
                                </span>
                            <div className="mt-5 flex items-center justify-start w-full">
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-700 transition duration-150 ease-in-out hover:bg-violet-600 bg-violet-700 rounded text-white px-8 py-2 text-sm" type='submit'>Atualizar</button>
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" type='button' onClick={() => setShowAddModal(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}