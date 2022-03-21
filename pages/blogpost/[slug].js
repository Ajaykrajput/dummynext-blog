import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/BlogPost.module.css";

const Post = (props) => {
  const [blog, setBlog] = useState(props.myBlog);
  const router = useRouter();
  // useEffect(() => {
  //   if (!router.isReady) return;
  //   const { slug } = router.query;
  //   fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
  //     .then((a) => {
  //       return a.json();
  //     })
  //     .then((parsed) => {
  //       // console.log(parsed);
  //       setBlog(parsed);
  //     });
  // }, [router.isReady]);
  console.log(router.query);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{blog && blog.title}</h1>
        <hr />
        <div className={styles.para}>{blog && blog.content}</div>
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  // console.log(context.query)
  const { slug } = context.query;
  let data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);
  let myBlog = await data.json();
  return {
    props: { myBlog }, // will be passed to the page component as props
  };
}

export default Post;
