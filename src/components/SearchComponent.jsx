import React, { useState } from 'react'
import { searchProjectById } from '../services/api';

const SearchComponent = () => {
    const [searchProjectId, setSearchProjectId] = useState(null);
    const [project, setProject ] = useState(null); 



    const handleSearchProjectById = async (event) => {
        event.preventDefault();
        
    
        try {
          const response = await searchProjectById(searchProjectId);
          let project = response.data;
          setProject(project);
        } catch (e) {
          return alert("Project not found");
    
        }
        
        event.target.reset();
    };

    const clearSearch = () => {
        setProject(null);
    }



  return (
    <form onSubmit={handleSearchProjectById}>

        
    <h2>Search project</h2>
    <div>
      <input type="text" name='searchProjectId' placeholder='enter project id' onChange={(e) => setSearchProjectId(e.target.value)}/>
      <button type="text">search</button>
      <button type="button" onClick={clearSearch}>clear</button>
    </div>

    {project ? 
        <table>
            <thead>
                <tr>
                    <th>Project</th>
                    <th>Location</th>
                    <th>cost</th>
                    <th>deadline</th>
                </tr>
            </thead>
            
            <tbody>
                <tr>
                    <td>{project.title}</td>
                    <td>{project.state} - {project.city}</td>
                    <td>{project.cost}</td>
                    <td>{project.deadline}</td>
                </tr>
            </tbody>
        </table>

    : <></>}

    </form>
  )
}

export default SearchComponent