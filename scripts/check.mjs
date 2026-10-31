import {readFile, access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Script} from 'node:vm';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let count=0;
for (const name of ['index.html','pricing/index.html']) {
  const html=await readFile(path.join(root,name),'utf8');
  for (const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
    if(match[1].trim()) new Script(match[1],{filename:name});
  }
  for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
    const url=match[1];
    if(!url.includes('assets/')) continue;
    if(url.startsWith('/assets/')) throw new Error(`${name}: root-only asset path is not GitHub Pages compatible`);
    const base = html.includes('<base href="../">') ? root : path.resolve(root, path.dirname(name));
    const local=url.startsWith('/')?path.join(root,url):path.resolve(base,url);
    await access(local);count++;
    if(local.endsWith('.js')) new Script(await readFile(local,'utf8'),{filename:local});
  }
  if(!html.includes('noindex,nofollow')) throw new Error(`${name}: missing noindex`);
  if(/href=["']\/blog\//.test(html)) throw new Error(`${name}: unbuilt blog link`);
}
const home=await readFile(path.join(root,'index.html'),'utf8');
if((home.match(/role="tab"/g)||[]).length!==7) throw new Error('Expected seven feature tabs');
const pricing=await readFile(path.join(root,'pricing/index.html'),'utf8');
if((pricing.match(/data-monthly=/g)||[]).length!==4) throw new Error('Expected four pricing plans');
console.log(`PASS: both pages, seven tabs, four plans, JavaScript syntax and ${count} asset references`);
