/**
 * stndrdth adds cardinality to a number or string (1st, 2nd, 3rd, 4th)
 *
 * @author  Frederick Lowe <me@fredericklowe.com>
 *
 * @since 1.0
 *
 * @param string || int num - the number to title
 * @returns string
 */
 function stndrdth(num){
  return num + (
    /* 10 - 21, always th */
    parseInt(num) > 10 && parseInt(num) < 21 ? 'th' : (
    /* 1 - 3: st, nd, rd */
    num.toString().slice(-1) == '1' ? 'st' : (
    num.toString().slice(-1) == '2' ? 'nd' : (
    num.toString().slice(-1) == '3' ? 'rd' : 
    /* default: th */
    'th'
  ))));
}
