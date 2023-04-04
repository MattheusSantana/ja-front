import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import EditableRow from '../components/EditableRow.jsx';
import ReadOnlyRow from '../components/ReadOnlyRow.jsx';
import SearchComponent from '../components/SearchComponent.jsx';
import { getProjects, createProject, updateProject, deleteProject, doneProject } from '../services/api.js';
import moment from 'moment';

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

  const navigate = useNavigate();

  
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...editFormData};
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);

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

  const handleDataTime = (dateTime) => {
    const newDate = moment(dateTime).format('YYYY-MM-DDTHH:mm:SS');
    console.log('nova', newDate);
    return newDate;
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    const deadline = handleDataTime(editFormData.deadline);
    const editedProject = {
      title: editFormData.title,
      zip_code: editFormData.zip_code,
      cost: editFormData.cost,
      deadline: deadline,
      id: editProjectId,
    }

    const response = await updateProject(editedProject);

    if(response.status === 201){
      handleCancelClick();
      window.location.reload(true);
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
        setLoading(false);
        window.location.reload(true);
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
        setLoading(false);
        window.location.reload(true);
      }

    } catch (e) {
      return alert("something failed, please try again later");

    }
  };

  const handleDeadline = (projects) => {
      const newProjects = projects.map(project => {
      project.deadline = moment(project.deadline).format("YYYY-MM-DD HH:mm:ss");
      return project
    });
    return newProjects;
  }

  useEffect(() => {
    (async () => {
      const response = await getProjects();
      const projects = handleDeadline(response.data)
      

      setProjects(projects);
      setLoading(false);
    })();
  }, []);

  if(loading) {
      return <div>Loading Projects...</div>
  }
      
  const navigateToCreateProject = () => {
    navigate("/project");
  }

  return (
    <>
      <div style={{float: "right"}}>
        <button onClick={navigateToCreateProject}>New</button>
      </div>
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
      
      <SearchComponent />
    </>
  );
}

export default Home;