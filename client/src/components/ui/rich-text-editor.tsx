import { useEffect, useRef, useCallback } from 'react';
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

  const initializeEditor = useCallback(async () => {
    if (!holderRef.current) return;

    // Parse existing content
    let initialData: OutputData;
    try {
      initialData = content ? JSON.parse(content) : { blocks: [] };
    } catch {
      // If content is HTML string, convert to simple paragraph
      initialData = {
        blocks: content ? [{
          type: 'paragraph',
          data: { text: content }
        }] : []
      };
    }

    const editor = new EditorJS({
      holder: holderRef.current,
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
            endpoint: '/api/link-preview' // You can implement this endpoint later
          }
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: '/api/upload-image', // You can implement this endpoint later
              byUrl: '/api/fetch-image'
            }
          }
        }
      },
      onChange: async () => {
        if (editorRef.current) {
          try {
            const outputData = await editorRef.current.save();
            onChange(JSON.stringify(outputData));
          } catch (error) {
            console.error('Saving failed:', error);
          }
        }
      }
    });

    editorRef.current = editor;
  }, [content, onChange, placeholder]);

  useEffect(() => {
    initializeEditor();

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [initializeEditor]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div 
        ref={holderRef}
        className="min-h-[400px] p-4 prose prose-sm sm:prose lg:prose-lg max-w-none"
        style={{
          fontSize: '16px',
          lineHeight: '1.6'
        }}
      />
    </div>
  );
}