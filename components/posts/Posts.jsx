import Post from "../post/Post";
import "./posts.css";

export default function Posts({post}) {
  return (
    <div className="posts">
{
post.map(p=>{
  return(
    <>
    <Post post={p} />
    </>
  )
})
}
    </div>
  );
}
