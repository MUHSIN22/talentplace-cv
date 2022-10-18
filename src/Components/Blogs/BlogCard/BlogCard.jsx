import React from 'react'
import thumbnail from '../../../Assets/blogs/thumbnail.jpg'
import './BlogCard.css'

export default function BlogCard() {
  return (
    <div className="blog-card">
        <img src={thumbnail} alt="" className="thumbnail" />
        <div className="blog-card-body">
            <span className="upload-date">Last updated on <strong>14/10/2022</strong></span>
            <h3 className="blog-title">The best way to getting organized</h3>
            <p className="blog-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque cum corrupti incidunt eum. Rerum, aspernatur fugiat! Nulla libero laboriosam amet.</p>
            <button className="btn-blog-card">Read More</button>
        </div>
    </div>
  )
}
