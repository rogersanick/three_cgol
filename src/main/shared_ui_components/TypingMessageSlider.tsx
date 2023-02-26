import { FC, useEffect, useState } from "react";

type TypingAnimationSlidesProps = {
  messages: (string)[];
}

const TypingAnimationSlides = (props: TypingAnimationSlidesProps) => {

  // Get all messages from props
  const { messages } = props
  const [messageIndex, setMessageIndex] = useState(0)

  // Define handlers
  // increment message index or reset
  const next = () => setMessageIndex(messageIndex + 1 < messages.length ? messageIndex + 1 : 0)
  const previous = () => setMessageIndex(messageIndex - 1 >= 0 ? messageIndex - 1 : messages.length - 1)

  return (
    <div className="z-10 flex justify-between items-center w-full max-w-[40rem] h-fit min-h-[10rem]">
      <button onClick={previous} className="bg-blue-800/40 border-solid border-2 border-white rounded-full m-4 w-8 h-8 text-s text-white">{"<"}</button>
      <TypingAnimation message={messages[messageIndex] + `\n\n[${messageIndex + 1}/${messages.length}]`}/>
      <button onClick={next} className="bg-blue-800/40 border-solid border-2 border-white rounded-full m-4 w-8 h-8 text-s text-white">{">"}</button>
    </div>
  )
}

interface TypingAnimationProps {
  message: string;
}

const TypingAnimation: FC<TypingAnimationProps> = ({ message }) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < message.length) {
        setText((prev) => prev + message[index]);
        setIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [index, message]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    setText("");
    setIndex(0);
  }, [message])

  return (
    <div className="m-4 p-2 bg-blue-800/20 border-solid border border-white rounded-md whitespace-pre-line text-s md:text-xl text-white text-left w-11/12">
      <span>{text}</span>
      <span>{blink ? " |" : "  "}</span>
    </div>
  );
};

export { TypingAnimation, TypingAnimationSlides }




