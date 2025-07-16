import { useEffect, useRef, useState } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import Code from '@editorjs/code';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import LinkTool from '@editorjs/link';
import ImageTool from '@editorjs/image';
import Checklist from '@editorjs/checklist';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [holderId] = useState(() => `editor-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    let isMounted = true;

    const initializeEditor = async () => {
      // Destroy existing editor if it exists
      if (editorRef.current) {
        try {
          await editorRef.current.destroy();
        } catch (error) {
          console.log('Editor destroy error (safe to ignore):', error);
        }
        editorRef.current = null;
      }

      if (!holderRef.current || !isMounted) return;

      // Parse existing content
      let initialData: OutputData;
      try {
        if (content && content.trim()) {
          const parsed = JSON.parse(content);
          initialData = parsed.blocks ? parsed : { blocks: [] };
        } else {
          initialData = { blocks: [] };
        }
      } catch {
        // If content is HTML string, convert to simple paragraph
        initialData = {
          blocks: content && content.trim() ? [{
            type: 'paragraph',
            data: { text: content }
          }] : []
        };
      }

      try {
        const editor = new EditorJS({
          holder: holderId,
          placeholder: placeholder || 'Start writing your content...',
          data: initialData,
          tools: {
            header: {
              class: Header,
              config: {
                levels: [1, 2, 3, 4],
                defaultLevel: 2
              }
            },
            paragraph: {
              class: Paragraph,
              inlineToolbar: true
            },
            list: {
              class: List,
              inlineToolbar: true,
              config: {
                defaultStyle: 'unordered'
              }
            },
            checklist: {
              class: Checklist,
              inlineToolbar: true
            },
            quote: {
              class: Quote,
              inlineToolbar: true,
              config: {
                quotePlaceholder: 'Enter a quote',
                captionPlaceholder: 'Quote\'s author'
              }
            },
            code: {
              class: Code,
              config: {
                placeholder: 'Enter code here...'
              }
            },
            table: {
              class: Table,
              inlineToolbar: true,
              config: {
                rows: 2,
                cols: 3
              }
            },
            delimiter: Delimiter,
            marker: {
              class: Marker,
              shortcut: 'CMD+SHIFT+M'
            },
            inlineCode: {
              class: InlineCode,
              shortcut: 'CMD+SHIFT+C'
            },
            linkTool: {
              class: LinkTool,
              config: {
                endpoint: '/api/fetch-url'
              }
            },
            image: {
              class: ImageTool,
              config: {
                endpoints: {
                  byFile: '/api/upload-image',
                  byUrl: '/api/upload-image-by-url',
                },
                field: 'image',
                types: 'image/*',
                captionPlaceholder: 'Add caption...',
                buttonContent: 'Select an image',
                uploader: {
                  uploadByFile(file: File) {
                    return new Promise((resolve, reject) => {
                      const formData = new FormData();
                      formData.append('image', file);
                      
                      fetch('/api/upload-image', {
                        method: 'POST',
                        body: formData,
                      })
                      .then(response => response.json())
                      .then(data => {
                        if (data.success) {
                          resolve({
                            success: 1,
                            file: {
                              url: data.file.url,
                              size: data.file.size,
                              name: data.file.name,
                            }
                          });
                        } else {
                          reject(data.message || 'Upload failed');
                        }
                      })
                      .catch(error => {
                        reject('Upload failed: ' + error.message);
                      });
                    });
                  },
                  uploadByUrl(url: string) {
                    return new Promise((resolve, reject) => {
                      fetch('/api/upload-image-by-url', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ url }),
                      })
                      .then(response => response.json())
                      .then(data => {
                        if (data.success) {
                          resolve({
                            success: 1,
                            file: {
                              url: data.file.url,
                              size: data.file.size,
                              name: data.file.name,
                            }
                          });
                        } else {
                          reject(data.message || 'Upload failed');
                        }
                      })
                      .catch(error => {
                        reject('Upload failed: ' + error.message);
                      });
                    });
                  }
                }
              }
            }
          },
          onChange: async () => {
            if (editorRef.current && isMounted) {
              try {
                const outputData = await editorRef.current.save();
                onChange(JSON.stringify(outputData));
              } catch (error) {
                console.error('Saving failed:', error);
              }
            }
          },
          onReady: () => {
            if (isMounted) {
              setIsReady(true);
            }
          }
        });

        await editor.isReady;
        
        if (isMounted) {
          editorRef.current = editor;
        } else {
          // Component unmounted before editor was ready
          await editor.destroy();
        }
      } catch (error) {
        console.error('Editor initialization failed:', error);
      }
    };

    initializeEditor();

    return () => {
      isMounted = false;
      setIsReady(false);
      
      if (editorRef.current) {
        editorRef.current.destroy().catch(error => {
          console.log('Editor cleanup error (safe to ignore):', error);
        });
        editorRef.current = null;
      }
    };
  }, []); // Empty dependency array - only initialize once

  return (
    <div className="border rounded-lg overflow-hidden">
      <div 
        ref={holderRef}
        id={holderId}
        className="min-h-[400px] p-4 prose prose-sm sm:prose lg:prose-lg max-w-none"
        style={{
          fontSize: '16px',
          lineHeight: '1.6'
        }}
      />
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75">
          <div className="text-gray-500">Loading editor...</div>
        </div>
      )}
    </div>
  );
}