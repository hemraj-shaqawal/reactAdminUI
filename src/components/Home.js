/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'

function Home() {
  const PAGE_LIMIT = 10;
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [userList, setUserList] = useState([]);
  const searchUserList =  useRef([]);
  const actualUserList =  useRef([]);
  const [isEdit, setIsEdit] =  useState("");
  const [inpName, setInpName] =  useState("");
  const [inpEmail, setInpEmail] =  useState("");
  const [inpRole, setInpRole] =  useState("");
  const [IsErrorMsg, setIsErrorMsg] =  useState("");
  const [IsSuccessMsg, setIsSuccessMsg] =  useState("");
  const deleteRow =  new Set()
  
  useEffect(() => {
    getUserList()
  },[])

  // Api call to get data from API
  const getUserList = async () => {
      const res = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      const data = await res.json()
      let arr = JSON.parse(JSON.stringify(data))
      actualUserList.current = arr
      searchUserList.current = arr;
      onPageChange(0)
  }
  
  // Pagination Logic
  const onPageChange = (page) => {
    setCurrentPage(page)
    let arr = JSON.parse(JSON.stringify(searchUserList.current))
    setTotalPage(Math.ceil(arr.length/PAGE_LIMIT));  
    let offset = page*PAGE_LIMIT
    let getRecoard = arr.splice(offset,PAGE_LIMIT)
    setUserList(getRecoard)    
  }

  // search Logic
  useEffect(() => {
    if(actualUserList.current.length > 0) {
      // Debouncing logic for search
      const timer = setTimeout(() => {
        let finalTxt = searchText.toLowerCase().trim()
        if(finalTxt.length > 0) {
          const searchedLst = [...actualUserList.current].filter((ele) => (ele.name.toLowerCase().indexOf(finalTxt) >= 0 || ele.email.toLowerCase().indexOf(finalTxt) >= 0 || ele.role.toLowerCase().indexOf(finalTxt) >= 0));
          searchUserList.current = searchedLst;
        } else {
          searchUserList.current = actualUserList.current;
        }
        onPageChange(0)
      }, 200);  
      return () => {
        clearTimeout(timer)
      } 
    }  
},[searchText]);

// Handel All selected row
const handelMultiSelect = (val, id) => {
  if(val) {
    deleteRow.add(id)
  } else {  
    deleteRow.delete(id)
  }  
}

// Delete all selected record
const deleteRecoard = () => {
  if(deleteRow.length === 0) {
    alert("Please select at lease one record!")
  } else {
    let del = [...deleteRow]
    actualUserList.current = actualUserList.current.filter(ele => (del.indexOf(ele.id) === -1))
    searchUserList.current = actualUserList.current
    onPageChange(currentPage)
  }  
}

// Delete one selected record
const deleteOne = (id) => {
  actualUserList.current = actualUserList.current.filter(ele => (ele.id !== id))
  searchUserList.current = actualUserList.current
  onPageChange(currentPage)
}

// Edit Row logic
const submitRow = (id) => {
  console.log(inpRole, inpEmail, inpName)
  if(inpName !== "" || inpEmail !== ""  || inpRole !== "") {
    actualUserList.current = actualUserList.current.map(ele => {
      if (ele.id === id) {
        ele.name = inpName?inpName:ele.name;
        ele.email = inpEmail?inpEmail:ele.email;
        ele.role = inpRole?inpRole:ele.role;;
      }
      return ele
    })
    searchUserList.current = actualUserList.current
    onPageChange(currentPage)
    setIsEdit("")
    setIsErrorMsg("")
    setIsSuccessMsg("Record has been saved successfully!")
  } else {
    setIsErrorMsg("Please Enter correct input parameter!")
  }  
}

  return (
    <>
      <div className='container mx-auto p-10 bg-blue-50 w-full'>
        <div className='w-full text-3xl mb-5 font-bold text-blue-500'>
           ADMIN UI
        </div>
        <div className='py-5 mb-4'>
            <input className='p-2 w-full border border-slate-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600' type='text' placeholder='Search By Name, Email or Role' onChange={e => setSearchText(e.target.value)}/>
        </div>
        {userList && (
          <>
            {IsErrorMsg.length > 0 && (<div className='mb-5 w-full text-red-500 text-xl font-bold'>{IsErrorMsg}</div>)}
            {IsSuccessMsg.length > 0 && (<div className='mb-5 w-full text-green-400 text-xl font-bold'>{IsSuccessMsg}</div>)}
            <table className='w-full table-auto border-collapse border border-slate-400'>
              <thead>
                  <tr className='h-[50px]'>
                    <th className='border border-slate-300'>Select</th>
                    <th className='border border-slate-300'>Name</th>
                    <th className='border border-slate-300'>Email</th>
                    <th className='border border-slate-300'>Role</th>
                    <th className='border border-slate-300'>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {userList.map((item,index) => 
                    (
                      <tr key={item.id} className='text-center'>
                        <td className='p-2 border border-slate-300'>
                          <input onChange={(e) => {handelMultiSelect(e.target.checked,item.id)}} value={false} type='checkbox' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                        </td>
                        <td className='p-2 border border-slate-300'>{
                          isEdit === item.id?(<input className='p-2 w-full border border-slate-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600' type='text' placeholder='Name' defaultValue={item.name} onChange={(e) => setInpName(e.target.value)} />):(item.name)
                        }</td>
                        <td className='p-2 border border-slate-300'>{
                          isEdit === item.id?(<input className='p-2 w-full border border-slate-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600' type='text' placeholder='Email' defaultValue={item.email}  onChange={(e) => setInpEmail(e.target.value)} />):(item.email)
                        }</td>
                        <td className='p-2 border border-slate-300'>{
                          isEdit === item.id?(<input className='p-2 w-full border border-slate-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600' type='text' placeholder='Role' defaultValue={item.role}  onChange={(e) => setInpRole(e.target.value)} />):(item.role)
                        }</td>
                        <td className='w-[250px] px-5 py-3 border border-slate-300'>
                          {isEdit === item.id?(<button className='p-2 bg-blue-400 mr-5 rounded-lg text-white' title='Edit' onClick={(e) => submitRow(item.id)} >Submit</button>):(<><button className='p-2 bg-blue-400 mr-5 rounded-lg text-white' title='Edit' onClick={() => setIsEdit(item.id) }>📝 Edit</button> <button className='p-2 bg-red-400 rounded-lg text-white' title='Delete' onClick={() => deleteOne(item.id)}>🚮 Delete</button>
                          </>)}
                        </td>
                      </tr>
                    )
                  )} 
                  {userList.length === 0 && (
                    <tr className='text-center'>
                      <td className='p-2 border border-slate-300' colSpan={5}>
                        No Record Found!
                      </td>
                    </tr>
                  )}           
              </tbody>
            </table>
            {totalPage > 1 && (
              <div className='flex pt-5'>
                <div className='py-5 mb-4 w-[200px]'>
                  <button onClick={() => deleteRecoard()} className={`w-[200px] h-[50px] rounded-full bg-red-500 text-white mr-2 text-lg`}>Delete Selected</button>
                </div>
                <div className='py-5 mb-4 w-full flex justify-center'>
                        <button onClick={() => onPageChange(0)} className={`w-[50px] h-[50px] rounded-full mr-2 text-lg`}>{`${'<<'}`}</button>
                        <button onClick={() => onPageChange(currentPage-1)} disabled={currentPage === 0? true : false} className={`w-[50px] h-[50px] rounded-full mr-2 text-lg`}>{`${'<'}`}</button>
                        {[...Array(totalPage)].map((ele, i) => (<button onClick={() => onPageChange(i)} className={`w-[50px] h-[50px] rounded-full mr-2 text-lg  ${i === currentPage? 'bg-white text-black border border-blue-500':'bg-blue-500 text-white'} `} key={i}>{i+1}</button>))}
                        <button onClick={() => onPageChange(currentPage+1)} disabled={currentPage === (totalPage-1)? true : false} className={`w-[50px] h-[50px] rounded-full mr-2 text-lg`}>{`${'>'}`}</button>
                        <button onClick={() => onPageChange(totalPage-1)} className={`w-[50px] h-[50px] rounded-full mr-2 text-lg`}>{`${'>>'}`}</button>
                </div>
            </div>
            )}
          </>
        )}
      </div>
    </>    
  )
}

export default Home
