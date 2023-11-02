const prompt = require('prompt-sync')({ sigint: false });

class Contato {
    constructor(nome, telefone, email) {
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
    }

    exibirInformacoesAdicionadas() {
        console.log(`Nome: ${this.nome}`);
        console.log(`Telefone: ${this.telefone}`);
        console.log(`Email: ${this.email}`);
    }
}

class Cliente extends Contato {
    constructor(nome, telefone, email, empresa) {
        super(nome, telefone, email);
        this.empresa = empresa;
    }

    exibirInformacoesAdicionadas() {
        super.exibirInformacoesAdicionadas();
        console.log(`Empresa: ${this.empresa}`);
    }
}

class Amigo extends Contato {
    constructor(nome, telefone, email, dataAniversario) {
        super(nome, telefone, email);
        this.dataAniversario = dataAniversario;
    }

    exibirInformacoesAdicionadas() {
        super.exibirInformacoesAdicionadas();
        console.log(`Data de Aniversário: ${this.dataAniversario}`);
    }
}

class ColegaDeTrabalho extends Contato {
    constructor(nome, telefone, email, departamento) {
        super(nome, telefone, email);
        this.departamento = departamento;
    }

    exibirInformacoesAdicionadas() {
        super.exibirInformacoesAdicionadas();
        console.log(`Departamento: ${this.departamento}`);
    }
}

class Agenda {
    constructor() {
        this.contatos = [];
    }

    validarTelefone(telefone) {
        return /^\d{10,}$/.test(telefone);
    }

    validarEmail(email) {
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailRegex.test(email);
    }

    validarDataAniversario(dataAniversario) {
        const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        return dataRegex.test(dataAniversario);
    }

    adicionarContato() {
        console.log("Selecione o tipo de contato:");
        console.log(" 1 - Cliente");
        console.log(" 2 - Amigo");
        console.log(" 3 - Colega de Trabalho");
        const tipoContato = parseInt(prompt("Opção => "));

        if (tipoContato === 1 || tipoContato === 2 || tipoContato === 3) {
            console.log("");
            const nome = prompt("Digite o nome do contato: ");
            let telefoneValido = false;
            let novoTelefone;

            while (!telefoneValido) {
                novoTelefone = prompt("Digite o novo telefone (apenas dígitos e incluindo o DDD): ");
                if (this.validarTelefone(novoTelefone)) {
                    telefoneValido = true;
                } else {
                    console.log("O número de telefone inserido não contém todos os dados como valores númericos ou você esqueceu de incluir o DDD. Tente Novamente!");
                }
            }

            let emailValido = false;
            let novoEmail;

            while (!emailValido) {
                novoEmail = prompt("Digite o novo email: ");
                if (this.validarEmail(novoEmail)) {
                    emailValido = true;
                } else {
                    console.log("O email deve estar no seguinte formato: (nome@dominio.com). Tente novamente!");
                }
            }

            if (tipoContato === 2) {
                let dataAniversarioValida = false;
                let dataAniversario;

                while (!dataAniversarioValida) {
                    dataAniversario = prompt("Digite a data de aniversário (no formato Dia/Mês/Ano): ");
                    if (this.validarDataAniversario(dataAniversario)) {
                        dataAniversarioValida = true;
                    } else {
                        console.log("A data de aniversário deve estar no formato 'Dia/Mês/Ano'. Tente novamente!");
                    }
                }

                const amigo = new Amigo(nome, novoTelefone, novoEmail, dataAniversario);
                this.contatos.push(amigo);
                console.log(`O contato de ${amigo.nome} foi adicionado à agenda.`);
                console.log("");
            } else if (tipoContato === 1) {
                const empresa = prompt("Digite o nome da empresa: ");
                const cliente = new Cliente(nome, novoTelefone, novoEmail, empresa);
                this.contatos.push(cliente);
                console.log(`O contato de ${cliente.nome} foi adicionado à agenda.`);
                console.log("");
            } else if (tipoContato === 3) {
                const departamento = prompt("Digite o departamento: ");
                const colega = new ColegaDeTrabalho(nome, novoTelefone, novoEmail, departamento);
                this.contatos.push(colega);
                console.log(`O contato de ${colega.nome} foi adicionado à agenda.`);
                console.log("");
            }
        } else {
            console.log("Opção inválida!");
        }
    }

    visualizarContatos() {
        if (this.contatos.length === 0) {
            console.log("Você ainda não tem contatos adicionados.");
            console.log("");
        } else {
            console.log("* Lista de Contatos *");
            console.log("");
            for (let contato of this.contatos) {
                contato.exibirInformacoesAdicionadas();
                console.log("");
            }
        }
    }

