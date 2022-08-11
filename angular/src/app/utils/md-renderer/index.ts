import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

function headingToId(heading: string): string{
  return heading.toLowerCase().replace(' ', '-');
}

export function CustomRenderer(): MarkedOptions{
  const renderer = new MarkedRenderer();
  renderer.heading = (heading, level, raw, slugged) => {
    const h = 'h' + level;
    const id = slugged.slug(heading)

    return `<div class="show-heading-link">
      <a href="${String(document.location).split('#')[0]}#${id}" class="noselect">
        <img 
          class="link-copy-ico noselect" 
          src="assets/articles/linkicon.webp"
          aria-hidden="true"
          />
      </a>
      <${h} id="${id}">${heading}</${h}>
    </div>
    `;
  };
  
  console.log("Using Custom Markdown Renderer!");

  return {
    renderer: renderer,
    gfm: true,
    breaks: true,
    pedantic: false,
    smartLists: true,
    smartypants: true
  }
}