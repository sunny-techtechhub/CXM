import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useHistory } from 'react-router-dom'
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deleteCustomer, likeCustomer } from '../../../actions/customers';

const Customer = ({ customer, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLikes] = useState(customer?.likes);

    const userId = user?.result.googleId || user?.result?._id;
    const hasLikedCustomer = customer?.likes?.find((like) => like === userId);

    const handleLike = async () => {
        dispatch(likeCustomer(customer._id));
        if (likes?.find((like) => like === userId)) {
            setLikes(customer.likes.filter((id) => id !== userId));
        } else {
            setLikes([...customer.likes, userId]);
        }
    };

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId)
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                )
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openCustomer = (e) => history.push(`/customers/${customer._id}`);

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openCustomer}>
                <CardMedia className={classes.media} image={customer.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={customer.mobile} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{customer.mobile}</Typography>
                    <Typography variant="body2">{moment(customer.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?.googleId === customer?.creator || user?.result?._id === customer?.creator) && (
                    <div className={classes.overlay2} name="edit">
                        <Button style={{ color: 'white' }} size="small" onClick={(e) => { e.stopPropagation(); setCurrentId(customer._id); }}>
                            <MoreHorizIcon fontSize="medium" />
                        </Button>
                    </div>
                )}
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{customer.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom component="h2">{customer.firstName}<br/>{customer.lastName}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{customer?.email?.split(' ').splice(0, 20).join(' ')}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === customer?.creator || user?.result?._id === customer?.creator) && (
                    <Button size="small" color="secondary" onClick={() => dispatch(deleteCustomer(customer._id))}>
                        <DeleteIcon fontSize="small" />&nbsp; Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default Customer; 