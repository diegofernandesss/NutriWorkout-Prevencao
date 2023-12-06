export const DeleteUser = ({ handleCancelDelete, handleConfirmDelete }) => {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="modal-overlay fixed inset-0 bg-gray-900 transition-opacity bg-opacity-50"></div>
                <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50">
                  <div className="modal-content py-4 px-6">
                    <h3 className="text-xl font-sembold mb-2">Confirmar exclusão</h3>
                    <p className="text-gray-700 mb-4">
                      Você deseja realmente <span className="font-bold">EXCLUIR?</span>
                    </p>
                    <div className="modal-buttons flex justify-end">
                      <button
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm mr-2" type="button"
                        onClick={handleCancelDelete}
                      >
                        Cancelar
                      </button>
                      <button
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-150 ease-in-out hover:bg-red-500 bg-red-600 rounded text-white px-8 py-2 text-sm" type="button"
                        onClick={handleConfirmDelete}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
        </>
    )
}