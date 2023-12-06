import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavBar } from '../../components/NavBar';
import CustomInput from '../../components/CustomInput'; 
import { useCadastro } from '../../hooks/personal/useCadastro';

export const CadastroPersonal = () => {
  const {formik, formatCpf, validateAndFormatCref, image, alt} = useCadastro()

  return (
    <>
      <ToastContainer 
        position="top-center"
      />
      <div className='bg-gray-100 pt-20 flex items-center justify-center'>
        <div className='bg-gray-200 flex rounded-2xl shadow-lg max-w-3xl p-5'>
          <div className='sm:w-3/4 px-16'>
            <h2 className='font-bold text-2xl'>Cadastro Personal</h2>
            <p className='text-sm mt-4'>Venha fazer o cadastro no 
            <span className='font-bold text-xl text-gray-900'>Nutri
            <span className='bg-violet-500 text-white'> Workout</span></span></p>

            <form className='flex flex-col gap-2' onSubmit={formik.handleSubmit}>
            <CustomInput
                id="nome"
                label="Nome"
                type="text"
                name="nome"
                placeholder="Informe seu Nome"
                value={formik.values.nome}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.nome && formik.errors.nome ? formik.errors.nome : null}
                isFirstInput={true}
              />
            <CustomInput
                id="sobrenome"
                label="Sobrenome"
                type="text"
                name="sobrenome"
                placeholder="Informe seu Sobrenome"
                value={formik.values.sobrenome}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.sobrenome && formik.errors.sobrenome ? formik.errors.sobrenome : null}
                isFirstInput={false}
              />
            <CustomInput
                id="email"
                label="E-mail"
                type="text"
                name="email"
                placeholder="Informe seu E-mail"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                isFirstInput={false}
              />
              <CustomInput
                id="cpf"
                label="CPF"
                type="text"
                name="cpf"
                placeholder="Informe seu CPF"
                value={formik.values.cpf}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  const formattedCpf = formatCpf(e.target.value);
                  formik.handleChange(e);
                  formik.setFieldValue("cpf", formattedCpf);
                }}
                error={formik.touched.cpf && formik.errors.cpf ? formik.errors.cpf : null}
                isFirstInput={false}
              />
              <CustomInput
                id="cref"
                label="CREF"
                type="cref"
                name="cref"
                placeholder="Informe seu CREF"
                value={formik.values.cref}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  const formattedCref = validateAndFormatCref(e.target.value);
                  formik.handleChange(e);
                  formik.setFieldValue("cref", formattedCref);
                }}
                error={formik.touched.cref && formik.errors.cref ? formik.errors.cref : null}
                isFirstInput={false}
              />
              <CustomInput
                id="senha"
                label="Senha"
                type="password"
                name="senha"
                placeholder="Informe sua Senha"
                value={formik.values.senha}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.senha && formik.errors.senha ? formik.errors.senha : null}
                isFirstInput={false}
              />

              
              <button type='submit' className='bg-violet-700 mt-2 py-2 rounded-xl text-white hover:bg-violet-600'>Cadastrar</button>
            </form>
          </div>
          <div className='w-1/2 p-1 opacity-95 sm:block hidden'>
            <img className='rounded-2xl object-cover w-full h-full' src={image} alt={alt} />
          </div>
        </div>
      </div>
    </>
  );
};

