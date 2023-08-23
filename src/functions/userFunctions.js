import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { UPDATE_CURRENT_USER } from '../redux/slices/authSlice';
import { v4 as uuidv4 } from 'uuid';
import { handleErrorMessage } from '../utils';
import { toast } from 'react-toastify';

// update account
export const updateAccount = async (prop, dispatch, setWaitingProccess) => {
  const {currentUser: {uid}} = auth;
  try {
    // create doc ref for user and update that user
    const docUserRef = doc(db, 'users', uid);
    await updateDoc(docUserRef, prop);
    // update current user prop locally
    dispatch(UPDATE_CURRENT_USER(prop));
    setWaitingProccess(false);
  }
  catch(err) {
    toast.error(handleErrorMessage(err.code));
    setWaitingProccess(false);
  }
  finally {
    setWaitingProccess(false);
  }
}

// update account avatar
export const updateAccountAvatar = async (file, dispatch, setWaitingProccess) => {
  const avatarFile = file.avatar.value;
  // make image name uniqe
  const splitFileName = avatarFile.name.split('.');
  splitFileName[splitFileName.length - 2] = `${splitFileName[splitFileName.length - 2]}${uuidv4()}`;
  const storageRef = ref(storage, splitFileName.join('.'));
  const uploadTask = uploadBytesResumable(storageRef, avatarFile);
  uploadTask.on('state_changed', false,
    error => { // something go wrong with uploading
      toast.error(handleErrorMessage(error.code));
      setWaitingProccess(false);
    }, async () => { // file (avatar) successfully uploaded
      const avatarURL = await getDownloadURL(uploadTask.snapshot.ref);
      // update account on server and state
      updateAccount({avatar: avatarURL}, dispatch, setWaitingProccess);
    }
  );
}