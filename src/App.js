import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    api
      .post('repositories', { title: `Repository #${Date.now()}`})
      .then(response => {
        setRepositories([ ... repositories, response.data])
      });
  }

  async function handleRemoveRepository(id) {
    api
      .delete(`repositories/${id}`)
      .then(response => {
        setRepositories(repositories.filter((repository) => repository.id != id));
      });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
