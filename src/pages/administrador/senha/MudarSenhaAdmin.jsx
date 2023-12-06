import { useFormik } from 'formik';
import * as yup from "yup";
import { api } from '../../../services/api'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";

export const MudarSenhaAdmin = () => {

    const { id } = useParams();

    const notifyError = (error) => toast.error(error.response.data.descricao);
    const notifySuccess = (response) => toast.success(response.data.msg.descricao);
  
    const validationSchema = yup.object({
      senha: yup
        .string()
        .trim()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            `Deve conter no mínimo 8 caracteres, uma letra maiúscula, uma 
            letra minúscula, um número e um caractere especial`
        )
        .required("Campo obrigatório"),
      novaSenha: yup
        .string()
        .trim()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          `Deve conter no mínimo 8 caracteres, uma letra maiúscula, uma 
          letra minúscula, um número e um caractere especial`
        )
        .required("Campo obrigatório"),
    });
  
    const onSubmit = async (values) => {
      const information = {
        senha: values.senha,
        novaSenha: values.novaSenha,
      };
  
      try {
        const response = await api.patch(`administradores/${id}`, information);
        notifySuccess(response)
      } catch (error) {
        notifyError(error);
      }
    };
    
    const formik = useFormik({
      initialValues: {
        senha: "",
        novaSenha: "",
      },
      validateOnBlur: true,
      onSubmit,
      validationSchema: validationSchema,
    });
    
    return (
        <>
        <ToastContainer position='top-center'/>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-50">

                    <span>
                        <button className="text-gray-900 font-bold ml-4 mt-4">Alterar<span className='bg-violet-500 text-white'> Senha</span></button>
                    </span>
                </div>
                <form onSubmit={formik.handleSubmit} >
                <div className="grid lg:grid-cols-2 md:grid-cols-1">
                    <div>
                    <h1 className="m-4 text-gray-900 font-bold">Informe a <span className=' text-violet-500'> Senha Antiga</span></h1>
                        <div className="flex m-4 p-1">
                            <input
                                id="senha"
                                type="password"
                                placeholder="Informe a Senha Antiga"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-violet-700"
                                onChange={(e) => {formik.handleChange(e)}}
                                value={formik.values.senha}
                                onBlur={formik.handleBlur}
                                required
                                />
                        </div>
                        <span className="ml-5 text-sm leading-6 text-red-600 flex flex-1">
                            {formik.touched.senha && formik.errors.senha ? formik.errors.senha : ""}
                        </span>
                    </div>
                    <div>
                        <h1 className="m-4 text-gray-900 font-bold">Informe a <span className=' text-violet-500'> Nova Senha</span></h1>
                            <div className="flex m-4 p-1">
                                <input
                                    id="novaSenha"
                                    type="password"
                                    placeholder="Informe a Nova Senha"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-violet-700"
                                    onChange={(e) => {formik.handleChange(e)}}
                                    value={formik.values.novaSenha}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <span className="ml-5 text-sm leading-6 text-red-600 flex flex-1">
                            {formik.touched.novaSenha && formik.errors.novaSenha ? formik.errors.novaSenha : ""}
                        </span>
                    </div>

                    {/* <div>
                        <h1 className="m-4 text-gray-900 font-bold">Repetir <span className=' text-violet-500'> Senha</span></h1>
                            <div className="flex m-4 p-1">
                                <input
                                    type="password"
                                    placeholder="Repetir Senha"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-violet-700"
                                    // value={searchQuery}
                                    // onChange={handleSearchChange}
                                />
                            </div>
                    </div> */}

                    
                    </div>
                    <button
                        className="p-4 m-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-700 transition duration-150 ease-in-out hover:bg-violet-600 bg-violet-700 rounded text-white px-8 py-2 text-sm ml-4 focus:border-violet-700"
                        type='submit'
                      >
                        Salvar
                      </button>
                </form>
                    
                </div>
            
        </>
    )
}