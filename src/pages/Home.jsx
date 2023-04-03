import React from 'react'
import { useEffect, useState } from "react";
import { getProjects } from '../services/api.js';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <p>
        Home
        
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
          <tbody>
            <tr>
              <td>{project.title}</td>
              <td>{project.zip_code}</td>
              <td>{project.cost}</td>
              <td>{project.deadline}</td>
              <td>
                <button onClick={e => this.edit (project)}>Edit</button>
                <button onClick={e => this.done (project)}>Done</button>
                <button onClick={e => this.delete (project)}>Delete</button>
              </td>
            </tr>
          </tbody>
           ))}
          </table>
      </p>
    </>
  );
}

export default Home