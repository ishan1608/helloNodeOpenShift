var obfuscate = str => {
	var retString;
	var len = str.length;
    mstr = str + '';
    str = mstr;
	str1 = str.substr(0,len/2);
	str2 = str.substr(len/2,len);
	retString = str2+str1;
	return retString;		
};
exports.obfuscate = obfuscate;