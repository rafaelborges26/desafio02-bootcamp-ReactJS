import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";


function App() {

    //var de estado
  const [ repositories, setrepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
     setrepositories(response.data) 
  })
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
    title: `Repositorio ${Date.now()}`,
    url: "www.ta.com.br",
    techs: ["Node","React"]}
    )
      const repository = response.data

      setrepositories([...repositories, repository])
      
      //console.log(response.data)
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const arrayRepository = repositories.filter(repository => repository.id !== id)    
    setrepositories(arrayRepository)

  }    

  return (
    <div>
      <>
      <ul data-testid="repository-list">
          <h2>Repositorios</h2>
          {repositories.map(repository =>  <li key={repository.id}  > {repository.title} 
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li> )}            
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
      </>
    </div>
  );
}

export default App;
