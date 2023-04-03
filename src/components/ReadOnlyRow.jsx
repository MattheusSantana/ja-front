import React from 'react'

const ReadOnlyRow = ({project, handleEditClick}) => {
  return (
    <tr>
        <td>{project.title}</td>
        <td>{project.zip_code}</td>
        <td>{project.cost}</td>
        <td>{project.deadline}</td>
        <td><button type='button'  onClick={(event) => handleEditClick(event, project)}>Edit</button></td>
    </tr>

  )
}

export default ReadOnlyRow