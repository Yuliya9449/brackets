
const config1 = [['(', ')']];
const config2 = [['(', ')'], ['[', ']']];
const config3 = [['(', ')'], ['[', ']'], ['{', '}']];
const config4 = [['|', '|']];
const config5 = [['(', ')'], ['|', '|']];
const config6 = [['1', '2'], ['3', '4'], ['5', '6'], ['7', '7'], ['8', '8']];
const config7 = [['(', ')'], ['[', ']'], ['{', '}'], ['|', '|']];



// console.log(check('111115611111111156111111112222888888222255778777787755556666777777777766222221111222288888822225577877778775555666677777777776622222', config6));


module.exports = 
function check(str, bracketsConfig) {
  // console.log(bracketsConfig);
  // console.log(arguments);
  let strArray = str.split('');   // переделываем входную строку в массив
  let stack = [];                    // это будет стек
  let openBrackets = [];           // здесь будут открывающие скобки
  let bracketPairs = {};           // здесь будут пары скобок    открывающие: закрывающие
  let MyBracketsConfig = []
for( let i = 0; i< bracketsConfig.length; i++) {
  MyBracketsConfig[i] = bracketsConfig[i].slice();  // копируем входной массив (он двухуровневый)
}
  // console.log(bracketsConfig1 === bracketsConfig);

  for( let item of MyBracketsConfig) {
    if( item[0] === item[1]) {                // проверка на одинаковые открывающие - закрывающие
      let flag = true;                        // это для переключения 'open' / 'close'
      for (let i = 0; i < strArray.length; i++) {
        if (strArray[i] === item[0] && flag) {
          strArray[i] = strArray[i] + 'open';          // в строке переделываем первую из одинаковых на 'open'
          flag = !flag;
        }
        if (strArray[i] === item[0] && !flag) {
          strArray[i] = strArray[i] + 'close';        // в строке переделываем вторую одинаковую на 'close'
          flag = !flag;
        }

      }

      item[0] = item[0] + 'open';                   // в массиве переделываем одинаковую открывающую на open
      item[1] = item[1] + 'close';                // в массиве переделываем одинаковую закрывающую на close
    }

    openBrackets.push(item[0]);                   // создаем массив открывающих скобок
    bracketPairs[item[1]] = item[0];              // создаем соответствия открывающие: закрывающие
  }
  // console.log(bracketsConfig);
  // console.log(MyBracketsConfig);

  for (let i = 0; i < strArray.length; i++) {           // для каждого элемента строки
    let currentBracket = strArray[i];                 // это текущий элемент строки, который сейчас обрабатываем
    if (openBrackets.includes(currentBracket)) {      // если текущий элемент есть в массиве открывающих
      stack.push(currentBracket);                     // то добавляем его в стек
    } else {
      if (stack.length === 0) {                   // если текущего нет в массиве открывающих, и стек пуст
        return false;
      }

      if( bracketPairs[currentBracket] === stack[stack.length - 1]) {   // если закрывающая для текущего = верхушке стека
        stack.pop();                                                    // удаляем из верхушку стека
      } else {
        return false;
      }
    } 
  }
    if (stack.length === 0) {
      return true;
    } else {
      return false;
    }
    
}