import { AccountAvatar, AccountInfo } from '../components';

const Account = () => {
  return (
    <main>
      <section className="w-full max-w-[1200px] px-5 md:px-10 xl:px-20 py-16 mx-auto">
        <h1 className="mb-2">Account</h1>
        <h3>Welcome to Your Account! Explore and Manage Your Personal Information</h3>
        <div className="flex flex-col lg:flex-row gap-8 lg:items-start lg:gap-20 mt-14">
          <article className="flex-1 lg:flex-[0_0_320px] px-6 py-8 gap-2 shadow-[0_6px_20px_rgba(0,0,0,0.2)] rounded-3xl">
            <AccountAvatar />
          </article>
          <div className="flex-1">
            <AccountInfo />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Account;