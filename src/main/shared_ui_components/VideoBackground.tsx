const VideoBackGround = () => (
  <>  
    <video autoPlay muted loop playsInline className="opacity-10 -z-10 absolute animate-gradient-xy bg-gradient-to-br from-blue-800 via-slate-900 to-indigo-700 h-screen w-screen w-full h-full absolute top-0 left-0 object-cover">
      <source src="/app_background.mp4" type="video/mp4" />
    </video>
    <div className="absolute -z-20 animate-gradient-xy bg-gradient-to-br from-blue-800 via-slate-900 to-indigo-700 h-screen w-screen"></div>
  </>

)

export default VideoBackGround;