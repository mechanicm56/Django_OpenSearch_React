/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Search = ({ setInputValue }: { setInputValue: Function }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setInputValue(input);
    navigate(`/searched/${input}`);
    setInput("");
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <InputWrapper>
        <input placeholder="Search for a recipe" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <FaSearch />
      </InputWrapper>
    </FormStyle>
  );
};

const FormStyle = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 2rem 0;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  input {
    width: 100%;
    border: 1px solid #9b9b9b;
    background: #ffffff;
    font-size: 1.2rem;
    color: #1c2331;
    border-radius: 2rem;
    outline: none;
    padding: 1rem 2rem;
  }

  svg {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.7;
  }
`;

export default Search;
