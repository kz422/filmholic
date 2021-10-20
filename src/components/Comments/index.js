import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { Wrapper } from "./Comments.styles"

import { db } from '../../Firebase'

import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Card, CardContent, CardHeader, IconButton, TextField } from '@material-ui/core'

import { BsTrash } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'
import { FaRegComment } from 'react-icons/fa'
import { MdExpandMore } from 'react-icons/md'
import { useAuthContext } from '../../AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Comments = () => {

  const { user } = useAuthContext()

  const [comments, setComments] = useState([])
  const [commentValue, setCommentValue] = useState('')
  const { movieId } = useParams();

  const getComments = async () => {
    const colRef = db.collection('movies').doc(`${movieId}`).collection('comments').orderBy('createdAtForOrder', 'desc')
    colRef.onSnapshot((querySnapshot) => {
      // setComments(querySnapshot.docs)
      const comm = []
      querySnapshot.forEach((doc)=>{
        comm.push({...doc.data(), id: doc.id})
      })
      setComments(comm)
    })
  }

  const postComment = () => {
    const date = new Date()
    db.collection('movies').doc(`${movieId}`).collection('comments').doc().set({
      name: user.displayName,
      createdAt: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
      createdAtForOrder: Date.now(),
      userUid: user.uid,
      comment: commentValue,
      photo: user.photoURL,
    })
    setCommentValue('')
  }

  const deleteComment = (docId) => {
    db.collection('movies').doc(`${movieId}`).collection('comments').doc(docId).delete()
  }
  
  const handleChange = (event) => {
    setCommentValue(event.target.value);
  };

  useEffect(() => {
    getComments()
    console.log(comments)
  },[])

  return (
    <Wrapper>
      <div style={{}}>
        <h2>コメント</h2>
        <div className="leave-comment">
          <Accordion style={{ backgroundColor: '#353535', color: 'white' }}>
            <AccordionSummary expandIcon={<MdExpandMore />}>
              コメントする<FaRegComment style={{ marginTop: '4px', marginLeft: '6px' }} />
            </AccordionSummary>
            <AccordionDetails style={{ color: 'white' }}>
              <TextField
                multiline
                value={commentValue}
                onChange={handleChange}
                variant="outlined"
                helperText={`${commentValue.length}/300文字`}
                style={{ width: '100%', color: 'white' }}
              />
              <Button color='inherit' onClick={postComment} disabled={commentValue.length < 4 || commentValue.length > 300}>投稿</Button>
            </AccordionDetails>
          </Accordion>
        </div>
        { comments.length === 0 && <p style={{ marginLeft: '12px' }}>no comments</p> }
          {comments.map((c, i) => (
            <motion.div  initial={{x: 200, opacity: 0}} animate={{ x: 0, opacity: 1 }} transition={{duration: 1}} exit={{ x: -200, opacity: 0 }}>
              <Card 
                style={{ backgroundColor: '#353535', margin: '6px', overflowWrap: 'break-word', padding: '6px' }}
                key={i}
              >
                <CardHeader 
                  avatar={
                    <Avatar src={`${c.photo}`} />
                  }
                  title={<Link to={`/user/${c.userUid}`} style={{ color: 'white' }}>{c.name}</Link>}
                  action={
                    c.userUid === user.uid &&
                    <div>
                      <IconButton onClick={() => deleteComment(c.id)}>
                        <BsTrash size="16px" color="white" />
                      </IconButton>
                      {/* <IconButton>
                        <BiEdit size="16px" color="white" />
                      </IconButton> */}
                    </div>
                  }
                  subheader={<span style={{ color: 'white', fontSize: 'smaller', fontWeight: 'lighter' }}>{c.createdAt}</span>}
                  className="header"
                  style={{ padding: '10px' }}
                />
                <CardContent style={{ padding: '16px' }}>
                  <p style={{ whiteSpace: 'pre-wrap' }} key={i} className="userComment">{c.comment}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>
    </Wrapper>
  )
}

export default Comments
