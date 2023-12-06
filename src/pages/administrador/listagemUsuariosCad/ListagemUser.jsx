import { ModalUser } from './ModalUser';
import { useTable } from '../../../hooks/administrador/useTable';
import Pagination from 'react-js-pagination';
import { DeleteUser } from './DeleteUser';

export const ListagemUser = () => {

  const { searchQuery, TABLE_HEAD, users, showAddModal, user,
          handleSearchChange, handleAddModal, setShowAddModal, 
          setUsers, setUser, handleSearchClick, showDeleteModal, 
          handleDeleteClick, handleCancelDelete, handleConfirmDelete, activePage, totUser, max_items, handlePageChange } = useTable()
  return (
    <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-50">
                    <div>
                        <button className="text-gray-900 font-bold ml-4 mt-4">LISTA DE<span className='bg-violet-500 text-white'> USUÁRIOS</span></button>
                    </div>
                    <div className="flex m-4 p-1">
                      <input
                        type="text"
                        placeholder="Pesquisar Usuário"
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
                    
                </div>

                
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th key={head} scope="col" className="px-6 py-3">
                          {head}
                        </th>
                      ))}
                  </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="bg-white border-b hover:bg-gray-100">
                            <td className="w-4 p-4">
                            </td>
                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
                            <img
                                className="w-11 h-11 rounded-full"
                                src={user.urlImg}
                                alt={`Imagem de ${user.nome}`}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' rx='50' ry='50' fill='%23ddd6fe' /%3E%3Ctext x='50' y='50' font-family='Arial' font-size='40' font-weight='bold' text-anchor='middle' dy='.3em' fill='%238b5cf6'%3E${user.sigla.toUpperCase()}%3C/text%3E%3C/svg%3E`;
                                }}
                              />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">{user.nome} {user.sobrenome}</div>
                                    <div className="font-normal text-gray-500">{user.email}</div>
                                </div>  
                            </th>
                            <td className="px-6 py-4">
                              {user.cpf === null ? 'Não Informado': user.cpf}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                  {user.tipo === null ? 'Não Informado': user.tipo}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="font-medium text-violet-500 hover:underline mr-4" onClick={() => handleAddModal(user.id)}>Editar</button>
                                    <button className="font-medium text-red-500  hover:underline mr-4" onClick={() => handleDeleteClick(user.id)}>Excluir</button>
                        </td>
                        </tr>
                        ))}
                    </tbody>
                </table>

                {users.length === 0 && (
                      <div className='flex justify-center items-center mt-5'>
                        <div className='text-gray-400 font-bold text-xl'>Usuário não encontrado</div>
                      </div>   
                )}

                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={max_items}
                    totalItemsCount={totUser}
                    pageRangeDisplayed={4}
                    onChange={handlePageChange}
                    innerClass='flex justify-center m-10'
                    itemClass="h-10 w-10 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer hover:scale-105 border-red-500 hover:bg-violet-500 hover:text-white cursor-pointer transform bg-scale-100"
                    activeClass='bg-violet-500 text-white'
                />
            </div>
                {showAddModal && (
                  <ModalUser 
                    setShowAddModal={setShowAddModal}
                    showAddModal={showAddModal}
                    user={user}
                    setUsers={setUsers}
                    setUser={setUser}
                  />
                )}

                {showDeleteModal && (
                  <DeleteUser 
                    handleCancelDelete={handleCancelDelete}
                    handleConfirmDelete={handleConfirmDelete}
                  />
                )}

    </>
  );
};
