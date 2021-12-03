import {boolean, number, optionsKnob} from '@storybook/addon-knobs';

export const getDefaultProps = (params = {
  fixedLeftColumnCount: false,
  fixedRightColumnCount: false,
  isSticky: false
}) => {
  // 默认显示
  const align = optionsKnob(
    'Align',
    {left: 'left', center: 'center', right: 'right'},
    'center',
    {display: 'inline-radio'}
  );
  const bordered = boolean('Bordered', true);
  const columnsNum = number('ColumnsNum', 10, {range: true, min: 1, max: 1000, step: 1});
  const dataNum = number('DataNum', 50, {range: true, min: 1, max: 100000, step: 1});
  // 判断显示
  const fixedLeftColumnCount = params.fixedLeftColumnCount ? number('FixedLeftColumnCount', 1) : null;
  const fixedRightColumnCount = params.fixedRightColumnCount ? number('FixedRightColumnCount', 1) : null;
  const isSticky = params.isSticky ? boolean('IsSticky', true) : null;
  const ellipsis = params.ellipsis ? boolean('Ellipsis', true) : null;

  return {
    align,
    bordered,
    columnsNum,
    dataNum,
    fixedLeftColumnCount,
    fixedRightColumnCount,
    isSticky,
    ellipsis,
  };
};
