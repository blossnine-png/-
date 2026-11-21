/* 万法机关令托管入口 */
(async()=>{
  const release={"version":"1.4.1","commit":"751dd536cd6106c8ea370bd509ae7935a699aa7c","bases":["https://gcore.jsdelivr.net/gh/blossnine-png/-@751dd536cd6106c8ea370bd509ae7935a699aa7c/wanfa/1.4.1/","https://cdn.jsdelivr.net/gh/blossnine-png/-@751dd53/wanfa/1.4.1/","https://raw.githubusercontent.com/blossnine-png/-/751dd536cd6106c8ea370bd509ae7935a699aa7c/wanfa/1.4.1/"],"sha256":"2ab3f4c3e4b6a6d1aff03343a4a98e563b06d983e80b1e6f3a0b2d9f4a0f933f"};
  const host=window.parent||window;
  const slot='__wanfa_hosted_loading';
  if(host[slot]?.active)return;

  const controller=new AbortController();
  const job={active:true};
  host[slot]=job;
  const stop=()=>controller.abort();
  window.addEventListener('pagehide',stop,{once:true});

  async function download(file,expected){
    let lastError;
    for(const base of release.bases){
      if(controller.signal.aborted)throw controller.signal.reason;
      try{
        const response=await fetch(base+file,{
          signal:AbortSignal.any([controller.signal,AbortSignal.timeout(20000)]),
          credentials:'omit',
          referrerPolicy:'no-referrer',
        });
        if(!response.ok)throw Error('HTTP '+response.status);
        const bytes=await response.arrayBuffer();
        const digest=await crypto.subtle.digest('SHA-256',bytes);
        const actual=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
        if(actual!==expected)throw Error('文件校验不一致');
        return {bytes,base};
      }catch(error){lastError=error;}
    }
    throw Error(file+' 无法加载：'+(lastError?.message||'网络不可用'));
  }

  try{
    if(!globalThis.crypto?.subtle)throw Error('当前环境不支持文件校验，请使用完整本地版。');
    const {bytes,base}=await download('wanfa.js',release.sha256);
    if(controller.signal.aborted)return;
    const url=URL.createObjectURL(new Blob([bytes],{type:'text/javascript'}));
    try{
      const module=await import(url);
      if(!controller.signal.aborted)await module.default(base);
    }finally{URL.revokeObjectURL(url);}
  }catch(error){
    if(!controller.signal.aborted){
      const detail='托管加载失败：'+error.message;
      console.error('[万法宗]',detail);
      host.__wanfa_health={phase:'error',member:false,detail};
      host.toastr?.error?.(detail);
    }
  }finally{
    window.removeEventListener('pagehide',stop);
    if(host[slot]===job)delete host[slot];
  }
})();
