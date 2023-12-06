import { useParams } from "react-router-dom";
import { api } from '../../../services/api';
import { useState, useEffect } from 'react';
import { AtualizarInformacao } from "./AtualizarInformacao";

export const ExibirInformacao = () => {
    const { id3 } = useParams();
    const TABLE_HEAD = ["", "IMC", "Massa Magra", "Massa Gorda", "Peso", "Altura", "Status", "Ações"];

    const [infoNutri, setinfoNutri] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        const getCardapioAtleta = async () => {
            try {
                const response = await api.get(`/nutricionista/atleta/${id3}`);
                setinfoNutri(response.data);
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        getCardapioAtleta()
    }, [id3]);

    const handleAddModal = async () => {
        setShowAddModal(!showAddModal);
      };

    return (
        <>
            <div className="flex items-center mt-4">
                <div className="mr-4">
                    {infoNutri.atletaImg && <img
                                className="w-11 h-11 rounded-full"
                                src={infoNutri.atletaImg}
                                alt={`Imagem de ${infoNutri.nome}`}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' rx='50' ry='50' fill='%23ddd6fe' /%3E%3Ctext x='50' y='50' font-family='Arial' font-size='40' font-weight='bold' text-anchor='middle' dy='.3em' fill='%238b5cf6'%3E${infoNutri.nome.toUpperCase()}%3C/text%3E%3C/svg%3E`;
                                }}
                              />}
                </div>
                <div>
                    <h2 className="text-xl font-bold">{infoNutri.nome} {infoNutri.sobrenome}</h2>
                    <p className="text-gray-500"></p>
                </div>
            </div>
            <table className="mt-4 w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                    <tr>
                        {TABLE_HEAD.map((head, index) => (
                            <th key={index} scope="col" className="px-2 py-3">
                                {head}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b hover:bg-gray-100">
                        <td className="w-4 p-4"></td>
                        <td className="px-2 py-4">
                            {infoNutri.imc === null ? "Não Informado": infoNutri.imc  }
                        </td>
                        <td className="px-2 py-4">
                            {infoNutri.massaMagra === null ?  "Não Informado" : infoNutri.massaMagra}
                        </td>
                        <td className="px-2 py-4">
                            {infoNutri.massaGorda === null ? "Não Informado" : infoNutri.massaGorda}
                        </td>
                        <td className="px-2 py-4">
                            {infoNutri.peso === null ? "Não Informado" : infoNutri.peso}
                        </td>
                        <td className="px-2 py-4">
                            {infoNutri.altura === null ? "Não Informado" : infoNutri.altura}
                        </td>
                        <td className="px-2 py-4">
                            {infoNutri.statusImc === null ? "Não Informado": infoNutri.statusImc }
                        </td>
                        <td className="px-2 py-4 flex flex-row gap-4">
                            <button onClick={() => handleAddModal()} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition duration-150 ease-in-out hover:bg-green-600 bg-green-700 rounded text-white px-8 py-2 text-sm focus:border-green-700">Atualizar Informação Nutricional</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            {showAddModal && (
                <AtualizarInformacao 
                    setShowAddModal={setShowAddModal}
                    id3={id3}
                    setinfoNutri={setinfoNutri}
                    infoNutri={infoNutri}
                />
            )}
        </>
    )
}
