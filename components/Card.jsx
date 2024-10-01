import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import  { fetchPosts } from '../src/action'


const Card = () => {
    const  dispatch = useDispatch()
    const { posts , currentPage , perPage , loading } = useSelector(state => state)
  
    useEffect(() => {
      dispatch(fetchPosts())
    },[dispatch])
  
  
    const handleRemove = (postId) => {
      dispatch({ type: 'REMOVE_POST', payload: postId })
      if(posts.slice((currentPage - 1) * perPage , currentPage * perPage).length < 6 && currentPage * perPage  < posts.length){
        handlePageChange(currentPage + 1)
     }
    }
      
  
    const handlePageChange = (pageNum) => {
      dispatch({ type: 'SET_PAGE', payload: pageNum })
    }
  
     if(loading){
        return <h1>Loading...</h1>
     }
  
     const indexOfLastPost = currentPage * perPage;
     const indexOfFirstPost = indexOfLastPost - perPage;
     const currentPosts = posts.slice(indexOfFirstPost , indexOfLastPost)
     const totalPages = Math.ceil(posts.length / perPage)
  
  
     return (
            <div className='container'>
              <div className='card-container'>
                {currentPosts.map(post => (
                   <div className='card' key={post.id}>
                    <h3>{post.title}</h3>
                    <p>
                      {post.body}
                    </p>
                    <img src='https://picsum.photos/seed/picsum/200/300
  ' alt='img' className='card-image'/>
                    <button className='remove-btn' onClick={() => handleRemove(post.id)}>
                        x
                    </button>
                    </div>
                ))}
              </div>
              <div className='pagination'>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                {
                  Array.from({ length: totalPages} , (_ , i) => (
                    <button
                      key={i+ 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={currentPage === i + 1 ? 'active' : ''}
                     >
                      {i + 1}
                     </button>
                  ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
              </div>
            </div>
       
     )  
   
}



export default Card