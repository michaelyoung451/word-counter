/* eslint-disable no-useless-escape */
import React, { useState } from "react";

/**
 * Renders the list of words and their counts
 */
const ResultList = ({ countList }: any): any => {
  return (
    <div>
      {Object.keys(countList).map((key) => (
        <p>
          {key}: {countList[key]}
        </p>
      ))}
    </div>
  );
};

export const CounterForm = () => {
  const [text, setText] = useState<string>("");
  const [stopWords, setStopWords] = useState<string>("");
  const [countList, setCountList] = useState<any>({});

  /**
   * creates an object containing all words in the text string and the number of times
   * they appear, excluding all words in the stopWords string
   */
  const getWordCount = (text: string, stopWords: string) => {
    const list = text.match(/[\w\d\’\'-]+/gi);
    const stopList = stopWords.match(/[\w\d\’\'-]+/gi);
    let result: { [key: string]: number } = {};

    list?.forEach((word) => {
      if (!stopList?.includes(word)) {
        result[word] ? (result[word] += 1) : (result[word] = 1);
      }
    });
    setCountList(result);
  };

  return (
    <>
      <div className="countForm">
        <input
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Enter stop words"
          value={stopWords}
          onChange={(e) => {
            setStopWords(e.target.value);
          }}
        ></input>
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
            
          }}
        >
          Get Example
        </button>
      </div>

      <div className="result">
        <ResultList key={countList} countList={countList} />
      </div>
    </>
  );
};
