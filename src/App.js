import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";


function App() {

    //var de estado
  const [projects, setProjects] = useState([])


  useEffect(() => {
    api.get('repositories').then(response => {
      
  })
 },[])



  async function handleAddRepository() {
    const response = await api.post('repositories', {
    "title": "teste2",
    "url": "www.ta.com.br",
    "techs": ["Node","React"]}
    )
      const project = response.data

      setProjects([...projects, project])

      console.log(response.data)
  }

  async function handleRemoveRepository(id) {
    // TODO list:  {projects.map(project =>  <li id={project.id} key={project.id}  > {project.title}  })
     
  }

  return (
    <div>
      <ul data-testid="repository-list">
      <li>            

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
