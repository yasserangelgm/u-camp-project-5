import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

/* import useRefreshToken from '../../hooks/useRefreshToken'; */
const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  /* const refresh = useRefreshToken(); */
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (error) {
        if (error?.code === 'ERR_CANCELED') return;
        else {
          /* navigate('/login', { state: { from: location }, replace: true }); */
          console.log(error);
        }
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Lista de usuarios</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.name}</li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios que mostrar</p>
      )}
      {/* <button onClick={() => refresh()}>Refrescar Token</button> */}
    </article>
  );
};

export default Users;
