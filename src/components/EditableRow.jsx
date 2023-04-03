import React from 'react'

const EditableRow = ({editFormData, handleEditFormChange, handleCancelClick}) => {
  return (
    <tr>
        <td>
            <input name='title' type="text" required='required' placeholder='Enter a title' value={editFormData.title} onChange={handleEditFormChange}/>
        </td>
        <td>
            <input name='zip_code'type="text" required='required' placeholder='Enter a zip code' value={editFormData.zip_code} onChange={handleEditFormChange}/>
        </td>
        <td>
            <input name='cost' type="text" required='required' placeholder='Enter a cost' value={editFormData.cost} onChange={handleEditFormChange}/>
        </td>
        <td>
            <input name='deadline' type="datetime-local" required='required' placeholder='Enter a deadline' value={editFormData.deadline} onChange={handleEditFormChange}/>
        </td>
        <td>
            <button type='submit'>Save</button>
            <button type='submit' onClick={handleCancelClick}>Cancel</button>
            </td>
    </tr>
  )
}

export default EditableRow