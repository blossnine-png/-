/* 万法宗 · 万法机关令。固定版本加载器；与完整版使用同一脚本ID。 */
(async()=>{
  'use strict';
  const release={"version":"1.1.1","commit":"851dd440c00878fbfdc7ca4e14d8efae3034b2ea","repo":"blossnine-png/-","path":"wanfa/1.1.1","urls":["https://cdn.jsdelivr.net/gh/blossnine-png/-@851dd440c00878fbfdc7ca4e14d8efae3034b2ea/wanfa/1.1.1/wanfa.js","https://gcore.jsdelivr.net/gh/blossnine-png/-@851dd440c00878fbfdc7ca4e14d8efae3034b2ea/wanfa/1.1.1/wanfa.js","https://raw.githubusercontent.com/blossnine-png/-/851dd440c00878fbfdc7ca4e14d8efae3034b2ea/wanfa/1.1.1/wanfa.js"],"sha256":"2c3e66220eea34dcf74ca04876df3e91c975b209188122ec96a652fac646e65b","imageSha256":"1ce75a646f278d2ad55b44740488240a98542240bdee292428f8549b97dd8e9e"},host=window.parent||window,slot='__wanfa_hosted_loading';
  if(host[slot]?.active){console.info('[万法宗] 托管模块正在加载，已忽略重复启动。');return;}
  const job={active:true};host[slot]=job;
  let canceled=false,objectUrl;
  const abort=()=>{canceled=true;job.controller?.abort();};
  window.addEventListener('pagehide',abort,{once:true});
  async function sha256(data){if(!globalThis.crypto?.subtle)throw Error('当前环境不支持完整性校验，请使用完整本地版脚本。');return [...new Uint8Array(await crypto.subtle.digest('SHA-256',data))].map(b=>b.toString(16).padStart(2,'0')).join('');}
  async function download(url,expected,timeout=15000){
    const controller=new AbortController();job.controller=controller;const timer=setTimeout(()=>controller.abort(),timeout);
    try{const response=await fetch(url,{signal:controller.signal,credentials:'omit',referrerPolicy:'no-referrer'});if(!response.ok)throw Error('HTTP '+response.status);const bytes=await response.arrayBuffer();if(canceled)throw Error('脚本已卸载');if(await sha256(bytes)!==expected)throw Error('文件校验不一致');return bytes;}finally{clearTimeout(timer);if(job.controller===controller)delete job.controller;}
  }
  try{
    let bytes,base,lastError;
    for(const url of release.urls){try{bytes=await download(url,release.sha256);base=url.slice(0,url.lastIndexOf('/')+1);break;}catch(error){lastError=error;if(canceled)throw error;}}
    if(!bytes)throw Error('无法加载托管模块：'+(lastError?.message||'网络不可用'));
    const source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);
    // Import only verified bytes. The runtime is an ES module with no external imports.
    objectUrl=URL.createObjectURL(new Blob([source],{type:'text/javascript'}));
    const module=await import(objectUrl);if(canceled)return;if(typeof module.default!=='function')throw Error('运行模块格式不正确');
    // The image is fetched from the same fixed Git revision and verified before display.
    let imageUrl;
    try{const image=await download(base+'wanfa-city.png',release.imageSha256);imageUrl=URL.createObjectURL(new Blob([image],{type:'image/png'}));}catch(error){if(canceled)throw error;imageUrl=base+'wanfa-city.png';console.warn('[万法宗] 仙城图片暂未缓存，将直接读取固定版本图片。');}
    if(canceled){if(imageUrl?.startsWith('blob:'))URL.revokeObjectURL(imageUrl);return;}
    await module.default(imageUrl);
    if(imageUrl?.startsWith('blob:'))window.addEventListener('pagehide',()=>URL.revokeObjectURL(imageUrl),{once:true});
    console.info('[万法宗] 托管版 '+release.version+' 已加载；固定提交 '+release.commit.slice(0,12));
  }catch(error){
    if(!canceled){console.error('[万法宗] 托管加载失败：',error.message);host.__wanfa_health={phase:'error',member:false,detail:'托管加载失败：'+error.message};try{host.toastr?.error?.('万法机关令加载失败，请检查网络或改用完整本地版。');}catch{}}
  }finally{if(objectUrl)URL.revokeObjectURL(objectUrl);job.active=false;if(host[slot]===job)delete host[slot];window.removeEventListener('pagehide',abort);}
})();
