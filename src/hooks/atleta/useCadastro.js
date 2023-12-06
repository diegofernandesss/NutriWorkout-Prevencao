import { useFormik } from 'formik';
import * as yup from "yup";
import { cpf as validatorCPF } from 'cpf-cnpj-validator';
import { api } from '../../services/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { academiaData } from '../../assets'
import { useNavigate, useLocation } from "react-router-dom";
export const useCadastro = () => {
  const { image, alt } = academiaData;
  
  const notifyError = (error) => toast.error(error.response.data.descricao);
  const notifySuccess = () => toast.success("Cadastrado com Sucesso");
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const { idPlano } = location.state

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
        }),
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

  const isCpfValid = (cpf) => {return validatorCPF.isValid(cpf)};

  const formatCpf = (value) => {
    const cpf = value.replace(/\D/g, '');
    if (cpf.length <= 11) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value.slice(0, 14);
  };

  const onSubmit = async (values, { resetForm }) => {
    const information = {
      nome: values.nome,
      sobrenome: values.sobrenome,
      email: values.email,
      cpf: values.cpf,
      senha: values.senha
    };
    

    await api.post(`atletas`, information)
    .then((resp) => {
      return api.post(`login`, {email: information.email, senha: information.senha})
    })
    .then((resp) => {
      localStorage.setItem("@Auth:token", resp.data.token);
      localStorage.setItem("@Auth:user_id", resp.data.user_id);
      localStorage.setItem("@Auth:tipo", resp.data.tipo);
      
      navigate("/cadastroCartao", {state: { idPlano }})
      resetForm()
    })
    .catch((err) => console.log(err))
    
    // try {
    //   const response = await api.post(`atletas`, information);
    //   console.log(response);
    //   localStorage.setItem("@Auth:token", response.data.token);
    //   localStorage.setItem("@Auth:user_id", response.data.user_id);
    //   localStorage.setItem("@Auth:tipo", response.data.tipo);
    //   notifySuccess()
    //   resetForm()
    // } catch (error) {
    //   notifyError(error);
    // }
  };
  
  const formik = useFormik({
    initialValues: {
      nome: "",
      sobrenome: "",
      email: "",
      cpf: "",
      senha: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return {formik, formatCpf, image, alt}

}