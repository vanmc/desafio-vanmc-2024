class RecintosZoo {
    constructor() {
        this.recintos = [
            { num: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: "MACACO", numAnimais: 3, espaçoOcupado: 3 },
            { num: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: null, numAnimais: 0, espaçoOcupado: 0 },
            { num: 3, bioma: "savana e rio", tamanhoTotal: 7, animaisExistentes: "GAZELA", numAnimais: 1, espaçoOcupado: 2 },
            { num: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: null, numAnimais: 0, espaçoOcupado: 0 },
            { num: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: "LEAO", numAnimais: 1, espaçoOcupado: 3 }
        ]

        this.animais = [
            { especie: "LEAO", tamanho: 3, bioma: "savana" },
            { especie: "LEOPARDO", tamanho: 2, bioma: "savana" },
            { especie: "CROCODILO", tamanho: 3, bioma: "rio" },
            { especie: "MACACO", tamanho: 1, bioma: ["savana", "floresta"] },
            { especie: "GAZELA", tamanho: 2, bioma: "savana" },
            { especie: "HIPOPOTAMO", tamanho: 4, bioma: ["savana", "rio"] }
        ]
    }

    analisaRecintos(animal, quantidade) {
        const animalValido = this.animais.some(a => a.especie === animal)
        if (!animalValido) {
            return { erro: "Animal inválido" }
        }

        if (isNaN(quantidade) || quantidade <= 0) {
            return { erro: "Quantidade inválida" }
        }

        let recintosViaveis = []

        for (let recinto of this.recintos) {
            let tamanhoDisponivel = recinto.tamanhoTotal - recinto.espaçoOcupado
            let valorLivre = 0
            let podeAdicionar = false

            if (recinto.numAnimais !== 0 && animal !== recinto.animaisExistentes) {
                tamanhoDisponivel--
            }

            if (tamanhoDisponivel >= quantidade) {
                switch (animal) {
                    case "LEAO":
                        if (recinto.animaisExistentes === animal || (recinto.animaisExistentes === null && recinto.bioma === "savana")) {
                            podeAdicionar = true
                            valorLivre = tamanhoDisponivel - (quantidade * 3)
                        }
                        break
                    case "LEOPARDO":
                        if (recinto.animaisExistentes === animal || (recinto.animaisExistentes === null && recinto.bioma === "savana")) {
                            podeAdicionar = true
                            valorLivre = tamanhoDisponivel - (quantidade * 2)
                        }
                        break
                    case "CROCODILO":
                        if (recinto.animaisExistentes === animal || (recinto.animaisExistentes === null && recinto.bioma === "rio")) {
                            podeAdicionar = true
                            valorLivre = tamanhoDisponivel - (quantidade * 3)
                        }
                        break
                        case "MACACO":
                            if (["savana", "savana e rio", "floresta"].includes(recinto.bioma)) {
                                if (recinto.animaisExistentes === null) {
                                    if (quantidade > 1) {
                                        podeAdicionar = true
                                        valorLivre = tamanhoDisponivel - quantidade
                                    }
                                } else if (recinto.animaisExistentes === animal) {
                                    if (quantidade > 1) {
                                        podeAdicionar = true
                                        valorLivre = tamanhoDisponivel - quantidade
                                    }
                                } else if (!["LEAO", "LEOPARDO", "CROCODILO"].includes(recinto.animaisExistentes)) {
                                    podeAdicionar = true
                                    valorLivre = tamanhoDisponivel - quantidade
                                }
                            }
                            break
                    case "GAZELA":
                        if (!["LEAO", "LEOPARDO"].includes(recinto.animaisExistentes) && ["savana", "savana e rio"].includes(recinto.bioma)) {
                            podeAdicionar = true
                            valorLivre = tamanhoDisponivel - (quantidade * 2)
                        }
                        break
                    case "HIPOPOTAMO":
                        if (!["LEAO", "LEOPARDO", "CROCODILO"].includes(recinto.animaisExistentes) && ((recinto.bioma === "savana e rio" && recinto.animaisExistentes !== null) || (recinto.bioma === "rio" || (recinto.bioma === "savana" && recinto.animaisExistentes === null)))) {
                            podeAdicionar = true
                            valorLivre = tamanhoDisponivel - (quantidade * 4)
                        }
                        break
                }

                if (podeAdicionar) {
                    recintosViaveis.push(`Recinto ${recinto.num} (espaço livre: ${valorLivre} total: ${recinto.tamanhoTotal})`)
                }
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null }
        }

        return { erro: null, recintosViaveis }
    }
}

export { RecintosZoo as RecintosZoo }
