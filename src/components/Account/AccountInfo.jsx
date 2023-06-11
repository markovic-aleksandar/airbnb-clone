import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAccount } from '../../redux/features/auth/authActions';
import Modal from '../Modal';
import MiniLoader from '../MiniLoader';
import { InputErrorIcon } from '../../constants/icons';

const AccountInfo = () => {
  const {currentUser} = useSelector(store => store.auth);
  const [isAboutModal, setIsAboutModal] = useState(false);
  const [userDescription, setUserDescription] = useState(currentUser.description);
  const [waitingProccess, setWaitingProccess] = useState(false);
  const dispatch = useDispatch();
  const aboutModal = useRef(null);

  const closeModal = () => {
    setIsAboutModal(false);
  }

  const handleUserDescription = e => {
    setUserDescription(e.target.value);
  }

  const handleSubmitDescription = async () => {
    if (userDescription.length > 450 || waitingProccess) return;
    setWaitingProccess(true);
    await updateAccount({description: userDescription.trim()}, currentUser, dispatch, setWaitingProccess);
    aboutModal.current.querySelector('#close-modal-btn').click();
  }

  return (
    <>
      <div>
        <h3 className="text-2xl mb-4">About you</h3>
        <p className="text-base">This is where you can showcase and share information about yourself. Tell us your interests, hobbies, and any other details you would like to share. </p>

        <div className="py-6 px-4 mt-5 border border-dashed border-[#b0b0b0] rounded-xl">
          <p className="text-base">{currentUser.description ? (
            `${currentUser.description}`
          ) : (
            'Write something fun and punchy.'
          )}</p>
          <button 
            type="button"
            className="text-base font-medium leading-[1] mt-3 border-b border-black"
            onClick={() => setIsAboutModal(true)}
          >
            {currentUser.description ? 'Edit intro' : 'Add intro'}
          </button>
        </div>
      </div>
      { isAboutModal &&  (
        <div ref={aboutModal}>
          <Modal closeModal={closeModal}>
            <h2 className="text-xl md:text-2xl pt-6 mb-[5px]">About you</h2>
            <p className="text-base">Tell us a little bit about yourself, so your future hosts or guests can get to know you.</p>
            <div className="my-5">
              <div className={`p-1 rounded-lg ${userDescription.length > 450 ? 'shadow-[inset_0_0_0_1px_#c13515]' : 'shadow-[inset_0_0_0_1px_#b0b0b0]'}`}>
                <textarea
                  rows="4"
                  className="bg-transparent"
                  value={userDescription}
                  onChange={handleUserDescription}
                />
              </div>
              {userDescription.length > 450 ? (
                <p className="input-error flex items-center justify-end gap-1 text-xs font-medium text-right text-[#c13515] pt-2">
                <InputErrorIcon />
                Character limit exceeded: {userDescription.length}/450
                </p>
              ) : (
                <p className="text-xs font-medium text-right text-[#717171] pt-2">{userDescription.length}/450 characters</p>
              )}
            </div>
            <div className="flex justify-end pt-5 border-t border-t-[#ebebeb]">
              {!waitingProccess ? (
                <button 
                  type="button"
                  className={`text-white ${userDescription.length > 450 ? 'bg-[#ddd] cursor-not-allowed' : 'bg-[#222]'} font-medium min-w-[80px] h-11 rounded-lg`}
                  onClick={handleSubmitDescription}
                >Save</button>
              ) : (
                <button 
                  type="button"
                  className='relative bg-[#ddd] min-w-[80px] h-11 rounded-lg pointer-events-none'
                  onClick={handleSubmitDescription}
                >
                  <MiniLoader />
                </button>
              )}
            </div>
          </Modal>
        </div>
      )}
      <hr className="my-10 border-t border-[#dddddd]" />
      <div>
        <h3 className="text-2xl mb-4">Your past trips</h3>
        <p className="text-base">Show the destinations I’ve traveled to.</p>

        <div className="grid grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-3 mt-5 gap-3">
          <article className="py-3 px-4 bg-[#f7f7f7] rounded-xl opacity-70">
            <h5 className="text-xs mb-1">Year</h5>
            <h4 className="text-lg leading-[1.3]">Your next destination</h4>
          </article>
          <article className="py-3 px-4 bg-[#f7f7f7] rounded-xl opacity-70">
            <h5 className="text-xs mb-1">Year</h5>
            <h4 className="text-lg leading-[1.3]">Your next destination</h4>
          </article>
          <article className="py-3 px-4 bg-[#f7f7f7] rounded-xl opacity-70">
            <h5 className="text-xs mb-1">Year</h5>
            <h4 className="text-lg leading-[1.3]">Your next destination</h4>
          </article>
        </div>
      </div>
    </>
  )
}

export default AccountInfo;