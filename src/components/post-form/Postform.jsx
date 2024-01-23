import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select } from "../index"
import appwriteService from "../../appwrite/service"
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

function Postform() {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.user.userData)

    const submit = async (data) => {
        if (post) {
            data.image[0] ? appwriteService.uploadFile(data.image[0]) : null

            if (file) {
                appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if(file) {
                const fileId = file.$id 
                data.featuredImage = fileId
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                })
                if(dbPost) {
                    navigate(`post/${dbPost.$id}`)
                }
            }
        }
    }

    return (
        <div>Postform</div>
    )
}

export default Postform