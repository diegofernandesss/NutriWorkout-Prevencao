import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { academiaData1 } from '../../assets';
import { api } from '../../services/api'
import { useFormik } from 'formik';
import * as yup from "yup";
import { cpf as validatorCPF } from 'cpf-cnpj-validator';

export const useCadastro = () => {
  const { image, alt } = academiaData1;

  const notifyError = (error) => toast.error(error.response.data.descricao);
  const notifySuccess = () => toast.success("Cadastrado com Sucesso");

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
    cref: yup
      .string()
      .trim()
      .required("Campo obrigatório")
      .matches(/^(\d{6}-[G]{1}\/[A-Z]{2})$/, 'CREF inválido. O formato correto é XXXXXX-G/UF')
  });

  const isCpfValid = (cpf) => {return validatorCPF.isValid(cpf)};

  const formatCpf = (value) => {
    const cpf = value.replace(/\D/g, '');
    if (cpf.length <= 11) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value.slice(0, 14);
  };

  const validateAndFormatCref = (value) => {
    const cref = value.replace(/[^0-9A-Z/-]/g, '');
    if (cref.length <= 9) {
      return cref.replace(/(\d{6})([A-Z]{1})([A-Z]{2})/, '$1-$2/$3');
    }
    return value.slice(0, 11);
  };

  const onSubmit = async (values, { resetForm }) => {
    const information = {
      nome: values.nome,
      sobrenome: values.sobrenome,
      email: values.email,
      cpf: values.cpf,
      senha: values.senha,
      cref: values.cref
    };

    try {
      await api.post(`/personalTrainer`, information);
      notifySuccess()
      resetForm()
    } catch (error) {
      notifyError(error);
    }
  };
  
  const formik = useFormik({
    initialValues: {
      nome: "",
      sobrenome: "",
      email: "",
      cpf: "",
      senha: "",
      cref: ""
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return { formik, formatCpf, validateAndFormatCref, image, alt }
}