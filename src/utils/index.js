export const handleErrorMessage = message => {
  switch (message) {
    case 'auth/network-request-failed':
      return 'A network error occurred during the authentication request';
    case 'auth/user-disabled':
      return 'The user account has been disabled by an administrator';
    case 'auth/email-already-exists':
      return 'The email address is already in use by another account';
    case 'auth/email-already-in-use':
      return 'The email address is already in use by another account';
    case 'auth/invalid-email':
      return 'The email address is not valid';
    case 'auth/wrong-password':
      return 'The provided password is incorrect';
    case 'auth/user-not-found':
      return 'There is no user corresponding to the given email address';
    case 'storage/unknown':
      return 'An unknown error occurred';
    case 'storage/project-not-found':
      return 'The requested project does not exist';
    case 'storage/unauthenticated':
      return 'The user is not authenticated. Sign in and try again';
    case 'storage/unauthorized':
      return 'The user does not have the necessary permissions to access the requested resource';
    case 'storage/canceled':
      return 'The operation was canceled by the user';
    default:
      return message;
  }
}

// handle redux non-serializable value
export const handleNonSerializablValue = prop => {
  let propItem = prop.createdAt.seconds ? {...prop, createdAt: prop.createdAt.seconds * 1000} : {...prop, createdAt: Date.now()};

  return propItem;
}