function acessaLink()
{
    buscaFotos().then(json => 
    {
        window.dados = json
        //console.log(json);
        listaFotos();
    });
}

async function buscaFotos(link = 'https://picsum.photos/v2/list?page=1&limit=30')
{
    const response = await fetch(link);

    if (!response.ok)
    {
        throw new Error(response.status);
    }

    const json = await response.json();

    return json;
}

// Listagem dos itens na página
function listaFotos()
{
    //console.log(window.dados);

    const json = window.dados;

    for (var i = 0 ; i < json.length; i++)
    {
        const aux = json[i];

        //console.log(aux);

        var lista = document.getElementById("fotoLista");

        var dadosFoto = '';

        dadosFoto += '<div class="card mx-4 my-4 text-center" style="width: 21rem;">';
        dadosFoto += '<div><img src="' + aux.download_url + '" class="card-img-top" alt="..."></div>';
        dadosFoto += '<div class="card-body">';
        dadosFoto += '<h5 class="card-title">' + aux.author + '</h5>';
        dadosFoto += '<p class="card-text" id="anotacao-' + aux.id + '">Anotação da foto</p>';
        dadosFoto += '<input class="form-control mb-2 js-escondido" id="anotado-' + aux.id + '"/>';
        dadosFoto += '<div class="btn-group" role="group" aria-label="Basic example">';
        dadosFoto += '<button type="button" class="btn btn-primary" onclick="favoritar(this)">Favoritar</button>';
        dadosFoto += '<button type="button" class="btn btn-primary" onclick="anotar(' + aux.id + ', this)">Anotar</button>';
        dadosFoto += '<button type="button" class="btn btn-danger" onclick="remover(this.parentElement)">Remover</button>';
        dadosFoto += '</div></div></div>';
        
        lista.innerHTML += dadosFoto;
    }
}

function erroLoading(error)
{
    console.log(error);
    document.getElementById("loader").childNodes[0].textContent = "- Erro no carregamento -" + error;
}

function favoritar(element)
{
    if (element.classList.contains("btn-primary"))
    {
        element.classList.remove("btn-primary");
        element.classList.add("btn-success");
        element.textContent = "Desfavoritar";
    }
    else
    {
        element.classList.remove("btn-success");
        element.classList.add("btn-primary");
        element.textContent = "Favoritar";
    } 
}

function anotar(id, element)
{
    var anotacao = document.getElementById("anotacao-" + id);
    var anotado = document.getElementById("anotado-" + id);

    if (element.textContent == "Anotar")
    {
        anotacao.classList.add("js-escondido");

        anotado.value = anotacao.textContent
        anotado.classList.remove("js-escondido");

        element.textContent = "Salvar";
        element.classList.remove("btn-primary");
        element.classList.add("btn-warning");
    }
    else
    {
        anotado.classList.add("js-escondido");

        anotacao.textContent = anotado.value;
        anotacao.classList.remove("js-escondido");

        element.textContent = "Anotar";
        element.classList.remove("btn-warning");
        element.classList.add("btn-primary");
    }
}

function remover(element)
{
    element.parentElement.parentElement.remove();
}