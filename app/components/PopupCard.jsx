import React, { useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid';
const PopupCard = () => {

  return(
    
      <div style={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      checkboxSelection
      disableSelectionOnClick
    />
  </div>

  )
}
export default PopupCard;