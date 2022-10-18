import React from 'react'
import './Blogs.css'
import {AiOutlineSearch} from 'react-icons/ai'
import BlogCard from './BlogCard/BlogCard'

export default function Blogs() {
  return (
    <div className="blogs-page">
        <h1 className="main-title">Blogs</h1>
        <div className="sort-wrapper">
            <div className="sort-container">
                <span>Technology</span>
                <select name="" id="">
                    <option value="null">ALL</option>
                    <option value="null">Option 1</option>
                    <option value="null">Option 2</option>
                    <option value="null">Option 3</option>
                    <option value="null">Option 4</option>
                </select>
            </div>
            <div className="sort-container">
                <span>Industry</span>
                <select name="" id="">
                    <option value="null">ALL</option>
                    <option value="null">Option 1</option>
                    <option value="null">Option 2</option>
                    <option value="null">Option 3</option>
                    <option value="null">Option 4</option>
                </select>
            </div>
        </div>
        <div className="search-bar-wrapper">
            <AiOutlineSearch className="search-icon" />
            <input type="text" className="search-bar" placeholder='Search blogs...' />
        </div>
        <div className="blogs-card-wrapper">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
        </div>
    </div>
  )
}
