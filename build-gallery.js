import fs from 'fs';
import path from 'path';

const galleryDir = path.join(process.cwd(), 'img', 'gallery-auto');
const outputFile = path.join(process.cwd(), 'gallery-auto.html');

const files = fs.readdirSync(galleryDir)
  .filter(f => /\.(png|jpe?g|gif|webp)$/i.test(f))
  .sort()          // ascending
  .reverse();      // newest (by name) first

const items = files.map(file => {
  const url = `img/gallery-auto/${file}`;
  const title = file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
  return `
    <figure class="relative group overflow-hidden rounded-lg shadow bg-white/5">
      <img src="${url}" alt="${title}" class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105">
    </figure>`;
}).join('\n');

const html = `<!-- GENERATED FILE: do not edit by hand -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
${items}
</div>
`;

fs.writeFileSync(outputFile, html, 'utf8');
console.log(`Gallery updated with ${files.length} images.`);
