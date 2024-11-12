// "use client";

// import { IoSearch } from "react-icons/io5";
// import { useSearchParams, usePathname, useRouter } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";

// const Search = () => {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const { replace } = useRouter();

//   const handleSearch = useDebouncedCallback((term: string) => {
//     console.log(term);
//     const params = new URLSearchParams(searchParams);
//     // params.set("page", "1");
//     if (term) {
//       params.set("query", term);
//     } else {
//       params.delete("query");
//     }
//     replace(`${pathname}?${params.toString()}`);
//   }, 300);

//   return (
//     <div className="relative flex flex-1 mb-5 ml-5 mr-5">
//       <input
//         type="text"
//         className="w-full border border-gray-500 py-2 pl-10 text-sm outline-2 rounded-sm"
//         placeholder="Search..."
//         onChange={(e) => handleSearch(e.target.value)}
//         defaultValue={searchParams.get("query")?.toString()}
//       />
//       <IoSearch className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
//     </div>
//   );
// };

// export default Search;

"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(term);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <label className="input input-bordered flex w-1/2 items-center gap-2 mb-4">
      <input 
        type="text" 
        className="grow" 
        placeholder="Search...." 
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
        />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70">
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd" />
      </svg>
    </label>

  );
};

export default Search;