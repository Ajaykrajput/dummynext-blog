import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/Blog.module.css";

const Blog = (props) => {
  console.log(props);
  const [blogs, setBlogs] = useState(props.allBlogs);
  // useEffect(() => {
  //   console.log("UseEffect is running");
  //   fetch("http://localhost:3000/api/blogs")
  //     .then((a) => {
  //       return a.json();
  //     })
  //     .then((parsed) => {
  //       // console.log(parsed);
  //       setBlogs(parsed);
  //     });
  // }, []);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* <div className="blogs"> */}
        {blogs.map((blogItem) => {
          return (
            <div key={blogItem.slug}>
              <Link href={`/blogpost/${blogItem.slug}`}>
                <a>
                  <h3 className={styles.blogItem}>{blogItem.title}</h3>
                </a>
              </Link>
              <p className={styles.blogItemp}>
                {blogItem.content.substr(0, 140)}....
              </p>
            </div>
          );
        })}
        {/* </div> */}
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  let data = await fetch("http://localhost:3000/api/blogs");
  let allBlogs = await data.json();
  return {
    props: { allBlogs }, // will be passed to the page component as props
  };
}

export default Blog;
