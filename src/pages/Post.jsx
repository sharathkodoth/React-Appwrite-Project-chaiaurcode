import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import appwriteService from "../appwrite/service";
import parse from "html-react-parser";
import { Button, Container, Spinner } from "../components";

function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const fetchedPost = await appwriteService.getPost(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          setError("Post not found");
        }
      } catch (error) {
        setError("Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    try {
      await appwriteService.deletePost(post.$id);
      await appwriteService.deleteFile(post.featuredImage);
      navigate("/");
    } catch (error) {
      setError("Failed to delete post");
    }
  };

  return (
    <div className="py-8">
      <Container>
        {loading && <Spinner />}
        {error && <p className="text-red-500">{error}</p>}
        {post && (
          <div className="mb-4 relative border rounded-xl p-2 h-auto w-64">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl"
            />
            {isAuthor && (
              <div className="absolute right-6 bottom-6">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500 hover:bg-green-600 duration-200" className="mr-3">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-red-500 hover:bg-red-600 duration-200" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        )}
        {post && (
          <>
            <div className="w-full mb-6">
              <h1 className="text-2xl font-bold text-neutral-100">{post.title}</h1>
            </div>
            <div className="browser-css text-zinc-300">{parse(post.content)}</div>
          </>
        )}
      </Container>
    </div>
  );
}

export default Post;
