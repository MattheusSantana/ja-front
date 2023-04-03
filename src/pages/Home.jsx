import React from 'react'
import { useEffect, useState } from "react";
import Project from '../components/Project.js';
import { getProjects } from '../services/api.js';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getProjects();
      setProjects(response.data.map(project => {
        return {...project, isEditing: false}
      }));
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
            <Project { ...project}></Project>
          </tbody>
           ))}
          </table>
      </p>
    </>
  );
}

export default Home