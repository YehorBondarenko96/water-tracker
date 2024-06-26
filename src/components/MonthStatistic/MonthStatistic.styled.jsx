import styled from 'styled-components';

export const CalendarStyle = styled.div`
`;
export const MonthSelectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
`;
export const Title = styled.span`
  color: var(--primery-color-black);
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  @media screen and (min-width: 768px) {
    font-size: 26px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
  }
`;
export const MonthNav = styled.div`
  display: flex;
  align-items: center;
`;
export const NavBtn = styled.button`
  display: flex;
  border: 1px solid transparent;
  background-color: transparent;
  border-radius: 50%;
  justify-content: center;
  fill: var(--primery-color-blue);
  &:hover:not([disabled]) {
    background-color: var(--primery-color-white);
    border: 1px solid var(--calendar-color-orange);
  }

  &:disabled {
    fill: var(--secondary-color-blue);
    &:hover {
      border: 1px solid #ff000000;
      cursor: inherit;
    }
  }
`;
export const DateText = styled.p`
  color: var(--primery-color-blue);
  width: 130px;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;
export const Month = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 0.5fr);
  gap: 10px;
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
  @media screen and (min-width: 1440px) {
    grid-template-rows: repeat(4, 1fr);
  }
`;
export const Day = styled.li`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;

  &.future-day {
    button {
      color: #00000063;
      cursor: inherit;
    }
    p {
      color: #00000063;
    }

    > button {
      color: var(--secondary-color-gray);
    }
  }

  > button {
    color: var(--primery-color-black);
  }
`;

export const PercentFromNorma = styled.p`
  color: var(--secondary-color-blue);
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;
export const l = styled.div``;
