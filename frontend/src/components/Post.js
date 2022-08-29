import { Button, Card } from "@mui/material";
import React from 'react';
import getToken from "./auth-service/getToken";
import getUserID from './auth-service/getUserID';

function Post ({ post, setEditable }) {
    
    const handleRemovePost = (event) => {
        event.preventDefault();
        fetch(`http://localhost:4200/api/post/${post._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        .then((res) => {
            if (res.ok) {
                return(res.json());
            }
        })
        .then((val) => {
            setEditable({id: null, isEditable: false})
        })
        .catch(err => {
            if (err) {
                console.error(err);
            }
        })
    }

    const handleEditPost = (event) => {
        event.preventDefault();
        setEditable({id: post._id, isEditable: true});
    }

    if (post.userId === getUserID()) {
        return (
            <Card className='post' variant='outlined'>
                <Card className='post__content'>{post.content}</Card>
                <Button>+1</Button>
                <Button>-1</Button>
                <Button onClick={handleEditPost}>EDIT</Button>
                <Button onClick={handleRemovePost}>REMOVE</Button>
            </Card>
        )
    } else {
        return (
            <Card className='post' variant='outlined'>
                <Card className='post__content'>{post.content}</Card>
                <Button>+1</Button>
                <Button>-1</Button>
            </Card>
        )
    }
}

export default Post