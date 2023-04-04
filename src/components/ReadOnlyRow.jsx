import React from 'react'

const ReadOnlyRow = ({project, handleEditClick, handleDeleteClick}) => {
  return (
    <tr>
        <td>{project.title}</td>
        <td>{project.zip_code}</td>
        <td>{project.cost}</td>
        <td>{project.deadline}</td>
        <td>
          <button type='button'  onClick={(event) => handleEditClick(event, project)}>Edit</button>
          <button type='button'  onClick={(event) => handleDeleteClick(event, project)}>Delete</button>
        </td>
        
    </tr>

  )
}

export default ReadOnlyRow