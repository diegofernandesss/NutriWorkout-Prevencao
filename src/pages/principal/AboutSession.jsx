import { academiaData5, academiaData6 } from "../../assets"

export const AboutSession = () => {
    const {image1, alt1} = academiaData5;
    const {image2, alt2} = academiaData6;

    return (
        <>
            <section className="text-gray-600 body-font " id='about'>
            <div className="container px-5 py-32 mx-auto ">
            <h2 className=" container max-w-screen-xl font-bold text-violet text-3xl md:text-4 lg:text-4xl text-center lg:text-center mb-2 sm:container xl:max-w-screen-xl ">
               Sobre Nós
            </h2>
            <p className="container max-w-screen-xl text-violet text-center lg:text-center xl:max-w-screen-xl sm:container  lg:text-xl text-zinc-400 mb-16">Somos uma equipe de Desenvolvimento focado em soluções. A Construção deste site tem o objetivo de colocar todo aprendizado aprendido durante o curso em prática</p>
                <div className="flex flex-wrap -m-4">
                <div className="lg:w-1/2 lg:mb-0 mb-6 p-4">
                    <div className="h-full text-center">
                    <img  className="w-32 h-32 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src={image2} alt={alt2}  />
                    <p className="leading-relaxed">Sou Diego. Estudo no IFPB Campus Guarabira e hoje estou terminando o curso com esse site para conclusão do mesmo</p>
                    <span className="inline-block h-1 w-10 rounded bg-violet-500 mt-6 mb-4"></span>
                    <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">DIEGO FERNANDES</h2>
                    <p className="text-gray-500">Desenvolvedor Front-End</p>
                    </div>
                </div>
                <div className="lg:w-1/2 lg:mb-0 mb-6 p-4">
                    <div className="h-full text-center">
                    <img className="w-32 h-32 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src={image1} alt={alt1} />
                    <p className="leading-relaxed">Me chamo Jardiel. Estudo no IFPB Campus Guarabira e hoje estou terminando o curso com esse site para conclusão do mesmo</p>
                    <span className="inline-block h-1 w-10 rounded bg-violet-500 mt-6 mb-4"></span>
                    <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">JARDIEL CARLOS</h2>
                    <p className="text-gray-500">Desenvolvedor Back-End</p>
                    </div>
                </div>
                
                </div>
            </div>
            </section>

        </>
    );
}