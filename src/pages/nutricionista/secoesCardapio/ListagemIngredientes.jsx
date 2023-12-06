import { useFormik } from 'formik';
import * as yup from "yup";
import { api } from '../../../services/api'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from 'react-js-pagination';

export const ListagemIngredientes = ({setShowAddModalIngredientes, ingredientes, activePage, max_items, totIngredienteNutri, handlePageChange, cardapio, currentId, setIngredientes}) => {
    const TABLE_HEAD = ["", "Nome", "Quantidade", "Ações"];

    const notifyError = (error) => toast.error(error.response.data.descricao);
    // const notifySuccess = (response) => toast.success(response.data.msg.descricao);
   
  
    const validationSchema = yup.object({
      nomeIngredientes: yup
        .string()
        .trim()
        .required("Campo obrigatório"),
      qtdIngredientes: yup
        .string()
        .trim()
        .required("Campo obrigatório"),
    });
  
    const onSubmit = async (values) => {
      const information = {
        nome: values.nomeIngredientes,
        quantidade: values.qtdIngredientes,
      };
    
      try {
        const response = await api.post(`/nutricionista/atleta/ingrediente/${cardapio[0].id}/${currentId}`, information);
        setIngredientes((prevIngredientes) => [...prevIngredientes, ...response.data.ingredientes]);
      } catch (error) {
        notifyError(error);
      }
    };
    
    const formik = useFormik({
      initialValues: {
        nomeIngredientes: "",
        qtdIngredientes: "",
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
                        <form  onSubmit={formik.handleSubmit} >
                            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal ">Ingredientes</label>
                                <div className="flex flex-1 gap-5">
                                <div>
                                <input
                                    id="nomeIngredientes"
                                    className="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-violet-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                    placeholder="Nome do Ingrediente"
                                    
                                    onChange={(e) => {formik.handleChange(e)}}
                                    value={formik.values.nomeIngredientes}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <span className="text-sm leading-6 text-red-600 flex flex-1 mb-3">
                                    {formik.touched.nomeIngredientes && formik.errors.nomeIngredientes ? formik.errors.nomeIngredientes : ""}
                                </span>
                                </div>
                                <div>
                                <input
                                    id="qtdIngredientes"
                                    className="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-violet-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                    placeholder="Quant. do Ingrediente"
                                    
                                    onChange={(e) => {formik.handleChange(e)}}
                                    value={formik.values.qtdIngredientes}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <span className="text-sm leading-6 text-red-600 flex flex-1 mb-3">
                                    {formik.touched.qtdIngredientes && formik.errors.qtdIngredientes ? formik.errors.qtdIngredientes : ""}
                                </span>
                                </div>
                                </div>
                            <div className="flex items-center justify-start w-full">
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-700 transition duration-150 ease-in-out hover:bg-violet-600 bg-violet-700 rounded text-white px-8 py-2 text-sm" type='submit'>Cadastrar</button>
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" type='button' onClick={() => setShowAddModalIngredientes(false)}>Cancelar</button>
                            </div>
                            
                        </form>

                        <table className="mt-4 w-full text-sm text-left rtl:text-right text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                          {TABLE_HEAD.map((head) => (
                            <th key={head} scope="col" className="px-2 py-3">
                              {head}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {ingredientes.map((ingr) => (
                                <tr key={ingr.id} className="bg-white border-b hover:bg-gray-100">
                                  <td className="w-4 p-4"></td>
                                  <td className="px-2 py-4">
                                    {ingr.nome}
                                  </td>
                                <td className="px-2 py-4">
                                  {ingr.quantidade}
                                </td>
                                <td className="px-2 py-4 flex flex-row gap-4">
                                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 transition duration-150 ease-in-out hover:bg-red-600 bg-red-700 rounded text-white px-8 py-2 text-sm  focus:border-red-700" >Deletar</button>
                                  </td>
                                </tr>
                            ))}
                    </tbody>
                    </table >
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={max_items}
                        totalItemsCount={totIngredienteNutri}
                        pageRangeDisplayed={4}
                        onChange={handlePageChange}
                        innerClass='flex justify-center m-10'
                        itemClass="h-10 w-10 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer hover:scale-105 border-red-500 hover:bg-violet-500 hover:text-white cursor-pointer transform bg-scale-100"
                        activeClass='bg-violet-500 text-white'
                />
                    </div>
                </div>
            </div>
        </>
    )
}