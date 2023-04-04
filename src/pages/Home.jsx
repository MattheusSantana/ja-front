import React from 'react'
import { useEffect, useState } from "react";
import EditableRow from '../components/EditableRow.jsx';
import ReadOnlyRow from '../components/ReadOnlyRow.jsx';
import SearchComponent from '../components/SearchComponent.jsx';
import { getProjects, createProject, updateProject, deleteProject, doneProject } from '../services/api.js';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addFormData, setAddFormData] = useState({
    title: '',
    zip_code: '',
    cost: 0,
    deadline: ''
  });

  const [editProjectId, setEditProjectId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    zip_code: '',
    cost: 0,
    deadline: ''
  });

  
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...editFormData};
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);

  };

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };
  
  const handleEditClick = (event, project) => {
    event.preventDefault();
    setEditProjectId(project.id);   

    const formValues = {
      title: project.title,
      zip_code: project.zip_code,
      cost: project.cost,
      deadline: project.deadline,
      id: project.id,
      username: project.username
    }

      setEditFormData(formValues);
  }

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

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    const editedProject = {
      title: editFormData.title,
      zip_code: editFormData.zip_code,
      cost: editFormData.cost,
      deadline: editFormData.deadline,
      id: editProjectId,
    }

    const response = await updateProject(editedProject);

    if(response.status === 201){
      const response = await getProjects();
      setProjects(response.data);
      setLoading(false);
      handleCancelClick();
    }
  }

  const handleCancelClick = () => {
    setEditProjectId(null);
  }

  const handleDeleteClick = async (event, project) => {
    event.preventDefault();

    try {
      const response = await deleteProject(project.id);
      
      if (response.status === 200) {
        const response = await getProjects();
        setProjects(response.data);
        setLoading(false);
      }

    } catch (e) {
      return alert("something failed, please try again later");
    }
  };

  const handleDoneClick = async (event, project) => {
    event.preventDefault();

    try {
      const response = await doneProject(project.id);
      
      if (response.status === 201) {
        const response = await getProjects();
        setProjects(response.data);
        setLoading(false);
      }

    } catch (e) {
      return alert("something failed, please try again later");

    }
  };

  useEffect(() => {
    (async () => {
      const response = await getProjects();
      setProjects(response.data);
      setLoading(false);
    })();
  }, []);

  if(loading) {
      return <div>Loading Projects...</div>
  }

  return (
    <>
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
        <form onSubmit={handleEditFormSubmit}>
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
                {editProjectId === project.id ? (
                  <EditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}/>

                ) : (
                  <ReadOnlyRow project={project} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} handleDoneClick={handleDoneClick}/>
                )}


            
            </tbody>
            ))}
            </table>
      </form>


      <br/>
      <br/>
      
      <SearchComponent />

    </>
  );
}

export default Home