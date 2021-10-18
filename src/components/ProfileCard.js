import defaultProfileImage from '../assets/profile.png';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Input from './Input';
import ButtonWithProgress from './ButtonWithProgress';
import Modal from './Modal';
import { updateUser } from '../api/apiCalls';

const ProfileCard = (props) => {
  const [inEditMode, setEditMode] = useState(false);
  const [apiProgress, setApiProgress] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const { user } = props;
  const [newUsername, setNewUsername] = useState(user.username);

  const { id, username } = useSelector((store) => ({
    id: store.id,
    username: store.username
  }));

  const onClickSave = async () => {
    setApiProgress(true);
    try {
      await updateUser(id, { username: newUsername });
      setEditMode(false);
      dispatch({
        type: 'user-update-success',
        payload: {
          username: newUsername
        }
      });
    } catch (error) {}
    setApiProgress(false);
  };

  const onClickCancel = () => {
    setEditMode(false);
    setNewUsername(username);
  };

  let content;

  if (inEditMode) {
    content = (
      <>
        <Input
          label="Change your username"
          id="username"
          initialValue={newUsername}
          onChange={(event) => setNewUsername(event.target.value)}
        />
        <ButtonWithProgress onClick={onClickSave} apiProgress={apiProgress}>
          Save
        </ButtonWithProgress>{' '}
        <button className="btn btn-outline-secondary" onClick={onClickCancel}>
          Cancel
        </button>
      </>
    );
  } else {
    content = (
      <>
        <h3>{newUsername}</h3>
        {user.id === id && (
          <>
            <div>
              <button
                className="btn btn-outline-success"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
            </div>
            <div className="pt-2">
              <button
                className="btn btn-danger"
                onClick={() => setModalVisible(true)}
              >
                Delete My Account
              </button>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div className="card text-center">
        <div className="card-header">
          <img
            src={defaultProfileImage}
            alt="profile"
            width="200"
            height="200"
            className="rounded-circle shadow"
          />
        </div>
        <div className="card-body">{content}</div>
      </div>
      {modalVisible && <Modal />}
    </>
  );
};
export default ProfileCard;
