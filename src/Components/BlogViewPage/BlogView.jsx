import React from 'react'
import './BlogView.css'
import thumbnail from '../../Assets/blogs/thumbnail.jpg'
import avatar from '../../Assets/avatar.png'
import CommentCard from './Comment-card/CommentCard'
import { IoIosHeartEmpty } from 'react-icons/io'
import { GoComment } from 'react-icons/go'
import { RiShareForward2Fill } from 'react-icons/ri'

export default function BlogView() {
    return (
        <div className="blog-view-page">
            <div className="blog-view-page-wrapper">
                <div className="actions-wrapper">
                    <div className="action-container">
                        <div className="icon-wrapper">
                            <IoIosHeartEmpty className='icon' />
                            <p className="count">66</p>
                        </div>
                        <div className="icon-wrapper">
                            <GoComment className='icon' />
                            <p className="count">86</p>
                        </div>
                        <div className="icon-wrapper">
                            <RiShareForward2Fill className='icon' />
                        </div>
                    </div>
                </div>
                <article className="content-wrapper">
                    <img src={thumbnail} alt="" className="blog-thumbnail" />
                    <div className="article-body">
                        <div className="article-author">
                            <img src={avatar} alt="" className="profile-avatar" />
                            <div className="name-and-desg">
                                <strong>Muhsin N</strong>
                                <p className='desg'>Software Engineer</p>
                                <p className='posted'>Posted on 14/09/2022</p>
                            </div>
                        </div>
                        <div className="mobile-article-follow">
                            <button className="btn-comment btn-follow">Follow</button>
                            <p className="author-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum ex voluptas adipisci provident ipsa ut quisquam tempore, cum impedit nisi reiciendis iure. Facere inventore, facilis perspiciatis quas dolorem minima nisi consectetur in. Non corrupti earum autem saepe laborum unde expedita animi alias! Hic corporis veritatis similique ducimus, cupiditate animi cum.</p>
                        </div>
                        <h2 className="blog-title">Building a chat app with Socket.io and React Native</h2>
                        <p className="blog-content">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem porro optio iusto nihil provident! Nobis eveniet quis dolores veniam cumque architecto nisi optio rerum debitis iusto at et vel maxime, explicabo quae voluptatibus perspiciatis dignissimos voluptate animi molestiae id. Ipsum molestias sint quam et odit maiores dolorum laboriosam, debitis assumenda!
                            <br />
                            <br />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nisi exercitationem temporibus eaque, inventore cum alias pariatur fugit natus mollitia molestias explicabo voluptatibus repellat aperiam sequi doloribus odio maxime saepe autem ratione quae repudiandae culpa perspiciatis! Nobis quam, molestiae praesentium ad soluta nesciunt. Maiores nam inventore dolorum quis at! Eligendi eos eaque possimus assumenda tempora. Nam tenetur perferendis et, suscipit quod rem alias nostrum blanditiis nobis fugit exercitationem necessitatibus modi nesciunt. Adipisci numquam ut voluptatum officiis a inventore quo natus dolorum neque atque repellat optio, recusandae aperiam est amet hic eum. Tempore maxime debitis enim eius perspiciatis fuga consequuntur dignissimos?
                            <br />
                            <br />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam itaque rem, amet odit vero eum est omnis earum perferendis, nesciunt consequuntur. Corporis neque nulla natus culpa! Harum culpa illum unde consectetur vero expedita est recusandae sed rem eligendi ipsa quasi in animi delectus ut numquam impedit reprehenderit incidunt, nihil praesentium esse iste molestias quam. Veritatis possimus repellendus nihil porro debitis dolores tenetur reiciendis, quos obcaecati eum natus accusamus tempore placeat. Illum voluptatem optio illo. Quas qui vitae enim totam quia error natus, temporibus quo ad nisi veritatis cumque inventore sapiente eveniet molestiae sunt alias dicta ut amet sit earum voluptatum? Dolorum repudiandae incidunt illo ea quaerat dolores veritatis velit maxime! Velit nisi, culpa vero porro iste explicabo expedita numquam. Quia repellat, veritatis adipisci dignissimos ad in delectus voluptatem, excepturi ex similique ipsum dolorum enim! Quidem, facere aut sapiente voluptatem mollitia esse culpa harum optio accusantium numquam voluptas nemo in corrupti explicabo eaque doloribus voluptates laudantium odio impedit fugiat? Officia laboriosam accusamus autem harum dolore placeat inventore vitae atque veniam minus excepturi facilis tenetur repellat porro nesciunt eveniet cumque provident, magnam fuga officiis amet quaerat expedita illo commodi. Asperiores blanditiis unde neque animi ullam possimus nesciunt minima architecto! Rem, est, saepe eum ab tempore delectus, corporis magnam quibusdam nam voluptatem omnis. Enim eligendi accusantium nam dolor ad! Ducimus nihil suscipit quidem nemo tenetur tempore corrupti, doloribus dolorum alias vitae dolores, laboriosam vel. Nam tenetur architecto praesentium ut aspernatur reiciendis nobis cum quos provident incidunt esse aliquam distinctio soluta nostrum officia quae rerum, fugiat consequatur. Dolor hic assumenda alias sequi quidem animi nostrum delectus odio ut. Officiis distinctio, et quidem ducimus numquam quibusdam veritatis expedita sunt, soluta voluptatum placeat alias facilis enim dolore hic laborum suscipit atque? Praesentium, error impedit, omnis nostrum iste minima, corrupti consequatur sequi distinctio nobis eius voluptatum laboriosam.
                        </p>
                    </div>

                    <section className="article-comments-section">
                        <h2 className="comment-title">Comments(22)</h2>
                        <form className="comment-form">
                            <textarea name="comment" className='blog-comment' id="" cols="30" rows="10"></textarea>
                            <button className="btn-comment">Add Comment</button>
                        </form>
                        <div className="comment-cards-wrapper">
                            <CommentCard />
                            <CommentCard />
                            <CommentCard />
                            <CommentCard />
                            <CommentCard />
                            <CommentCard />
                        </div>
                    </section>
                </article>
                <div className="author-wrapper">
                    <div className="author-container">
                        <span className="empty-border"></span>
                        <div className="article-author">
                            <img src={avatar} alt="" className="profile-avatar" />
                            <div className="name-and-desg">
                                <strong>Muhsin N</strong>
                                <p className='desg'>Software Engineer</p>
                                <p className='posted'>Posted on 14/09/2022</p>
                            </div>
                        </div>
                        <button className="btn-comment btn-follow">Follow</button>
                        <p className="author-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum ex voluptas adipisci provident ipsa ut quisquam tempore, cum impedit nisi reiciendis iure. Facere inventore, facilis perspiciatis quas dolorem minima nisi consectetur in. Non corrupti earum autem saepe laborum unde expedita animi alias! Hic corporis veritatis similique ducimus, cupiditate animi cum.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
