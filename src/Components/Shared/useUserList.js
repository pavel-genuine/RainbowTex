import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../redux/features/usersSlice'

const useUserList = () => {

    const { isLoading, error, userList } = useSelector(state => state?.userList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
        console.log('userlist', userList);
        console.log('error', error);
    }, [])


  return (
     {userList}
  )
}

export default useUserList