const args = process.argv.slice(2);

const sayi1 = Number(args[0]);
const islem = args[1];
const sayi2 = Number(args[2]);
let sonuc;

if(!sayi1 || !sayi2 || !islem){
    throw new Error(
        "Lütfen düzgün sırada giriniz ve eksiksiz giriniz !"
    )
    process.exit(1);
}

switch(islem){
    case '+':
        sonuc = sayi1 + sayi2;
        break;
    case '-':
        sonuc = sayi1 - sayi2;
        break;
    case '*':
        sonuc = sayi1 * sayi2;
        break;
    case '/':
        sonuc = sayi1 / sayi2;
        break;
    default: 
        console.log("Geçersiz işlem! Kullanabileceğin işlemler: +, -, *, /");
        process.exit(1);
}

console.log(`Sonuc: ${sayi1} ${islem} ${sayi2} = ${sonuc}`);