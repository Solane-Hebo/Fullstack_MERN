import { useState } from "react"
import { RiLoaderFill } from "react-icons/ri"
import axios from "../api/axios"
import { useAuth } from "../contexts/authContext"
import { useNavigate } from "react-router"

const CreateThread = () => {

    const [formData, setFormData] = useState({title: '', content: ''})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const { token } = useAuth()
    const navigate = useNavigate()

    const handleChange = e => {
        setFormData(state => ({
            ...state,
            [e.target.id]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        if(formData.title.trim() === '' || formData.content.trim() === '') {
            setError('Please fill in all the fields')
            setLoading(false)
            return
        }
        try {
            const res = await axios.post('api/threads', formData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            if(res.status !== 201) return

            setFormData({title: '', content: ''})
            navigate('/threads')

        } catch (error) {
            console.log(error.message)
            setError(error.response?.data?.message || 'Something went wrong')
        }finally {
            setLoading(false)
        }
    }

  return (
    <div className="wrapper">
      <h1 className="text-3xl font-bold my-5">Create a thread</h1>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" className="border rounded-lg py-1 px-2 w-full" value={formData.title} onChange={handleChange}></input>
        </div>
        <div>
            <label htmlFor="content">Content</label>
            <textarea id="content" className="border scrollbar rounded-lg py-1 px-2 w-full h-64 resize-none overflow-auto" value={formData.content} onChange={handleChange}></textarea>
        </div>
        <button className="btn" disabled={loading}>{loading ? <span className="flex items-center justify-center gap-2 animate-pulse">
               <RiLoaderFill className="size-6 animate-spin"/>Create</span>: 'Create'}</button>
        <p className="text-red-500 text-center">{error}</p>
          
      </form>


    </div>
  )
}

export default CreateThread