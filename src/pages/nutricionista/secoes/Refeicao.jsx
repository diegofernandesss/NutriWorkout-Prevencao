import { ModalRefeicao } from "./ModalRefeicao"
import { api } from '../../../services/api'
import { useState, useEffect } from 'react';

export const Refeicao = ({ cardapio }) => {
    const TABLE_HEAD_REFEICAO = ["", "Dia da Semana", "Tipo de Refeição" , "Nome da Refeição" , "Ações"];

    const [showAddModal, setShowAddModal] = useState(false);

    return(
        <>
             <div className="flex justify-between items-start mb-4 mt-4">
                      <div className="font-medium text-xl">Refeição</div>
                  </div>

                  <table className="mt-4 w-full text-sm text-left rtl:text-right text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                          {TABLE_HEAD_REFEICAO.map((head) => (
                            <th key={head} scope="col" className="px-2 py-3">
                              {head}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {cardapio.map((refeicao) => (
                          refeicao.refeicoes.length > 0 ? (
                            <tr key={refeicao.refeicoes[0].id} className="bg-white border-b hover:bg-gray-100">
                              <td className="w-4 p-4">
                              </td>
                              <td className="px-2 py-4">
                                {refeicao.refeicoes[0].diaSemana}
                              </td>
                              <td className="px-2 py-4">
                                {refeicao.refeicoes[0].tipoRefeicao}
                              </td>
                              <td className="px-2 py-4">
                                {refeicao.refeicoes[0].nome}
                              </td>
                              <td className="px-2 py-4 flex flex-row gap-4">
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition duration-150 ease-in-out hover:bg-green-600 bg-green-700 rounded text-white px-8 py-2 text-sm  focus:border-green-700" >Detalhes Ingredientes</button>
                              </td>
                            </tr>
                          ) : (
                           
                            <tr key={refeicao.id} className="bg-white border-b hover:bg-gray-100">
                              <td className="w-4 p-4"></td>
                              <td className="px-2 py-4" colSpan={TABLE_HEAD_REFEICAO.length}>
                                <div className='flex justify-center items-center'>
                                  <div className='text-gray-400 font-bold text-xl'>Refeição não cadastrada</div>
                                </div>
                              </td>
                            </tr>
                          )
                        ))} 
                      </tbody> 
                    </table>
                    <button className="mt-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-700 transition duration-150 ease-in-out hover:bg-violet-600 bg-violet-700 rounded text-white px-8 py-2 text-sm focus:border-violet-700"> Cadastrar </button>

                    {showAddModal && (
                      <ModalRefeicao 
                        cardapio={cardapio}
                        setShowAddModal={setShowAddModal}
                      />
                    )}
                    
        </>
    )
}