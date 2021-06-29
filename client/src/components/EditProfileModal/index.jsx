import React, { useState, useRef, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getUserProfile } from '../../redux/actions/userAcions';
import {
  useStyles,
  Button,
  Card,
  Header,
  ImageWrapper,
  StyledAvatar,
  Title,
  Input,
  Form,
  Label,
} from './style';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { loadProfilePosts } from '../../redux/actions/postActions';
import { loadUser } from '../../redux/actions/authActions';

const EditProfileModal = ({ handleClose, open }) => {
  const classes = useStyles();
  const { user, token } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(user?.pdp);
  const [name, setName] = useState(user?.username);
  const [bioValue, setBioValue] = useState(user?.bio);
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.userProfile);

  const ref = useRef();
  useEffect(() => {
    setName(user?.username);
    setBioValue(user?.bio);
    setImage(user?.pdp);
  }, [user]);

  const upadateUser = async () => {
    handleClose();
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    if (token) config.headers['auth-token'] = token;
    try {
      if (name.trim()) {
        setShow(true);
        const formData = new FormData();
        formData.append('username', name);
        formData.append('bio', bioValue);
        formData.append('image', file);
        await axios.put('/api/users/update', formData, config);
        dispatch(getUserProfile(userId));
        dispatch(loadUser());
        dispatch(loadProfilePosts(userId));
      }
      setShow(false);
    } catch (error) {
      setShow(false);
    }
  };
  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Card>
            <Header>
              <Title>Edit Profile</Title>
              <Button onClick={upadateUser}>SAVE</Button>
            </Header>
            <ImageWrapper>
              <input
                ref={ref}
                style={{ display: 'none' }}
                type='file'
                accept='image/*'
                name='image'
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  e.target.value = null;
                }}
              />
              <StyledAvatar
                src={
                  file
                    ? URL.createObjectURL(file)
                    : image
                    ? `data:${image.contentType};base64, ${image.data}`
                    : '/images/default.png'
                }>
                <IconButton onClick={() => ref.current.click()}>
                  <AddAPhotoIcon
                    fontSize='large'
                    style={{ color: '#ab987a' }}
                  />
                </IconButton>
              </StyledAvatar>
            </ImageWrapper>

            <Form>
              <Label>Username :</Label>
              <Input
                value={name}
                placeholder='Enter username'
                id='usernameId'
                type='text'
                onChange={(e) => setName(e.target.value)}
              />
              <Label>Bio :</Label>
              <Input
                value={bioValue}
                placeholder='Enter bio'
                id='bioId'
                type='text'
                onChange={(e) => setBioValue(e.target.value)}
              />
            </Form>
          </Card>
        </Fade>
      </Modal>
      <Backdrop className={classes.backdrop} open={show}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
};

export default EditProfileModal;
