async function validaCep(cep) {
   var mensagemErro = document.getElementById("erro");
   mensagemErro.innerHTML = "";
   try {
      var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      var consultaCepConvertido = await consultaCep.json();
      if (consultaCepConvertido.erro) {
         throw Error("CEP não existente!");
      }

      var cidade = document.getElementById("cidade");
      var logradouro = document.getElementById("endereco");
      var bairro = document.getElementById("bairro");
      var estado = document.getElementById("estado");

      cidade.value = consultaCepConvertido.localidade;
      logradouro.value = consultaCepConvertido.logradouro;
      bairro.value = consultaCepConvertido.bairro;
      estado.value = consultaCepConvertido.uf;

      return consultaCepConvertido;
   } catch (erro) {
      mensagemErro.innerHTML = `<p>CEP não é valído. Tente novamente!</p>`;
   }
}

const CEP = document.getElementById("cep");
CEP.addEventListener("focusout", () => validaCep(cep.value));
