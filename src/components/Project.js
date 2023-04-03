
const Project = (project) => {
  
  const edit = project => {
        console.log(project);
      };
    
      const done = project => {
        console.log('project', project);
      };
    
      const deleteProject = project => {
        console.log('project', project);
      };
  return (
    <tr>
              <td contenteditable={project.isEditing ? true : false}>
                {project.title} {project.isEditing}
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
  )
}

export default Project