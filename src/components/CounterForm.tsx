/* eslint-disable no-useless-escape */
import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import exampleText from "../utils/mobydick";
import exampleStops from "../utils/stop-words";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: auto;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const WordListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: auto;
  align-items: center;
  border-right: 1px solid pink;
  > button {
    height: 25px;
    width: 225px;
    margin: 0 5px;
    font-size: 15px;
    background: pink;
    color: black;
    border: none;
    border-radius: 3px;
    :hover {
      background: black;
      color: pink;
      border: 1px solid pink;
    }
    :active {
      background: pink;
      color: black;
      border: none;
    }
  }
  @media (max-width: 600px) {
    border: none;
    align-items: center;
    justify-content: center;
  }
`;

const WordList = styled.ul`
  width: 100%;
`;

const StopListItem = styled.div`
  display: flex;
  flex-direction: row;
  height: 25px;
  > p {
    margin: 0 10px;
    font-weight: bold;
  }
  > button {
    width: 25px;
    height: 25px;
    border: none;
    background: none;
    color: red;
    cursor: pointer;
  }
`;
const Headline = styled.h1`
  font-size: 50px;
  font-family: roboto;
  color: pink;
`;

const ListHeader = styled.h4`
  font-size: 30px;
  font-family: roboto;
  color: pink;
`;

const Description = styled.p`
    font-size 20px;
    font-family: roboto;
    color: pink;
`;

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  width: 70%;
  height: 625px;
  @media (max-width: 600px) {
    height: 1250px;
    width: 100%;
  }
`;

const ListItem = styled.p`
  display: block;
  font-size: 15px;
  font-weight: bold;
  font-family: roboto;
  color: pink;
  width: 25%;
  line-height: 20px;
  margin: 5px 0 0;
  padding: 0;
  @media (max-width: 600px) {
    width: 50%;
  }
`;

const CountForm = styled.div`
  display: flex;
  margin: auto;
  width: 70%;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 95%;
  }
`;

const TextField = styled.textarea`
    width: 800px;
    height 300px;
    overflow: scroll;
    resize: none;
    background: black;
    color: pink;
    border: 2px solid pink;
    :focus {
        outline: none !important;
        border:2px dotted pink;
    }
    @media (max-width: 600px) {
        width: 100%;
      }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 300px;
  justify-content: space-around;
  align-items: center;
  > button {
    height: 40px;
    margin: 0 5px;
    padding: 5px;
    font-size: 25px;
    background: pink;
    color: black;
    border: none;
    border-radius: 3px;
    :hover {
      background: black;
      color: pink;
      border: 1px solid pink;
    }
    :active {
      background: pink;
      color: black;
      border: none;
    }
  }
  @media (max-width: 600px) {
    height: 50px;
    align-items: center;
    justify-content: center;
    > button {
        font-size: 20px;
  }
`;

const StopWordButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 5px;
`;

const AddButton = styled.button`
  width: 25px;
  height: 25px;
  line-height: 25px;
  border: none;
  background: none;
  color: pink;
  font-size 25px;
  font-weight: bold;
  padding: 0;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  color: red;
  font-size: 15px;
  font-weight: bold;
`;

const StopWord = styled.p`
  padding-top: 2px;
  color: pink;
`;

/**
 * Renders the list of words and their counts
 */
const ResultList = ({ countList }: any): any => {
  return (
    <ListContainer>
      {Object.keys(countList)
        .sort((a, b) => countList[b] - countList[a])
        .slice(0, 100)
        .map((key, index) => (
          <ListItem>
            {index + 1}. {key}: {countList[key]}
          </ListItem>
        ))}
    </ListContainer>
  );
};

export const CounterForm = () => {
  const [text, setText] = useState<string>("");
  const [newStopWord, setNewStopWord] = useState<string>("");
  const [stopWords, setStopWords] = useState<string[]>([]);
  const [countList, setCountList] = useState<any>({});
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 600);

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 600);
    });
  }, []);

  /**
   * creates an object containing all words in the text string and the number of times
   * they appear, excluding all words in the stopWords string
   */
  const getWordCount = (text: string, stopList: string[]) => {
    const list = text.toLowerCase().match(/[\w\d\’\'-]+/gi);
    let result: { [key: string]: number } = {};

    list?.forEach((word) => {
      if (!stopList?.includes(word.toLowerCase())) {
        result[word] ? (result[word] += 1) : (result[word] = 1);
      }
    });
    setCountList(result);
  };

  /**
   * converts the example stop-words into an array and runs getWordCount()
   */
  const getExample = (text: string, stopWords: string) => {
    const stopList = stopWords.toLowerCase().match(/[\w\d\’\'-]+/gi) ?? [];
    getWordCount(text, stopList);
  };

  const addStopWord = (stopWord: string) => {
    const arr = [...stopWords];

    const words = stopWord.toLowerCase().match(/[\w\d\’\'-]+/gi) ?? [];
    words.forEach((word) => {
      if (!arr.includes(word)) {
        arr.push(word);
      }
    });
    setStopWords(arr);
  };

  const deleteStopWord = (stopWord: string) => {
    const newList = stopWords.filter((word) => stopWord !== word);
    setStopWords(newList);
  };

  const StopWordList = () => {
    return (
      <WordListContainer>
        <ListHeader>Stop Words</ListHeader>
        <StopWordButtonsContainer>
          <input
            type="text"
            placeholder="Enter stop words"
            value={newStopWord}
            onChange={(e) => {
              setNewStopWord(e.target.value);
            }}
          ></input>
          <AddButton
            onClick={() => {
              addStopWord(newStopWord);
            }}
          >
            +
          </AddButton>
        </StopWordButtonsContainer>
        <button
          onClick={() => {
            setStopWords([]);
          }}
        >
          Clear List
        </button>
        <WordList>
          {stopWords.map((word) => (
            <StopListItem>
              <DeleteButton
                onClick={() => {
                  deleteStopWord(word);
                }}
              >
                x
              </DeleteButton>
              <StopWord>{word}</StopWord>
            </StopListItem>
          ))}
        </WordList>
      </WordListContainer>
    );
  };

  return (
    <Wrapper>
      {!isMobile && <StopWordList />}
      <FormWrapper>
        <Headline>Word Counter</Headline>
        <Description>
          This application provides a list of the most frequently used words in
          a string up to the Top 100!
        </Description>
        <Description>
          Simply add a string in the Text field and an optional list of words to
          Stop Words list.
        </Description>
        <Description>
          The Get Example button can be clicked to receive the top 100 most
          frequently used words in Herman Melville's Moby Dick!
        </Description>
        {isMobile && <StopWordList />}
        <CountForm>
          <TextField
            placeholder="Enter text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></TextField>

          <ButtonContainer>
            <button
              type="submit"
              onClick={() => {
                getWordCount(text, stopWords);
              }}
            >
              Count Words
            </button>
            <button
              type="submit"
              onClick={() => {
                getExample(exampleText, exampleStops);
              }}
            >
              Get Example
            </button>
          </ButtonContainer>
        </CountForm>
        <ListHeader>Results</ListHeader>
        <ResultList key={countList} countList={countList} />
      </FormWrapper>
    </Wrapper>
  );
};
