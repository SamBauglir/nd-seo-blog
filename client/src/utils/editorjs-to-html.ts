import { OutputData } from '@editorjs/editorjs';

export function editorJSToHTML(data: OutputData): string {
  if (!data || !data.blocks) return '';

  return data.blocks.map(block => {
    switch (block.type) {
      case 'header':
        const level = block.data.level || 2;
        return `<h${level}>${block.data.text}</h${level}>`;
      
      case 'paragraph':
        return `<p>${block.data.text || ''}</p>`;
      
      case 'list':
        const listType = block.data.style === 'ordered' ? 'ol' : 'ul';
        const items = block.data.items.map((item: string) => `<li>${item}</li>`).join('');
        return `<${listType}>${items}</${listType}>`;
      
      case 'checklist':
        const checkItems = block.data.items.map((item: any) => 
          `<div class="checklist-item">
            <input type="checkbox" ${item.checked ? 'checked' : ''} disabled>
            <span>${item.text}</span>
          </div>`
        ).join('');
        return `<div class="checklist">${checkItems}</div>`;
      
      case 'quote':
        const caption = block.data.caption ? `<cite>${block.data.caption}</cite>` : '';
        return `<blockquote>${block.data.text}${caption}</blockquote>`;
      
      case 'code':
        return `<pre><code>${block.data.code}</code></pre>`;
      
      case 'table':
        const rows = block.data.content.map((row: string[]) => {
          const cells = row.map(cell => `<td>${cell}</td>`).join('');
          return `<tr>${cells}</tr>`;
        }).join('');
        return `<table class="editor-table"><tbody>${rows}</tbody></table>`;
      
      case 'delimiter':
        return '<hr>';
      
      case 'image':
        const imgCaption = block.data.caption ? `<figcaption>${block.data.caption}</figcaption>` : '';
        return `<figure><img src="${block.data.file.url}" alt="${block.data.caption || ''}">${imgCaption}</figure>`;
      
      case 'linkTool':
        return `<a href="${block.data.link}" target="_blank" rel="noopener noreferrer">
          <div class="link-preview">
            ${block.data.meta.image ? `<img src="${block.data.meta.image.url}" alt="">` : ''}
            <div>
              <h4>${block.data.meta.title}</h4>
              <p>${block.data.meta.description}</p>
              <span>${block.data.link}</span>
            </div>
          </div>
        </a>`;
      
      case 'raw':
        return block.data.html;
      
      default:
        return '';
    }
  }).join('\n');
}

export function htmlToEditorJS(html: string): OutputData {
  // Simple conversion - for more complex HTML parsing, you'd need a proper HTML parser
  if (!html) {
    return { blocks: [] };
  }

  // If it's already EditorJS format, return as is
  try {
    const parsed = JSON.parse(html);
    if (parsed.blocks) {
      return parsed;
    }
  } catch {
    // Not JSON, treat as HTML
  }

  // Simple HTML to blocks conversion
  const blocks = [];
  
  // Split by common block elements
  const paragraphs = html.split(/(<h[1-6]>.*?<\/h[1-6]>|<p>.*?<\/p>|<ul>.*?<\/ul>|<ol>.*?<\/ol>)/gi)
    .filter(block => block.trim());

  for (const block of paragraphs) {
    if (block.match(/^<h([1-6])>/)) {
      const level = parseInt(block.match(/^<h([1-6])>/)![1]);
      const text = block.replace(/<\/?h[1-6]>/g, '');
      blocks.push({
        type: 'header',
        data: { text, level }
      });
    } else if (block.match(/^<p>/)) {
      const text = block.replace(/<\/?p>/g, '');
      if (text.trim()) {
        blocks.push({
          type: 'paragraph',
          data: { text }
        });
      }
    } else if (block.match(/^<(ul|ol)>/)) {
      const style = block.startsWith('<ol>') ? 'ordered' : 'unordered';
      const items = block.match(/<li>(.*?)<\/li>/g)?.map(item => 
        item.replace(/<\/?li>/g, '')
      ) || [];
      blocks.push({
        type: 'list',
        data: { style, items }
      });
    } else if (block.trim() && !block.match(/^<\//)) {
      // Fallback for any other content
      blocks.push({
        type: 'paragraph',
        data: { text: block.trim() }
      });
    }
  }

  return { blocks };
}