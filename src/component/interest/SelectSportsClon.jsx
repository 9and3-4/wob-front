import { useState } from "react";
import styled from "styled-components";
import {
  TitleAlign,
  TextAlign,
  SelectButton,
  InputBar,
  NextButton,
} from "./InterestCommon";
import LoginPageAxiosApi from "../../api/LoginPageAxiosApi";

const SportsGird = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  padding: 40px;
`;

const SelectSports = ({ options, min, max, title, text, handleSelected }) => {
  const [selectedSports, setSelectedSports] = useState([]);
  const [value, setValue] = useState("");
  const minSelection = min; // 최소 선택 할 수 있는 개수
  const maxSelection = max; // 최대 선택 할 수 있는 개수
  const handleSelect = (item) => {
    console.log("선택된 운동들 : ", ...selectedSports);
    if (selectedSports.includes(item)) {
      setSelectedSports(
        selectedSports.filter((selectedSports) => selectedSports !== item)
      );
    } else {
      if (
        value
          ? selectedSports.length < maxSelection - 1 // 기타: 값이 들어온 경우 버튼을 2개까지만
          : selectedSports.length < maxSelection // 버튼만 선택한 경우 3개까지만
      ) {
        setSelectedSports([...selectedSports, item]);
        handleSelected([...selectedSports, item]);
      }
    }
  };

  return (
    <>
      <TitleAlign>{title}</TitleAlign>
      <TextAlign>{text}</TextAlign>
      <SportsGird>
        {options.map((activity) => (
          <SelectButton
            key={activity}
            onClick={() => handleSelect(activity)}
            selected={selectedSports.includes(activity)}
          >
            {activity}
          </SelectButton>
        ))}
        <InputBar
          placeholder="기타"
          onChange={(e) => setValue(e.target.value)}
          disabled={selectedSports.length >= maxSelection}
          hasValue={value !== ""}
        />
      </SportsGird>
    </>
  );
};

export default SelectSports;