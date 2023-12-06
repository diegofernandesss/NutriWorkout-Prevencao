import Pagination from 'react-js-pagination';
import { useState, useEffect } from 'react';
import {api} from  '../../services/api'
import { useNavigate} from "react-router-dom";

export const Home = () => {
    const TABLE_HEAD = ["", "Usuário", "CPF", "Tipo", "Ações"];

    const [atletaNutri, setAtletaNutri] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totAtletaNutri, setTotAtletaNutri] = useState(0)
    const [searchQuery, setSearchQuery] = useState('');
    const max_items = 3;
    const navigate = useNavigate();

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
        window.scrollTo(0, 0);
      }

    const getAtletaNutri = async () => {
        try {
          const response = await api.get(`/nutricionista/atleta/${activePage}/${max_items}`);
          setAtletaNutri(response.data.atletasNutricionista);
          setTotAtletaNutri(response.data.totalAtletas);
        } catch (error) {
          console.error(error);
        } 
      };
  
      useEffect(() => {
        getAtletaNutri();
      }, [activePage]);

      const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
      };

      const handleSearchClick = async () => {
        if (searchQuery.length >= 3) {
          try {
            const response = await api.get(`nutricionista/atleta/${searchQuery}`);
            setAtletaNutri(response.data);
          } catch (error) {
            console.error(error);
          } 
        } else {
          getAtletaNutri();
        }
      };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/10 p-6 rounded-md">
                        <div className="flex justify-between items-start mb-4">
                            <div className="font-medium text-xl">Listagem de Atletas</div>
                        </div>

                        <div className="flex ">
                            <input
                                type="text"
                                placeholder="Pesquisar Atleta"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-violet-700"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <button
                                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-700 transition duration-150 ease-in-out hover:bg-violet-600 bg-violet-700 rounded text-white px-8 py-2 text-sm ml-2 focus:border-violet-700"
                                onClick={() => handleSearchClick()}
                            >
                                Pesquisar
                            </button>
                        </div>

                        <table className="mt-4 w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                                        <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th key={head} scope="col" className="px-2 py-3">
                                            {head}
                                            </th>
                                        ))}
                                    </tr>
                            </thead>
                    <tbody>
                    {atletaNutri.map((atleta) => (
                        <tr key={atleta.id} className="bg-white border-b hover:bg-gray-100">
                            <td className="w-4 p-4">
                            </td>
                            <th scope="row" className="flex items-center px-0 py-4 text-gray-900 whitespace-nowrap ">
                                <div className="ps-2">
                                    <div className="text-base font-semibold">{atleta.nome}</div>
                                    <div className="font-normal text-gray-500">{atleta.email}</div>
                                </div>  
                            </th>
                            <td className="px-2 py-4">
                                  {atleta.cpf === null ? 'Não Informado': atleta.cpf}
                            </td>
                            <td className="px-2 py-4">
                                <div className="flex items-center">
                                  {atleta.tipo === null ? 'Não Informado': atleta.tipo}
                                </div>
                            </td>
                            <td className="px-2 py-4 flex flex-1 gap-5">
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition duration-150 ease-in-out hover:bg-green-600 bg-green-700 rounded text-white px-8 py-2 text-sm  focus:border-green-700" onClick={() => navigate(`cardapio/${atleta.id}/${atleta.nome}`)}>Cardápio</button>
                                <button onClick={() => navigate(`informacao-nutricional/${atleta.id}`)} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition duration-150 ease-in-out hover:bg-blue-600 bg-blue-700 rounded text-white px-8 py-2 text-sm  focus:border-blue-700" >Info. Nutricionais</button>
                        </td>
                        </tr>
                        ))}
                    </tbody>
                </table>

                {atletaNutri.length === 0 && (
                      <div className='flex justify-center items-center mt-5'>
                        <div className='text-gray-400 font-bold text-xl'>Atleta não encontrado</div>
                      </div>   
                )}
                        <Pagination
                        activePage={activePage}
                        itemsCountPerPage={max_items}
                        totalItemsCount={totAtletaNutri}
                        pageRangeDisplayed={4}
                        onChange={handlePageChange}
                        innerClass='flex justify-center m-10'
                        itemClass="h-10 w-10 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer hover:scale-105 border-red-500 hover:bg-violet-500 hover:text-white cursor-pointer transform bg-scale-100"
                        activeClass='bg-violet-500 text-white'
                />
                    </div>

                    
                </div>

        </>
    );
}