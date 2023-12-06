import { useFormik } from 'formik';
import * as yup from "yup";
import { cpf as validatorCPF } from 'cpf-cnpj-validator';
import { api } from '../../../services/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

export const ModalUser = ({ setShowAddModal, user, setUser, setUsers}) => {

    const validationSchema = yup.object({
        nome: yup
            .string()
            .trim()
            .required("Campo obrigatório")
            .matches(/^[A-Z].*$/, "O nome deve começar com letra maiúscula")
            .matches(/(?=.{3})/, "O nome deve possuir no mínimo 3 caracteres"),
        sobrenome: yup
            .string()
            .trim()
            .required("Campo obrigatório")
            .matches(/^[A-Z].*$/, "O sobrenome deve começar com letra maiúscula")
            .matches(/(?=.{3})/, "O sobrenome deve possuir no mínimo 3 caracteres"),
        email: yup
            .string()
            .trim()
            .email("Digite um e-mail válido")
            .test("lowercase-email", "Digite um e-mail válido", function (value) {
              return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/g.test(value);
            })
            .required("Campo obrigatório"),
        cpf: yup
            .string()
            .trim()
            .required("Campo obrigatório")
            .test("valid-cpf", "CPF inválido", (value) => {
              return isCpfValid(value);
            })
      });


    const isCpfValid = (cpf) => {return validatorCPF.isValid(cpf)};

    const formatCpf = (value) => {
        const cpf = value.replace(/\D/g, '');
        if (cpf.length <= 11) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
        return value.slice(0, 14);
    };

    const notifyError = (error) => toast.error(error.response.data.descricao);

    const onSubmit = async (values, { resetForm }) => {
        const information = {
          nome: values.nome,
          sobrenome: values.sobrenome,
          email: values.email,
          cpf: values.cpf
        };
      
        try {
          if(user.id) {
            try {
                const response = await api.put(`usuario/${user.id}`, information)
                setUsers((state) => state.map((userState) => userState.id === user.id ? response.data : userState))
                setUser({});
                resetForm();
                setShowAddModal(false);
            } catch (error) {
                notifyError(error);
            }
            
          }
        } catch (error) {
          console.error(error);
        }
        };

    const formik = useFormik({
        initialValues: {
            nome: "",
            sobrenome: "",
            email: "",
            cpf: ""
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
        });

    useEffect(() => {
      if (user.id) {
          formik.setFieldValue("nome", user.nome);
          formik.setFieldValue("sobrenome", user.sobrenome);
          formik.setFieldValue("email", user.email);
          formik.setFieldValue("cpf", user.cpf);
      }
  }, [user]);

    return (
        <>
        
        <ToastContainer 
            position="top-center"
        />
        <div className="transition-opacity duration-300 py-12 bg-gray-900 bg-opacity-50 absolute top-0 right-0 bottom-0 left-0 modal-backdrop">
                <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <form onSubmit={formik.handleSubmit} >
                            <h1 className="text-gray-800 font-lg font-bold leading-tight mb-4">Editar</h1>
                            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Nome</label>
                                <input
                                    id="nome"
                                    className="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-violet-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                    placeholder="Insira o Nome"
                                    type="nome"
                                    onChange={(e) => {formik.handleChange(e)}}
                                    value={formik.values.nome}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <span className="text-sm leading-6 text-red-600 flex flex-1">
                                    {formik.touched.nome && formik.errors.nome ? formik.errors.nome : ""}
                                </span>

                            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Sobrenome</label>
                                <input
                                    id="sobrenome"
                                    className="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-violet-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                    placeholder="Insira o Sobrenome"
                                    type="sobrenome"
                                    onChange={(e) => {formik.handleChange(e)}}
                                    value={formik.values.sobrenome}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <span className="text-sm leading-6 text-red-600 flex flex-1">
                                    {formik.touched.sobrenome && formik.errors.sobrenome ? formik.errors.sobrenome : ""}
                                </span>
                                
                            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Email</label>
                            <div className="relative mb-5 mt-2">
                                <input
                                    id="email"
                                    className="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-violet-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                    placeholder="Insira o E-mail"
                                    type="email"
                                    onChange={(e) => {formik.handleChange(e)}}
                                    value={formik.values.email}
                                    onBlur={formik.handleBlur}
                                    required
                            />
                            <span className="text-sm leading-6 text-red-600 flex flex-1">
                                    {formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                                </span>
                            </div>
                            
                            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">CPF</label>
                            <div className="relative mb-5 mt-2">
                                <input
                                    id="cpf"
                                    className="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-violet-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                    placeholder="Insira o CPF"
                                    type="cpf"
                                    onChange={(e) => {
                                        const formattedCpf = formatCpf(e.target.value);
                                        formik.handleChange(e);
                                        formik.setFieldValue("cpf", formattedCpf);
                                    }}
                                    value={formik.values.cpf}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <span className="text-sm leading-6 text-red-600 flex flex-1">
                                    {formik.touched.cpf && formik.errors.cpf ? formik.errors.cpf : ""}
                                </span>
                            </div>
                            
                            <div className="flex items-center justify-start w-full">
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-700 transition duration-150 ease-in-out hover:bg-violet-600 bg-violet-700 rounded text-white px-8 py-2 text-sm" type='submit'>Editar</button>
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={() => setShowAddModal(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
