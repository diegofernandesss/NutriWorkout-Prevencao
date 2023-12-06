import { academiaData3 } from "../../assets"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useFormik } from 'formik';
import * as yup from "yup";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/Auth";
import { useNavigate } from "react-router-dom";
import { Layout } from '../Layout'

export const Login = () => {
    const {image, alt} = academiaData3;

    const navigate = useNavigate();
    const { signIn, signed } = useContext(AuthContext)

    const notifyError = (error) => toast.error(error.response.data.descricao);

    const validationSchema = yup.object({
        email: yup
            .string()
            .trim()
            .email("Digite um e-mail válido")
            .test("lowercase-email", "Digite um e-mail válido", function (value) {
            return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/g.test(value);
            })
            .required("Campo obrigatório"),
        senha: yup
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
            email: values.email,
            senha: values.senha
        };

        try {
            await signIn(information)
        } catch (error) {
            notifyError(error);
        }
    };
  
    const formik = useFormik({
        initialValues: {
            email: "",
            senha: "",
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
    });

    useEffect(() => {
        if (signed) {
            const storageUserId = localStorage.getItem("@Auth:user_id");
            const storageTipo = localStorage.getItem("@Auth:tipo");
            if (storageTipo === "Atleta") {
                navigate(`/atleta/${storageUserId}`);
            } else if (storageTipo === "Personal"){
                navigate(`/personalTrainer/${storageUserId}`);
            } else if (storageTipo === "Nutricionista") {
                navigate(`/nutricionista/${storageUserId}`);
            }else if (storageTipo === "Administrador") {
                navigate(`/admin/${storageUserId}`);
            }
        }
    }, [signed, navigate]);

    return (
        <>
        <Layout >
        <ToastContainer position="top-center"/>
        
            <div className="container mx-auto mt-32 mb-32">
			<div className="flex justify-center px-6 my-12">

				<div className="w-full xl:w-3/4 lg:w-11/12 flex">

					<img className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg" src={image} alt={alt} />

					<div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
						<h3 className="pt-4 text-2xl text-center">Bem vindo!</h3>
						<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={formik.handleSubmit}>
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
									E-mail
								</label>
								<input
									className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="email"
									type="text"
                                    label="E-mail"
                                    name="email"
									placeholder="Digite seu e-mail"
                                    value={formik.values.email}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
								/>
                                <span className="text-sm italic text-red-500">{formik.touched.email && formik.errors.email ? formik.errors.email : null}</span>
							</div>
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
									Senha
								</label>
								<input
									className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="senha"
                                    label="Senha"
                                    type="password"
                                    name="senha"
									placeholder="Digite a sua senha"
                                    value={formik.values.senha}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
								/>
								<span className="text-sm italic text-red-500">{formik.touched.senha && formik.errors.senha ? formik.errors.senha : null}</span>
							</div>

							<div className="mb-6 text-center">
								<button
									className="w-full px-4 py-2 font-bold text-white bg-violet-700 rounded-full hover:bg-violet-900 focus:outline-none focus:shadow-outline"
									type="submit"
								>
									Entrar
								</button>
							</div>
							<hr className="mb-6 border-t" />
							<div className="text-center">
								<a
									className="inline-block text-sm text-gray-500 align-baseline hover:text-gray-800"
									href="#"
								>
									{/* Ainda não possui conta? <span className="text-violet-500 font-semibold">Cadastre-se</span> */}
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
        </Layout>
        </>
    )
}