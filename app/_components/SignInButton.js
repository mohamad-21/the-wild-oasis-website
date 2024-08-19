function SignInButton() {
  return (
    <button className='flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium'>
      <img
        src='https://authjs.dev/img/providers/google.svg'
        alt='Google logo'
        height='24'
        width='24'
      />
      <span>Continue with Google</span>
    </button>

    /* <button className="flex items-center justify-between py-3 px-5 w-[230px] bg-primary-900 border-primary-600 rounded-lg hover:bg-primary-800 transition-all">
      <img
        src='https://authjs.dev/img/providers/google.svg'
        width={30}
        height={30}
      />
      <span>Sign in with Google</span>
    </button> */
  );
}

export default SignInButton;
