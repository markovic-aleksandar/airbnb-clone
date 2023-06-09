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
    default:
      return message;
  }
}