    editarContato() {
        console.log("* Editar Contato *");
        const nomeEditar = prompt("Digite o nome do contato que você deseja editar: ");
        const contatoEditar = this.contatos.find((contato) => contato.nome.toLowerCase() === nomeEditar.toLowerCase());

        if (contatoEditar) {
            console.log("Contato encontrado:\n");
            console.log(`Tipo de Contato: ${contatoEditar.constructor.name}`);
            contatoEditar.exibirInformacoesAdicionadas();

            const opcoesEdicao = {
                Cliente: ["Editar Nome", "Editar Telefone", "Editar Email", "Editar Empresa"],
                Amigo: ["Editar Nome", "Editar Telefone", "Editar Email", "Editar Data de Aniversário"],
                ColegaDeTrabalho: ["Editar Nome", "Editar Telefone", "Editar Email", "Editar Departamento"],
            };

            if (opcoesEdicao[contatoEditar.constructor.name]) {
                console.log("");
                console.log("Opções de Edição:");
                opcoesEdicao[contatoEditar.constructor.name].forEach((opcao, index) => {
                    console.log(`${index + 1} - ${opcao}`);
                });

                const opcaoEditar = parseInt(prompt("Opção => "));
                switch (opcaoEditar) {
                    case 1:
                        const novoNome = prompt("Digite o novo nome: ");
                        contatoEditar.nome = novoNome;
                        console.log(`Nome editado para: ${novoNome}`);
                        console.log("");
                        break;
                    case 2:
                        let telefoneValido = false;
                        let novoTelefone;

                        while (!telefoneValido) {
                            novoTelefone = prompt("Digite o novo telefone (apenas dígitos): ");
                            if (this.validarTelefone(novoTelefone)) {
                                telefoneValido = true;
                            } else {
                                console.log("O número de telefone deve conter apenas dígitos. Tente novamente.");
                            }
                        }

                        contatoEditar.telefone = novoTelefone;
                        console.log(`Telefone editado para: ${novoTelefone}`);
                        console.log("");
                        break;
                    case 3:
                        let emailValido = false;
                        let novoEmail;

                        while (!emailValido) {
                            novoEmail = prompt("Digite o novo email: ");
                            if (this.validarEmail(novoEmail)) {
                                emailValido = true;
                            } else {
                                console.log("O email deve estar no formato correto (exemplo@dominio.com). Tente novamente.");
                            }
                        }

                        contatoEditar.email = novoEmail;
                        console.log(`Email editado para: ${novoEmail}`);
                        console.log("");
                        break;
                    case 4:
                        if (contatoEditar instanceof Amigo) {
                            let dataAniversarioValida = false;
                            let novaDataAniversario;

                            while (!dataAniversarioValida) {
                                novaDataAniversario = prompt("Digite a nova data de aniversário (no formato Dia/Mês/Ano): ");
                                if (this.validarDataAniversario(novaDataAniversario)) {
                                    dataAniversarioValida = true;
                                } else {
                                    console.log("A data de aniversário deve estar no formato 'Dia/Mês/Ano'. Tente novamente.");
                                }
                            }

                            contatoEditar.dataAniversario = novaDataAniversario;
                            console.log("");
                            console.log(`Data de Aniversário editada para: ${novaDataAniversario}`);
                        }
                        break;
                    default:
                        console.log("Opção inválida.");
                }
            } else {
                console.log("Tipo de contato não encontrado.");
                console.log("");
            }
        } else {
            console.log(`O contato de nome: ${nomeEditar} não foi encontrado.`);
            console.log("");
        }
    }

    excluirContato() {
        console.log("* Excluir Contato *");
        const nomeExcluir = prompt("Digite o nome do contato que você deseja excluir: ");
        const contatoExcluirIndex = this.contatos.findIndex((contato) => contato.nome.toLowerCase() === nomeExcluir.toLowerCase());

        if (contatoExcluirIndex !== -1) {
            this.contatos.splice(contatoExcluirIndex, 1);
            console.log(`O contato: ${nomeExcluir} foi excluído com sucesso.`);
            console.log("");
        } else {
            console.log(`O contato de nome: ${nomeExcluir} não foi encontrado.`);
            console.log("");
        }
    }

    pesquisarContato() {
        console.log("* Pesquisar Contato *");
        const nomePesquisar = prompt("Digite o nome do contato que você deseja pesquisar: ");
        const contatosEncontrados = this.contatos.filter((contato) => contato.nome.toLowerCase() === nomePesquisar.toLowerCase());

        if (contatosEncontrados.length > 0) {
            console.log("Contatos encontrados: ");
            contatosEncontrados.forEach((contato) => {
                console.log(`Tipo de Contato: ${contato.constructor.name}`);
                contato.exibirInformacoesAdicionadas();
                console.log("");
            });
        } else {
            console.log(`Não foi encontrado nenhum contato com o nome: ${nomePesquisar}.`);
            console.log("");
        }
    }
}

const menuOpcoes = [
    "Adicionar Contatos",
    "Visualizar Lista de Contatos",
    "Editar Contato",
    "Excluir Contato",
    "Pesquisar Contato",
    "Sair"
];

const agenda = new Agenda();
let parar = false;

while (!parar) {
    console.log("* Agenda de Contatos *");
    menuOpcoes.forEach((option, index) => {
        console.log(` ${index + 1} - ${option}`);
    });
    console.log("===================================");

    const opcao = parseInt(prompt("Opção => "));
    console.log("");

    switch (opcao) {
        case 1:
            agenda.adicionarContato();
            break;
        case 2:
            agenda.visualizarContatos();
            break;
        case 3:
            agenda.editarContato();
            break;
        case 4:
            agenda.excluirContato();
            break;
        case 5:
            agenda.pesquisarContato();
            break;
        case 6:
            console.log("Saindo...");
            parar = true;
            break;
        default:
            console.log("Opção inválida!");
    }
}
