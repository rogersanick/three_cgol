import { SocialIcon } from "react-social-icons";

const SocialFooter = () => {
  return (
    <div className="flex flex-row absolute bottom-0 right-0 m-2"> 
      <SocialIcon style={{background: "white", height: "2.5rem", width: "2.5rem", margin: "0.2rem"}} className="border-2 border-white rounded-full" url="https://twitter.com/rogersanick" />
      <SocialIcon style={{background: "white", height: "2.5rem", width: "2.5rem", margin: "0.2rem"}} className="border-2 border-white rounded-full" url="https://github.com/rogersanick/three_cgol" />
    </div>
  )
}

export default SocialFooter;