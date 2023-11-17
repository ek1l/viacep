const inputValue = document.querySelector('#enviar-cep');
const formSubmit = document.querySelector('#form');
const spanError = document.querySelector('#error');
const hidden = document.querySelector('.hidden');

const fazerReq = async () => {
  if (inputValue.value.length < 8 || inputValue.value.length > 8) return;
  try {
    const apiFetch = await fetch(
      `http://viacep.com.br/ws/${inputValue.value}/json/`,
    );
    const dataAPI = await apiFetch.json();
    spanError.innerText = '';

    return dataAPI;
  } catch (error) {
    console.error(error);
  }
};

const renderizarNaTela = async () => {
  if (inputValue.value.length < 8 || inputValue.value.length > 8) {
    return (spanError.innerText = 'Digite um CEP válido!');
  }

  let receberDadosParaRenderizar = await fazerReq();
  const enderecosRender = document.querySelector('.enderecos');
  enderecosRender.innerHTML = '';
  const cep = document.createElement('p');
  const localidade = document.createElement('p');
  const logradouro = document.createElement('p');
  const bairro = document.createElement('p');
  const uf = document.createElement('p');
  const ddd = document.createElement('p');

  cep.innerText = `CEP: ${receberDadosParaRenderizar.cep}`;
  localidade.innerText = `Localidade: ${receberDadosParaRenderizar.localidade}`;
  logradouro.innerText = `Logradouro: ${receberDadosParaRenderizar.logradouro}`;
  bairro.innerText = `Bairro: ${receberDadosParaRenderizar.bairro}`;
  uf.innerText = `UF: ${receberDadosParaRenderizar.uf}`;
  ddd.innerText = `DDD: ${receberDadosParaRenderizar.ddd}`;

  enderecosRender.appendChild(cep);
  enderecosRender.appendChild(localidade);
  enderecosRender.appendChild(logradouro);
  enderecosRender.appendChild(bairro);
  enderecosRender.appendChild(uf);
  enderecosRender.appendChild(ddd);
  aparecerInfo();
  return enderecosRender;
};

const aparecerInfo = () => {
  hidden.style.display = 'flex';
  hidden.classList.add('entrada');
  formSubmit.classList.add('entrada');
};

formSubmit.addEventListener('submit', (e) => {
  e.preventDefault();
  renderizarNaTela();
  inputValue.value = '';
  inputValue.focus();
});
