
import { BiHomeAlt2, BiLock, BiMenu, BiBell, BiSolidArrowToRight, BiSolidUserCircle, BiSolidBookContent, BiSolidUserPin     } from "react-icons/bi";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../services/api";
import { AuthContext } from "../../../Context/Auth";
import { Outlet, useNavigate} from "react-router-dom";

export const Painel0 = () => {
    const { signOut } = useContext(AuthContext)
    const navigate = useNavigate();

    const { id } = useParams();

    const [administrador, setAdministrador] = useState({});

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpenPerf, setIsDropdownOpenPerf] = useState(false);

    const toggleDropdown = () => {
        if(!isDropdownOpen){
            setIsDropdownOpenPerf(false);
        }
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleDropdownPerf = () => {
        if(!isDropdownOpenPerf){
            setIsDropdownOpen(false)
        }
        setIsDropdownOpenPerf(!isDropdownOpenPerf);
    };


    useEffect(() => {
        const admin = async () => {
            try {
                const response = await api.get(`/administradores/${id}`);
                setAdministrador(response.data.administrador);
            } catch (error) {
                console.error(error);
            } 
            }
            admin();
    }, [])

    return (
        <>
    

        {/* Start: Sidebar */}
        <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4">
            <a href="#" className="flex items-center pb-4 border-b border-b-gray-700">
                <span className="text-lg font-bold text-white ml-5">Nutri<span className='bg-violet-500 text-white'> Workout</span></span>
            </a>
            <ul className="mt-4">
                <li className="mb-1 group active">
                    <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white">
                        <BiHomeAlt2 className="mr-3 text-lg" />
                        <span className="text-sm font-semibold">Painel Admin</span>
                    </a>
                </li>
                <li className="mb-1 group">
                    <a href="#" onClick={() => navigate("mudarSenha")} className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white">
                        <BiLock className="mr-3 text-lg" />
                        <span className="text-sm font-semibold">Senha</span>
                    </a>
                </li>
                <li className="mb-1 group">
                    <a href="#" onClick={() => navigate("lista/usuarios")} className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white">
                        <BiSolidUserCircle  className="mr-3 text-lg" />
                        <span className="text-sm font-semibold">Lista de Usuários</span>
                    </a>
                </li>
                <li className="mb-1 group">
                    <a href="#" onClick={() => navigate("nutricionista/cadastro")} className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white">
                        <BiSolidBookContent  className="mr-3 text-lg" />
                        <span className="text-sm font-semibold">Cadastrar Nutricionista</span>
                    </a>
                </li>
                <li className="mb-1 group">
                    <a href="#" onClick={() => navigate("personal/cadastro")} className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white">
                        <BiSolidUserPin className="mr-3 text-lg" />
                        <span className="text-sm font-semibold">Cadastrar Personal</span>
                    </a>
                </li>
            </ul>
        </div>
        {/* start: Main */}
        <main className="w-[calc(100%-256px)] ml-64 bg-gray-50 min-h-screen">
            <div className="py-2 px-6 bg-gray-800 flex items-center shadow-md shadow-black/5">
                <button type="button" className="text-lg text-white">
                    <BiMenu className="text-2xl" />
                </button>
                <ul className="flex items-center ml-4">
                    <li className="mr-2">
                        <a href="#" className="text-white hover:text-gray-200 font-medium">Painel</a>
                    </li>
                    <li className="text-white mr-2 font-medium">/</li>
                    <li className="text-gray-300 mr-2 font-medium">Análise</li>
                </ul>
                
                <ul className="ml-auto flex items-center">
                    <li className="mr-4 relative">
                        <button type="button" className="text-gray-400 w-8 h-8 rounded-full flex items-center justify-center  hover:bg-gray-600 hover:text-gray-100" onClick={toggleDropdown}>
                            <BiBell className="text-2xl" />
                        </button>
                        {isDropdownOpen && ( 
                        <div className="absolute mt-5 right-0 z-10 w-96 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="mt-3 mb-2">
                                <div className="flex items-center px-4 pt-4 border-b-gray-100 notification-tab">
                                    <button type="button" className="text-gray-400 font-medium text-[13px] border-b-2 border-b-transparent mr-4 active">Notificação</button>
                                </div>
                                <ul className="max-h-64 overflow-y-auto mt-2">
                                    <li>
                                        <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-600 group">
                                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' rx='50' ry='50' fill='%23ddd6fe' /%3E%3Ctext x='50' y='50' font-family='Arial' font-size='40' font-weight='bold' text-anchor='middle' dy='.3em' fill='%238b5cf6'%3EDI%3C/text%3E%3C/svg%3E" alt="" className="w-10 h-10 rounded block object-cover align-middle" />
                                            <div className="ml-2">
                                                <div className="text-[15px] text-gray-100 font-medium truncate">Nome</div>
                                                <div className="text-[13px] text-gray-400">email@gmail.com</div>
                                            </div>
                                        </a>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                        )}
                    </li>
                    <li className="mr-4 relative">
                        <button type="button" className="mt-1" onClick={toggleDropdownPerf}>
                            <img
                                className="w-8 h-8 rounded block object-cover align-middle"
                                src={administrador.administradorImg}
                                alt={`Imagem de ${administrador.nome}`}
                                onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' rx='50' ry='50' fill='%23ddd6fe' /%3E%3Ctext x='50' y='50' font-family='Arial' font-size='40' font-weight='bold' text-anchor='middle' dy='.3em' fill='%238b5cf6'%3E${administrador.nome.substring(0, 2).toUpperCase()}%3C/text%3E%3C/svg%3E` ;
                                }}
                            />
                        </button>
                        {isDropdownOpenPerf && (
                        <ul className="absolute mt-3 right-0 z-10 w-80 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                            <li>
                                <a href="#" className="py-2 px-4 rounded-md flex items-center hover:bg-gray-600 group">
                                    <img 
                                        className="w-10 h-10 rounded block object-cover align-middle"
                                        src={administrador.administradorImg}
                                        alt={`Imagem de ${administrador.nome}`}
                                        onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' rx='50' ry='50' fill='%23ddd6fe' /%3E%3Ctext x='50' y='50' font-family='Arial' font-size='40' font-weight='bold' text-anchor='middle' dy='.3em' fill='%238b5cf6'%3E${administrador.nome.substring(0, 2).toUpperCase()}%3C/text%3E%3C/svg%3E` ;
                                        }}
                                    />
                                    <div className="ml-2">
                                        <div className="text-[15px] text-gray-100 font-medium">{administrador.nome}</div>
                                        <div className="text-[13px] text-gray-300">{administrador.email}</div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <button className="flex items-center hover:bg-gray-600 " onClick={() => signOut()}>
                                <div className="py-2 px-4 text-[16px]  font-semibold text-gray-100  flex items-center border-b-2 border-b-transparent active">Sair</div>
                                <BiSolidArrowToRight className="ml-52 text-2xl text-violet-50" />
                                </button>
                            </li>
                        </ul>
                        )}
                    </li>
                </ul>
            </div>
            
            <div className="p-6">
                <Outlet />
            </div>
        </main>

        </>
    );
}