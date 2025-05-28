let carros = [
    { modelo: "XL 2.0 Flex", preco: 120000, cor: "preto" },
    { modelo: "XL 2.2 Diesel", preco: 145000, cor: "preto" },
    { modelo: "Storm 2.4 Turbo", preco: 160000, cor: "preto" },

];

class carro {
    constructor(modelo, preco, imagem) {
        this.modelo = modelo;
        this.preco = preco;
        this.cor = imagem;
    }

    exibirInfo() {
        console.log("Modelo:", this.modelo);
        console.log("Preço: ", this.preco);
    }
}
