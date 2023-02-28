import { FC, ReactNode, useEffect, useState } from "react";

type TypingAnimationSlidesProps = {
  messages: (string)[];
  children: ReactNode;
}

const TypingAnimationSlides = (props: TypingAnimationSlidesProps, ) => {

  // Get all messages from props
  const { messages, children } = props
  const [messageIndex, setMessageIndex] = useState(0)

  // Define handlers
  // increment message index or reset
  const next = () => setMessageIndex(messageIndex + 1 < messages.length ? messageIndex + 1 : 0)
  const previous = () => setMessageIndex(messageIndex - 1 >= 0 ? messageIndex - 1 : messages.length - 1)

  return (
    <div className="p-4 z-10 flex flex-col justify-between items-center w-full h-full">
      <TypingAnimation message={messages[messageIndex]}/>
      <br/>
      <div className="mt-2 flex flex-row justify-between w-full">
        <button onClick={previous} className="text-s text-white">{'<'}</button>
        { messageIndex === messages.length - 1 ? 
          children : <span className="text-s text-white">{`${messageIndex + 1} / ${messages.length}`}</span> }
        <button onClick={next} className="text-s text-white">{'>'}</button>
      </div>
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
    }, 20);

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
    <div className="whitespace-pre-line text-lg md:text-xl text-white text-left w-full">
      <span>{text}</span>
      <span>{blink ? " |" : "  "}</span>
    </div>
  );
};

export { TypingAnimation, TypingAnimationSlides }




