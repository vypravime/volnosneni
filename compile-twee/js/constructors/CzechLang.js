"use strict";

(function(){



setup.c10s.CzechLang = function(

) {

};

let thatProto = setup.c10s.CzechLang.prototype;

/**EXAMPLE:
 * czechLang.numberOf(['kámen','kameny','kamenů'], 7): returns '7 kamenů'
 * czechLang.numberOf(['kámen','kameny','kamenů'], 1): returns '1 kámen'
 * czechLang.numberOf(['kámen','kameny','kamenů'], 4): returns '4 kameny'
 * czechLang.numberOf(['kámen','kameny','kamenů'], 0): returns '0 kamenů'
 * 
 EXAMPLE OF OMITTING INTEGER IN RETURN VALUE:
 * czechLang.numberOf(['kámen','kameny','kamenů'], 7, false): returns 'kamenů'
 * czechLang.numberOf(['kámen','kameny','kamenů'], 1, false): returns 'kámen'
 * czechLang.numberOf(['kámen','kameny','kamenů'], 4, false): returns 'kameny'
 * czechLang.numberOf(['kámen','kameny','kamenů'], 0, false): returns 'kamenů'
 */
thatProto.numberOf = function(
    oneTwoFiveOfItArray,
    amount,
    returnWithInteger = true
    ) {
    let [oneOfIt, twoOfIt, fiveOfIt] = oneTwoFiveOfItArray;
    let prepender = '';
    if(returnWithInteger) {
        prepender = `${amount} `;
    }
        if(amount === 1) {
            return `${prepender}${oneOfIt}`;
        } else if((amount > 1) && (amount < 5)) {
            return `${prepender}${twoOfIt}`;
        } else {  // this is also, if the amount equals to zero
            return `${prepender}${fiveOfIt}`;
        }
    };



})();