import { api } from '../../services/api';
import { useEffect, useState } from 'react'

export const useTable = () => {

    const TABLE_HEAD = ["", "Usuário", "CPF", "Tipo", "Ações"];
  
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [activePage, setActivePage] = useState(1);
    const [totUser, setTotUser] = useState(0)
    const max_items = 5

    const handlePageChange = (pageNumber) => {
      setActivePage(pageNumber);
      window.scrollTo(0, 0);
    }
  
    const getUsers = async () => {
      try {
        const response = await api.get(`usuarios/${activePage}/${max_items}`);
        setUsers(response.data.usuarios);
        setTotUser(response.data.totalUsuarios)

      } catch (error) {
        console.error(error);
      } 
    };

    useEffect(() => {
      getUsers();
    }, [activePage]);

    const handleDelete = async (id) => {
      try {
        await api.delete(`usuario/${id}`);
        setUsers((prevData) => prevData.filter((usuario) => usuario.id !== id));
      } catch (error) {
        console.error("Error ao Deletar Ingrediente", error);
      }
    };

    
    const handleDeleteClick = (id) => {
      setShowDeleteModal(true);
      setDeletingId(id);
    };
  
    const handleCancelDelete = () => setShowDeleteModal(false);
  
    const handleConfirmDelete = () => {
      if (deletingId) {
        handleDelete(deletingId);
        setShowDeleteModal(false);
      }
    };
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleSearchClick = async () => {
      if (searchQuery.length >= 3) {
        try {
          const response = await api.get(`usuarios/${searchQuery}`);
          setUsers(response.data);
        } catch (error) {
          console.error(error);
        } 
      } else {
        getUsers();
      }
    };

    const handleAddModal = async (id) => {
      setShowAddModal(!showAddModal);
      if (id) {
        try {
          const response = await api.get(`usuario/${id}`);
          setUser(response.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        setUser({});
      }
    }

    return {
        searchQuery,
        TABLE_HEAD,
        users,
        showAddModal,
        user,
        handleSearchChange,
        handleAddModal,
        handleDelete,
        setShowAddModal,
        setUsers,
        setUser,
        handleSearchClick,
        showDeleteModal,
        handleDeleteClick,
        handleCancelDelete,
        handleConfirmDelete,
        activePage,
        totUser,
        max_items,
        handlePageChange
    }
}