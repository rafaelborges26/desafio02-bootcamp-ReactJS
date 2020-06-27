import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";


function App() {

    //var de estado
  const [ repositorys, setrepositorys] = useState([])
 // const { Repositorydeleted, UnsetRepository } = useState('')


  useEffect(() => {
    api.get('repositories').then(response => {
     setrepositorys(response.data) 
  })
  },[])



  async function handleAddRepository() {
    const response = await api.post('repositories', {
    title: `Repositorio ${Date.now()}`,
    url: "www.ta.com.br",
    techs: ["Node","React"]}
    )
      const repository = response.data

      setrepositorys([...repositorys, repository])
      
      //console.log(response.data)
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)


    const arrayRepository = repositorys.filter(repository => repository.id !== id)
    
    setrepositorys(arrayRepository)

  }  
    //, {
      //id: id
    //} )
    //alert(id)
     
  

  return (
    <div>
      <>
      <ul data-testid="repository-list">
          <h2>Repositorios</h2>
        {repositorys.map(repository =>  <li key={repository.id}  > {repository.title} 
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
