import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useAuth } from '../contexts/authContext'

const AdminLayout = () => {

  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
     if(user.role !== 'admin') {
      navigate('/', {replace: true})
     }
  }, [])
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AdminLayout