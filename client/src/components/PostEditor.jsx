
import React, { useState, useEffect } from 'react';
import { Bold, Italic, Link, Image, List, ListOrdered, Quote, Code, Eye } from 'lucide-react';

const PostEditor = ({ value, onChange, placeholder = "Start writing..." }) => {
  const [content, setContent] = useState(value || '');
  const [isPreview, setIsPreview] = useState(false);
  
  useEffect(() => {
    setContent(value || '');
  }, [value]);
  
  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    onChange(newContent);
  };
  
  const insertText = (before, after = '') => {
    const textarea = document.getElementById('editor-textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
    
    setContent(newText);
    onChange(newText);
    
    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };
  
  const formatBold = () => insertText('**', '**');
  const formatItalic = () => insertText('*', '*');
  const formatLink = () => {
    const url = prompt('Enter URL:');
    if (url) insertText('[', `](${url})`);
  };
  const formatImage = () => {
    const url = prompt('Enter image URL:');
    if (url) insertText(`![alt text](${url})`);
  };
  const formatList = () => insertText('\n- ');
  const formatOrderedList = () => insertText('\n1. ');
  const formatQuote = () => insertText('> ');
  const formatCode = () => insertText('`', '`');
  
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={formatBold}
          className="p-2 rounded hover:bg-gray-200 text-gray-700"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={formatItalic}
          className="p-2 rounded hover:bg-gray-200 text-gray-700"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={formatLink}
          className="p-2 rounded hover:bg-gray-200 text-gray-700"
          title="Link"
        >
          <Link className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={formatImage}
          className="p-2 rounded hover:bg-gray-200 text-gray-700"
          title="Image"
        >
          <Image className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={formatList}
          className="p-2 rounded hover:bg-gray-200 text-gray-700"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={formatOrderedList}
          className="p-2 rounded hover:bg-gray-200 text-gray-700"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={formatQuote}
          className="p-2 rounded hover:bg-gray-200 text-gray-700"
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={formatCode}
          className="p-2 rounded hover:bg-gray-200 text-gray-700"
          title="Code"
        >
          <Code className="h-4 w-4" />
        </button>
        <div className="ml-auto flex gap-1">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`p-2 rounded ${isPreview ? 'bg-green-100 text-green-700' : 'hover:bg-gray-200 text-gray-700'}`}
            title="Preview"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {isPreview ? (
        <div className="p-4 min-h-[200px] prose prose-sm max-w-none">
          {content.split('\n').map((paragraph, index) => {
            // Simple markdown parsing for preview
            if (paragraph.startsWith('# ')) {
              return <h1 key={index} className="text-2xl font-bold mt-4 mb-2">{paragraph.substring(2)}</h1>;
            } else if (paragraph.startsWith('## ')) {
              return <h2 key={index} className="text-xl font-bold mt-3 mb-2">{paragraph.substring(3)}</h2>;
            } else if (paragraph.startsWith('### ')) {
              return <h3 key={index} className="text-lg font-bold mt-2 mb-1">{paragraph.substring(4)}</h3>;
            } else if (paragraph.startsWith('> ')) {
              return <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-2">{paragraph.substring(2)}</blockquote>;
            } else if (paragraph.startsWith('- ')) {
              return <li key={index} className="ml-4">{paragraph.substring(2)}</li>;
            } else if (paragraph.match(/^\d+\. /)) {
              return <li key={index} className="ml-4 list-decimal">{paragraph.substring(paragraph.indexOf(' ') + 1)}</li>;
            } else if (paragraph.trim() === '') {
              return <br key={index} />;
            } else {
              return <p key={index} className="my-2">{paragraph}</p>;
            }
          })}
        </div>
      ) : (
        <textarea
          id="editor-textarea"
          value={content}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full p-4 min-h-[200px] focus:outline-none resize-none"
        />
      )}
    </div>
  );
};

export default PostEditor;