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
      }



  return (
    <form onSubmit={handleSearchProjectById}>

        
    <h2>Search project</h2>
    <div>
      <input type="text" name='id' placeholder='enter project id' onChange={(e) => setSearchProjectId(e.target.value)}/>
      <button type="text">search</button>
    </div>

    {project ? 
        <table>
            <thead>
                <tr>
                    <th>Project</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>City</th>
                    <th>cost</th>
                    <th>deadline</th>
                </tr>
            </thead>
            
            <tbody>
                <tr>
                    <td>{project.title}</td>
                    <td>{project.country}</td>
                    <td>{project.state}</td>
                    <td>{project.city}</td>
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