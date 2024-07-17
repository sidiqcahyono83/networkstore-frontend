export function Header() {
  return (
    <div>
      <nav className="bg-stone-700 border-gray-500 dark:bg-gray-900 rounded-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 bg-white">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/ns.png" className="h-8" alt="Networkstore Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              NETWORK STORE
            </span>
          </a>
        </div>

        <div className="flex justify-between mx-4 px-4 py-4 bg-stone-350">
          <div>
            <ul className="flex items-center justify-center space-x-4">
              <li>
                <a
                  href="/"
                  className="block py-2 px-3 text-yellow-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="block py-2 px-3 text-yellow-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Product
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="block py-2 px-3 text-yellow-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Cart
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex items-center justify-center space-x-4">
              <li>
                <a
                  href="/daftar"
                  className="block py-2 px-3 text-yellow-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Daftar
                </a>
              </li>
              <li>
                <a
                  href="login"
                  className="block py-2 px-3 text-yellow-500 rounded hover:bg-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
