import React from 'react'

const ReadOnlyRow = ({project, handleEditClick, handleDeleteClick, handleDoneClick}) => {
  return (
    <tr>
        <td style={ project.done ? {'textDecoration': 'line-through'} : {}}>{project.title}</td>
        <td>{project.zip_code}</td>
        <td>{project.cost}</td>
        <td>{project.deadline}</td>
        <td>
          <button type='button'  onClick={(event) => handleEditClick(event, project)}>Edit</button>
          <button type='button'  onClick={(event) => handleDeleteClick(event, project)}>Delete</button>
          <button type='button'  onClick={(event) => handleDoneClick(event, project)}>Done</button>
        </td>
        
    </tr>

  )
}

export default ReadOnlyRow