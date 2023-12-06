import { AiOutlineCheck } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const PaymentSession = () => {  

    const navigate = useNavigate();

    const handleClickSubscription = (idPlano) => {
        navigate("/atleta/cadastro", {state: { idPlano }});
        window.scrollTo(0, 0);
    }
    return (
        <>
        <section className="mt-24" id='planos'>

        <div className="bg-gray-100 pt-10">
            

        <h2 className=" container max-w-screen-xl font-bold text-violet text-3xl md:text-4 lg:text-4xl text-center lg:text-center mb-2 sm:container xl:max-w-screen-xl ">
        Planos
        </h2>
        <p className="container max-w-screen-xl text-violet text-center lg:text-center xl:max-w-screen-xl sm:container  lg:text-xl text-zinc-400">Venha conhecer nossos planos</p>

        <div className="  relative container  max-w-screen-xl flex-col-reverse lg:flex-row items-center gap-12  sm:container sm:mx-auto  xl:max-w-screen-xl mx-auto grid max-w-7x1 grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 py-24 px-4 sm:px-6 lg:px-8">
            
            <div className=" relative rounded-2xl border border-slate-200 bg-white p-8 shadow-lg ">
                <h3 className="text-lg font-semibold leading-5">Semanal</h3>
                {/* <p className="absolute top-0 -translate-y-1/2 rounded-full bg-violet-500 px-3 py-0.5 text-sm font-semibold tracking-wide text-white shadow-md">
                    PRATA
                </p> */}
                <p className="mt-4 text-sm text-slate-700 leading-6"> Aqui você terá todas as mensalidades sendo pagas semanalmente</p>
                <div className="mt-4 bg-violet-50 rounded-lg p-6 -mx-6">
                    <p className="flex text-sm font-semibold text-violet-500 items-center">
                        <span>R$</span>
                        <span className="text-4xl text-violet-900 font-bold ml-3">10,00</span>
                        <span className="ml-1.5">/Semanal</span>
                    </p>
                </div>

                {/** Features */}

                <ul className="mt-6 space-y-4 flex-1">
                    <li className="text-sm leading-6 text-slate-700">
                        <AiOutlineCheck className="h-5 w-5 text-violet-500 float-left"/>
                        <span className="ml-3">Horário de treino para cada dia</span>
                    </li>
                    <li className="text-sm leading-6 text-slate-700">
                        <AiOutlineCheck className="h-5 w-5 text-violet-500 float-left"/>
                        <span className="ml-3">Lista de exercícios a serem realizados em cada sessão.</span>
                    </li>
                    <li className="text-sm leading-6 text-slate-700">
                        <AiOutlineCheck className="h-5 w-5 text-violet-500 float-left"/>
                        <span className="ml-3">Metas de intensidade (número de séries, repetições, pesos)</span>
                    </li>
                    <li className="text-sm leading-6 text-slate-700">
                        <AiOutlineCheck className="h-5 w-5 text-violet-500 float-left"/>
                        <span className="ml-3">Plano de cardio (se necessário)</span>
                    </li>
                </ul>
                <button  className="flex items-center justify-center w-full mt-8  bg-violet-50 px-6 py-4 text-violet-700 hover:bg-violet-100 text-sm font-semibold leading-4 text-center shadow-md rounded-lg" onClick={() => handleClickSubscription(1)}>Assine Agora</button>
                {/* <a href="#" className="mt-8 block bg-violet-50 px-6 py-4 text-violet-700 hover:bg-violet-100 text-sm font-semibold leading-4 text-center shadow-md rounded-lg">
                    Assine Agora
                </a> */}
            </div>

            <div className=" relative rounded-md border border-slate-200 bg-white p-8 shadow-lg">
            <h3 className="text-lg font-semibold leading-5">Mensal</h3>
                <p className="absolute top-0 -translate-y-1/2 rounded-full bg-violet-500 px-3 py-0.5 text-sm font-semibold tracking-wide text-white shadow-md">
                    Popular
                </p>
                <p className="mt-4 text-sm text-slate-700 leading-6"> Aqui você terá todas as mensalidades sendo pagas mensalmente</p>
                <div className="mt-4 bg-violet-50 rounded-lg p-6 -mx-6">
                    <p className="flex text-sm font-semibold text-violet-500 items-center">
                        <span>R$</span>
                        <span className="text-4xl text-violet-900 font-bold ml-3">50,00</span>
                        <span className="ml-1.5">/Mensal</span>
                    </p>
                </div>

                {/** Features */}

                <ul className="mt-6 space-y-4">
                    <li className="text-sm leading-6 text-slate-700">
                        <AiOutlineCheck className="h-5 w-5 text-violet-500 float-left"/>
                        <span className="ml-3">Avaliação da sua condição física atual (medidas, peso, porcentagem de gordura, etc.)</span>
                    </li>
                    <li className="text-sm leading-6 text-slate-700">
                        <AiOutlineCheck className="h-5 w-5 text-violet-500 float-left"/>
                        <span className="ml-3">Avaliação do progresso em relação às metas anuais.</span>
                    </li>
                    <li className="text-sm leading-6 text-slate-700">
                        <AiOutlineCheck className="h-5 w-5 text-violet-500 float-left"/>
                        <span className="ml-3">Planejamento de períodos de treinamento específicos (hipertrofia, resistência, força, etc.)</span>
                    </li>
                    <li className="text-sm leading-6 text-slate-700">
                        <AiOutlineCheck className="h-5 w-5 text-violet-500 float-left"/>
                        <span className="ml-3">Acompanhamento do progresso em relação à composição corporal e condicionamento físico</span>
                    </li>
                </ul>
                <button  className="flex items-center justify-center w-full mt-8 bg-violet-500 px-6 py-4 text-white hover:bg-violet-600 text-sm font-semibold leading-4 text-center shadow-md rounded-lg" onClick={() => handleClickSubscription(2)}>Assine Agora</button>
                {/* <a href="#" className="mt-8 block bg-violet-500 px-6 py-4 text-white hover:bg-violet-600 text-sm font-semibold leading-4 text-center shadow-md rounded-lg">
                    Assine Agora
                </a> */}
            </div>

            <div className=" relative rounded-md border border-slate-200 bg-white p-8 shadow-lg">
            <h3 className="text-lg font-semibold leading-5">Anual</h3>
                {/* <p className="absolute top-0 -translate-y-1/2 rounded-full bg-violet-500 px-3 py-0.5 text-sm font-semibold tracking-wide text-white shadow-md">
                    OURO
                </p> */}
                <p className="mt-4 text-sm text-slate-700 leading-6"> Aqui você terá todas as mensalidades sendo pagas anualmente</p>
                <div className="mt-4 bg-violet-50 rounded-lg p-6 -mx-6">
                    <p className="flex text-sm font-semibold text-violet-500 items-center">
                        <span>R$</span>
                        <span className="text-4xl text-violet-900 font-bold ml-3">600,00</span>
                        <span className="ml-1.5">/Anual</span>
                    </p>
                </div>

                {/** Features */}

                <ul className="mt-6 space-y-4">
                    <li className="text-sm leading-6 text-slate-700">
                        <AiOutlineCheck className="h-5 w-5 text-violet-500 float-left"/>
                        <span className="ml-3">Metas de longo prazo para o ano</span>
                    </li>
                    <li className="text-sm leading-6 text-slate-700">
                        <AiOutlineCheck className="h-5 w-5 text-violet-500 float-left"/>
                        <span className="ml-3">Avaliação do progresso em relação às metas anuais</span>
                    </li>
                    <li className="text-sm leading-6 text-slate-700">
                        <AiOutlineCheck className="h-5 w-5 text-violet-500 float-left"/>
                        <span className="ml-3">Revisão e ajuste de seus objetivos anuais, se necessário</span>
                    </li>
                    <li className="text-sm leading-6 text-slate-700">
                        <AiOutlineCheck className="h-5 w-5 text-violet-500 float-left"/>
                        <span className="ml-3">Avaliação da consistência</span>
                    </li>
                </ul>

                {/** Call to action */}

                <button  className="flex items-center justify-center w-full mt-8  bg-violet-50 px-6 py-4 text-violet-700 hover:bg-violet-100 text-sm font-semibold leading-4 text-center shadow-md rounded-lg" onClick={() => handleClickSubscription(3)}>Assine Agora</button>
                
            </div>

        </div>
        </div>
        </section>
        </>
    );
}