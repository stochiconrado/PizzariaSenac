/* exports.soma = (a, b) => {
  return a + b;
};
exports.sub = (a, b) => {
  return a - b;
};
exports.div = (a, b) => {
  return a / b;
};
exports.mult = (a, b) => {
  return a * b;
};

exports.verificaNumero = (numero) => {
  if (numero > 0) {
    return "positivo";
  } else if (numero < 0) {
    return "negativo";
  } else {
    return "zero";
  }
};

exports.eString = (valor) => {
  return typeof valor === "string";
};

exports.numerosPares = (numero) => {
  const pares = [];
  for (let index = 2; index <= numero; index += 2) {
    pares.push(index);
  }
  return pares;
};

//toBeThruthy = combina com qualquer coisa que uma instução if como verdadeiro
exports.validarString = (texto) => {
  return texto.length >= 3;
};

//toBeFalsy = combina com qualquer coisa que uma instrução if trata como falso
exports.validarNumero = (numero) => {
  return numero < 10;
};

//toBeUndefined = verifica se é undefined (algo que não contém valor, ou chave ou propriedade).
exports.obterPropriedade = (objeto, propriedade) => {
  return objeto[propriedade];
};

//toBeDefined = ao contrário de undefined
exports.criarUsuario = (nome, idade) => {
  if (!nome || !idade) {
    return undefined;
  }
  return { nome, idade };
};

//toBeNull = corresponde a apenas o null
const produtos = [
  { id: 1, nome: "celular", preco: 999.99 },
  { id: 2, nome: "laptop", preco: 1499.99 },
];
exports.pesquisarProduto = (nome) => {
  for (let index = 0; index < produtos.length; index++) {
    if (produtos[index].nome === nome) {
      return produtos[index];
    }
  }
  return null;
};

//toBeGreaterThan = compara se o valor é maior que o esperado
exports.dobrarNumero = (numero) => {
  return numero * 2;
};

/* toBeGreaterThanOrEqual = verifica se o valor é maior ou igual ao original
toBeLessThanOrEqual = verifica se o valor é menor ou igual ao original
exports.aumentarSalario = (salario, aumentoPorcentagem) => {
  const aumento = salario * (aumentoPorcentagem / 100);
  return salario + aumento;
};

//toMatch = verifica strings
exports.formatarEmail = (usuario,dominio)=>{
  return `${usuario}@${dominio}`;
} */

exports.mesclarObjetos = (obj1, obj2) => {
  return {...obj1, ...obj2}
}


exports.ehPrimo = (numero) => {
  if (numero < 2) {
    return false;
  }
  for (let index = 2; index < numero; index++) {
    if (numero % index == 0) {
      return false;
    }
    return true;
  }
};

exports.dividirPorzero = (valor1, valor2) => {
  if (valor2 == 0) {
    return "ERRO";
  } else {
    valor1 / valor2;
  }
};

