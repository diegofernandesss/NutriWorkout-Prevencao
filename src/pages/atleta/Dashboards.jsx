import { api } from "../../services/api";
import { toast } from "react-toastify";

export const Dashboards = () => {
    const notifyError = (error) => toast.error(error.response.data.descricao);
    const notifySuccess = (response) => toast.success(response.data.descricao);

    const solicitarPersonal = async () => {
        try {
            const response = await api.post('/atleta/solicitar-personal');
            notifySuccess(response)
        } catch (error){
            notifyError(error)
        }
    }

    const CancelarPersonal = async () => {
        try {
            const response = await api.delete('/atleta/solicitar-personal');
            notifySuccess(response)
        } catch (error){
            notifyError(error)
        }
    }

    const solicitarNutricionista = async () => {
        try {
            const response = await api.post('/atleta/solicitar-nutricionista');
            notifySuccess(response)
        } catch (error){
            notifyError(error)
        }
    }

    const CancelarNutricionista = async () => {
        try {
            const response = await api.delete('/atleta/solicitar-nutricionista');
            notifySuccess(response)
        } catch (error){
            notifyError(error)
        }
    }
    
    return (
        <>
             {/** Dashboard */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-6">
                            <div>
                                <div className="text-2xl text-violet-900 font-bold mb-1">25.1 kg/m2</div>
                                <div className="text-lg font-medium text-gray-400">IMC Atual</div>
                            </div>
                            
                        </div>
                        <div className="flex items-center">
                            <div className="w-full bg-gray-100 rounded-full h-4">
                                <div className="h-full bg-violet-500 rounded-full p-1" style={{width: "60%"}}>
                                    <div className="w-2 h-2 rounded-full bg-white ml-auto"></div>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-gray-600 ml-4">60%</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-10">
                            <div>
                                <div className="text-2xl text-violet-900 font-bold mb-1">Nutricionista</div>

                            </div>
                            
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={solicitarNutricionista} className="bg-violet-600 text-medium text-white py-2 px-2 rounded-full hover:bg-violet-500">Solicitar</button>
                            <button onClick={CancelarNutricionista} className="bg-violet-600 text-medium text-white py-2 px-2 rounded-full hover:bg-violet-500">Cancelar</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-10">
                            <div>
                                <div className="text-2xl text-violet-900 font-bold mb-1">Personal Trainer</div>

                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={solicitarPersonal} className="bg-violet-600 text-medium text-white py-2 px-2 rounded-full hover:bg-violet-500">Solicitar</button>
                            <button onClick={CancelarPersonal} className="bg-violet-600 text-medium text-white py-2 px-2 rounded-full hover:bg-violet-500">Cancelar</button>
                        </div>
                    </div>

                    
                </div>

                {/** Table */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/10 p-6 rounded-md">
                        <div className="flex justify-between items-start mb-4">
                            <div className="font-medium text-xl">Cardápio</div>
                        </div>
                        <div className="flex items-center order-tab gap-3 mb-4">
                            <button type="button" className="bg-gray-50 text-medium text-gray-400 py-2 px-2 rounded-bl-md hover:text-gray-600 active">Segunda-Feira</button>
                            <button type="button" className="bg-gray-50 text-medium text-gray-400 py-2 px-2 rounded-bl-md hover:text-gray-600 ">Terça-Feira</button>
                            <button type="button" className="bg-gray-50 text-medium text-gray-400 py-2 px-2 rounded-bl-md hover:text-gray-600 ">Quarta-Feira</button>
                            <button type="button" className="bg-gray-50 text-medium text-gray-400 py-2 px-2 rounded-bl-md hover:text-gray-600 ">Quinta-Feira</button>
                            <button type="button" className="bg-gray-50 text-medium text-gray-400 py-2 px-2 rounded-bl-md hover:text-gray-600 ">Sexta-Feira</button>
                            <button type="button" className="bg-gray-50 text-medium text-gray-400 py-2 px-2 rounded-bl-md hover:text-gray-600 ">Sábado</button>
                            <button type="button" className="bg-gray-50 text-medium text-gray-400 py-2 px-2 rounded-bl-md hover:text-gray-600 ">Domingo</button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[540px]">
                                <thead>
                                    <tr>
                                        <th className="text-[12px] uppercase tracking-wide font-semibold text-gray-600 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Horários</th>
                                        <th className="text-[12px] uppercase tracking-wide font-semibold text-gray-600 py-2 px-4 bg-gray-50 text-left">Refeição</th>
                                        <th className="text-[12px] uppercase tracking-wide font-semibold text-gray-600 py-2 px-4 bg-gray-50 text-left">Ingredientes</th>
                                        <th className="text-[12px] uppercase tracking-wide font-semibold text-gray-600 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="py-2 px-4">
                                                <span className="text-gray-600 text-[13px] font-medium hover:text-violet-500 ">7-10 h</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="py-2 px-4">
                                                <span className="text-[13px] font-medium text-violet-600">Café da manhã</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="py-2 px-4">
                                                <span className="text-[13px] font-medium text-violet-600">Cuscuz com Ovo e Suco Natural</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="py-2 px-4">
                                                <span className="text-[13px] font-medium text-violet-600">11/11/2023</span>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div className="py-2 px-4">
                                                <span className="text-gray-600 text-[13px] font-medium hover:text-violet-500 ">12-13 h</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="py-2 px-4">
                                                <span className="text-[13px] font-medium text-violet-600">Almoço</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="py-2 px-4">
                                                <span className="text-[13px] font-medium text-violet-600">Arroz, Feijão, Macaxeira</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="py-2 px-4">
                                                <span className="text-[13px] font-medium text-violet-600">11/11/2023</span>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div className="py-2 px-4">
                                                <span className="text-gray-600 text-[13px] font-medium hover:text-violet-500 ">18-20 h</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="py-2 px-4">
                                                <span className="text-[13px] font-medium text-violet-600">Janta</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="py-2 px-4">
                                                <span className="text-[13px] font-medium text-violet-600">Cuscuz com mortadelae e leite</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="py-2 px-4">
                                                <span className="text-[13px] font-medium text-violet-600">11/11/2023</span>
                                            </div>
                                        </td>
                                    </tr>

                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
        </>
    )
}