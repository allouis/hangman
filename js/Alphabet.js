function Alphabet(sandbox){
    GameObject.apply(this, arguments);
}

Alphabet.prototype = {
    onKeyup: function(letter){
        if(this.letters.indexOf(letter)<0)this.letters.push(letter);
    },
    draw:function(ctx){
        ctx.fillStyle = "#C01075";
        ctx.fillText(this.getText(), 10, 50);
    },
    getText:function(){
        var text = this.letters
                .map(function(n){ return numToLetter(n); })
                .join(" ");
        return this.checkLength(text + " ");
    },
    checkLength: function(text){
        if(text.length < 21) {
            text += "? ";
            return this.checkLength(text);
        } 
        return text;
    }
};
