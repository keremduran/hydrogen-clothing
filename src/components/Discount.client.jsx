import React from 'react';
import {useState} from 'react';
import {motion} from 'framer-motion';

const discount = {
  title: 'The BIG SPRING Sale is ON!',
  value: '15%',
  minimum: '$100',
  starts: new Date('Apr 7, 2022, 00:00:00'),
  expires: new Date('Jun 1, 2022 00:00:00'),
};

const getTimeDiff = () => {
  let now = new Date();
  return discount.expires.getTime() - now.getTime();
};

const getCountdownString = () => {
  let diff = getTimeDiff();
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

function Discount() {
  const [countdownString, setCountdownString] = useState(getCountdownString());

  if (getTimeDiff() <= 0) {
    return '';
  }
  const timer = setInterval(() => {
    setCountdownString(getCountdownString());
  }, 1000);
  return (
    <motion.div
      className="w-lg h-lg"
      initial={{x: -300, opacity: 0}}
      animate={{x: 0, opacity: 1}}
      transition={{duration: 0.5}}
      exit={{opacity: 0}}
    >
      <div className="min-w-screen min-h-md bg-gradient-to-l rounded-lg from-orange-400 bg-yellow-500 flex items-center justify-center px-5 py-5">
        <div className="text-yellow-100">
          <h1 className="text-xl md:text-3xl text-center mb-3 font-bold">
            {discount.title}*
          </h1>
          <div className="text-2xl md:text-6xl text-center flex w-full items-center justify-center">
            <div className="text-sm md:text-2xl mr-1 font-extralight">
              time left
            </div>
            {countdownString.split(' ').map((word, index) => (
              <motion.div
                animate={{x: [0, 5 * index, 0]}}
                transition={{
                  ease: 'easeInOut',
                  type: 'spring',
                  stiffness: 10,
                }}
                transitionEnd={{display: 'none'}}
                key={word + index}
                className="w-12 md:w-24 mx-1 p-2 bg-white text-yellow-500 rounded-lg"
              >
                <div className="font-mono leading-none">
                  {word.slice(0, word.length - 1)}
                </div>
                <div className="font-mono uppercase text-sm leading-none">
                  {word[word.length - 1]}
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-xs md:text-sm text-center mt-3 max-w-lg">
            *Limited time offer applicable at checkout. Available on online
            sales channels {discount.value} off all products with minimum
            purchase of {discount.minimum}. Active from{' '}
            {discount.starts.toLocaleDateString()} to{' '}
            {discount.expires.toLocaleDateString()}. Subject to change as per
            hydrogen clothing inventory.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Discount;
