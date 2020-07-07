import React, { useState, useEffect } from 'react';
import api from 'services/api';

import './styles.css';

const Repository = ({ id, title, handleRemoveRepository }) => (
  <li>
    {title}
    <button onClick={() => handleRemoveRepository(id)}>Remover</button>
  </li>
);

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    api
      .post('/repositories', {
        title: 'Novo Repositório',
        url: '',
        techs: [],
      })
      .then(({ data }) => {
        if (data) {
          setRepositories([...repositories, data]);
        }
      });
  }

  async function handleRemoveRepository(id) {
    const repo = [...repositories];
    const index = repo.findIndex((element) => element.id === id);
    if (index >= 0) {
      api.delete(`/repositories/${id}`).then(() => {
        repo.splice(index, 1);
        setRepositories(repo);
      });
    }
  }

  useEffect(() => {
    api.get('/repositories').then((result) => setRepositories(result.data));
  }, []);

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map(({ id, title }) => (
          <Repository
            key={id}
            id={id}
            title={title}
            handleRemoveRepository={handleRemoveRepository}
          />
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
