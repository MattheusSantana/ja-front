import React from 'react'
import { useEffect, useState } from "react";
import { getProjects, createProject } from '../services/api.js';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addFormData, setAddFormData] = useState({
    title: '',
    zip_code: '',
    cost: 0,
    deadline: ''
  });

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    const newProject = {
      title: addFormData.title,
    zip_code: addFormData.zip_code,
    cost: addFormData.cost,
    deadline: addFormData.deadline,
    username: user.username
    };


    const response = await createProject(newProject);

    if(response.status === 201){
      const response = await getProjects();
      setProjects(response.data);
      setLoading(false);
    }
  };



  useEffect(() => {
    (async () => {
      const response = await getProjects();
      setProjects(response.data);
      setLoading(false);
    })();
  }, []);

  const edit = object => {
    let i = projects.findIndex (project => project.id === object.id);
    projects[i].isEditing = true;
    console.log('project', projects[i]);
    console.log(projects);
  };

  const done = project => {
    console.log('project', project);
  };

  const deleteProject = project => {
    console.log('project', project);
  };

  if(loading) {
      return <div>Loading Projects...</div>
  }

  return (
    <>
        Home  
        <h2> Add project</h2>
        <form onSubmit={handleAddFormSubmit}>
          <input type="text" name='title' placeholder='Title' onChange={handleAddFormChange}/>
          <input type="text" name='zip_code' placeholder='zip code' onChange={handleAddFormChange}/>
          <input type="text" name='cost' placeholder='cost' onChange={handleAddFormChange}/>
          <input type="text" name='deadline' placeholder='deadline' onChange={handleAddFormChange}/>
          <button type='submit'>Add</button>
        </form>

        <br/>
        <br/>
        <table>
          <thead>
              <tr>
                <th>Project</th>
                <th>zip code</th>
                <th>cost</th>
                <th>deadline</th>
                <th>Action</th>
              </tr>
          </thead>
          {projects.map((project) => (
          <tbody key={project.id}>
            <tr>
              <td>
                {project.title}
                </td>
              <td>{project.zip_code}</td>
              <td>{project.cost}</td>
              <td>{project.deadline}</td>
              <td>
              {project.isEditing ?  
              <>
                <button onClick={e => this.saveEditTask (project)}>
                    Save
                </button>
                
                <button onClick={e => this.edit (project)}>
                    Cancel
                </button>
                
              </>
                :
               <>
                <button onClick={e => edit (project)}>Edit</button>
                <button onClick={e => done (project)}>Done</button>
                <button onClick={e => deleteProject (project)}>Delete</button>
              </>}
              </td>
            </tr>
          </tbody>
           ))}
          </table>
    </>
  );
}

export default Home