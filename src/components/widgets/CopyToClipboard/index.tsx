import React, { useRef, useState } from "react";
import { FaRegClipboard } from "react-icons/fa";

interface CopyToClipboardProps {
  title?: string;
  content: string;
}
export default function CopyToClipboard({
  title,
  content,
}: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);
  const codeElement = useRef<HTMLElement>(null);

  const copyAddress = () => {
    const text = codeElement.current?.textContent;
    if (text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 1500);
        })
        .catch(() => {
          setCopied(false);
        });
    }
  };

  return (
    <div className="relative bg-slate-800 p-1 max-w-lg flex mx-auto">
      <pre className="overflow-x-scroll md:overflow-x-visible p-1 pl-4 flex-1">
        {title && `${title}:`}{" "}
        <code ref={codeElement} onClick={copyAddress}>
          {content}
        </code>
      </pre>
      <button
        className="shadow shadow-gray-600 bg-dark ml-1 p-1 flex-none"
        onClick={copyAddress}
      >
        <FaRegClipboard className="h-6 w-6" />
      </button>
      {copied && (
        <span className="absolute bg-dark p-2 rounded-md ring-1 ring-gray-500 right-12 top-1/2 -translate-y-2/3 text-sm font-medium text-white">
          Copied!
        </span>
      )}
    </div>
  );
}
