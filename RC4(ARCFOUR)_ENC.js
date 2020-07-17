var mno = vars.get("mno");
var key = vars.get("key");

var ARC4 = function(key){
	var s = new Array(256);
    var s2 = new Array(256);

    for (var i = 0; i < 256; i++){
        s[i] = i;
        s2[i] = key.charCodeAt(i % key.length);
    }

    var j = 0;
    for(var i = 0; i < 256; i++){
        j = (j + s[i] + s2[i]) & 0xff;
        var t = s[i];
        s[i] = s[j];
        s[j] = t;
    }

    this.s = s;
}

ARC4.prototype.encrypt = function(message){
    var i = 0;
    var j = 0;
    var encrypted = [];
    var temp = this.s.slice();

    for(var k = 0; k < message.length; k++){
        var charCode = 0;
        i = (i + 1) & 0xff ;
        j = (j + temp[i]) & 0xff;
        var x = temp[i];
        temp[i] = temp[j];
        temp[j] = x;

        if(message.constructor === Array){
            charCode = message[k];
        } else if (message.constructor === String){
            charCode = message.charCodeAt(k);
        }
        encrypted[k] = (charCode ^ temp[(temp[i] + temp[j]) & 0xff]);
    }
    return encrypted;
}

ARC4.prototype.decrypt = function(message){
    return this.encrypt(message);
}

String.prototype.toBuffer = function(string){
    var buff = [];
    for (var i=0; i < this.length; i++) {
        buff[i] = this.charCodeAt(i);
    }
    return buff;
}

Array.prototype.toString = function(){
    var string = '';
    for (var i=0; i < this.length; i++) {
        string += String.fromCharCode(this[i]);
    }
    return string;
}

Array.prototype.isEqualTo = function(array){
    if(this.length !== array.length){
        return false
    }

    for(var i = 0; i < this.length; i++){
        if(this[i] !== array[i]){
            return false;
        }
    }

    return true;
}

var cipher = new ARC4(key);
var buffer = cipher.encrypt(mno);
var enc_str = ascii_to_hexa(buffer);
log.warn("*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_ mno,encrypted - " + mno + "," + enc_str.toString());
var.puts("enc_mno",enc_mno);
// console.log("-- Encrypted --");
// console.log(buffer);
// console.log(buffer.toString());

// var otherBuff = cipher.decrypt(buffer)
// console.log("-- Decrypted --");
// console.log(otherBuff);
// console.log(otherBuff.toString());

function ascii_to_hexa(cin)
  {
	var str = cin.toString();
	var arr1 = [];
	for (var n = 0, l = str.length; n < l; n ++) 
     {
//		log.warn("++++++++++++++++++++++++ n = " + n + " &&&&&& string is - " + str.charCodeAt(n) + " &&&&&&&& hex is - " + Number(str.charCodeAt(n)).toString(16));
		var hex = Number(str.charCodeAt(n)).toString(16);
		if (hex.length != 2)
		{
			hex = "0" + hex;   
		}
		arr1.push(hex);
	 }
	return arr1.join('');
   }

