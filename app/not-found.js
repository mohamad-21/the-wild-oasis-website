function NotFound() {
  return (
    <main className='text-center space-y-6 mt-4'>
      <h1 className='text-2xl font-semibold'>
        This page could not be found :(
      </h1>
      <a
        href='/'
        className='inline-block bg-accent-500 text-primary-800 px-6 py-3 '
      >
        Go back home
      </a>
    </main>
  );
}

export default NotFound;
