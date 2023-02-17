import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fd9400;
`;

const ButtonConatienr = styled(motion.div)`
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(motion.button)`
  background-color: white;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  font-size: 1rem;
`;

const Container = styled(motion.div)`
  width: 450px;
  height: 450px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 12px;
`;

const Box = styled(motion.div)`
  background-color: rgb(255, 255, 255, 0.6);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
  hidden: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  visible: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  exit: { backgroundColor: 'rgba(0, 0, 0, 0)' },
};

const boxVariants = {
  visible: (custom: string) => ({
    originX: custom,
    originY: custom,
  }),
  hover: {
    scale: 1.1,
  },
};

const buttonVariants = {
  visible: (custom: string) => ({
    color: !custom ? 'rgb(229,73,161)' : 'rgb(107, 100, 241)',
    width: !custom ? '5.5rem' : '4.5rem',
    height: !custom ? '3rem' : '2.5rem',
    fontSize: !custom ? '1.3rem' : '1rem',
  }),
  initial: {
    fontSize: '1rem',
    height: '2.5rem',
    width: '4.5rem',
    color: 'rgb(107, 100, 241)',
  },
};

function App() {
  const [click, setClick] = useState(true);
  const toggleClick = () => setClick((prev) => !prev);
  const [id, setId] = useState<string | null>(null);
  return (
    <Wrapper>
      <Container>
        <Box
          custom={1}
          variants={boxVariants}
          whileHover='hover'
          animate='visible'
          onClick={() => setId('1')}
          layoutId='1'
        />
        <Box>{click ? <Circle layoutId='circle' /> : null}</Box>
        <Box>{!click ? <Circle layoutId='circle' /> : null}</Box>
        <Box
          custom={0}
          variants={boxVariants}
          whileHover='hover'
          animate='visible'
          onClick={() => setId('2')}
          layoutId='2'
        />
      </Container>
      <ButtonConatienr>
        <Button
          custom={click}
          animate='visible'
          initial='initial'
          variants={buttonVariants}
          onClick={toggleClick}
        >
          Switch
        </Button>
      </ButtonConatienr>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <Box
              layoutId={id}
              style={{
                backgroundColor: 'rgba(255,255,255)',
                height: '350px',
                width: '300px',
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
