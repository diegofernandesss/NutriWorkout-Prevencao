import { academiaData4 } from "../../assets"
import { useNavigate } from "react-router-dom";

export const HeroSession = () => {

    const navigate = useNavigate();
    const {image, alt} = academiaData4;
    return (

        <>
            <section className="relative ">
                <div className=" container 0 max-w-screen-xl  flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-44 sm:container sm:mx-auto  xl:max-w-screen-xl " >
                    {/** Content */}
                    <div className="p-7 flex flex-1 flex-col items-center lg:items-start">
                        <h2 className="font-bold text-violet text-3xl md:text-4 lg:text-6xl text-center lg:text-left mb-6">
                            Bem-vindo a academia Nutri<span className="text-violet-500">Workout</span>
                        </h2>
                        <p className="text-zinc-400 text-center lg:text-left mb-6 text-xl">
                            Se prepare para imergir no mundo Fitness e se deparar com o melhor plano.
                        </p>
                        <div className="flex justify-center flex-wrap gap-6">
                            <button type="button" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 transition duration-150 ease-in-out hover:bg-violet-500 bg-violet-600 rounded-xl text-white px-8 py-4 text-sm font-semibold" onClick={() => navigate('/atleta/cadastro')}>CADASTRAR</button>
                        </div>
                    </div>

                    {/** Image */}

                    <div className="flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10">
                        <img className="w-5/6 h-5/6 sm:w-1/2 sm:h-3/4 md:w-3/4 md:h-full" src={image} alt={alt} />
                    </div>
                </div>

                {/** Rounded Rectangle */}
                <div className="hidden md:block overflow-hidden bg-violet-300 rounded-l-full absolute h-80 w-2/4 sm:top-16 top-24 right-0"></div>
            </section>
        </>
    );
}