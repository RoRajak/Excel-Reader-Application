"use client";
import React, { useState } from "react";
import {
  bellBlackIcon,
  bellWhiteIcon,
  excelIcon,
  loaderIcon,
  logoBlueIcon,
  menuIcon,
  profileIcon,
  uploadButtonBlackIcon,
  uploadButtonIcon,
} from "@/constants";
import Image from "next/image";
import { useTheme } from "next-themes";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { log } from "console";


interface HeroSectionProps {
  toggleSidebar: () => void;
}
interface RowData {
  id: string | number;
  links: string;
  prefix: string;
  "select tags": string;
  "selected tags"?: string;
  [key: string]: string | number | undefined; // Allow any string key with string or number values
}
const HeroSection: React.FC<HeroSectionProps> = ({ toggleSidebar }) => {
  const { resolvedTheme } = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isHandleUploadRun, setIsHandleUploadRun] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  
  const router=useRouter()

  const handleLogout=()=>{
    const token=localStorage.getItem('token')
    if (token) {
      localStorage.clear()
      router.push("/signin")
      
    }else{
      signOut()
    }
    
    
  }

  const toggleTagDropdown = (rowIndex: number) => {
    setOpenDropdown(openDropdown === rowIndex ? null : rowIndex);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const [selectedTags, setSelectedTags] = useState<{ [key: number]: string[] }>(
    {}
  );

  const isExcelOrCsvFile = (file: File) => {
    return (
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel" ||
      file.type === "text/csv" ||
      file.name.endsWith(".csv") ||
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".xls")
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && isExcelOrCsvFile(uploadedFile)) {
      setFile(uploadedFile);
      setError(null);
    } else {
      setFile(null);
      setError("Please upload a valid Excel file.");
    }
  };

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (file.name.endsWith(".csv")) {
          const text = e.target?.result as string;
          const result = Papa.parse<RowData>(text, { header: true });
          console.log(result.data);
          
          setData(result.data);
          initializeSelectedTags(result.data);
        } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          const headers = jsonData[0] as string[];
          
          
          const formattedData: RowData[] = jsonData.slice(1).map((row: any) => {
            return headers.reduce((obj: RowData, header: string, index: number) => {
              obj[header as keyof RowData] = row[index] as string | number;
              console.log(obj);
              
              return obj;
            }, {} as RowData);
          });
          
          
          setData(formattedData);
          initializeSelectedTags(formattedData);
        }
      } catch (error) {
        console.error("Error reading file:", error);
        setError("Error reading file. Please try again.");
      }
    };
  
    if (file.name.endsWith(".csv")) {
      reader.readAsText(file);
    } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
      reader.readAsArrayBuffer(file);
    }
  };;
  const initializeSelectedTags = (data: any[]) => {
    const initialTags: { [key: number]: string[] } = {};
    data.forEach((row, index) => {
      initialTags[index] = row["selected tags"]
        ? row["selected tags"].split(",").map((tag: string) => tag.trim())
        : [];
    });
    setSelectedTags(initialTags);
  };

  const handleTagSelection = (rowIndex: number, tag: string) => {
    setSelectedTags((prev) => {
      const newTags = [...(prev[rowIndex] || [])];
      if (!newTags.includes(tag)) {
        newTags.push(tag);
      }
      return { ...prev, [rowIndex]: newTags };
    });
    setOpenDropdown(null);
  };

  const removeTag = (rowIndex: number, tag: string) => {
    setSelectedTags((prev) => ({
      ...prev,
      [rowIndex]: prev[rowIndex].filter((t) => t !== tag),
    }));
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile && isExcelOrCsvFile(droppedFile)) {
      setFile(droppedFile);
      setError(null);
      readFile(droppedFile);
      
    } else {
      setFile(null);
      setError("Please upload a valid Excel or CSV file.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
    setData([]);
  };
  const handleUploadClick = () => {
    setIsHandleUploadRun(true);
    if (file) {
      
      setTimeout(() => {
        readFile(file);
      removeFile();
        setIsHandleUploadRun(false);
      }, 3000);
    } else {
      setError("Please select a file before uploading.");
      setIsHandleUploadRun(false);
    }
  };


  return (
    <div className="max-h-screen bg-[#FAFAFB] dark:bg-dark-bg">
      {/* Header */}
      <header className="flex items-center justify-between p-4  dark:border-none">
        <div className="flex items-center space-x-3">
          <button onClick={toggleSidebar}>
            <Image src={menuIcon} alt="menu" className="sm:hidden" />
          </button>
          <div className="flex items-center space-x-2 ">
            <h1 className="hidden sm:block text-xl font-semibold mb-4 font-figtree">
              Upload CSV
            </h1>
            <Image src={logoBlueIcon} alt="logo" className="sm:hidden" />
            <span className="font-semibold text-xl sm:hidden font-figtree">Base</span>
          </div>
        </div>
        <div className="flex items-center space-x-12">
          {resolvedTheme === "dark" ? (
            <Image src={bellWhiteIcon} alt="bell icon" />
          ) : (
            <Image src={bellBlackIcon} alt="bell icon" />
          )}
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="w-8 h-8 rounded-full focus:outline-none"
            >
              <Image src={profileIcon} alt="profile" className="rounded-full" />
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-figtree"
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 flex flex-col items-center justify-center sm:mt-12">
        <div
          className="w-full sm:w-1/2 sm:h-1/2 p-6 rounded-2xl bg-white dark:bg-black"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <h1 className="text-xl font-semibold mb-4 sm:hidden font-figtree">Upload CSV</h1>
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-44 sm:h-52 p-2 sm:px-8 sm:py-12 text-center dark:border-gray-800">
            {file ? (
              <div>
                <div className="w-12 h-12 mx-auto mb-4 pt-2 sm:mt-0">
                  <Image
                    src={excelIcon}
                    alt="Excel Icon"
                    width={48}
                    height={48}
                  />
                </div>
                <p className="text-gray-500 mb-2 font-figtree">{file.name}</p>
                <button
                  onClick={removeFile}
                  className="text-red-600 cursor-pointer font-figtree"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 mx-auto mb-4">
                  <Image
                    src={excelIcon}
                    alt="Excel Icon"
                    width={48}
                    height={48}
                  />
                </div>
                <p className="text-gray-500 mb-2 font-figtree">
                  Drop your Excel sheet here or{" "}
                  <label
                    htmlFor="file-upload"
                    className="text-blue-600 cursor-pointer self-baseline font-figtree"
                  >
                    browse
                  </label>
                </p>
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                />
              </div>
            )}
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>

          {/* Upload Button */}
          {isHandleUploadRun ? (
            <button
              onClick={handleUploadClick}
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 flex items-center justify-center gap-x-2 dark:text-black"
              disabled={!file}
            >
              <Image src={loaderIcon} alt="icon" />
            </button>
          ) : (
            <button
              onClick={handleUploadClick}
              className={`w-full ${file?"bg-blue-600":"bg-blue-400"}  text-white py-3 rounded-lg mt-6 flex items-center justify-center gap-x-2 dark:text-black`}
              disabled={!file}
            >
              {resolvedTheme === "dark" ? (
                <Image src={uploadButtonBlackIcon} alt="icon" />
              ) : (
                <Image src={uploadButtonIcon} alt="icon" />
              )}
              Upload
            </button>
          )}
        </div>
      </main>
      {data.length > 0 && (
        <div className="mt-12">
          <p className="text-2xl font-semibold pl-5 sm:pl-20">Uploads</p>

          <div className="mt-8 w-full pl-5 sm:pl-20  sm:pr-4 h-[calc(100vh-400px)] overflow-x-auto relative max-w-7xl ">
            <table className="min-w-full border-separate border-spacing-y-4 bg-light-bg dark:bg-black rounded-2xl">
              <thead>
                <tr className="rounded-t-xl bg-light-bg dark:bg-black">
                  <th className="py-2 pl-[1px] dark:bg-black sticky left-0 z-10 bg-inherit font-figtree bg-light-bg  ">
                    SI No.
                  </th>
                  <th className="py-2 pl-10 text-left dark:bg-black font-figtree">Links</th>
                  <th className="py-2 px-4 text-left dark:bg-black font-figtree">Prefix</th>
                  <th className="py-2 px-4 text-left dark:bg-black font-figtree">
                    Add Tags
                  </th>
                  <th className="py-2 text-left dark:bg-black font-figtree">
                    Selected Tags
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-[12px] px-4 dark:divide-black">
                {data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="bg-white dark:bg-dark-bg shadow-md "
                  >
                    <td className="py-4 px-6 text-start rounded-l-lg font-figtree sticky left-0 z-10 bg-light-bg dark:bg-black sm:bg-white sm:dark:bg-dark-bg ">{row.id}</td>
                    <td className="py-4 px-6 text-start">
                      <a
                        href={row.links}
                        className="text-blue-500 hover:underline font-figtree"
                      >
                        {row.links}
                      </a>
                    </td>
                    <td className="py-4 px-6 font-figtree">{row.prefix}</td>
                    <td className="py-4 px-6">
                      <div className="relative">
                        <button
                          onClick={() => toggleTagDropdown(rowIndex)}
                          className="w-36 bg-gray-100 dark:bg-black rounded-md px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none font-figtree"
                        >
                          Select Tags ▼
                        </button>
                        {openDropdown === rowIndex && (
                          <div className="absolute z-10 mt-1 w-36 rounded-md bg-white dark:bg-black shadow-lg">
                            <div className="py-1 max-h-60 overflow-auto no-scrollbar">
                              {row["select tags"]
                                .split(",")
                                .map((tag: string) => (
                                  <button
                                    key={tag.trim()}
                                    className="w-32 mx-2 text-left px-4 py-4 mt-2 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-bg overflow-auto no-scrollbar font-figtree"
                                    onClick={() =>
                                      handleTagSelection(rowIndex, tag.trim())
                                    }
                                  >
                                    {tag.trim()}
                                  </button>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 rounded-r-lg overflow-x-auto max-w-44 no-scrollbar">
                      <div className="flex  gap-2 ">
                        {selectedTags[rowIndex]?.map((tag) => (
                          <span
                            key={tag}
                            className="bg-blue-500 text-white rounded-md px-2 py-1 text-sm flex items-center"
                          >
                            {tag}
                            <button
                              onClick={() => removeTag(rowIndex, tag)}
                              className="ml-1 text-white font-bold"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
