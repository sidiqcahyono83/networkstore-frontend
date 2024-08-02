export function Footer() {
  return (
    <div className="bg-stone-350 dark:bg-gray-900 mb-6">
      <footer className="bg-stone-350 dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="flex items-center justify-between mx-4">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024{" "}
              <a
                href="https://networkstore.cahyonomuslimsidiq.com/"
                className="hover:underline"
              >
                NetwokStore™
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
