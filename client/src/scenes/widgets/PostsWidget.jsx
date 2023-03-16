import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget"

const PostsWidget = ({ userId, isProfile = false }) => {


    const getUserPosts = async () => {
        const response = await fetch(`http://localhost:3001/posts/${userId}/posts`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        console.log('data;',data)

        dispatch(setPosts({ posts: data}));
    };
    

    const getPosts = async () => {
        const response = await fetch("http://localhost:3001/posts",{
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data}));
    };

    

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    console.log('post 1',posts);
    const token = useSelector((state) => state.token);

    
    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        }else {
            getPosts();
        }
    }, []);   
    return (
        <>
        { posts.length !== 0 && posts.post.map(
            ({
              _id,
              userId,
              firstName,
              lastName,
              description,
              location,
              picturePath,
              userPicturePath,
              likes,
              comments,
            }) => (
                <PostWidget               
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
                />
            )
        )}
       </>
    )
};

export default PostsWidget;