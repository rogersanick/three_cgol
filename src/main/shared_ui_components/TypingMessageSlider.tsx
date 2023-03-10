import { FC, useEffect, useState } from "react";

type TypingAnimationSlidesProps = {
  messages: (string)[];
  ctaCallback?: () => void;
  ctaText?: string;
}

const TypingAnimationSlides = (props: TypingAnimationSlidesProps, ) => {

  // Get all messages from props
  const { messages, ctaCallback, ctaText } = props
  const [messageIndex, setMessageIndex] = useState(0)

  // Define handlers
  // increment message index or reset
  const next = () => setMessageIndex(messageIndex + 1 < messages.length ? messageIndex + 1 : 0)
  const previous = () => setMessageIndex(messageIndex - 1 >= 0 ? messageIndex - 1 : messages.length - 1)

  return (
    <div className="p-8 z-10 flex flex-col justify-between items-center w-full h-full">
      <TypingAnimation message={messages[messageIndex]}/>
      <br/>
      <div className="mt-2 flex flex-row justify-between w-full">
        <button onClick={previous} className="h-8 w-8 text-s text-white bg-gradient-to-br from-blue-800/30 via-slate-900/80 to-indigo-700/70 border-solid border border-white rounded-full">{'<'}</button>
        { messageIndex === messages.length - 1 && ctaText ? 
          <button onClick={ctaCallback} className="h-8 w-fit px-3 bg-gradient-to-br from-blue-800/30 via-slate-900/80 to-indigo-700/70 z-40 border-solid border border-white rounded-full text-lg text-white">{ctaText}</button>
          : <span className="text-s text-white">{`${messageIndex + 1} / ${messages.length}`}</span> }
        <button onClick={next} className="h-8 w-8 text-s text-white bg-gradient-to-br from-blue-800/30 via-slate-900/80 to-indigo-700/70 border-solid border border-white rounded-full">{'>'}</button>
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




