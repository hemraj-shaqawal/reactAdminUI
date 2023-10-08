import React from 'react'

function List({getItems}) {
  return (
    <ul>
       {getItems.map((ele,index) => <p key={index}>{ele}</p>)}
    </ul>
  )
}

export default List