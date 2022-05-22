/**
 * isNANPCompliantPhoneNumber tests an abritrarily formatted phone number 
 * for compliance with the North American Numbering Plan
 *
 * @author  Frederick Lowe <me@fredericklowe.com>
 *
 * @since 1.0
 *
 * @param string || int number - the phone number to test
 * @returns object:
 *  { 
 *    "status" : 
 *    "EMPTY|MALFORMATTED|ERR_BAD_NANP_AREA_CODE|ERR_BAD_NANP_EXHANGE|VALID
 *  }
 */
function /* pure */ isNANPCompliantPhoneNumber(number)
{
  if(!number)
  {
    return {"status":"EMPTY"};
  }

  /* stringify number, and remove all formatting, plus leading 1 if present */
  number = number.toString().replace(/[^0-9]/g,'').replace(/^1?/,'');

  /* the remaining string should be 10 digits in length; return MALFORMATTED if it's not */
  if(number.length != 10)
  {
    return {"status":"MALFORMATTED"};
  }

  /* test the first three digits (area code) */
  var areacode = number.substr(0,3);
  /* 
    iterate and test, with the following effect
      1. continue iteration with each passed test (!match returns true)
      2. terminate iteration if a test fails (!match returns false)
      3. return MALFORMATTED from the method on failure (!if)
      4. fall through to exchange test below on success
  */
  if(![/^0/,/^1/,/[2-7]11/,/911/,/(222|333|555|666|844|855|866|877|888|800)/].every(function(_re){
    return (!areacode.match(_re));
  })) 
  { 
    return {"status":"ERR_BAD_AREA_CODE"};
  }

  /* test the next three digits (exchange) */
  var exchange = number.substr(3,3);

  /* iterate and test as above imposing every NANP-described exchange restriction */
  if(![ /^0/,/^1/,/[2-7]11/,/911/,/555/].every(function(_re){
    return (!exchange.match(_re));
  }))
  {
    return {"status":"ERR_BAD_EXHANGE"};
  }

  /* number is NANP-compliant; all TNI 0000 - 9999 are valid */
  return {"status":"VALID"};
}